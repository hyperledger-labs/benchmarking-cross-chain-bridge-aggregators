import { create_api_report, create_report_network, get_token_price, scale_two_decimals } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/helper';
import { APIReport, Network, Aggregator, Asset, Fee, Latency } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { CHAIN_ID_MAP, TOKEN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/socket/route_builder';
import { SocketQuote } from '@socket.tech/socket-v2-sdk';
import { SocketQuoteSingleChain } from '@benchmarking-cross-chain-bridges/token-aggregators/socket/types';

export async function report_generator(quote: SocketQuote | SocketQuoteSingleChain, fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string, api_latency: Latency[0]) {
    const protocol = 'socket';

    const source_chain_name = CHAIN_ID_MAP[fromChain];
    const dest_chain_name = CHAIN_ID_MAP[toChain];

    const obj = await create_report_network(protocol, source_chain_name, dest_chain_name, fromToken, toToken);

    const date_time: string = obj.date_time;
    const source_network: Network = obj.source_network;
    const destination_network: Network = obj.destination_network;

    const query_latency: Latency = [api_latency];
    const trade_amount = parseInt(fromAmount) / 10 ** TOKEN_MAP[fromToken].decimals;
    const gas_price_gwei = source_network.network.gas_price_gwei;

    const sameChain = fromChain === toChain;

    let socket_obj: {
        aggregator_fee: Aggregator["fee"],
        net_trade_fee: number,
        aggregator_name: string
    };

    if (sameChain) {
        socket_obj = await same_chain_handler(quote as SocketQuoteSingleChain, gas_price_gwei);
    } else {
        socket_obj = await cross_chain_handler(quote as SocketQuote, gas_price_gwei);
    }

    const aggregator_fee: Aggregator["fee"] = socket_obj.aggregator_fee;
    const aggregator_name: string = socket_obj.aggregator_name;
    let net_trade_fee: number = socket_obj.net_trade_fee;

    const aggregator: Aggregator = {
        name: aggregator_name,
        address: quote.route.sender,
        fee: aggregator_fee,
        total_fee: net_trade_fee
    };

    const actual_value = parseInt(quote.route.fromAmount);
    const actual_value_usd = scale_two_decimals(quote.route.inputValueInUsd);
    const effective_trade_value_usd = scale_two_decimals(quote.route.outputValueInUsd);
    const difference_in_value = actual_value_usd - effective_trade_value_usd;
    const approximated_gas_cost_gwei = 0;
    const approximated_gas_cost_usd = scale_two_decimals(quote.route.totalGasFeesInUsd);
    const effective_trade_value_usd_with_gas = effective_trade_value_usd - approximated_gas_cost_usd;

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

    net_trade_fee += approximated_gas_cost_usd;

    const net_fee: Fee = {
        name: "TOTAL FEE WITH GAS",
        amount_usd: net_trade_fee
    };

    const api_report: APIReport = await create_api_report(protocol, date_time, source_network, aggregator, destination_network, trade_value, net_fee, query_latency, quote);

    return api_report;
}

async function cross_chain_handler(quote: SocketQuote, gas_price_gwei: number) {
    var net_trade_fee: number = 0;
    var aggregator_fee = [];

    for (let i = 0; i < quote.route.userTxs.length - 1; i++) {
        for (let j = 0; j < quote.route.userTxs[i].steps.length; j++) {
            let fee: {
                amount: string,
                feesInUsd: number

            };
            if (quote.route.userTxs[i].steps[j].protocolFees === undefined) {
                fee = {
                    amount: "0",
                    feesInUsd: 0
                };
            } else {
                fee = {
                    amount: quote.route.userTxs[i].steps[j].protocolFees.amount,
                    feesInUsd: quote.route.userTxs[i].steps[j].protocolFees.feesInUsd
                };
            }

            const fee_obj: Aggregator["fee"] = [{
                name: quote.route.userTxs[i].steps[j].type.toUpperCase() + "-FEE",
                amount: parseInt(fee.amount),
                percentage: undefined,
                gas_price_gwei: gas_price_gwei,
                usd_price: fee.feesInUsd,
            }];

            net_trade_fee += fee.feesInUsd;

            aggregator_fee.push(fee_obj[0]);
        }
    }

    const fee_obj: Aggregator["fee"] = [{
        name: "INTEGRATOR-FEE",
        amount: parseInt(quote.route.integratorFee.amount),
        percentage: undefined,
        gas_price_gwei: gas_price_gwei,
        usd_price: parseInt(quote.route.integratorFee.amount),
    }];

    aggregator_fee.push(fee_obj[0]);

    net_trade_fee += parseInt(quote.route.integratorFee.amount);

    const aggregator_name = quote.route.usedBridgeNames[0];

    return {
        aggregator_fee,
        net_trade_fee,
        aggregator_name
    };
}

async function same_chain_handler(quote: SocketQuoteSingleChain, gas_price_gwei: number) {
    var net_trade_fee: number = 0;
    var aggregator_fee = [];

    const fee_obj: Aggregator["fee"] = [{
        name: "INTEGRATOR-FEE",
        amount: parseInt(quote.route.integratorFee.amount),
        percentage: undefined,
        gas_price_gwei: gas_price_gwei,
        usd_price: parseInt(quote.route.integratorFee.amount),
    }];

    net_trade_fee += parseInt(quote.route.integratorFee.amount);

    aggregator_fee.push(fee_obj[0]);

    const aggregator_name = quote.route.usedDexName

    return {
        aggregator_fee,
        net_trade_fee,
        aggregator_name
    };
}

export async function make_api_report(fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string, multiTx: boolean): Promise<APIReport> {
    const query_start = new Date().getTime();

    const quote: SocketQuote = await build_route(fromChain, toChain, fromToken, toToken, fromAmount, multiTx)

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