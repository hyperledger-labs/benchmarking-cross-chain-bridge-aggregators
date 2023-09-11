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
verify=""

if [[ $op == "deploy" ]]; then
    export CCIP_ROUTER_ADDRESS=$5
    export CCIP_LINK_ADDRESS=$6
    verify="--verify"
elif [[ $op == "send" || $op == "get" ]]; then
    export CCIP_NUMBER=$5
fi


echo "Testing Contracts"

forge test --match-path="test/foundry-contracts/CCIP/*" --rpc-url $rpc

echo "Sending the source transaction"

BASE_COMMAND="forge script script/CCIP/$contract_path --rpc-url $rpc"

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