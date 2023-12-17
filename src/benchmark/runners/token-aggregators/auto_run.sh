#!/bin/bash

# Usage: ./auto_run.sh --time-interval <time_interval_in_seconds> --time_scale <time_scale> --run-count <run_count>
# time_interval: time interval in seconds
# time_scale: time scale (s, m, h, d)
# run_count: number of times the benchmark should run

# Example: ./auto_run.sh --time-interval 60 --time-scale s --run-count 10

# Default values
time_interval=60
time_scale="s"
run_count=10

# Parse command line arguments
while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        -i|--time-interval)
        time_interval="$2"
        shift
        shift
        ;;
        -s|--time-scale)
        time_scale="$2"
        shift
        shift
        ;;
        -c|--run-count)
        run_count="$2"
        shift
        shift
        ;;
        *)
        echo "Unknown option: $key"
        exit 1
        ;;
    esac
done

# Convert time interval to seconds
case $time_scale in
    s)
    time_interval=$((time_interval))
    ;;
    m)
    time_interval=$((time_interval*60))
    ;;
    h)
    time_interval=$((time_interval*60*60))
    ;;
    d)
    time_interval=$((time_interval*60*60*24))
    ;;
    *)
    echo "Unknown time scale: $time_scale"
    exit 1
    ;;
esac

# Function to print a progress bar
function print_progress_bar {
    local progress=$1
    local bar_length=30
    local bar=$(printf "%0.s=" $(seq 1 $((progress * bar_length / 100))))
    local spaces=$(printf "%0.s " $(seq 1 $((bar_length - progress * bar_length / 100))))
    printf "\rSleeping for %d sec [%s%s] %d%%" "$time_interval" "$bar" "$spaces" "$progress"
}


# Function to print elapsed time
function print_elapsed_time {
    local elapsed_time=$1
    printf "Elapsed time: %02d:%02d" $((elapsed_time / 60)) $((elapsed_time % 60))
}

echo "Running token aggregator benchmark $run_count times with $time_interval second intervals between each run"

# Create the logs directory if it doesn't exist
if [ ! -d "./benchmark-data/logs" ]; then
  mkdir -p ./benchmark-data/logs
fi

# Create a new directory for the logs and get the new run id
file_count=$(ls -1 ./benchmark-data/logs | wc -l)
file_count=$((file_count+1))
mkdir ./benchmark-data/logs/log-$file_count

NODE_NO_WARNINGS=1

for ((i=1; i<=$run_count; i++))
do
    echo "Running benchmark $i of $run_count times"

    # Run the benchmark in the background, redirecting stderr to /dev/null
    start_time=$(date +%s)
    yarn run benchmark:token-aggregators > ./benchmark-data/logs/log-$file_count/benchmark_$i.log 2>/dev/null &
    benchmark_pid=$!

    # Show elapsed time while the benchmark is running
    while ps -p $benchmark_pid > /dev/null; do
        elapsed_time=$(( $(date +%s) - start_time ))
        print_elapsed_time $elapsed_time
        sleep 1
        printf "\r%-${COLUMNS}s\r" ""
    done

    # Wait for the benchmark to complete before proceeding to the next iteration
    wait $benchmark_pid

    if [ $i -eq $((run_count)) ]; then
        break
    fi

    # Print the progress bar while sleeping
    for ((j=0; j<=100; j+=5))
    do
        print_progress_bar $j
        sleep $(($time_interval/20))  # Sleep in smaller intervals to update the progress bar
    done

    # Clear the progress bar
    printf "\r%-${COLUMNS}s\r" ""
done

# Print a newline after the loop completes
echo ""
