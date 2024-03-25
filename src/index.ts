import * as nacl from 'tweetnacl';
import {Buffer} from 'buffer';
import axios, {AxiosInstance} from 'axios';


import {Market} from "./market";
import {System} from "./system";
import {ICapital, IHistory, IMarket, IOrder, ISystem, ITrades} from "./services";
import {Trades} from "./trades";
import {Capital} from "./capital";
import {History} from "./history";
import {Order} from "./order";
import {DefaultUrl} from "./constants";

class BpxSDK {
    public host: string;
    private apiKey: string;
    private apiSecret: string;
    private privateKey!: nacl.SignKeyPair;
    private readonly client: AxiosInstance;

    market: IMarket;
    system: ISystem;
    trades: ITrades;
    capital: ICapital;
    history: IHistory;
    order: IOrder;

    constructor(host: string = DefaultUrl, apiKey: string, apiSecret: string, isDebug: boolean = false) {
        this.host = host;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.decodeApiSecret();


        this.client = axios.create({
            baseURL: this.host,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        });

        if (isDebug) {
            this.setupDebugging();
        }

        this.market = new Market(this.host, this.client);
        this.system = new System(this.host, this.client);
        this.trades = new Trades(this.host, this.client);
        this.capital = new Capital(this.host, this.apiKey, this.privateKey, this.client);
        this.history = new History(this.host, this.apiKey, this.privateKey, this.client);
        this.order = new Order(this.host, this.apiKey, this.privateKey, this.client);
    }

    getHost(): string {
        return this.host;
    }

    setHost(host: string): void {
        if (host === "") {
            throw new Error("host is null");
        }
        this.host = host;
    }

    getApiKey(): string {
        return this.apiKey;
    }

    setApiKey(apiKey: string): void {
        if (apiKey === "") {
            throw new Error("apiKey is null");
        }
        this.apiKey = apiKey;
    }

    getApiSecret(): string {
        return this.apiSecret;
    }

    setApiSecret(apiSecret: string): void {
        if (apiSecret === "") {
            throw new Error("apiSecret is null");
        }
        this.apiSecret = apiSecret;
    }

    getPrivateKey(): nacl.SignKeyPair {
        return <nacl.SignKeyPair>this.privateKey
    }

    decodeApiSecret(): void {
        const privateKeyBytes = Buffer.from(this.apiSecret, 'base64');
        this.privateKey = nacl.sign.keyPair.fromSeed(privateKeyBytes);
    }

    private setupDebugging(): void {
        this.client.interceptors.request.use(request => {
            console.log('Starting Request', request);
            return request;
        });

        this.client.interceptors.response.use(response => {
            console.log('Response:', response);
            return response;
        });
    }
}

export default BpxSDK;
