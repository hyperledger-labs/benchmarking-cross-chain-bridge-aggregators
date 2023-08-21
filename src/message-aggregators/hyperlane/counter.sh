#!/bin/bash

original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env

forge script script/Hyperlane/Counter.s.sol:CounterScript --rpc-url $ALCHEMY_RPC_GOERLI --broadcast --verify -vvvv