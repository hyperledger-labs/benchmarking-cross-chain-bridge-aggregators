#!/bin/bash
echo "Running Hashi Dispatcher"
original_dir=$(pwd)

mode=$1
rpc=$2
contract_path=$3

echo "mode: $mode"
echo "rpc: $rpc"
echo "contract_path: $contract_path"

cd "$(dirname "$0")"

cd "$original_dir"
source .env

echo "Testing Contracts"

# forge test --match-path="test/contracts/Hashi/*"

echo "Sending the source transaction"
echo "Testing Scripts (dry-run)"

BASE_COMMAND="forge script script/Hashi/$contract_path --rpc-url $rpc --verify"

# forge script script/Hashi/DeploySourceChainContracts.s.sol:DeployYahoScript --rpc-url $RPC_GNOSIS

# forge script script/Hashi/DeployDestinationChainContracts.s.sol:DeployYaruScript --rpc-url $RPC_GOERLI

# Check if --broadcast flag should be included
if [ "$mode" == "broadcast" ]; then
    FULL_COMMAND="$BASE_COMMAND --broadcast"
else
    FULL_COMMAND="$BASE_COMMAND"
fi

# Execute the constructed command
eval "$FULL_COMMAND"