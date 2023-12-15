import plotly.graph_objects as go
from utils import create_plot_dir

def plot_net_fee_vs_gas_price(timestamps, gas_prices_source, gas_prices_dest, total_fees, aggregator, source_chain, dest_chain):
    # Create figure
    fig = go.Figure()

    # Plotting Net Fees
    fig.add_trace(go.Scatter(x=timestamps, y=total_fees, mode='lines', name='Total Fee', line=dict(color='blue')))

    # Create a secondary y-axis for Gas Prices on Source Chain
    fig.add_trace(go.Scatter(x=timestamps, y=gas_prices_source, mode='lines', name=f'Gas Price ({source_chain.lower()})', line=dict(color='gray', dash='dash'), yaxis='y2'))

    if source_chain == dest_chain:
        # Update layout
        fig.update_layout(
            title=f'Total Fee (USD) vs. Gas Prices (USD)<br>Source Chain: {source_chain}, Aggregator: {aggregator}',
            xaxis_title='Timestamp',
            yaxis_title='Total Fee',
            showlegend=True,
            yaxis2=dict(title=f'Gas Price ({source_chain.lower()})', overlaying='y', side='right'),
        )
    else:
        # Create a tertiary y-axis for Gas Prices on Destination Chain
        fig.add_trace(go.Scatter(x=timestamps, y=gas_prices_dest, mode='lines', name=f'Gas Price ({dest_chain.lower()})', line=dict(color='black', dash='dash'), yaxis='y3'))

        # Update layout
        fig.update_layout(
            title=f'Total Fee (USD) vs. Gas Prices (USD)<br>Source Chain: {source_chain}, Dest Chain: {dest_chain}, Aggregator: {aggregator}',
            xaxis_title='Timestamp',
            yaxis_title='Total Fee',
            showlegend=True,
            yaxis2=dict(title=f'Gas Price ({source_chain.lower()})', overlaying='y', side='right'),
            yaxis3=dict(title=f'Gas Price ({dest_chain.lower()})', overlaying='y', side='right', position=0.5)  # Adjusted position value
        )

    # Set plot directory and filename
    plot_dir = 'benchmark-plots/net_fee_vs_gas_price'
    plot_filename = f'{aggregator}_{source_chain}_to_{dest_chain}'

    # Create plot directory and save the plot
    create_plot_dir(fig, plot_dir, plot_filename)