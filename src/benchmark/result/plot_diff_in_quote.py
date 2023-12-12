import plotly.graph_objects as go
from utils import create_plot_dir
import numpy as np

def plot_diff_in_quotes(timestamps, coin_gecko_prices, actual_values, aggregator, source_chain, dest_chain):
    diff_values = actual_values - coin_gecko_prices

    y_axis_start = -150
    y_axis_end = 50

    y_axis_range = np.arange(y_axis_start, y_axis_end, 10)

    fig = go.Figure()

    # Add Scatter Trace for Difference in Quotes
    fig.add_trace(go.Scatter(x=timestamps, y=diff_values, yaxis='y', mode='lines', name='Difference in Quotes'))

    # Add Scatter Trace for Zero Line
    fig.add_trace(go.Scatter(x=timestamps, y=np.zeros(len(timestamps)), mode='lines', name='Zero Line'))

    # Update layout
    fig.update_layout(
        title=f'Difference in Quotes\nSource Chain: {source_chain}, Dest Chain: {dest_chain}, Aggregator: {aggregator}',
        xaxis_title='Timestamp',
        yaxis_title='Difference',
        showlegend=True,
        yaxis=dict(range=[y_axis_start, y_axis_end])
    )

    plot_dir = 'benchmark-plots/difference_in_quotes'
    plot_filename = f'{aggregator}_{source_chain}_to_{dest_chain}.png'

    create_plot_dir(fig, plot_dir, plot_filename)
