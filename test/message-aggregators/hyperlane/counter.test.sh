#!/bin/bash
echo "Testing Hyperlane"
original_dir=$(pwd)

cd "$(dirname "$0")"

cd "$original_dir"
source .env
echo "Testing Contracts"
forge test --match-path="test/contracts/Hyperlane/*"

echo "Testing Scripts (dry-run)"
echo "Deploying the counter contract"
forge script script/Hyperlane/DeployCounter.s.sol:DeployCounterScript --rpc-url $ALCHEMY_RPC_GOERLI -vvvv

echo "Sending the source transaction"
forge script script/Hyperlane/CounterSourceTx.s.sol:CounterSourceTxScript --rpc-url $ALCHEMY_RPC_MUMBAI -vvvv

# Pay gas on the source chain for mainnet deployment

echo "Goerli contract: https://goerli.etherscan.io/address/0x17c1bc8c169449228584b9c04b2472602e9423e1"

echo "Note that the value of number has changed from 0 to 20"

echo "Hyperlane explorer transaction: https://explorer.hyperlane.xyz/message/0xeea6da297e691ff37d1e5a90d4d62b33571d269c35476adf87407ea1e372dbbb"