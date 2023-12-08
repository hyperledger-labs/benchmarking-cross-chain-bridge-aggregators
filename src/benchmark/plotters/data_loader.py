import os
import json
from datetime import datetime, timezone
import re
import plotly.graph_objects as go
import argparse

def load_json_data(benchmark_data_folder, aggregator_name, source_chain_name, dest_chain_name, sort_by_timestamps=True):
    timestamps_list = []
    source_gas_prices_list = []
    dest_gas_prices_list = []
    total_fees_list = []
    coin_gecko_prices_list = []
    effective_trade_value_usd_list = []

    # Construct the path to the folder
    folder_path = os.path.join(benchmark_data_folder, aggregator_name, source_chain_name.upper(), dest_chain_name.upper())

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        # Process only files with a specific pattern (e.g., '1.json')
        if re.match(r'\d+\.json$', os.path.basename(file_path)):
            with open(file_path, 'r') as file:
                entry = json.load(file)
                creation_date_time_str = entry['creation_date_time']

                # Parse the string into a datetime object, considering it's in UTC
                creation_date_time = datetime.strptime(creation_date_time_str, "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=timezone.utc)
                # net_fees = entry['net_fee']['amount_usd']
                total_fee = entry['aggregator']['total_fee']
                coin_gecko_price = entry['coin_gecko_trade_price']['price_per']

                source_gas = entry['source_network']['network']['gas_price_usd']
                dest_gas = entry['destination_network']['network']['gas_price_usd']

                effective_trade_value_usd = entry['trade_value']['effective_trade_value_usd']

                timestamps_list.append(creation_date_time)
                total_fees_list.append(total_fee)
                coin_gecko_prices_list.append(coin_gecko_price)
                source_gas_prices_list.append(source_gas)
                dest_gas_prices_list.append(dest_gas)
                effective_trade_value_usd_list.append(effective_trade_value_usd)


    assert len(timestamps_list) == len(total_fees_list) == len(coin_gecko_prices_list) == len(source_gas_prices_list) == len(dest_gas_prices_list) == len(effective_trade_value_usd_list) != 0



    timestamps_list, total_fees_list, coin_gecko_prices_list, source_gas_prices_list, dest_gas_prices_list, effective_trade_value_usd_list = zip(*sorted(zip(timestamps_list, total_fees_list, coin_gecko_prices_list, source_gas_prices_list, dest_gas_prices_list, effective_trade_value_usd_list)))

    timestamps_list = list(timestamps_list)
    total_fees_list = list(total_fees_list)
    coin_gecko_prices_list = list(coin_gecko_prices_list)
    source_gas_prices_list = list(source_gas_prices_list)
    dest_gas_prices_list = list(dest_gas_prices_list)
    effective_trade_value_usd_list = list(effective_trade_value_usd_list)

    obj = {
        'timestamps': timestamps_list,
        'total_fees': total_fees_list,
        'coin_gecko_prices': coin_gecko_prices_list,
        'source_gas_prices': source_gas_prices_list,
        'dest_gas_prices': dest_gas_prices_list,
        'effective_trade_value_usd': effective_trade_value_usd_list
    }

    return obj