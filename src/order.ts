import {AxiosInstance} from 'axios';
import {setHeaders, signature} from "./utils";
import {Instruction, OrderSide, OrderType, SelfTradePrevention, TimeInForce} from "./constants";
import {IOrder} from "./services";
import {types} from "./types";
import * as nacl from "tweetnacl";

export class Order implements IOrder {
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

    async cancelOrder(params: types.OrderParams): Promise<types.OrderResult | null> {
        if (!params.symbol) {
            throw new Error("Symbol is null");
        }
        params.symbol = params.symbol.toUpperCase();

        const bodyMap: { [key: string]: any } = {symbol: params.symbol};

        if (params.clientId && params.clientId > 0) {
            bodyMap["clientId"] = params.clientId;
        }

        if (params.orderId) {
            bodyMap["orderId"] = params.orderId;
        }

        const signRes = signature(Instruction.InstructionOrderCancel, this.privateKey, {}, bodyMap);
        const headers = setHeaders(this.apiKey, signRes);

        try {
            const response = await this.client.delete(`${this.host}/api/v1/order`, {
                headers: headers,
                data: bodyMap,
            });
            return response.data as types.OrderResult;
        } catch (error) {
            return null;
        }
    }

    async cancelOrders(symbol: string): Promise<types.OrderResult | null> {
        if (!symbol) {
            throw new Error("symbol is null");
        }
        symbol = symbol.toUpperCase();

        const bodyMap = {symbol: symbol};
        const signRes = signature(Instruction.InstructionOrderCancelAll, this.privateKey, {}, bodyMap);
        const headers = setHeaders(this.apiKey, signRes);

        try {
            const response = await this.client.delete(`${this.host}/api/v1/orders`, {
                headers: headers,
                data: bodyMap,
            });
            return response.data as types.OrderResult;
        } catch (error) {
            return null;
        }
    }

    async executeOrder(params: types.ExecuteOrderParams): Promise<types.ExecuteOrderResult | null> {
        if (params.orderType !== OrderType.OrderMarket && params.orderType !== OrderType.OrderLimit) {
            throw new Error(`orderType ${params.orderType} MUST BE ${OrderType.OrderMarket} or ${OrderType.OrderLimit}`);
        }

        if (params.side !== OrderSide.SideBid && params.side !== OrderSide.SideAsk) {
            throw new Error(`order side ${params.side} MUST BE ${OrderSide.SideBid} or ${OrderSide.SideAsk}`);
        }

        if (!params.symbol) {
            throw new Error("Symbol is null");
        }
        params.symbol = params.symbol.toUpperCase();

        const bodyMap: { [key: string]: any } = {
            orderType: params.orderType,
            side: params.side,
            symbol: params.symbol,
            postOnly: true,

            ...params.clientId && {clientId: params.clientId},
            ...params.price && {price: params.price},
            ...params.quantity && {quantity: params.quantity},
            ...params.quoteQuantity && {quoteQuantity: params.quoteQuantity},
            ...params.selfTradePrevention && {selfTradePrevention: params.selfTradePrevention},
            ...params.timeInForce && {timeInForce: params.timeInForce},
            ...params.triggerPrice && {triggerPrice: params.triggerPrice},

        };

        const signRes = signature(Instruction.InstructionOrderExecute, this.privateKey, {}, bodyMap);
        const headers = setHeaders(this.apiKey, signRes);

        try {
            const response = await this.client.post(`${this.host}/api/v1/order`, bodyMap, {headers});
            return response.data as types.ExecuteOrderResult;
        } catch (error) {
            return null;
        }
    }

    async getOrder(params: types.OrderParams): Promise<types.OrderResult | null> {
        if (params.symbol === "") {
            throw new Error("ErrSymbolIsNull"); // Use an actual error constant or message
        }

        if (!params.orderId && (!params.clientId || params.clientId <= 0)) {
            throw new Error("Must specify either `clientId` or `orderId`");
        }

        params.symbol = params.symbol.toUpperCase();
        const queryMap: { [key: string]: any } = {symbol: params.symbol};
        let url = `${this.host}/api/v1/order?symbol=${params.symbol}`;

        if (params.clientId && params.clientId > 0) {
            url += `&clientId=${params.clientId}`;
            queryMap["clientId"] = params.clientId;
        }

        if (params.orderId) {
            url += `&orderId=${params.orderId}`;
            queryMap["orderId"] = params.orderId;
        }

        const signRes = signature(Instruction.InstructionOrderQuery, this.privateKey, queryMap, {});
        const headers = setHeaders(this.apiKey, signRes);

        try {
            const response = await this.client.get(url, {headers});
            return response.data as types.OrderResult;
        } catch (error) {
            return null;
        }
    }

    async getOrders(symbol?: string): Promise<types.OrderResult[] | null> {

        const queryMap: { [key: string]: any } = {};
        let url = `${this.host}/api/v1/orders`;

        if (symbol != undefined) {
            symbol = symbol.toUpperCase();
            url += `?symbol=${symbol}`;
            queryMap["symbol"] = symbol;
        }

        const signRes = signature(Instruction.InstructionOrderQueryAll, this.privateKey, queryMap, {});
        const headers = setHeaders(this.apiKey, signRes);

        try {
            const response = await this.client.get(url, {headers});
            return response.data as types.OrderResult[];
        } catch (error) {
            return null;
        }
    }
}