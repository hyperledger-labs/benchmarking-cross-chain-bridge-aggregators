import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from utils import create_plot_dir

def plot_histogram_quote_diff():
    # Read the data from the CSV files
    df_over = pd.read_csv("benchmark-tables/price_diff_table_over.csv")
    df2_under = pd.read_csv("benchmark-tables/price_diff_table_under.csv")

    # Combine the two datasets
    df = pd.concat([df_over, df2_under])

    # Define the over/under ranges
    ranges = ["1%", "1-5%", "5-10%", "10-20%", "20-30%", ">=30%"]

    # Initialize lists to store the total over/under for each range
    total_over = []
    total_under = []

    # Iterate over the ranges and calculate the total over/under for each
    for i, r in enumerate(ranges):
        over_col = df_over.columns[i + 3]
        under_col = df2_under.columns[i + 3]

        total_over.append(df[over_col].sum())
        total_under.append(df[under_col].sum())

    # Plot the side-by-side bars using Matplotlib
    bar_width = 0.35
    index = np.arange(len(ranges))

    fig, ax = plt.subplots()
    ax.bar(index, total_over, bar_width, label='Over', color='skyblue')
    ax.bar(index + bar_width, total_under, bar_width, label='Under', color='orange')

    ax.set_title('Total Over/Under Quotes vs CoinGecko for Each Range Across Protocols')
    ax.set_xlabel('Over/Under Ranges')
    ax.set_ylabel('Total Over/Under')
    ax.set_xticks(index + bar_width / 2)
    ax.set_xticklabels(ranges)
    ax.legend()

    # Set plot directory and filename
    plot_dir = 'benchmark-plots'
    plot_filename = "over_under_histogram"

    # Create plot directory and save the plot
    create_plot_dir(fig, plot_dir, plot_filename)

    # Close the figure
    plt.close(fig)

# Call the function to generate and display the plot
plot_histogram_quote_diff()
