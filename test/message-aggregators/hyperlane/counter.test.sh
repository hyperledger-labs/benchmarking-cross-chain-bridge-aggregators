#!/bin/bash

original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env

forge test --match-path="test/contracts/Hyperlane/*"
forge script script/Hyperlane/Counter.s.sol --fork-url $ALCHEMY_RPC_GOERLI -vvvv