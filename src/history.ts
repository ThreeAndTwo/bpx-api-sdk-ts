import {IHistory} from "./services";
import {types} from "./types";
import * as nacl from "tweetnacl";
import {AxiosInstance} from "axios";
import {setHeaders, signature, formatLimit, formatOffset} from "./utils";
import {Instruction} from "./constants";

export class History implements IHistory {
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

    async getOrderHistory(params: types.OrderHistoryParams): Promise<types.OrderHistoryResult[] | null> {
        if (!params) {
            throw new Error("order history params is null");
        }

        params.limit = formatLimit(params.limit);
        params.offset = formatOffset(params.offset);

        let url = `${this.host}/wapi/v1/history/orders?limit=${params.limit}&offset=${params.offset}`;
        const queryMap: { [key: string]: any } = {
            limit: params.limit,
            offset: params.offset,
        };

        if (params.symbol) {
            const symbol = params.symbol.toUpperCase();
            url += `&symbol=${symbol}`;
            queryMap["symbol"] = symbol;
        }

        if (params.orderId) {
            url += `&orderId=${params.orderId}`;
            queryMap["orderId"] = params.orderId;
        }

        const signRes = signature(Instruction.InstructionOrderHistoryQueryAll, this.privateKey, queryMap, {});
        const headers = setHeaders(this.apiKey, signRes);

        try {
            const response = await this.client.get(url, {headers});
            return response.data as types.OrderHistoryResult[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getFills(params?: types.FillHistoryParams): Promise<types.FillHistoryResult[] | null> {
        if (!params) {
            throw new Error("Fill history params is null");
        }

        params.limit = formatLimit(params.limit);
        params.offset = formatOffset(params.offset);

        let url = `${this.host}/wapi/v1/history/fills?limit=${params.limit}&offset=${params.offset}`;
        const queryMap: { [key: string]: any } = {
            limit: params.limit,
            offset: params.offset,
        };

        if (params.symbol) {
            const symbol = params.symbol.toUpperCase();
            url += `&symbol=${symbol}`;
            queryMap["symbol"] = symbol;
        }

        if (params.orderId) {
            url += `&orderId=${params.orderId}`;
            queryMap["orderId"] = params.orderId;
        }


        if (params.from) {
            url += `&from=${params.from}`;
            queryMap["from"] = params.from;
        }


        if (params.to) {
            url += `&to=${params.to}`;
            queryMap["to"] = params.to;
        }


        const signRes = signature(Instruction.InstructionFillHistoryQueryAll, this.privateKey, queryMap, {});
        const headers = setHeaders(this.apiKey, signRes);

        try {
            const response = await this.client.get(url, {headers});
            return response.data as types.FillHistoryResult[];
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}