import fs from 'fs';
import axios from 'axios';
import { APIReport, Asset, CoinGeckoPrice, Fee, Latency, Network } from '../types/APIReport';
import { Aggregator } from '../types/APIReport';
import { CHAIN_MAP, TOKEN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { get_gas_price, get_latest_blockNum } from '@benchmarking-cross-chain-bridges/helper/provider';

const report_dir = 'benchmark-data';

export function report_count(input_dir: string, time_frame: number = 5): number {
    try {
        const files = fs.readdirSync(input_dir);
        const count = files.length / 2;
        const last_report: APIReport = JSON.parse(fs.readFileSync(`${input_dir}/${count}.json`, 'utf-8'));
        const last_report_date = new Date(last_report.creation_date_time);
        const current_date = new Date();
        const diff = current_date.getTime() - last_report_date.getTime();
        if (diff < time_frame * 60 * 1000) {
            return count - 1;
        }
        return count;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            fs.mkdirSync(input_dir, { recursive: true });
            return 0;
        }

        throw error;
    }
}

export async function create_api_report(protocol_name: string, creation_date_time: string, source_network: Network, aggregator: Aggregator, destination_network: Network, trade_value: Asset, net_fee: Fee, latencies: Latency, quote: any, run_id = 0): Promise<APIReport> {

    const path = report_dir + '/' + protocol_name + '/' + source_network.network.name + '/' + destination_network.network.name;

    // This is for when we are creating a new report. If the run id is not provided, then we are re-creating a report from the quote.json file
    if (run_id == 0) {
        run_id = report_count(path) + 1;
    }

    const coin_gecko_price = await get_coin_gecko_price(run_id, source_network.trade_token.name, destination_network.trade_token.name);

    if (trade_value.approximated_gas_cost_usd == 0) {
        trade_value.approximated_gas_cost_usd = scale_two_decimals(trade_value.approximated_gas_cost_gwei * coin_gecko_price.price_per, 10e9);
        net_fee.amount_usd += trade_value.approximated_gas_cost_usd;
    }

    const report: APIReport = {
        run_id: run_id,
        creation_date_time: creation_date_time,
        protocol: protocol_name,
        source_network: source_network,
        aggregator: aggregator,
        destination_network: destination_network,
        trade_value: trade_value,
        gas_included_fee: net_fee,
        latencies: latencies,
        coin_gecko_trade_price: coin_gecko_price
    };

    fs.writeFileSync(`${path}/${run_id}.json`, JSON.stringify(report, null, 2));
    fs.writeFileSync(`${path}/${run_id}.quote.json`, JSON.stringify(quote, null, 2));
    return report;
}

export async function create_report_network(protocol: string, source_chain_name: string, dest_chain_name: string, fromToken: string, toToken: string): Promise<{
    date_time: string;
    source_network: Network;
    destination_network: Network;
}> {
    const date_time = new Date().toISOString();
    const run_id = report_count(`${report_dir}/${protocol}/${source_chain_name}/${dest_chain_name}`) + 1;

    const source_gas_price_gwei = await get_gas_price(source_chain_name) * 10e-9;
    const source_block_num = await get_latest_blockNum(source_chain_name);
    const from_native_token = CHAIN_MAP[source_chain_name].native_token.name;
    const coin_gecko_from_token_price = await get_coin_gecko_price(run_id, from_native_token, "USD");
    const gas_usd_price_from_network = coin_gecko_from_token_price.price_per * source_gas_price_gwei * 10e-9;

    const source_network: Network = {
        network: {
            name: source_chain_name,
            gas_price_gwei: source_gas_price_gwei,
            gas_usd_price: gas_usd_price_from_network,
            last_block_num: source_block_num,
            queried_at: date_time,
        },
        trade_token: {
            name: fromToken,
            type: TOKEN_MAP[fromToken].type,
            address: CHAIN_MAP[source_chain_name].token_map[fromToken],
        },
        native_token: coin_gecko_from_token_price,

    };

    const dest_gas_price_gwei = await get_gas_price(dest_chain_name) * 10e-9;
    const dest_block_num = await get_latest_blockNum(dest_chain_name);
    const to_native_token = CHAIN_MAP[dest_chain_name].native_token.name;
    const coin_gecko_to_token_price = await get_coin_gecko_price(run_id, to_native_token, "USD");
    const gas_usd_price_to_network = coin_gecko_to_token_price.price_per * dest_gas_price_gwei * 10e-9;
    const destination_network: Network = {
        network: {
            name: dest_chain_name,
            gas_price_gwei: dest_gas_price_gwei,
            gas_usd_price: gas_usd_price_to_network,
            last_block_num: dest_block_num,
            queried_at: date_time,
        },
        trade_token: {
            name: toToken,
            type: TOKEN_MAP[toToken].type,
            address: CHAIN_MAP[dest_chain_name].token_map[toToken],
        },
        native_token: coin_gecko_to_token_price,
    };

    return {
        date_time: date_time,
        source_network: source_network,
        destination_network: destination_network,
    }
}

const token_to_coingecko_id: { [key: string]: string } = {
    "ETH": "ethereum",
    "WETH": "weth",
    "USDC": "usd-coin",
    "DAI": "dai",
    "MATIC": "matic-network",
    "WMATIC": "wmatic",
    "USDT": "tether",
}

export async function get_token_price(token: string): Promise<number> {
    if (token == "USD") {
        return 1;
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${token_to_coingecko_id[token]}&vs_currencies=usd`;
    try {
        const response = await axios.get(url);
        return response.data[token_to_coingecko_id[token]].usd;
    } catch (error) {
        console.error(error);
        console.error(`Unable to get price for ${token}`);
        console.error(url);
        throw error;
    }
}
export function scale_two_decimals(num: number, den: number = 1): number {
    return Math.round((num / den) * 100) / 100;
}

export async function get_coin_gecko_price(run_id: number, fromToken: string, toToken: string): Promise<CoinGeckoPrice> {
    if (!fs.existsSync(`${report_dir}/coin_gecko_price/${run_id}`)) {
        fs.mkdirSync(`${report_dir}/coin_gecko_price/${run_id}`, { recursive: true });
    }

    const token_name = [fromToken, toToken];
    for (const token of token_name) {
        if (!fs.existsSync(`${report_dir}/coin_gecko_price/${run_id}/${token}-USD.json`)) {
            const price = await get_token_price(token);
            const coin_gecko_price: CoinGeckoPrice = {
                pair: token + "-USD",
                price_per: price,
            }
            fs.writeFileSync(`${report_dir}/coin_gecko_price/${run_id}/${token}-USD.json`, JSON.stringify(coin_gecko_price, null, 2));
        }
    }

    const token_pair = fromToken + "-" + toToken;

    // if the token pair exists then return the price
    if (fs.existsSync(`${report_dir}/coin_gecko_price/${run_id}/${token_pair}.json`)) {
        const coin_gecko_price = JSON.parse(fs.readFileSync(`${report_dir}/coin_gecko_price/${run_id}/${token_pair}.json`, 'utf-8'));
        return coin_gecko_price;
    }

    const from_token = JSON.parse(fs.readFileSync(`${report_dir}/coin_gecko_price/${run_id}/${fromToken}-USD.json`, 'utf-8'));
    const to_token = JSON.parse(fs.readFileSync(`${report_dir}/coin_gecko_price/${run_id}/${toToken}-USD.json`, 'utf-8'));


    const coin_gecko_from_token_price = from_token.price_per;
    const coin_gecko_to_token_price = to_token.price_per;
    const coin_gecko_pair_price_per = scale_two_decimals(coin_gecko_from_token_price, coin_gecko_to_token_price);

    const coin_gecko_price: CoinGeckoPrice = {
        pair: token_pair,
        price_per: coin_gecko_pair_price_per,
    }

    fs.writeFileSync(`${report_dir}/coin_gecko_price/${run_id}/${token_pair}.json`, JSON.stringify(coin_gecko_price, null, 2));

    return coin_gecko_price;
}