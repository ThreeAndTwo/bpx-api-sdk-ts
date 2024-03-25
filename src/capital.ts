import {ICapital} from "./services";
import {types} from "./types";
import {Chain, Instruction} from "./constants";
import {AxiosInstance} from 'axios';
import * as nacl from "tweetnacl";
import {formatLimit, formatOffset, setHeaders, signature} from "./utils";

export class Capital implements ICapital {
    public host: string;
    private readonly apiKey: string;
    private readonly privateKey: nacl.SignKeyPair;
    private client: AxiosInstance;

    constructor(host: string, apiKey: string, privateKey: nacl.SignKeyPair, client: AxiosInstance) {
        this.host = host;
        this.apiKey = apiKey;
        this.privateKey = privateKey;
        this.client = client;
    }

    async getBalances(): Promise<{ [key: string]: types.TokenCapital } | null> {
        const signRes = signature(Instruction.InstructionBalanceQuery, this.privateKey, {}, {});
        const headers = setHeaders(this.apiKey, signRes);
        const url = `${this.host}/api/v1/capital`;
        try {
            const response = await this.client.get(url, {headers});
            return response.data as { [key: string]: types.TokenCapital };
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getDeposits(): Promise<types.Deposit[] | null> {
        const signRes = signature(Instruction.InstructionDepositQueryAll, this.privateKey, {}, {});
        const headers = setHeaders(this.apiKey, signRes);
        const url = `${this.host}/wapi/v1/capital/deposits`;

        try {
            const response = await this.client.get(url, {headers});
            return response.data as types.Deposit[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getDepositAddress(chain: Chain): Promise<types.DepositAddress | null> {
        if (
            chain !== Chain.Solana && chain !== Chain.Ethereum &&
            chain !== Chain.Polygon && chain !== Chain.Bitcoin
        ) {
            throw new Error(`[${chain}] chain unsupported`);
        }

        const queryParams = {blockchain: chain};
        const signRes = signature(Instruction.InstructionDepositAddressQuery, this.privateKey, queryParams, {});
        const headers = setHeaders(this.apiKey, signRes);
        const url = `${this.host}/wapi/v1/capital/deposit/address?blockchain=${chain}`;

        try {
            const response = await this.client.get(`${url}`, {headers});
            return response.data as types.DepositAddress;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getWithdrawals(limit: number, offset: number): Promise<types.Withdrawal[] | null> {
        limit = formatLimit(limit);
        offset = formatOffset(offset);

        const queryParams = {limit: `${limit}`, offset: `${offset}`};
        const signRes = signature(Instruction.InstructionWithdrawalQueryAll, this.privateKey, queryParams, {});
        const headers = setHeaders(this.apiKey, signRes);

        try {
            const url = `${this.host}/wapi/v1/capital/withdrawals?limit=${limit}&offset=${offset}`;
            const response = await this.client.get(`${url}`, {headers});
            return response.data as types.Withdrawal[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async withdrawal(params: types.WithdrawParams): Promise<types.Withdrawal | null> {
        if (!params) {
            throw new Error("withdraw params is null");
        }

        const bodyParams = params;
        const signRes = signature(Instruction.InstructionWithdrawal, this.privateKey, {}, bodyParams);
        const headers = setHeaders(this.apiKey, signRes);
        const url = `${this.host}/wapi/v1/capital/withdrawals`;

        try {
            const response = await this.client.post(url, bodyParams, {headers});
            return response.data as types.Withdrawal;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}