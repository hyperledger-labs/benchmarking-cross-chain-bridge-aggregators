import numpy as np
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')

from utils import create_plot_dir

def plot_quote_difference(timestamps, coin_gecko_prices, actual_values, aggregator, source_chain, dest_chain):
    """
    Plots the difference between actual values and coin gecko prices over timestamps.

    Parameters:
    - timestamps (list): List of timestamps.
    - coin_gecko_prices (list): List of coin gecko prices.
    - actual_values (list): List of actual values.
    - aggregator (str): Aggregator name.
    - source_chain (str): Source chain name.
    - dest_chain (str): Destination chain name.

    Returns:
    - dict: A dictionary containing the figure for same_chain and cross_chain scenarios.
    """
    diff_values = actual_values - coin_gecko_prices

    # Create figure
    fig, ax = plt.subplots(figsize=(12, 6))

    # Plot Difference in Quotes
    ax.plot(timestamps, diff_values, label=f'Quote Difference: {aggregator}', color='blue')

    # Plot Zero Line
    ax.axhline(0, color='red', linestyle='--', label='Zero Line')

    # Set y-axis range
    ax.set_ylim(-150, 50)

    # Update layout
    ax.set_title(f'Difference in Quotes\nSource Chain: {source_chain}, Dest Chain: {dest_chain}, Aggregator: {aggregator}')
    ax.set_xlabel('Timestamp')
    ax.set_ylabel('Difference')
    ax.legend()

    # Set plot directory and filename
    plot_dir = 'benchmark-plots/quote_difference'
    plot_filename = f'{aggregator}_{source_chain}_to_{dest_chain}'

    # Create plot directory and save the plot
    create_plot_dir(fig, plot_dir, plot_filename)

    # Close the figure
    plt.close(fig)

    if source_chain == dest_chain:
        return {
            'same_chain': fig,
            'cross_chain': None
        }

    return {
        'same_chain': None,
        'cross_chain': fig
    }
