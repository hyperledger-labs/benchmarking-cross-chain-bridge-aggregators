import os

def create_plot_dir(fig, plot_dir, plot_filename):
    os.makedirs(plot_dir, exist_ok=True)

    plot_filename = f'{plot_dir}/{plot_filename}'
    fig.write_image(plot_filename)
    print(f'Plot saved to: {plot_dir}/{plot_filename}')