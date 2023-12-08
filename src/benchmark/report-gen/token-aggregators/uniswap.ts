import { create_api_report, create_report_network, get_token_price, scale_two_decimals } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/helper';
import { APIReport, Network, Aggregator, Asset, Fee, Latency } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { CHAIN_ID_MAP, TOKEN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/uniswap/route_builder';
import { SwapRoute } from '@uniswap/smart-order-router';

export async function report_generator(quote: SwapRoute, fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string, api_latency: Latency[0]) {
    const protocol = 'uniswap-universal';

    const source_chain_name = CHAIN_ID_MAP[fromChain];
    const dest_chain_name = CHAIN_ID_MAP[toChain];

    const obj = await create_report_network(protocol, source_chain_name, dest_chain_name, fromToken, toToken);

    const date_time: string = obj.date_time;
    const source_network: Network = obj.source_network;
    const destination_network: Network = obj.destination_network;

    const trade_amount = parseInt(fromAmount) / 10 ** TOKEN_MAP[fromToken].decimals;
    const query_latency: Latency = [api_latency];

    // @ts-ignore
    const fee_percentage_parts_per_million: number = quote.route[0].route.pools[0].fee;
    const fee_percentage = fee_percentage_parts_per_million / 1_000_000;

    var net_trade_fee: number = 0;
    var aggregator_fee = [];
    var fee_amount = scale_two_decimals(parseInt(fromAmount) * fee_percentage);

    const fee_obj: Aggregator["fee"] = [{
        name: quote.route[0].protocol + "-FEE",
        amount: fee_amount,
        percentage: fee_percentage * 100,
        gas_price_gwei: source_network.network.gas_price_gwei,
        usd_price: scale_two_decimals(parseFloat(quote.quote.toExact()) * fee_percentage)
    }];

    net_trade_fee += scale_two_decimals(parseFloat(quote.quote.toExact()) * fee_percentage)
    aggregator_fee.push(fee_obj[0]);

    const aggregator: Aggregator = {
        name: "Uniswapuniversal",
        address: quote.route[0].poolAddresses[0],
        fee: aggregator_fee,
        total_fee: net_trade_fee
    };

    const actual_value = scale_two_decimals(parseInt(fromAmount));
    const actual_value_usd = scale_two_decimals(parseFloat(quote.quote.toExact()));
    const effective_trade_value_usd = actual_value_usd - net_trade_fee;
    const difference_in_value = actual_value_usd - effective_trade_value_usd;
    const approximated_gas_cost_gwei = quote.estimatedGasUsed.toNumber();
    const approximated_gas_cost_usd = 0;
    const gas_usd_price = source_network.network.gas_price_gwei;
    const effective_trade_value_usd_with_gas = scale_two_decimals(parseFloat(quote.quoteGasAdjusted.toExact()));

    const trade_value: Asset = {
        name: fromToken,
        description: `Trade value of ${trade_amount} ${fromToken} from ${source_chain_name} to ${dest_chain_name} for ${toToken}`,
        actual_value: actual_value,
        actual_value_usd: actual_value_usd,
        effective_trade_value_usd: effective_trade_value_usd,
        difference_in_value: difference_in_value,
        approximated_gas_cost_gwei: approximated_gas_cost_gwei,
        approximated_gas_cost_usd: approximated_gas_cost_usd,
        effective_trade_value_usd_with_gas: effective_trade_value_usd_with_gas,
    };

    const net_fee: Fee = {
        name: "TOTAL FEE WITH GAS",
        amount_usd: net_trade_fee
    };

    const api_report: APIReport = await create_api_report(protocol, date_time, source_network, aggregator, destination_network, trade_value, net_fee, query_latency, quote);

    return api_report;
}

export async function make_api_report(fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string): Promise<APIReport> {
    const query_start = new Date().getTime();

    const quote: SwapRoute = await build_route(fromChain, toChain, fromToken, toToken, fromAmount, 'universal')

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