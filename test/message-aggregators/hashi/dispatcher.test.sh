#!/bin/bash
echo "Testing Hyperlane"
original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env

echo "Testing Contracts"

# forge test --match-path="test/contracts/Hashi/*"

echo "Sending the source transaction"
echo "Testing Scripts (dry-run)"

echo "Deploying the contracts"

forge script script/Hashi/DeployYaho.s.sol:DeployYahoScript --rpc-url $GNOSIS_RPC_GNOSIS -vvvv
forge script script/Hashi/DeployYaru.s.sol:DeployYaruScript --rpc-url $ALCHEMY_RPC_GOERLI -vvvv
