#!/bin/bash
#!/bin/bash
echo "Running Hyperlane"
# Change directory to the location of the script
original_dir=$(pwd)
cd "$(dirname "$0")"

# Load environment variables
cd "$original_dir"
source .env

mode=$1
rpc=$2
op=$3
contract_path=$4
shift 4

while [[ $# -gt 0 ]]; do
    case "$1" in
        --source_domain)
            export HYPERLANE_SOURCE_DOMAIN="$2"
            shift 2
            ;;
        --dest_domain)
            export HYPERLANE_DESTINATION_DOMAIN="$2"
            shift 2
            ;;
        --mailbox_address)
            export HYPERLANE_MAILBOX_ADDRESS="$2"
            shift 2
            ;;
        --igp_address)
            export HYPERLANE_IGP_ADDRESS="$2"
            shift 2
            ;;
        --number)
            export HYPERLANE_COUNTER_NUMBER="$2"
            shift 2
            ;;
        --gas)
            export HYPERLANE_GAS_AMOUNT="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

if [[ $op == "deploy" ]]; then
    verify="--verify"
elif [[ $op == "send" || $op == "call" ]]; then
    verify=""
fi

echo "Sending the source transaction"

BASE_COMMAND="forge script script/Hyperlane/$contract_path --rpc-url $rpc -vv"

# Check if --broadcast flag should be included
if [ "$mode" == "broadcast" ]; then
    FULL_COMMAND="$BASE_COMMAND --broadcast ${verify}"
    export TEST=false
else
    FULL_COMMAND="$BASE_COMMAND"
    export TEST=true
fi

echo "Executing command: $FULL_COMMAND"
# Execute the constructed command
eval "$FULL_COMMAND"