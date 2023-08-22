#!/bin/bash

original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env

echo "Deploying the counter contract and sending the source tx"
forge script script/Hyperlane/Counter_source_tx.s.sol:CounterSourceScript --rpc-url $ALCHEMY_RPC_GOERLI --broadcast -vvvv

echo "Sending the IGP gas tx"
forge script script/Hyperlane/Counter_igp_gas.s.sol:CounterIGPPayScript --rpc-url $ALCHEMY_RPC_GOERLI --broadcast -vvvv