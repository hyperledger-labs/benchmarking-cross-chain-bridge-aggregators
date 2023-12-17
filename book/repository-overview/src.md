# /src

### Benchmark

<details>

<summary>structure</summary>

```
src/benchmark/
├── report-gen
│   ├── helper.ts
│   └── token-aggregators
│       ├── cowswap.ts
│       └── aggregator.ts
├── result
│   ├── data_loader.py
│   ├── utils.py
│   ├── Plot Generators.py
│   ├── Table Generators.py
│   └── result_runner.py
├── runners
│   └── token-aggregators
│       ├── auto_run.sh
│       └── aggregator.benchmark.ts
└── types
    └── APIReport.ts

```

</details>

Report-gen contains the parsing scripts for each of the token-aggregators. These scripts convert the aggregator quotes into APIReport, which is the benchmarking framework that we use to standardize collected data.&#x20;

Helper.ts contains the file handlers that creates run id's of each report. Reports are categorized by their source and destination chains. It also handles querying coingecko to get a price feed, these are logged by run id and token swap pair.&#x20;

The runners are simply scripts that control the execution of the report-gen scripts. The auto\_run.sh is a helpful script that automates script running. It is by default set to run  3 times with a 5 minute interval:

```sh
yarn run benchmark:auto
```

### Foundry Contracts

<details>

<summary>structure</summary>

```
src/foundry-contracts/Aggregator
└── Sender and Receiver Contracts.sol
```

</details>

Here we have the contracts that are used by  [script.md](script.md "mention"). These contracts are the bare-bones implementations of a number storage contract for each aggregator. We reduced each to the minimum so as to standardize them across protocol.s

### Helper

<details>

<summary>structure</summary>

```
src/helper/
├── constants_global.ts
├── inp_validator.ts
├── provider.ts
├── token_misc.ts
└── transaction_parser.ts
```

</details>

Here we have all the scripts used by all the token or message aggregators. This included chain information for different networks like Ethereum, Polygon, Sepolia where we store chain id, token addresses, smart contract addresses for aggregators.

Input validator checks if the asserts script inputs, such as supported networks by a protocol, makes sure the source and destination tokens are not different, checks if the user's keys are input, if the RPC URLs exist, etc.

Provider is associated with transactions and other blockchain related tasks such as signing transactions, sending transactions, getting network gas price, etc.

Token misc handles token specific interactions such as ERC-20 Allowance, getting token balance at a particular block number, monitoring events for transfer, etc.&#x20;

Transaction parser the other side of the coin to /script [#helper](script.md#helper "mention"). This contains the file interacting scripts to read deployed contract addresses, get transaction data, etc. It lets our typescript scripts interact with the generated foundry data.

### Message Aggregators

<details>

<summary>structure</summary>

```
src/message-aggregators/message-aggregator
├── constants_local.ts
├── deployed_addresses.json
├── dispatcher.sh
└── dispatcher.ts
```

</details>

These are the runners for message aggregators.

Constants local contains local information such as file parsing, aggregator specific constants such as domain identifiers, script contract mapping.

Deployed Addresses is created by the foundry scripts when they run a script that creates a new contract.&#x20;

Dispatcher.ts collects user input, verifies them, and runs dispatcher.ts which interacts with the scripts by feeding them inputs for different parameters. Once the scripts complete they parse the generated output based on their type which could be one of deploy, send, call. The three operations that a user can perform. Think of these are REST APIs but for blockchain.&#x20;

By default they do not interact with a network. The default mode is set to test which can be set to broadcast, which executes transaction on networks.&#x20;

### Token Aggregators

<details>

<summary>structure</summary>

```
src/token-aggregators/token-aggregator
├── config.ts
├── constants_local.ts
├── execute_route.ts
├── route_builder.ts
└── types.ts
```

</details>

Runs token aggregator scripts. All token aggregator scripts are in typescript.&#x20;

config.ts contains any configuration required for the SDKs

constants local functions similarly to the one in message-aggregators where they contain token-aggregator specific helper scripts. Some only contain constants while others contain functions that are used by route\_builder.

route\_builder generates a route based on it's input, we use urls whenever a protocol does not support an sdk. First the script verifies the input data, then generates a route request and then returns a route object.&#x20;

execute\_route executes the received routes, it collects the route, signs it using the provider scripts from  [#helper](src.md#helper "mention"). There are usually two phases here, one that signs the transaction and another that submits.

types contains typescript typings for the aggregators, such as the quote, execution quote, and routes in events that the SDK does not provide us with typing.&#x20;
