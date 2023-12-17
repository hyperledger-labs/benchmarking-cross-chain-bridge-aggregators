import matplotlib.pyplot as plt
from utils import create_plot_dir
import matplotlib
matplotlib.use('Agg')

def plot_net_fee_vs_gas_price(timestamps, gas_prices_source, gas_prices_dest, total_fees, aggregator, source_chain, dest_chain):
    """
    Plots the net fee vs gas price for a given set of data.

    Parameters:
    - timestamps (list): List of timestamps for the data points.
    - gas_prices_source (list): List of gas prices on the source chain.
    - gas_prices_dest (list): List of gas prices on the destination chain.
    - total_fees (list): List of total fees.
    - aggregator (str): Aggregator name.
    - source_chain (str): Source chain name.
    - dest_chain (str): Destination chain name.

    Returns:
    - dict: A dictionary containing the plots for same_chain and cross_chain scenarios.
    """
    # Create figure
    fig, ax1 = plt.subplots(figsize=(12, 6))

    # Plotting Net Fees
    ax1.plot(timestamps, total_fees, label=f'Total Fee {aggregator}', color='blue')
    ax1.set_xlabel('Timestamp')
    ax1.set_ylabel('Total Fee', color='blue')
    ax1.tick_params('y', colors='blue')
    ax1.set_ylim(0, 200)


    # Create a secondary y-axis for Gas Prices on Source Chain
    ax2 = ax1.twinx()
    ax2.plot(timestamps, gas_prices_source, label=f'Gas Price ({source_chain.lower()})', linestyle='--', color='gray')
    ax2.set_ylabel(f'Gas Price ({source_chain.lower()})', color='gray')
    ax2.tick_params('y', colors='gray')

    if source_chain != dest_chain:
        # Create a tertiary y-axis for Gas Prices on Destination Chain
        ax3 = ax1.twinx()
        ax3.spines['right'].set_position(('outward', 60))
        ax3.plot(timestamps, gas_prices_dest, label=f'Gas Price ({dest_chain.lower()})', linestyle='--', color='black')
        ax3.set_ylabel(f'Gas Price ({dest_chain.lower()})', color='black')
        ax3.tick_params('y', colors='black')

    # Update layout
    if source_chain == dest_chain:
        plt.title(f'Total Fee (USD) vs. Gas Prices (USD)\nSource Chain: {source_chain}, Aggregator: {aggregator}')
    else:
        plt.title(f'Total Fee (USD) vs. Gas Prices (USD)\nSource Chain: {source_chain}, Dest Chain: {dest_chain}, Aggregator: {aggregator}')

    # Set plot directory and filename
    plot_dir = 'benchmark-plots/net_fee_vs_gas_price'
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