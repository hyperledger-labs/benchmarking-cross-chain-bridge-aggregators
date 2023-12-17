import matplotlib.pyplot as plt
from utils import create_plot_dir
import matplotlib
matplotlib.use('Agg')

def plot_quote_vs_coingecko(timestamps, coin_gecko_prices, actual_values, aggregator, source_chain, dest_chain):
    # Create figure
    fig, ax = plt.subplots(figsize=(12, 6))

    # Plot actual values
    ax.plot(timestamps, actual_values, label=f'{aggregator}', color='blue')

    # Plot CoinGecko Prices
    ax.plot(timestamps, coin_gecko_prices, label='coingecko', linestyle='--', color='orange')


    # Update layout
    ax.set_title(f'CoinGecko Price and Quoted Values\nSource Chain: {source_chain}, Dest Chain: {dest_chain}, Aggregator: {aggregator}')
    ax.set_xlabel('Timestamp')
    ax.set_ylabel('Price (USD)')
    ax.set_ylim(2150, 2450)
    ax.legend()

    # Set plot directory and filename
    plot_dir = 'benchmark-plots/coin_gecko_vs_quote'
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