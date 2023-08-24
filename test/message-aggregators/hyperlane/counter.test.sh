#!/bin/bash
echo "Testing Hyperlane"
original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env

export HYPERLANE_SOURCE_DOMAIN=$1
export HYPERLANE_DESTINATION_DOMAIN=$2

echo "Testing Contracts"

forge test --match-path="test/contracts/Hyperlane/*"

echo "Sending the source transaction"
echo "Testing Scripts (dry-run)"
echo "Deploying the counter contract"

forge script script/Hyperlane/DeployCounter.s.sol:DeployCounterScript --rpc-url $ALCHEMY_RPC_GOERLI -vvvv
forge script script/Hyperlane/CounterSourceTx.s.sol:CounterSourceTxScript --rpc-url $ALCHEMY_RPC_MUMBAI -vvvv


echo "Goerli contract: https://goerli.etherscan.io/address/0x17c1bc8c169449228584b9c04b2472602e9423e1"

echo "Hyperlane explorer transaction: https://explorer.hyperlane.xyz/message/0xeea6da297e691ff37d1e5a90d4d62b33571d269c35476adf87407ea1e372dbbb"

echo "Note that the value of number has changed from 0 to 20"