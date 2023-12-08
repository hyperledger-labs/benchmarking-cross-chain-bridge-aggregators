import plotly.graph_objects as go
from utils import create_plot_dir

def plot_net_fee_vs_gas_price(timestamps, gas_prices, net_fees, aggregator, source_chain, dest_chain):
    fig = go.Figure()

    # Plotting Net Fees
    fig.add_trace(go.Scatter(x=timestamps, y=net_fees, mode='lines', name='Net Fee', line=dict(color='blue')))

    # Update layout
    fig.update_layout(
        title=f'Net Fee vs. Gas Price<br>Source Chain: {source_chain}, Dest Chain: {dest_chain}, Aggregator: {aggregator}',
        xaxis_title='Timestamp',
        yaxis_title='Net Fee (USD)',
        showlegend=True
    )

    # Create a secondary y-axis for Gas Prices
    fig.add_trace(go.Scatter(x=timestamps, y=gas_prices, mode='lines', name='Gas Price', line=dict(color='gray', dash='dash')))

    plot_dir = 'benchmark-plots/net_fee_vs_gas_price'
    plot_filename = f'{aggregator}_{source_chain}_to_{dest_chain}.png'

    create_plot_dir(fig, plot_dir, plot_filename)