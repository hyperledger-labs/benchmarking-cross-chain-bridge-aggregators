import pandas as pd
import numpy as np

# Create an empty DataFrame
data = pd.DataFrame(columns=['aggregator', 'source-chain', 'dest-chain', 'avg-over', 'avg-under', 'avg-latency'])

def table_average_latency(latency, coin_gecko_prices, quote_value, aggregator, source_chain, dest_chain):
    global data  # Ensure you are referencing the global variable

    # Find the average latency for an aggregator when the quote value is above and below the coin gecko price
    latency_over = latency[quote_value > coin_gecko_prices]
    latency_under = latency[quote_value < coin_gecko_prices]

    avg_latency_over = np.mean(latency_over) if len(latency_over) > 0 else 0
    avg_latency_under = np.mean(latency_under) if len(latency_under) > 0 else 0
    avg_latency = np.mean(latency) if len(latency) > 0 else 0

    # Create a new DataFrame for the current data
    new_data = pd.DataFrame({
        'aggregator': [aggregator],
        'source-chain': [source_chain],
        'dest-chain': [dest_chain],
        'avg-over': [avg_latency_over],
        'avg-under': [avg_latency_under],
        'avg-latency': [avg_latency]
    })

    # Concatenate the new data with the existing data
    data = pd.concat([data, new_data], ignore_index=True)

    return data