import plotly.graph_objects as go
from utils import create_plot_dir
import numpy as np

def plot_diff_in_quotes(timestamps, coin_gecko_prices, actual_values, aggregator, source_chain, dest_chain):
    diff_values = actual_values - coin_gecko_prices

    fig = go.Figure()
    fig.add_trace(go.Scatter(x=timestamps, y=diff_values, mode='lines', name='diff in quotes'))
    fig.update_layout(title=f'Difference in quotes for {aggregator} from {source_chain} to {dest_chain}', xaxis_title='Timestamp', yaxis_title='Aggregator Quote - CoinGecko Price')

    plot_dir = 'benchmark-plots/difference_in_quotes'
    plot_filename = f'{aggregator}_{source_chain}_to_{dest_chain}.png'

    create_plot_dir(fig, plot_dir, plot_filename)