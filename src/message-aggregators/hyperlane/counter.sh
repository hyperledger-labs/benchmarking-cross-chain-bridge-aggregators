#!/bin/bash

original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env

echo "Deploying the counter contract"
forge script script/Hyperlane/DeployCounter.s.sol:DeployCounterScript --rpc-url $ALCHEMY_RPC_GOERLI --broadcast -vvvv --verify

echo "Sending the source transaction"
forge script script/Hyperlane/CounterSourceTx.s.sol:CounterSourceTxScript --rpc-url $ALCHEMY_RPC_MUMBAI --broadcast -vvvv