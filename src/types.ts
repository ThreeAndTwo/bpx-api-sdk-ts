import {Chain, OrderType, SelfTradePrevention, OrderSide, TimeInForce} from "./constants";

export namespace types {
    export interface Asset {
        symbol: string;
        tokens: Token[];
    }

    export interface Token {
        blockchain: string;
        depositEnabled: boolean;
        minimumDeposit: string;
        withdrawEnabled: boolean;
        minimumWithdrawal: string;
        maximumWithdrawal: string;
        withdrawalFee: string;
    }

    export interface Price {
        minPrice: string;
        maxPrice: string;
        tickSize: string;
    }

    export interface Quantity {
        minQuantity: string;
        maxQuantity: string;
        stepSize: string;
    }

    export interface Leverage {
        minLeverage: string;
        maxLeverage: string;
        stepSize: string;
    }

    export interface Filter {
        price: Price;
        quantity: Quantity;
        leverage: Leverage;
    }

    export interface Market {
        symbol: string;
        baseSymbol: string;
        quoteSymbol: string;
        filters: Filter[];
    }

    export interface Ticker {
        symbol: string;
        firstPrice: string;
        lastPrice: string;
        priceChange: string;
        priceChangePercent: string;
        high: string;
        low: string;
        volume: string;
        quoteVolume: string;
        trades: number;
    }

    export interface DepthData {
        asks: string[][];
        bids: string[][];
        lastUpdateId: string;
    }

    export interface KLine {
        start: string;
        open: string;
        high: string;
        low: string;
        close: string;
        end: string;
        volume: string;
        trades: string;
    }

    export interface SystemStatus {
        status: string;
        message: string;
    }

    // RecentTrade | TradeHistory
    export interface Trade {
        id: number;
        price: string;
        quantity: string;
        quoteQuantity: string;
        timestamp: number;
        isBuyerMaker: boolean;
    }

    export interface Signature {
        base64: string;
        bytes: Uint8Array;
        ts: string;
    }

    export interface TokenCapital {
        available: string;
        locked: string;
        staked: string;
    }

    export interface Deposit {
        id: number;
        toAddress: string;
        fromAddress: string;
        confirmationBlockNumber: string;
        providerId: string;
        source: string;
        status: string;
        transactionHash: string;
        subaccountId: number;
        symbol: string;
        quantity: string;
        createdAt: string;
    }

    export interface DepositAddress {
        address: string;
    }

    export interface Withdrawal {
        id: number;
        blockchain: string;
        clientId: string;
        identifier: string;
        quantity: string;
        fee: string;
        symbol: string;
        status: string;
        subaccountId: number;
        toAddress: string;
        transactionHash: string;
        createdAt: string;
    }

    export interface WithdrawParams {
        address: string;
        blockchain: Chain;
        clientId?: string;
        quantity: string;
        symbol: string;
        twoFactorToken?: string;
    }

    export interface OrderHistoryParams {
        orderId?: string;
        symbol?: string;
        offset: number;
        limit: number;
    }


    export interface OrderHistoryResult {
        id: string;
        orderType: string;
        symbol: string;
        side: string;
        price: string;
        triggerPrice: string;
        quantity: string;
        quoteQuantity: string;
        timeInForce: string;
        selfTradePrevention: string;
        postOnly: boolean;
        status: string;
    }

    export interface FillHistoryParams {
        orderId?: string;
        symbol?: string;
        from?: number;
        to?: number;
        limit: number;
        offset: number;
    }

    export interface FillHistoryResult {
        tradeId: number;
        orderId: string;
        symbol: string;
        side: string;
        price: string;
        quantity: string;
        fee: string;
        feeSymbol: string;
        isMaker: boolean;
        timestamp: string;
    }

    export interface OrderParams {
        clientId?: number;
        orderId?: string;
        symbol: string;
    }

    export interface OrderResult {
        orderType: string;
        id: string;
        clientId: number;
        symbol: string;
        side: string;
        quantity: string;
        executedQuantity: string;
        quoteQuantity: string;
        executedQuoteQuantity: string;
        triggerPrice: string;
        timeInForce: string;
        selfTradePrevention: string;
        status: string;
        createdAt: number;
    }

    export interface ExecuteOrderParams {
        clientId?: number;
        orderType: OrderType;
        postOnly?: boolean;
        price?: string;
        quantity?: string;
        quoteQuantity?: string;
        selfTradePrevention?: SelfTradePrevention;
        side: OrderSide;
        symbol: string;
        timeInForce?: TimeInForce;
        triggerPrice?: string;
    }

    export interface ExecuteOrderResult {
        orderType: OrderType;
        id: string;
        clientId: number;
        symbol: string;
        side: OrderSide;
        quantity: string;
        executedQuantity: string;
        quoteQuantity: string;
        executedQuoteQuantity: string;
        triggerPrice: string;
        timeInForce: TimeInForce;
        selfTradePrevention: SelfTradePrevention;
        status: string;
        createdAt: number;
    }
}