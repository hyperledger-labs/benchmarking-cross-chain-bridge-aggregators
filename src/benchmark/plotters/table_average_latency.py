import pandas as pd
import numpy as np

# Create an empty DataFrame
data = pd.DataFrame(columns=['aggregator', 'source_chain', 'dest_chain', 'avg_latency_above', 'num_time_above', 'avg_latency_below', 'num_time_below', 'avg_latency', 'num_time'])

def table_average_latency(latency, coin_gecko_prices, quote_value, aggregator, source_chain, dest_chain):
    global data  # Ensure you are referencing the global variable

    # Find the average latency for an aggregator when the quote value is above and below the coin gecko price
    latency_above = latency[quote_value > coin_gecko_prices]
    latency_below = latency[quote_value < coin_gecko_prices]

    avg_latency_above = np.mean(latency_above) if len(latency_above) > 0 else 0
    avg_latency_below = np.mean(latency_below) if len(latency_below) > 0 else 0
    avg_latency = np.mean(latency) if len(latency) > 0 else 0

    # Create a new DataFrame for the current data
    new_data = pd.DataFrame({
        'aggregator': [aggregator],
        'source_chain': [source_chain],
        'dest_chain': [dest_chain],
        'avg_latency_above': [avg_latency_above],
        'num_time_above': [len(latency_above)],
        'avg_latency_below': [avg_latency_below],
        'num_time_below': [len(latency_below)],
        'avg_latency': [avg_latency],
        'num_time': [len(latency)]
    })

    # Concatenate the new data with the existing data
    data = pd.concat([data, new_data], ignore_index=True)

    return data