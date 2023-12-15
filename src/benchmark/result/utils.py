import os

def create_plot_dir(fig, plot_dir, plot_filename):
    os.makedirs(plot_dir, exist_ok=True)

    plot_filename = f'{plot_dir}/{plot_filename}'

    fig.savefig(plot_filename + '.png', format='png', bbox_inches='tight')
    print(f'Plot saved to: {plot_dir}/{plot_filename}')

    fig.savefig(plot_filename + '.pdf', format='pdf', bbox_inches='tight')
    print(f'PDF Plot saved to: {plot_filename}')