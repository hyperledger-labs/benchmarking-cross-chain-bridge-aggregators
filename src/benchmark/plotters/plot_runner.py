import os
import argparse
import numpy as np

from data_loader import load_json_data, convert_pd_to_csv
from plot_feeVsgas import plot_net_fee_vs_gas_price
from plot_quoteVscoingecko import plot_quote_vs_coingecko
from plot_diff_in_quote import plot_diff_in_quotes
from table_average_latency import table_average_latency

def plot_runner(benchmark_data_folder, aggregator, source_chain, dest_chain):
    obj = load_json_data(benchmark_data_folder, aggregator, source_chain, dest_chain)

    timestamps_list = obj['timestamps']
    total_fees_list = obj['total_fees']
    coin_gecko_prices_list = obj['coin_gecko_prices']
    source_gas_prices_list = obj['source_gas_prices']
    dest_gas_prices_list = obj['dest_gas_prices']
    effective_trade_value_usd_list = obj['effective_trade_value_usd']
    latency_list = obj['latency']

    plot_quote_vs_coingecko(timestamps_list, coin_gecko_prices_list, effective_trade_value_usd_list, aggregator, source_chain, dest_chain)

    plot_net_fee_vs_gas_price(timestamps_list, source_gas_prices_list, dest_gas_prices_list,total_fees_list, aggregator, source_chain, dest_chain)

    plot_diff_in_quotes(timestamps_list, coin_gecko_prices_list, effective_trade_value_usd_list, aggregator, source_chain, dest_chain)

    latency_table = table_average_latency(latency_list, coin_gecko_prices_list, effective_trade_value_usd_list, aggregator, source_chain, dest_chain)

    return latency_table

def get_chain_names(arg_value, benchmark_data_folder, ignore_folders, path_modifier=''):
    if arg_value == 'all':
        # read the folder names in the benchmark-data folder
        chain_names = os.listdir(benchmark_data_folder + path_modifier)
        # remove the folders that are from the ignore list
        chain_names = [name for name in chain_names if name not in ignore_folders]
    else:
        chain_names = [arg_value]

    return chain_names

parser = argparse.ArgumentParser()
parser.add_argument('--aggregator', default='all')
parser.add_argument('--source_chain', default='all')
parser.add_argument('--dest_chain', default='all')
args = parser.parse_args()

benchmark_data_folder = 'benchmark-data/'
ignore_folders = ['coin_gecko_price', 'logs', 'uniswap-swap']

aggregator_names = get_chain_names(args.aggregator, benchmark_data_folder, ignore_folders, '')

latency_table = None

for aggregator in aggregator_names:
    source_chain_names = get_chain_names(args.source_chain, benchmark_data_folder, ignore_folders, aggregator)
    for source_chain in source_chain_names:
        dest_chain_names = get_chain_names(args.dest_chain, benchmark_data_folder, ignore_folders, aggregator + '/' + source_chain)
        for dest_chain in dest_chain_names:
            latency_table = plot_runner(benchmark_data_folder, aggregator, source_chain, dest_chain)

print(latency_table)
table_path = 'benchmark-tables/'
convert_pd_to_csv(latency_table, table_path + 'latency_table.csv')
