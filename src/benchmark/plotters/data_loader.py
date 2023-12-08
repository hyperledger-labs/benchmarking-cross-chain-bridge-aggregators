import os
import json
from datetime import datetime, timezone
import re
import plotly.graph_objects as go
import argparse

def load_json_data(benchmark_data_folder, aggregator_name, source_chain_name, dest_chain_name, sort_by_timestamps=True):
    timestamps_list = []
    gas_prices_list = []
    net_fees_list = []
    coin_gecko_prices_list = []
    raw_amounts_list = []

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
                net_fees = entry['net_fee']['amount_usd']
                coin_gecko_price = entry['coin_gecko_price']['price_per']
                gas = entry['source_network']['network']['gas_price'] * 10 ** -13 * coin_gecko_price
                trade_amount = entry['trade_value']['effective_trade_value_usd']

                timestamps_list.append(creation_date_time)
                net_fees_list.append(net_fees)
                coin_gecko_prices_list.append(coin_gecko_price)
                gas_prices_list.append(gas)
                raw_amounts_list.append(trade_amount)


    assert len(timestamps_list) == len(gas_prices_list) == len(net_fees_list) == len(coin_gecko_prices_list) == len(raw_amounts_list) != 0

    if sort_by_timestamps:
        timestamps_list, gas_prices_list, net_fees_list, coin_gecko_prices_list, raw_amounts_list = zip(*sorted(zip(timestamps_list, gas_prices_list, net_fees_list, coin_gecko_prices_list, raw_amounts_list)))

        obj = {
            'timestamps': timestamps_list,
            'gas_prices': gas_prices_list,
            'net_fees': net_fees_list,
            'coin_gecko_prices': coin_gecko_prices_list,
            'raw_amounts': raw_amounts_list
        }

    return obj