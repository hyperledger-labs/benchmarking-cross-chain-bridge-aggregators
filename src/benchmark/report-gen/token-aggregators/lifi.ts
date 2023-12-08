import { create_api_report, create_report_network, get_token_price, scale_two_decimals } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/helper';
import { APIReport, Network, Aggregator, Asset, Fee, Latency } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { CHAIN_ID_MAP, TOKEN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { LiFiTransaction } from '@benchmarking-cross-chain-bridges/token-aggregators/lifi/types';
import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/lifi/route_builder';
import { approveAllow } from '@benchmarking-cross-chain-bridges/helper/token_misc';

export async function report_generator(quote: LiFiTransaction, fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string, api_latency: Latency[0]) {
    const protocol = 'lifi';

    const source_chain_name = CHAIN_ID_MAP[fromChain];
    const dest_chain_name = CHAIN_ID_MAP[toChain];

    const obj = await create_report_network(source_chain_name, dest_chain_name, fromToken, toToken);

    const date_time: string = obj.date_time;
    const source_network: Network = obj.source_network;
    const destination_network: Network = obj.destination_network;

    const trade_amount = parseInt(fromAmount) / 10 ** TOKEN_MAP[fromToken].decimals;
    const query_latency: Latency = [api_latency];

    var net_trade_fee: number = 0;
    var aggregator_fee = [];

    for (var i = 0; i < quote.estimate.feeCosts.length; i++) {
        const fee = quote.estimate.feeCosts[i];

        const fee_obj: Aggregator["fee"] = [{
            name: fee.name,
            amount: parseInt(fee.amount),
            percentage: parseFloat(fee.percentage),
            gas_price: undefined,
            usd_price: parseFloat(fee.amountUSD)
        }];

        net_trade_fee += parseFloat(fee.amountUSD);

        aggregator_fee.push(fee_obj[0]);
    }

    const aggregator: Aggregator = {
        name: quote.toolDetails.name,
        address: quote.estimate.approvalAddress,
        fee: aggregator_fee,
        total_fee: net_trade_fee
    };

    const actual_value = parseInt(fromAmount);
    const actual_value_usd = scale_two_decimals(parseFloat(quote.estimate.fromAmountUSD));
    const effective_trade_value_usd = scale_two_decimals(parseFloat(quote.estimate.toAmountUSD));
    const difference_in_value = actual_value_usd - effective_trade_value_usd;
    const approximated_gas_cost = parseInt(quote.estimate.gasCosts[0].amount);
    const approximated_gas_cost_usd = parseFloat(quote.estimate.gasCosts[0].amountUSD);
    const final_value_usd = effective_trade_value_usd - approximated_gas_cost_usd;

    const trade_value: Asset = {
        name: fromToken,
        description: `Trade value of ${trade_amount} ${fromToken} from ${source_chain_name} to ${dest_chain_name} for ${toToken}`,
        actual_value: actual_value,
        actual_value_usd: actual_value_usd,
        effective_trade_value_usd: effective_trade_value_usd,
        difference_in_value: difference_in_value,
        approximated_gas_cost: approximated_gas_cost,
        approximated_gas_cost_usd: approximated_gas_cost_usd,
        final_value_usd: final_value_usd
    };

    net_trade_fee += approximated_gas_cost_usd;

    const net_fee: Fee = {
        name: "NET-FEE",
        amount_usd: net_trade_fee
    };

    const api_report: APIReport = await create_api_report(protocol, date_time, source_network, aggregator, destination_network, trade_value, net_fee, query_latency, quote);

    return api_report;
}

export async function make_api_report(fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string): Promise<APIReport> {
    const query_start = new Date().getTime();

    const quote: LiFiTransaction = await build_route(fromChain, toChain, fromToken, toToken, fromAmount)

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