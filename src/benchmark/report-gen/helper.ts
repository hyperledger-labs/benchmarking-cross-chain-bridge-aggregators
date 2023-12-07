import fs from 'fs';
import axios from 'axios';
import { APIReport, Asset, CoinGeckoPrice, Fee, Latency, Network } from '../types/APIReport';
import { Aggregator } from '../types/APIReport';
import { CHAIN_MAP, TOKEN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { get_gas_price, get_latest_blockNum } from '@benchmarking-cross-chain-bridges/helper/provider';

const report_dir = 'benchmark-data';

function report_count(input_dir: string): number {
    try {
        const files = fs.readdirSync(input_dir);
        return files.length / 2;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            fs.mkdirSync(input_dir, { recursive: true });
            return 0;
        }

        throw error;
    }
}

export async function create_api_report(protocol_name: string, creation_date_time: string, source_network: Network, aggregator: Aggregator, destination_network: Network, trade_value: Asset, net_fee: Fee, latencies: Latency, quote: any): Promise<APIReport> {

    const path = report_dir + '/' + protocol_name + '/' + source_network.network.name + '/' + destination_network.network.name;

    const run_id = report_count(path) + 1;
    const coin_gecko_price = await get_coin_gecko_price(run_id, source_network, destination_network, trade_value.actual_value);

    const report: APIReport = {
        "run_id": run_id,
        "creation_date_time": creation_date_time,
        "protocol": protocol_name,
        "source_network": source_network,
        "aggregator": aggregator,
        "destination_network": destination_network,
        "trade_value": trade_value,
        "net_fee": net_fee,
        "latencies": latencies,
        "coin_gecko_price": coin_gecko_price,
    };

    fs.writeFileSync(`${path}/${run_id}.json`, JSON.stringify(report, null, 2));
    fs.writeFileSync(`${path}/${run_id}.quote.json`, JSON.stringify(quote, null, 2));
    return report;
}

export async function create_report_network(source_chain_name: string, dest_chain_name: string, fromToken: string, toToken: string): Promise<{
    date_time: string;
    source_network: Network;
    destination_network: Network;
}> {
    const date_time = new Date().toISOString();
    const source_gas_price = await get_gas_price(source_chain_name);
    const source_block_num = await get_latest_blockNum(source_chain_name);
    const source_network: Network = {
        network: {
            name: source_chain_name,
            gas_price: source_gas_price,
            last_block_num: source_block_num,
            queried_at: date_time,
        },
        token: {
            name: fromToken,
            type: TOKEN_MAP[fromToken].type,
            address: CHAIN_MAP[source_chain_name].token_map[fromToken],
        }
    };

    const dest_gas_price = await get_gas_price(dest_chain_name);
    const dest_block_num = await get_latest_blockNum(dest_chain_name);

    const destination_network: Network = {
        network: {
            name: dest_chain_name,
            gas_price: dest_gas_price,
            last_block_num: dest_block_num,
            queried_at: date_time,
        },
        token: {
            name: toToken,
            type: TOKEN_MAP[toToken].type,
            address: CHAIN_MAP[dest_chain_name].token_map[toToken],
        }
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
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${token_to_coingecko_id[token]}&vs_currencies=usd`);

        return response.data[token_to_coingecko_id[token]].usd;
    } catch (error) {
        console.error(error);
        console.error(`Unable to get price for ${token}`);
        throw error;
    }
}
export function scale_two_decimals(num: number, den: number = 1): number {
    return Math.round((num / den) * 100) / 100;
}

export async function get_coin_gecko_price(run_id: number, source_chain: Network, dest_chain: Network, raw_value: number): Promise<CoinGeckoPrice> {
    // if benchmark-data/coin_gecko_price/run_id.json exists, then return the price else fetch from coingecko and save it

    if (fs.existsSync(`${report_dir}/coin_gecko_price/${run_id}.json`)) {
        const coin_gecko_price = JSON.parse(fs.readFileSync(`${report_dir}/coin_gecko_price/${run_id}.json`, 'utf-8'));
        return coin_gecko_price;
    }

    const fromToken = source_chain.token;
    const toToken = dest_chain.token;

    const coin_gecko_name = fromToken.name;
    const coin_gecko_from_token_price = await get_token_price(fromToken.name);
    const coin_gecko_to_token_price = await get_token_price(toToken.name);
    const coin_gecko_pair_price_per = scale_two_decimals(coin_gecko_from_token_price, coin_gecko_to_token_price);
    const coin_gecko_pair_price = scale_two_decimals(coin_gecko_pair_price_per * raw_value, 10 ** TOKEN_MAP[fromToken.name].decimals);

    const coin_gecko_price: CoinGeckoPrice = {
        name: coin_gecko_name,
        price_per: coin_gecko_pair_price_per,
        price_amount: coin_gecko_pair_price,
    }


    if (!fs.existsSync(`${report_dir}/coin_gecko_price`)) {
        fs.mkdirSync(`${report_dir}/coin_gecko_price`, { recursive: true });
    }

    fs.writeFileSync(`${report_dir}/coin_gecko_price/${run_id}.json`, JSON.stringify(coin_gecko_price, null, 2));
    return coin_gecko_price;
}