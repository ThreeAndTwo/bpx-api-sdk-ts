import {AxiosInstance} from 'axios';

import {ISystem} from "./services";
import {types} from "./types";


export class System implements ISystem {
    public host: string;
    private client: AxiosInstance;

    constructor(host: string, client: AxiosInstance) {
        this.host = host;
        this.client = client;
    }

    async getStatus(): Promise<types.SystemStatus> {
        try {
            const response = await this.client.get(`${this.host}/api/v1/status`);
            return response.data as types.SystemStatus;
        } catch (error) {
            throw error;
        }
    }

    async getTime(): Promise<number> {
        try {
            const response = await this.client.get(`${this.host}/api/v1/time`);
            return response.data as number;
        } catch (error) {
            throw error;
        }
    }

    async ping(): Promise<void> {
        try {
            const response = await this.client.get(`${this.host}/api/v1/ping`);
            console.log('result: %s', response.data);
        } catch (error) {
            throw error;
        }
    }
}