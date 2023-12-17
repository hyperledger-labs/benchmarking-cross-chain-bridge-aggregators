import pandas as pd
import numpy as np

# Create an empty DataFrame
data = pd.DataFrame(columns=['aggregator', 'source-chain', 'dest-chain',
                             'avg-net-fee',
                            ])

def table_average_net_fee(net_fee, quote_value, aggregator, source_chain, dest_chain):
    """
    Calculate the average net fee for an aggregator when the current quote value is some percentage above or below the previous quote value.

    Parameters:
    net_fee (list): List of net fees.
    quote_value (list): List of quote values.
    aggregator (str): Aggregator name.
    source_chain (str): Source chain name.
    dest_chain (str): Destination chain name.

    Returns:
    pd.DataFrame: DataFrame containing the average net fee for the given aggregator, source chain, and destination chain.
    """
    global data  # Ensure you are referencing the global variable

    # Find the average net fee for an aggregator when the current quote value is some percentage above or below the previous quote value
    net_fee_percentage = (net_fee[-1] - net_fee[0]) / net_fee[0] * 100
    quote_value_percentage = (quote_value[-1] - quote_value[0]) / quote_value[0] * 100

    # Create a new DataFrame for the current data
    new_data = pd.DataFrame({
        'aggregator': [aggregator],
        'source-chain': [source_chain],
        'dest-chain': [dest_chain],
        'avg-net-fee': round(np.mean(net_fee),2)
    })

    # Concatenate the new data with the existing data
    data = pd.concat([data, new_data], ignore_index=True)

    return data