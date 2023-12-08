import math
import plotly.graph_objects as go
from utils import create_plot_dir

def plot_net_fee_vs_gas_price(timestamps, source_gas_prices, dest_gas_prices, total_fees, aggregator, source_chain, dest_chain):
    fig = go.Figure()

    # Plotting Net Fees
    fig.add_trace(go.Scatter(x=timestamps, y=total_fees, mode='lines', name='Total Fee', line=dict(color='blue')))

    print(total_fees)
    source_price_scale = max(total_fees) / max(source_gas_prices)
    dest_price_scale = max(total_fees) / max(dest_gas_prices)
    if source_price_scale == 0:
        source_price_scale = 10
    if dest_price_scale == 0:
        dest_price_scale = 10
    source_price_scale = int(math.log(source_price_scale, 10))
    dest_price_scale = int(math.log(dest_price_scale, 10))
    source_gas_prices = [gas_price * 10**source_price_scale for gas_price in source_gas_prices]
    dest_gas_prices = [gas_price * 10**dest_price_scale for gas_price in dest_gas_prices]
    print(source_gas_prices)
    print(dest_gas_prices)

    # Update layout
    fig.update_layout(
        title=f'Total Fee (USD) vs. Gas Price (USD, scaled)<br>Source Chain: {source_chain}, Dest Chain: {dest_chain}, Aggregator: {aggregator}',
        xaxis_title='Timestamp',
        yaxis_title='total fee',
        showlegend=True
    )

    # Create a secondary y-axis for Gas Prices
    fig.add_trace(go.Scatter(x=timestamps, y=source_gas_prices, mode='lines', name=f' {source_chain.lower()} gas price (scale 10e{source_price_scale})', line=dict(color='gray', dash='dash')))

    fig.add_trace(go.Scatter(x=timestamps, y=dest_gas_prices, mode='lines', name=f' {dest_chain.lower()} gas price (scale 10e{dest_price_scale})', line=dict(color='black', dash='dash')))

    plot_dir = 'benchmark-plots/net_fee_vs_gas_price'
    plot_filename = f'{aggregator}_{source_chain}_to_{dest_chain}.png'

    create_plot_dir(fig, plot_dir, plot_filename)