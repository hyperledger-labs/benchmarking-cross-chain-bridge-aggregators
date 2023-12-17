import os
import argparse
import matplotlib
matplotlib.use('Agg')

from data_loader import load_json_data, save_obj
from plot_feeVsgas import plot_net_fee_vs_gas_price
from plot_quoteVscoingecko import plot_quote_vs_coingecko
from plot_quote_difference import plot_quote_difference
from table_average_latency import table_average_latency
from table_average_price_diff import table_average_price_diff
from table_average_net_fee import table_average_net_fee
from plot_histogram_quote_diff import plot_histogram_quote_diff

figs = {
    'quote_difference': {'same_chain': [], 'cross_chain': []},
    'net_fee_vs_gas_price': {'same_chain': [], 'cross_chain': []},
    'coin_gecko_vs_quote': {'same_chain': [], 'cross_chain': []}
}

def plot_runner(benchmark_data_folder, aggregator, source_chain, dest_chain):
    """
    Plots various graphs and generates tables based on the benchmark data.

    Args:
        benchmark_data_folder (str): The folder path containing the benchmark data.
        aggregator (str): The aggregator used for benchmarking.
        source_chain (str): The source chain for the benchmark.
        dest_chain (str): The destination chain for the benchmark.

    Returns:
        dict: A dictionary containing the generated tables and graphs.
    """
    obj = load_json_data(benchmark_data_folder, aggregator, source_chain, dest_chain)

    timestamps_list = obj['timestamps']
    total_fees_list = obj['total_fees']
    coin_gecko_prices_list = obj['coin_gecko_prices']
    source_gas_prices_list = obj['source_gas_prices']
    dest_gas_prices_list = obj['dest_gas_prices']
    effective_trade_value_usd_list = obj['effective_trade_value_usd']
    latency_list = obj['latency']

    # Call all the plotting functions
    fig_quote_vs_gecko = plot_quote_vs_coingecko(timestamps_list, coin_gecko_prices_list, effective_trade_value_usd_list, aggregator, source_chain, dest_chain)

    fig_fee_vs_gas = plot_net_fee_vs_gas_price(timestamps_list, source_gas_prices_list, dest_gas_prices_list, total_fees_list, aggregator, source_chain, dest_chain)

    fig_quote_diff = plot_quote_difference(timestamps_list, coin_gecko_prices_list, effective_trade_value_usd_list, aggregator, source_chain, dest_chain)

    # Used to determine whether the transaction was cross-chain or not
    key_chain = 'same_chain' if source_chain == dest_chain else 'cross_chain'

    figs['quote_difference'][key_chain].append(fig_quote_diff[key_chain])
    figs['net_fee_vs_gas_price'][key_chain].append(fig_fee_vs_gas[key_chain])
    figs['coin_gecko_vs_quote'][key_chain].append(fig_quote_vs_gecko[key_chain])

    latency_table = table_average_latency(latency_list, coin_gecko_prices_list, effective_trade_value_usd_list, aggregator, source_chain, dest_chain)
    price_diff_tables = table_average_price_diff(coin_gecko_prices_list, effective_trade_value_usd_list, aggregator, source_chain, dest_chain)
    net_fee_table = table_average_net_fee(total_fees_list, effective_trade_value_usd_list, aggregator, source_chain, dest_chain)

    result_obj = {
        'latency_table': latency_table,
        'price_diff_table_net': price_diff_tables['avg_table_df'],
        'price_diff_table_over': price_diff_tables['count_over_table_df'],
        'price_diff_table_under': price_diff_tables['count_under_table_df'],
        'net_fee_table': net_fee_table
    }

    return result_obj

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

tables_obj = {
    'latency_table': None,
    'price_diff_table_net': None,
    'price_diff_table_over': None,
    'price_diff_table_under': None,
    'net_fee_table': None
}

plots_obj = {
    'quote_vs_coingecko': 'coin_gecko_vs_quote',
    'net_fee_vs_gas_price': 'net_fee_vs_gas_price',
    'diff_in_quotes': 'difference_in_quotes'

}

for aggregator in aggregator_names:
    source_chain_names = get_chain_names(args.source_chain, benchmark_data_folder, ignore_folders, aggregator)
    for source_chain in source_chain_names:
        dest_chain_names = get_chain_names(args.dest_chain, benchmark_data_folder, ignore_folders, aggregator + '/' + source_chain)
        for dest_chain in dest_chain_names:
            tables_obj = plot_runner(benchmark_data_folder, aggregator, source_chain, dest_chain)

save_obj(tables_obj)
plot_histogram_quote_diff()