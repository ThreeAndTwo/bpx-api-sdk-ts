import {AxiosInstance} from 'axios';

import {IMarket} from "./services";
import {types} from "./types";
import {Interval} from "./constants";


export class Market implements IMarket {
    public host: string;
    private client: AxiosInstance;

    constructor(host: string, client: AxiosInstance) {
        this.host = host;
        this.client = client;
    }

    async getAssets(): Promise<types.Asset[]> {
        try {
            const response = await this.client.get(`${this.host}/api/v1/assets`);
            return response.data as types.Asset[];
        } catch (error) {
            throw error;
        }
    }

    async getMarkets(): Promise<types.Market[]> {
        try {
            const response = await this.client.get(`${this.host}/api/v1/markets`);
            return response.data as types.Market[];
        } catch (error) {
            throw error;
        }
    }

    async getTicker(symbol: string): Promise<types.Ticker> {
        if (!symbol) {
            throw new Error("symbol is undefined");
        }
        symbol = symbol.toUpperCase();

        try {
            const response = await this.client.get(`${this.host}/api/v1/ticker?symbol=${symbol}`);
            return response.data as types.Ticker;
        } catch (error) {
            throw error;
        }
    }

    async getTickers(): Promise<types.Ticker[]> {
        try {
            const response = await this.client.get(`${this.host}/api/v1/tickers`);
            return response.data as types.Ticker[];
        } catch (error) {
            console.error('Failed to fetch assets', error);
            throw error;
        }
    }

    async getDepth(symbol: string): Promise<types.DepthData> {
        if (!symbol) {
            throw new Error("symbol is undefined");
        }
        symbol = symbol.toUpperCase();

        try {
            const response = await this.client.get(`${this.host}/api/v1/depth?symbol=${symbol}`);
            return response.data as types.DepthData;
        } catch (error) {
            console.error('Failed to fetch assets', error);
            throw error;
        }
    }


    async getKline(symbol: string, interval: Interval, startTime: number = 0, endTime: number = 0): Promise<types.KLine[]> {
        if (!symbol) {
            throw new Error("symbol is undefined");
        }

        try {
            let url = `${this.host}/api/v1/klines?symbol=${symbol.toUpperCase()}&interval=${interval}`;
            if (startTime !== 0) {
                url += `&startTime=${startTime}`;
            }

            if (endTime !== 0) {
                url += `&endTime=${endTime}`;
            }
            const response = await this.client.get(url);
            return response.data as types.KLine[];
        } catch (error) {
            throw error;
        }
    }
}