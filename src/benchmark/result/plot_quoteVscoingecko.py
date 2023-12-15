import plotly.graph_objects as go
from utils import create_plot_dir

def plot_quote_vs_coingecko(timestamps, coin_gecko_prices, actual_values, aggregator, source_chain, dest_chain):
    fig = go.Figure()

    # Add Scatter Trace for CoinGecko Prices
    fig.add_trace(go.Scatter(x=timestamps, y=coin_gecko_prices, mode='lines', name='coingecko'))

    # Add Scatter Trace for Actual Values
    fig.add_trace(go.Scatter(x=timestamps, y=actual_values, mode='lines', name=f'{aggregator}'))

    # Update layout
    fig.update_layout(
        title=f'CoinGecko Price and Quoted Values<br>Source Chain: {source_chain}, Dest Chain: {dest_chain}, Aggregator: {aggregator}',
        xaxis_title='Timestamp',
        yaxis_title='Price (USD)',
        yaxis=dict(range=[2150, 2410]),
        showlegend=True
    )

    plot_dir = 'benchmark-plots/coin_gecko_vs_quote'
    plot_filename = f'{aggregator}_{source_chain}_to_{dest_chain}'

    create_plot_dir(fig, plot_dir, plot_filename)