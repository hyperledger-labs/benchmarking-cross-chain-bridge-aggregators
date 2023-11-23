import { create_api_report, create_report_network, get_token_price, scale_two_decimals } from './helper';
import { APIReport, Network, Aggregator, Asset, Fee, Latency } from '@benchmarking-cross-chain-bridges/benchmark-runner/types/APIReport';
import { CHAIN_ID_MAP, TOKEN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { Order } from '@gnosis.pm/gp-v2-contracts';
import { COWOrderRequest, COWQuote, COWReturn } from '@benchmarking-cross-chain-bridges/token-aggregators/cowswap/types';
import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/cowswap/route_builder';

export async function report_generator(quote: COWQuote, fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string, api_latency: Latency[0]) {
    const protocol = 'cowswap';

    const source_chain_name = CHAIN_ID_MAP[fromChain];
    const dest_chain_name = CHAIN_ID_MAP[toChain];

    const obj = await create_report_network(source_chain_name, dest_chain_name, fromToken, toToken);

    const date_time: string = obj.date_time;
    const source_network: Network = obj.source_network;
    const destination_network: Network = obj.destination_network;

    const fromTokenDecimals = 10 ** TOKEN_MAP[fromToken].decimals;
    const trade_amount = parseInt(fromAmount) / fromTokenDecimals;
    const query_latency: Latency = [api_latency];
    const token_usd_price = await get_token_price(fromToken);

    var net_trade_fee: number = parseInt(quote.quote.feeAmount);
    var aggregator_fee: Aggregator["fee"] = [{
        name: quote.quote.kind,
        amount: parseInt(quote.quote.feeAmount),
        percentage: 0.0,
        gas_price: undefined,
        usd_price: token_usd_price
    }];

    const aggregator: Aggregator = {
        name: "COWSwap",
        address: "0x0000000000000000000000000000000000000000",
        fee: aggregator_fee,
        total_fee: scale_two_decimals(net_trade_fee * token_usd_price, fromTokenDecimals)
    };

    const actual_value = parseInt(fromAmount);
    const trade_value: Asset = {
        name: fromToken,
        description: `Trade value of ${trade_amount} ${fromToken} from ${source_chain_name} to ${dest_chain_name} for ${toToken}`,
        actual_value: actual_value,
        actual_value_usd: scale_two_decimals(actual_value * token_usd_price, fromTokenDecimals),
        effective_trade_value_usd: scale_two_decimals(parseInt(quote.quote.sellAmount) * token_usd_price, fromTokenDecimals),
        difference_in_value: scale_two_decimals(actual_value * token_usd_price - parseInt(quote.quote.sellAmount) * token_usd_price, fromTokenDecimals),
        approximated_gas_cost: 0,
        gas_usd_price: source_network.network.gas_price,
        final_value_usd: scale_two_decimals(parseInt(quote.quote.sellAmount) * token_usd_price, fromTokenDecimals),
    };

    const net_fee: Fee = {
        name: "NET-FEE",
        amount_usd: net_trade_fee * token_usd_price
    };

    const api_report: APIReport = create_api_report(protocol, date_time, protocol, source_network, aggregator, destination_network, trade_value, net_fee, query_latency);

    return api_report;
}

export async function make_api_report(fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string, operation: string): Promise<APIReport> {
    const query_start = new Date().getTime();

    const obj: COWReturn = await build_route(fromChain, toChain, fromToken, toToken, fromAmount, operation)

    const quote: COWQuote = obj.resp;
    const order: Order = obj.order;
    const orderReq: COWOrderRequest = obj.orderReq;


    const query_end = new Date().getTime();

    const api_latency: Latency[0] = {
        name: "API Query",
        start_timestamp: query_start,
        end_timestamp: query_end,
        latency: query_end - query_start
    };

    const report: APIReport = await report_generator(quote, fromChain, toChain, fromToken, toToken, fromAmount, api_latency);

    return report;
}