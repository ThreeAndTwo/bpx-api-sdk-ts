import {types} from "./types";
import {Chain, Interval} from "./constants";

export interface IMarket {
    getAssets(): Promise<types.Asset[]>;

    getMarkets(): Promise<types.Market[]>;

    getTicker(symbol: string): Promise<types.Ticker>;

    getTickers(): Promise<types.Ticker[]>;

    getDepth(symbol: string): Promise<types.DepthData>;

    getKline(symbol: string, interval: Interval, startTime?: number, endTime?: number): Promise<types.KLine[]>;
}

export interface ISystem {
    getStatus(): Promise<types.SystemStatus>;

    ping(): Promise<void>;

    getTime(): Promise<number>;
}

export interface ITrades {
    getRecentTrades(symbol: string, limit?: number): Promise<types.Trade[]>;

    getHistoricalTrades(symbol: string, limit?: number, offset?: number): Promise<types.Trade[]>;
}

export interface ICapital {
    getBalances(): Promise<{ [key: string]: types.TokenCapital } | null>;

    getDeposits(): Promise<types.Deposit[] | null>;

    getDepositAddress(chain: Chain): Promise<types.DepositAddress | null>;

    getWithdrawals(limit: number, offset: number): Promise<types.Withdrawal[] | null>;

    withdrawal(params: types.WithdrawParams): Promise<types.Withdrawal | null>;
}

export interface IHistory {
    getOrderHistory(params: types.OrderHistoryParams): Promise<types.OrderHistoryResult[] | null>;

    getFills(params: types.FillHistoryParams): Promise<types.FillHistoryResult[] | null>;
}

export interface IOrder {
    getOrder(params: types.OrderParams): Promise<types.OrderResult | null>;

    executeOrder(params: types.ExecuteOrderParams): Promise<types.ExecuteOrderResult | null>;

    cancelOrder(params: types.OrderParams): Promise<types.OrderResult | null>;

    getOrders(symbol?: string): Promise<types.OrderResult[] | null>;

    cancelOrders(symbol: string): Promise<types.OrderResult | null>;
}