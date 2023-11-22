import fs from 'fs';
import { APIReport, Asset, Fee, Latency, Network } from '@benchmarking-cross-chain-bridges/benchmark-runner/types/APIReport';
import { Aggregator } from '@benchmarking-cross-chain-bridges/benchmark-runner/types/ExecutedReport';
import { CHAIN_MAP, TOKEN_TYPE_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { get_gas_price, get_latest_blockNum } from '@benchmarking-cross-chain-bridges/helper/provider';

const report_dir = 'benchmark-data';

function report_count(input_dir: string): number {
    try {
        const files = fs.readdirSync(input_dir);
        return files.length;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            fs.mkdirSync(input_dir, { recursive: true });
            return 0;
        }

        throw error;
    }
}

export function create_api_report(protocol_name: string, creation_date_time: string, protocol: string, source_network: Network, aggregator: Aggregator, destination_network: Network, trade_value: Asset, net_fee: Fee, latencies: Latency): APIReport {
    const run_id = report_count(`${report_dir}/${protocol_name}`) + 1;
    const report: APIReport = {
        "run_id": run_id,
        "creation_date_time": creation_date_time,
        "protocol": protocol,
        "source_network": source_network,
        "aggregator": aggregator,
        "destination_network": destination_network,
        "trade_value": trade_value,
        "net_fee": net_fee,
        "latencies": latencies,
    };

    fs.writeFileSync(`${report_dir}/${protocol_name}/${run_id}.json`, JSON.stringify(report, null, 2));

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
            type: TOKEN_TYPE_MAP[fromToken],
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
            type: TOKEN_TYPE_MAP[toToken],
            address: CHAIN_MAP[dest_chain_name].token_map[toToken],
        }
    };

    return {
        date_time: date_time,
        source_network: source_network,
        destination_network: destination_network,
    }
}