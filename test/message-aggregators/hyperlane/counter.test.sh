#!/bin/bash
echo "Testing Hyperlane"
original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env
echo "Testing Contracts"
forge test --match-path="test/contracts/Hyperlane/*"

echo "Testing Scripts (dry-run)"
forge script script/Hyperlane/Counter_source_tx.s.sol:CounterSourceScript --fork-url $ALCHEMY_RPC_GOERLI
forge script script/Hyperlane/Counter_igp_gas.s.sol:CounterIGPPayScript --fork-url $ALCHEMY_RPC_GOERLI