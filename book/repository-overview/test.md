# /test

### Foundry Contracts

<details>

<summary>structure</summary>

```
test/foundry-contracts/aggregator
└── Contract.t.sol
```

</details>

Foundry testing scripts that run fuzz and static tests on the smart contracts. They run on a forked network.

### Helper

<details>

<summary>structure</summary>

```
test/helper
├── provider.test.ts
└── token_misc.test.ts
```

</details>

Tests the provider and token\_misc scripts by checking if the functions validate the .env for keys, rpc urls, etc. Token misc checks if the event listening works correctly.&#x20;

### Message Aggregator

<details>

<summary>structure</summary>

```
test/message-aggregators/aggregator
├── Deploy Contract.test.ts
└── Transaction Sender.test.ts
```

</details>

These contain the runners for deploying contracts and sending transactions by interacting with the scripts in [#message-aggregators](src.md#message-aggregators "mention"). By default they are set to test, which only interact on a local fork. Setting the mode to "broadcast" will execute on a live network.&#x20;

### Token Aggregator

<details>

<summary>structure</summary>

```
test/token-aggregators/token-aggregator
├── Route Executor.test.ts
└── Route Builder.test.ts
```

</details>

route builder creates routes by calling the route\_builder scripts from [#token-aggregators](src.md#token-aggregators "mention"). They contain different token pairs and values to trade on, notably all of them have a 1 ETH/WETH to USDC on same and cross-chain wherever applicable. They also store the quotes generated [#run-data](miscellaneous.md#run-data "mention").

The execute route runs the functions that sign a transaction and submit a swap. By default the submit transactions are skipped so as to not using the user's funds.&#x20;
