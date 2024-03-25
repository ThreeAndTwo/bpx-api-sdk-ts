import BpxSDK from "./index";
import {OrderSide, OrderType} from "./constants";
import {types} from "./types";


// 将Base64编码的私钥解码
// const privateKeyBytes = Buffer.from("", 'base64');
//
//
// // 从私钥种子生成密钥对
// const keyPair = nacl.sign.keyPair.fromSeed(privateKeyBytes);
//
// // 使用密钥对中的私钥部分（这里实际上是私钥和公钥的组合）
// const privateKey = keyPair.secretKey;
//
// // 准备消息
// const message = "instruction=balanceQuery&timestamp=1709650676316";
//
// // 对消息进行签名
// const signature = nacl.sign.detached(Buffer.from(message), privateKey);
//
// // 对签名进行Base64编码
// const signatureBase64 = Buffer.from(signature).toString('base64');
// console.log(signatureBase64);

async function main() {

    const host = "https://api.backpack.exchange";
    const apiKey = "";
    const apiSecret = "";

    const client = await new BpxSDK(host, apiKey, apiSecret);
    // const pk = client.getPrivateKey();

    const symbol = "sol_usdc";
    // const executeOrderParams: types.ExecuteOrderParams = {
    //     orderType: OrderType.OrderLimit,
    //     side: OrderSide.SideBid,
    //     symbol: symbol,
    //     quantity: "0.2",
    //     price: "1"
    // }
    //
    // const executeOrderResult = await client.order.executeOrder(executeOrderParams);
    // console.log("executeOrderResult:", executeOrderResult);


    // const orderParam: types.OrderParams = {
    //     orderId: '112155428505387008',
    //     symbol: symbol
    // }
    //
    // const orderResult = await client.order.cancelOrder(orderParam);
    // console.log("orderResult: %s", orderResult)

    //
    const cancelOrdersResult = await client.order.cancelOrders(symbol);
    console.log("cancelOrdersResult: %s", cancelOrdersResult);


    // 112155428505387008

    // client.order.cancelOrder();
    // client.order.cancelOrders();


    // const orderResult = await client.order.getOrder(orderParam);
    // console.log("orderResult:", orderResult);

    // const ordersResult = await client.order.getOrders();
    // console.log("ordersResult:", ordersResult);


    // let withdrawalsParams: types.WithdrawParams = {
    //     address: '0x123...',
    //     blockchain: Chain.Solana, // Assuming types.Chain is an enum with blockchain types
    //     quantity: '1', // Assuming quantity is a string per your provided code
    //     symbol: 'SOL_USDC', // Assuming symbol is correctly a string
    // };

    // const symbol = "sol_usdc";
    // const orderHistory: types.OrderHistoryParams = {
    //     // symbol
    //     offset: 0,
    //     limit: 100,
    // }
    //
    // const orderHistoryResult = await client.history.getOrderHistory(orderHistory);
    // console.log("orderHistoryResult:", orderHistoryResult)
    //
    //
    // const fills: types.FillHistoryParams = {
    //     limit: 0,
    //     offset: 100,
    // }
    //
    // const fillsResult = await client.history.getFills(fills);
    // console.log("fillsResult:", fillsResult)


    // const balances = await client.capital.getBalances();
    // console.log("balances: ", balances);
    //
    // const deposits = await client.capital.getDeposits();
    // console.log("deposits: ", deposits);
    //
    // const depositAddress = await client.capital.getDepositAddress(Chain.Solana);
    // console.log("depositAddress: ", depositAddress);
    //
    // const withdrawals = await client.capital.getWithdrawals(25, 0);
    // console.log("withdrawals: ", withdrawals);

    // let withdrawalsParams: types.WithdrawParams = {
    //     address: '0x123...',
    //     blockchain: Chain.Solana, // Assuming types.Chain is an enum with blockchain types
    //     quantity: '1', // Assuming quantity is a string per your provided code
    //     symbol: 'SOL_USDC', // Assuming symbol is correctly a string
    // };
    //
    // const withdrawResult = await client.capital.withdrawal(withdrawalsParams);
    // console.log("withdrawResult:", withdrawResult);

    // const withdrawResult = client.capital.withdrawal(withdrawalsParams);
    // console.log("withdrawResult:", withdrawResult);

    // getDeposits(): Promise<types.Deposit[] | null>;
    //
    // getDepositAddress(chain: Chain): Promise<types.DepositAddress | null>;
    //
    // getWithdrawals(limit: number, offset: number): Promise<types.Withdrawal[] | null>;
    //
    // withdrawal(params: types.WithdrawParams): Promise<types.Withdrawal | null>;

    // const assets = await client.market.getAssets();
    // const assetString = JSON.stringify(assets);
    // console.log("assetString:", assetString);
    //
    // const markets = await client.market.getMarkets();
    // const jsonString = JSON.stringify(markets);
    // console.log("markets:", jsonString);
    //
    // let symbol = "sol_usdc";
    // const depthData = await client.market.getDepth(symbol);
    // const depthString = JSON.stringify(depthData);
    // console.log("depthString:", depthString);
    //
    // const ticker = await client.market.getTicker(symbol);
    // const tickerString = JSON.stringify(ticker);
    // console.log("tickerString:", tickerString);
    //
    // const tickers = await client.market.getTickers();
    // const tickersString = JSON.stringify(tickers);
    // console.log("tickersString:", tickersString);
    //
    // // getKline
    // const kLine = await client.market.getKline(symbol, "1m");
    // const getKlineString = JSON.stringify(kLine);
    // console.log("getKlineString:", getKlineString);
    //
    // const status = await client.system.getStatus();
    // const statusString = JSON.stringify(status);
    // console.log("statusString:", statusString);
    //
    // await client.system.ping();
    //
    // const time = await client.system.getTime();
    // console.log("time:", time);
    //
    // const trades = await client.trades.getRecentTrades(symbol);
    // const tradesString = JSON.stringify(trades);
    // console.log("tradesString:", tradesString);
    //
    // await client.trades.getHistoricalTrades(symbol);


    //


    // // const pk = client.getPrivateKey();
    // const instruction = Instruction.InstructionBalanceQuery;
    // const queryParams = {};
    // const bodyParams = {};
    //
    // // const timestamp = 1709650676316;
    // const res = signature(instruction, pk, queryParams, bodyParams);
    // // const res = client.Signature(instruction, queryParams, bodyParams);
    // console.log(res.base64);
}

main()

