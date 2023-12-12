import pandas as pd
import numpy as np

# Create empty DataFrames
avg_table_df = pd.DataFrame(columns=['aggregator', 'source-chain', 'dest-chain', 'avg-quotes-over', 'avg-quotes-under', 'avg-quote-diff'])
count_over_table_df = pd.DataFrame(columns=['aggregator', 'source-chain', 'dest-chain', 'count-over-1%', 'count-over-5%', 'count-over-10%', 'count-over-20%', 'count-over-30%+'])
count_under_table_df = pd.DataFrame(columns=['aggregator', 'source-chain', 'dest-chain', 'count-under-1%', 'count-under-5%', 'count-under-10%', 'count-under-20%', 'count-under-30%+'])

def table_average_price_diff(coin_gecko_prices, quote_value, aggregator, source_chain, dest_chain):
    global avg_table_df, count_over_table_df, count_under_table_df  # Ensure you are referencing the global variables

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

    # Create a new DataFrame for the current data (avg_table_df)
    avg_data = pd.DataFrame({
        'aggregator': [aggregator],
        'source-chain': [source_chain],
        'dest-chain': [dest_chain],
        'avg-quotes-over': [avg_price_diff_over],
        'avg-quotes-under': [avg_price_diff_under],
        'avg-quote-diff': [avg_price_diff],
    })

    # Concatenate the new data with the existing data for avg_table_df
    avg_table_df = pd.concat([avg_table_df, avg_data], ignore_index=True)

    # Create DataFrames for count_over_table_df and count_under_table_df
    count_data = pd.DataFrame({
        'aggregator': [aggregator],
        'source-chain': [source_chain],
        'dest-chain': [dest_chain],
        'count-over-1%': [np.sum(price_diff_over < 1)],
        'count-over-5%': [np.sum((price_diff_over < 5) & (price_diff_over >= 1))],
        'count-over-10%': [np.sum((price_diff_over < 10) & (price_diff_over >= 5))],
        'count-over-20%': [np.sum((price_diff_over < 20) & (price_diff_over >= 10))],
        'count-over-30%+': [np.sum(price_diff_over >= 20)],
        'count-under-1%': [np.sum(price_diff_under > -1)],
        'count-under-5%': [np.sum((price_diff_under > -5) & (price_diff_under <= -1))],
        'count-under-10%': [np.sum((price_diff_under > -10) & (price_diff_under <= -5))],
        'count-under-20%': [np.sum((price_diff_under > -20) & (price_diff_under <= -10))],
        'count-under-30%+': [np.sum(price_diff_under <= -20)],
    })

    # Concatenate the new data with the existing data for count_over_table_df
    count_over_table_df = pd.concat([count_over_table_df, count_data], ignore_index=True)

    # Concatenate the new data with the existing data for count_under_table_df
    count_under_table_df = pd.concat([count_under_table_df, count_data], ignore_index=True)

    return {
        'avg_table_df': avg_table_df,
        'count_over_table_df': count_over_table_df,
        'count_under_table_df': count_under_table_df
    }