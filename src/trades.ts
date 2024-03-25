import {AxiosInstance} from 'axios';

import {ITrades} from "./services";
import {types} from "./types";
import {formatLimit, formatOffset} from "./utils";


export class Trades implements ITrades {
    public host: string;
    private client: AxiosInstance;

    constructor(host: string, client: AxiosInstance) {
        this.host = host;
        this.client = client;
    }

    async getRecentTrades(symbol: string, limit: number = 0): Promise<types.Trade[]> {
        if (!symbol) {
            throw new Error("symbol is undefined");
        }
        symbol = symbol.toUpperCase();

        let url = `${this.host}/api/v1/trades?symbol=${symbol}`;
        limit = formatLimit(limit);
        url += `&limit=${limit}`;

        try {
            const response = await this.client.get(url);
            return response.data as types.Trade[];
        } catch (error) {
            throw error;
        }
    }

    async getHistoricalTrades(symbol: string, limit: number = 0, offset: number = 0): Promise<types.Trade[]> {
        if (!symbol) {
            throw new Error("symbol is undefined");
        }

        let url = `${this.host}/api/v1/trades/history?symbol=${symbol}`;
        limit = formatLimit(limit);
        url += `&limit=${limit}`;
        offset = formatOffset(offset);
        url += `&offset=${offset}`;

        try {
            const response = await this.client.get(url);
            return response.data as types.Trade[];
        } catch (error) {
            throw error;
        }
    }
}