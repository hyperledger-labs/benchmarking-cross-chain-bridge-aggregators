#!/bin/bash
echo "Running CCIP"
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

verify=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --router_address)
            export CCIP_ROUTER_ADDRESS="$2"
            shift 2
            ;;
        --link_address)
            export CCIP_LINK_ADDRESS="$2"
            shift 2
            ;;
        --number)
            export CCIP_NUMBER="$2"
            shift 2
            ;;
        --domain_identifier)
            export CCIP_DESTINATION_DOMAIN="$2"
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

BASE_COMMAND="forge script script/CCIP/$contract_path --rpc-url $rpc -vv"

# Check if --broadcast flag should be included
if [ "$mode" == "broadcast" ]; then
    FULL_COMMAND="$BASE_COMMAND --broadcast ${verify}"
    export TEST=false
else
    FULL_COMMAND="$BASE_COMMAND"
    export TEST=true
fi

# Execute the constructed command
eval "$FULL_COMMAND"