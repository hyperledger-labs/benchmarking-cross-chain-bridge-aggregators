export type APIReport = {
    run_id: number,
    creation_date_time: string,
    protocol: string,
    source_network: Network,
    aggregator: Aggregator,
    destination_network: Network,
    trade_value: Asset,
    net_fee: Fee,
    latencies: Latency,
}

export type Network = {
    network: {
        name: string,
        gas_price: number,
        last_block_num: number,
        queried_at: string,
    },
    token: {
        name: string,
        type: string,
        address: string,
    }
}

export type Aggregator = {
    name: string,
    address: string,
    fee: Array<{
        name: string,
        amount: number,
        percentage: number | undefined,
        gas_price: number | undefined,
        usd_price: number
    }>,
    total_fee: number
}

export type Asset = {
    name: string,
    description: string,
    actual_value: number,
    actual_value_usd: number,
    effective_trade_value_usd: number,
    difference_in_value: number,
    approximated_gas_cost: number,
    gas_usd_price: number,
    final_value_usd: number,
}

export type Fee = {
    name: string,
    amount_usd: number
}

export type Latency = Array<{
    name: string,
    start_timestamp: number,
    end_timestamp: number,
    latency: number
}>