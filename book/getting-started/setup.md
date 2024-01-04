# Setup

This section walks you through setting up the project:



Once you've cloned the repository.

```sh
cd benchmarking-cross-chain-bridges
yarn setup
```

If you face an error that says:&#x20;

> Detected dubious ownership in repository at '\<path>/benchmarking-cross-chain-bridges'

Just copy paste the exception line that goes something like&#x20;

```sh
git config --global --add safe.directory <path>/benchmarking-cross-chain-bridges
```

and then re-run

```sh
yarn setup
```

If yarn package installation and foundry package installation are successful you will see: &#x20;

```
Run `yarn setup:conda` or `yarn setup:pip3` to install python dependencies
```

This is required for the benchmark plot and table generators. Depending on the python package manager you use, you can run either.



If you only want to benchmark the token-aggregators, you're done here. If not then proceed with the optional setup which configures the benchmarking tool to execute message-aggregators and execute token-swaps

#### Optional Setup for executing swaps and message-aggregators (not required for benchmarking token-aggregators)

```sh
cp .env.dev .env
```

And fill out .env

#### .env

```sh
# KEYS
KEY_PUBLIC="0x"
KEY_PRIVATE="0x"

# RPC URL - Mainnet
RPC_ETHEREUM= 
RPC_POLYGON=
RPC_GNOSIS=

# RPC URL - Testnet
RPC_GOERLI=
RPC_SEPOLIA=
RPC_MUMBAI=

# Aggregator API Keys
SOCKET_API_KEY=

# Block explorer API keys
ETHERSCAN_API_KEY=
POLYSCAN_API_KEY=
GNOSISCAN_API_KEY=
```

The public and private keypair does not need to hold funds. The scripts that send trades are disabled by default.&#x20;



The RPCs are required to interact with on-chain contracts for foundry, approval transactions, and executing trades.&#x20;



Socket API Key is required by Socket to receive a transaction with route data. You can request it at a google form located in:

{% embed url="https://docs.socket.tech/socket-api/v2/guides/socket-api-ethers.js-examples/single-tx-example" %}

The Block explorer APIs are for verifying contracts&#x20;
