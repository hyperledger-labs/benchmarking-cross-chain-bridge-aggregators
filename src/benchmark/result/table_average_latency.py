import pandas as pd
import numpy as np

# Create an empty DataFrame
data = pd.DataFrame(columns=['aggregator', 'source-chain', 'dest-chain', 'over ($\mu$)', 'over ($\sigma$)','under ($\mu$)', 'under ($\sigma$)','latency ($\mu$)', 'latency ($\sigma$)'])

def table_average_latency(latency, coin_gecko_prices, quote_value, aggregator, source_chain, dest_chain):
    """
    Calculate the average latency for an aggregator when the quote value is above and below the coin gecko price.

    Parameters:
    latency (numpy.ndarray): Array of latency values.
    coin_gecko_prices (numpy.ndarray): Array of coin gecko prices.
    quote_value (float): Quote value.
    aggregator (str): Aggregator name.
    source_chain (str): Source chain name.
    dest_chain (str): Destination chain name.

    Returns:
    pandas.DataFrame: DataFrame containing the average latency data.

    """
    global data  # Ensure you are referencing the global variable

    # Find the average latency for an aggregator when the quote value is above and below the coin gecko price
    latency_over = latency[quote_value > coin_gecko_prices]
    latency_under = latency[quote_value < coin_gecko_prices]

    avg_latency_over = np.mean(latency_over) if len(latency_over) > 0 else 0
    avg_latency_under = np.mean(latency_under) if len(latency_under) > 0 else 0
    avg_latency = np.mean(latency) if len(latency) > 0 else 0

    variance_over = np.std(latency_over) if len(latency_over) > 0 else 0
    variance_under = np.std(latency_under) if len(latency_under) > 0 else 0
    variance = np.std(latency) if len(latency) > 0 else 0

    # Round each to 2 decimal places
    avg_latency_over = round(avg_latency_over, 2)
    avg_latency_under = round(avg_latency_under, 2)
    avg_latency = round(avg_latency, 2)
    variance_over = round(variance_over, 2)
    variance_under = round(variance_under, 2)
    variance = round(variance, 2)

    # Create a new DataFrame for the current data
    new_data = pd.DataFrame({
        'aggregator': [aggregator],
        'source-chain': [source_chain],
        'dest-chain': [dest_chain],
        'over ($\mu$)': [avg_latency_over],
        'over ($\sigma$)': [variance_over],
        'under ($\mu$)': [avg_latency_under],
        'under ($\sigma$)': [variance_under],
        'latency ($\mu$)': [avg_latency],
        'latency ($\sigma$)': [variance]
    })

    # Concatenate the new data with the existing data
    data = pd.concat([data, new_data], ignore_index=True)

    return data