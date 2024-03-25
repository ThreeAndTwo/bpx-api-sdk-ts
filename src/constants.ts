export const DefaultUrl = "https://api.backpack.exchange";

export const DefaultOffset = 0;
export const DefaultLimit = 100;
export const MaxLimit = 1000;
export const DefaultWindow = 5000;

export type Interval =
    '1m'
    | '3m'
    | '5m'
    | '15m'
    | '30m'
    | '1h'
    | '2h'
    | '4h'
    | '6h'
    | '8h'
    | '12h'
    | '1d'
    | '3d'
    | '1w'
    | '1month';

export enum Chain {
    Solana = "Solana",
    Ethereum = "Ethereum",
    Polygon = "Polygon",
    Bitcoin = "Bitcoin",
}

export enum Instruction {
    InstructionBalanceQuery = "balanceQuery",
    InstructionDepositQueryAll = "depositQueryAll",
    InstructionDepositAddressQuery = "depositAddressQuery",
    InstructionWithdrawalQueryAll = "withdrawalQueryAll",
    InstructionWithdrawal = "withdraw",
    InstructionOrderHistoryQueryAll = "orderHistoryQueryAll",
    InstructionFillHistoryQueryAll = "fillHistoryQueryAll",
    InstructionOrderQuery = "orderQuery",
    InstructionOrderExecute = "orderExecute",
    InstructionOrderCancel = "orderCancel",
    InstructionOrderQueryAll = "orderQueryAll",
    InstructionOrderCancelAll = "orderCancelAll"
}

export enum OrderType {
    OrderMarket = "Market",
    OrderLimit = "Limit"
}


export enum SelfTradePrevention {
    SelfTradePreventionRejectTaker = "RejectTaker",
    SelfTradePreventionRejectMaker = "RejectMaker",
    SelfTradePreventionRejectBoth = "RejectBoth",
    SelfTradePreventionAllow = "Allow"
}


export enum OrderSide {
    SideBid = "Bid",
    SideAsk = "Ask"
}


export enum TimeInForce {
    TimeInForceGTC = "GTC",
    TimeInForceIOC = "IOC",
    TimeInForceFOK = "FOK"
}
