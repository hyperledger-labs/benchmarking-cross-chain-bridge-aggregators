import os
import argparse

from data_loader import load_json_data
from plot_feeVsgas import plot_net_fee_vs_gas_price
from plot_quoteVscoingecko import plot_quote_vs_coingecko

def plot_runner(benchmark_data_folder, aggregator, source_chain, dest_chain):
    obj = load_json_data(benchmark_data_folder, aggregator, source_chain, dest_chain)

    timestamps_list = obj['timestamps']
    gas_prices_list = obj['gas_prices']
    net_fees_list = obj['net_fees']
    coin_gecko_prices_list = obj['coin_gecko_prices']
    actual_values = obj['raw_amounts']

    plot_quote_vs_coingecko(timestamps_list, coin_gecko_prices_list, actual_values, aggregator, source_chain, dest_chain)

    plot_net_fee_vs_gas_price(timestamps_list, gas_prices_list, net_fees_list, aggregator, source_chain, dest_chain)

parser = argparse.ArgumentParser()
parser.add_argument('--aggregator', default='all')
parser.add_argument('--source_chain', required=True)
parser.add_argument('--dest_chain', required=True)
args = parser.parse_args()

benchmark_data_folder = 'benchmark-data/'
ignore_folders = ['coin_gecko_price', 'logs']

if args.aggregator == 'all':
    # read the folder names in the benchmark-data folder
    aggregator_names = os.listdir(benchmark_data_folder)
    # remove the folders that are from the ignore list
    aggregator_names = [aggregator_name for aggregator_name in aggregator_names if aggregator_name not in ignore_folders]

    for aggregator_name in aggregator_names:
        plot_runner(benchmark_data_folder, aggregator_name, args.source_chain, args.dest_chain)
else:
    plot_runner(benchmark_data_folder, args.aggregator, args.source_chain, args.dest_chain)