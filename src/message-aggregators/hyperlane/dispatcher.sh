#!/bin/bash

# Change directory to the location of the script
original_dir=$(pwd)
cd "$(dirname "$0")"

# Load environment variables
cd "$original_dir"
source .env

# Set source and destination domains
export HYPERLANE_SOURCE_DOMAIN="$1"
export HYPERLANE_DESTINATION_DOMAIN="$2"

# Deploy the counter contract
echo "Deploying the counter contract on network: $HYPERLANE_SOURCE_DOMAIN"
forge script script/Hyperlane/Hyperlane_DeployDestinationChainContracts.s.sol:DeployCounterScript --rpc-url $RPC_GOERLI --broadcast --verify

# Send the source transaction
echo "Sending the source transaction on network: $HYPERLANE_DESTINATION_DOMAIN"
forge script script/Hyperlane/Hyperlane_CounterSourceTx.s.sol:CounterSourceTxScript --rpc-url $RPC_MUMBAI --broadcast