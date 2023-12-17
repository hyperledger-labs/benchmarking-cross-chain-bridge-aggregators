# Test

```sh
yarn run test:all
```

Runs tests for everything. The includes token aggregators, message aggregators, helper, and foundry contracts. It requires entering the RPC URL of the sepolia network in package.json under the script `test:foundry-contracts`

```sh
yarn run test:token-aggregators
```

Runs tests for token aggregators, by checking the routes created, and signing transactions, and stores aggregator routes in [#run-data](../repository-overview/miscellaneous.md#run-data "mention"). Does not submit transactions as those scripts are skipped.&#x20;

```sh
yarn run test:message-aggregators
```

Runs test for message-aggregators in test mode.

```sh
yarn run test:aggregators
```

Runs tests for both message and token aggregators

```sh
yarn run test:foundry-contracts
```

Tests the foundry contracts. Requires a Sepolia network RPC URL in package.json under the script `test:foundry-contracts`

```sh
yarn run test:helper
```

Tests helper and provider scripts

```sh
yarn run test:<aggregator>
```

Tests individual aggregators&#x20;
