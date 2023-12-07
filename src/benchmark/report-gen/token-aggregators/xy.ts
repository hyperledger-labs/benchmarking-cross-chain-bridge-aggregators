import { create_api_report, create_report_network, get_token_price, scale_two_decimals } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/helper';
import { APIReport, Network, Aggregator, Asset, Fee, Latency } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { CHAIN_ID_MAP, TOKEN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { XYQuote, XYRoute } from '@benchmarking-cross-chain-bridges/token-aggregators/xy/types';
import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/xy/route_builder';

export async function report_generator(quotes: XYQuote, fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string, api_latency: Latency[0]) {
    const protocol = 'xy';

    const source_chain_name = CHAIN_ID_MAP[fromChain];
    const dest_chain_name = CHAIN_ID_MAP[toChain];

    const obj = await create_report_network(source_chain_name, dest_chain_name, fromToken, toToken);

    const date_time: string = obj.date_time;
    const source_network: Network = obj.source_network;
    const destination_network: Network = obj.destination_network;

    const fromTokenDecimals = 10 ** TOKEN_MAP[fromToken].decimals;
    const trade_amount = parseInt(fromAmount) / fromTokenDecimals;
    const query_latency: Latency = [api_latency];

    var net_trade_fee: number = 0;

    var max_dest_usd_val_route = 0;

    for (var i = 1; i < quotes.routes.length; i++) {
        const route_usd_val = parseFloat(quotes.routes[i].dstQuoteTokenUsdValue);

        const max_dest_usd_val = parseFloat(quotes.routes[max_dest_usd_val_route].dstQuoteTokenUsdValue);


        if (route_usd_val > max_dest_usd_val) {
            max_dest_usd_val_route = i;
        }

    }

    const quote: XYRoute = quotes.routes[max_dest_usd_val_route];

    //@ts-ignore
    var fee_token: string = quote.withholdingFeeToken.symbol;
    //@ts-ignore
    var fee_token_decimals: number = 10 ** quote.withholdingFeeToken.decimals;
    var fee_token_usd_price: number = await get_token_price(fee_token);


    var aggregator_fee: Aggregator["fee"] = [];

    if (quote.routeType == "xy_router_cross_chain") {
        fee_token = quote.bridgeDescription.bridgeFeeToken.symbol;
        fee_token_decimals = 10 ** quote.bridgeDescription.bridgeFeeToken.decimals;
        fee_token_usd_price = await get_token_price(fee_token);

        net_trade_fee = parseFloat(quote.bridgeDescription.bridgeFeeAmount);

        aggregator_fee.push({
            name: quote.srcSwapDescription.provider + "-Fee",
            amount: parseInt(quote.bridgeDescription.bridgeFeeAmount),
            percentage: 0.0,
            gas_price: undefined,
            usd_price: fee_token_usd_price
        });
    }

    const affiliate_fee: Aggregator["fee"][0] = {
        name: "AFFILIATE-FEE",
        amount: parseInt(quote.affiliateFeeAmount),
        percentage: 0.0,
        gas_price: undefined,
        usd_price: parseInt(quote.affiliateFeeAmount)
    };

    const withholding_fee: Aggregator["fee"][0] = {
        name: "WITHHOLDING-FEE",
        amount: parseInt(quote.withholdingFeeAmount),
        percentage: 0.0,
        gas_price: undefined,
        usd_price: parseInt(quote.withholdingFeeAmount)
    };

    net_trade_fee += parseInt(quote.affiliateFeeAmount) + parseInt(quote.withholdingFeeAmount);

    aggregator_fee.push(affiliate_fee);
    aggregator_fee.push(withholding_fee);

    const aggregator: Aggregator = {
        name: quote.srcSwapDescription.provider,
        address: quote.contractAddress,
        fee: aggregator_fee,
        total_fee: scale_two_decimals(net_trade_fee * fee_token_usd_price, fee_token_decimals)
    };

    const actual_value = parseInt(fromAmount);
    const trade_value: Asset = {
        name: fromToken,
        description: `Trade value of ${trade_amount} ${fromToken} from ${source_chain_name} to ${dest_chain_name} for ${toToken}`,
        actual_value: actual_value,
        actual_value_usd: parseFloat(quote.srcQuoteTokenUsdValue),
        effective_trade_value_usd: parseFloat(quote.dstQuoteTokenUsdValue),
        difference_in_value: parseFloat(quote.srcQuoteTokenUsdValue) - parseFloat(quote.dstQuoteTokenUsdValue),
        approximated_gas_cost: parseInt(quote.estimatedGas),
        gas_usd_price: source_network.network.gas_price,
        final_value_usd: parseFloat(quote.dstQuoteTokenUsdValue) - scale_two_decimals(parseInt(quote.estimatedGas) * fee_token_usd_price, fee_token_decimals),
    };

    const net_fee: Fee = {
        name: "NET-FEE",
        amount_usd: scale_two_decimals(net_trade_fee * fee_token_usd_price, fee_token_decimals),
    };

    const api_report: APIReport = await create_api_report(protocol, date_time, source_network, aggregator, destination_network, trade_value, net_fee, query_latency, quote);

    return api_report;
}

export async function make_api_report(fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string): Promise<APIReport> {
    const query_start = new Date().getTime();

    const quote: XYQuote = await build_route(fromChain, toChain, fromToken, toToken, fromAmount)

    if (quote.routes.length == 0) {
        throw new Error(`No routes found for ${fromToken} -> ${toToken} from ${CHAIN_ID_MAP[fromChain]} -> ${CHAIN_ID_MAP[toChain]}`);
    }

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
