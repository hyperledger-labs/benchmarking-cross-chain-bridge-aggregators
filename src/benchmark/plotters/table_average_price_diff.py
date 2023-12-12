import pandas as pd
import numpy as np

# Create an empty DataFrame
data = pd.DataFrame(columns=['aggregator', 'source_chain', 'dest_chain', 'avg_quotes_over', 'num_quotes_over', 'avg_quotes_under',
                             'num_quotes_under', 'avg_quote_diff', 'num_quotes',
                             'num_over_within_1%', 'num_over_within_5%', 'num_over_within_10%', 'num_over_within_20%', 'num_over_30%', 'num_under_within_1%', 'num_under_within_5%', 'num_under_within_10%', 'num_under_within_20%', 'num_under_30%'])

def table_average_price_diff(coin_gecko_prices, quote_value, aggregator, source_chain, dest_chain):
    global data  # Ensure you are referencing the global variable

    price_diff = quote_value - coin_gecko_prices

    price_diff_over = price_diff[quote_value > coin_gecko_prices]
    price_diff_under = price_diff[quote_value < coin_gecko_prices]

    avg_price_diff_over = np.mean(price_diff_over) if len(price_diff_over) > 0 else 0
    avg_price_diff_under = -1 * np.mean(price_diff_under) if len(price_diff_under) > 0 else 0
    avg_price_diff = np.mean(price_diff) if len(price_diff) > 0 else 0

    # Round to 2 decimal places
    avg_price_diff_over = round(avg_price_diff_over, 2)
    avg_price_diff_under = round(avg_price_diff_under, 2)
    avg_price_diff = round(avg_price_diff, 2)

    # Create a list that contains the percentage difference between the quote value and the coin gecko price
    price_diff_percentage = price_diff / coin_gecko_prices * 100

    num_over_within_1 = np.sum(price_diff_over < 1)
    num_over_within_5 = np.sum((price_diff_over < 5) & (price_diff_over >= 1))
    num_over_within_10 = np.sum((price_diff_over < 10) & (price_diff_over >= 5))
    num_over_within_20 = np.sum((price_diff_over < 20) & (price_diff_over >= 10))
    num_over_30 = np.sum(price_diff_over >= 20)

    num_under_within_1 = np.sum(price_diff_under > -1)
    num_under_within_5 = np.sum((price_diff_under > -5) & (price_diff_under <= -1))
    num_under_within_10 = np.sum((price_diff_under > -10) & (price_diff_under <= -5))
    num_under_within_20 = np.sum((price_diff_under > -20) & (price_diff_under <= -10))
    num_under_30 = np.sum(price_diff_under <= -20)

    # Create a new DataFrame for the current data
    new_data = pd.DataFrame({
        'aggregator': [aggregator],
        'source_chain': [source_chain],
        'dest_chain': [dest_chain],
        'avg_quotes_over': [avg_price_diff_over],
        'num_quotes_over': [len(price_diff_over)],
        'avg_quotes_under': [avg_price_diff_under],
        'num_quotes_under': [len(price_diff_under)],
        'avg_quote_diff': [avg_price_diff],
        'num_quotes': [len(price_diff)],
        'num_over_within_1%': [num_over_within_1],
        'num_over_within_5%': [num_over_within_5],
        'num_over_within_10%': [num_over_within_10],
        'num_over_within_20%': [num_over_within_20],
        'num_over_30%': [num_over_30],
        'num_under_within_1%': [num_under_within_1],
        'num_under_within_5%': [num_under_within_5],
        'num_under_within_10%': [num_under_within_10],
        'num_under_within_20%': [num_under_within_20],
        'num_under_30%': [num_under_30]
    })

    # Concatenate the new data with the existing data
    data = pd.concat([data, new_data], ignore_index=True)

    return data
