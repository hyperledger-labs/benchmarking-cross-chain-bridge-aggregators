import os
import json
from datetime import datetime, timezone
import re
import numpy as np

from APIReport import APIReport

def load_json_data(benchmark_data_folder, aggregator_name, source_chain_name, dest_chain_name, sort_by_timestamps=True):
    """
    Load JSON data from a specified folder and return a dictionary containing the extracted data.

    Args:
        benchmark_data_folder (str): The path to the benchmark data folder.
        aggregator_name (str): The name of the aggregator.
        source_chain_name (str): The name of the source chain.
        dest_chain_name (str): The name of the destination chain.
        sort_by_timestamps (bool, optional): Whether to sort the data by timestamps. Defaults to True.

    Returns:
        dict: A dictionary containing the extracted data, with keys:
            - 'timestamps': List of timestamps
            - 'total_fees': List of total fees
            - 'coin_gecko_prices': List of CoinGecko prices
            - 'source_gas_prices': List of source gas prices
            - 'dest_gas_prices': List of destination gas prices
            - 'effective_trade_value_usd': List of effective trade values in USD
            - 'latency': List of latencies
    """
    timestamps_list = []
    source_gas_prices_list = []
    dest_gas_prices_list = []
    total_fees_list = []
    coin_gecko_prices_list = []
    effective_trade_value_usd_list = []
    latency_list = []

    # Construct the path to the folder
    folder_path = os.path.join(benchmark_data_folder, aggregator_name, source_chain_name.upper(), dest_chain_name.upper())

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        # Process only files with a specific pattern (e.g., '1.json')
        if re.match(r'\d+\.json$', os.path.basename(file_path)):
            with open(file_path, 'r') as file:
                entry: APIReport = json.load(file)
                creation_date_time_str = entry['creation_date_time']

                # Parse the string into a datetime object, considering it's in UTC
                creation_date_time = datetime.strptime(creation_date_time_str, "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=timezone.utc)
                total_fee = entry['gas_included_fee']['amount_usd']
                # total_fee = entry['aggregator']['total_fee']
                coin_gecko_price = entry['coin_gecko_trade_price']['price_per']

                source_gas = entry['source_network']['network']['gas_price_usd'] # type: ignore
                dest_gas = entry['destination_network']['network']['gas_price_usd'] # type: ignore

                effective_trade_value_usd = entry['trade_value']['effective_trade_value_usd']
                latency = entry['latencies'][0]['latency']

                timestamps_list.append(creation_date_time)
                total_fees_list.append(total_fee)
                coin_gecko_prices_list.append(coin_gecko_price)
                source_gas_prices_list.append(source_gas)
                dest_gas_prices_list.append(dest_gas)
                effective_trade_value_usd_list.append(effective_trade_value_usd)
                latency_list.append(latency)


    assert len(timestamps_list) == len(total_fees_list) == len(coin_gecko_prices_list) == len(source_gas_prices_list) == len(dest_gas_prices_list) == len(effective_trade_value_usd_list) == len(latency_list) != 0


    # Sort the data by timestamps
    timestamps_list, total_fees_list, coin_gecko_prices_list, source_gas_prices_list, dest_gas_prices_list, effective_trade_value_usd_list, latency_list = zip(*sorted(zip(timestamps_list, total_fees_list, coin_gecko_prices_list, source_gas_prices_list, dest_gas_prices_list, effective_trade_value_usd_list, latency_list)))

    # Convert the lists to numpy arrays
    timestamps_list = np.array(timestamps_list)
    total_fees_list = np.array(total_fees_list)
    coin_gecko_prices_list = np.array(coin_gecko_prices_list)
    source_gas_prices_list = np.array(source_gas_prices_list)
    dest_gas_prices_list = np.array(dest_gas_prices_list)
    effective_trade_value_usd_list = np.array(effective_trade_value_usd_list)
    latency_list = np.array(latency_list)

    obj = {
        'timestamps': timestamps_list,
        'total_fees': total_fees_list,
        'coin_gecko_prices': coin_gecko_prices_list,
        'source_gas_prices': source_gas_prices_list,
        'dest_gas_prices': dest_gas_prices_list,
        'effective_trade_value_usd': effective_trade_value_usd_list,
        'latency': latency_list
    }

    return obj

def save_obj(obj):
    for filename in obj:
        save_df(obj, filename)

def save_df(obj, filename):
    df = obj[filename]

    table_path = 'benchmark-tables/'
    filename = table_path + filename

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    df.to_csv(filename + '.csv', index=False)
    df.to_latex(filename + '.tex', index=False, float_format="%.2f")