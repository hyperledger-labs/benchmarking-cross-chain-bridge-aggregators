import os

def create_plot_dir(fig, plot_dir, plot_filename):
    os.makedirs(plot_dir, exist_ok=True)

    plot_filename = f'{plot_dir}/{plot_filename}'

    fig.write_image(plot_filename + '.png', format='png')
    print(f'Plot saved to: {plot_dir}/{plot_filename}')

    fig.write_image(plot_filename + '.pdf', format='pdf')
    print(f'PDF Plot saved to: {plot_filename}')