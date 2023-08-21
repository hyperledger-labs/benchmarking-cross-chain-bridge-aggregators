#!/bin/bash

original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env

forge script script/Hyperlane/Counter.s.sol --rpc-url $DEVNET_RPC --broadcast -vvv