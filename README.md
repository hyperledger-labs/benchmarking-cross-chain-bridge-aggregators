## Project Structure

```
scripts
└── benchmark message protocol
        └── contracts.s.sol

src
├── contracts
├── helper
│   ├── inp_validator.ts
│   ├── provider.ts
│   ├── token-constants_global.ts
│   └── token-misc.ts
├── token aggregator
│   └── benchmark protocol
│       ├── config.ts
│       ├── constants_local.ts
│       └── route_builder.ts
└─ message aggregator
    └── benchmark protocol
        └── counter.sh

test
├── helper
│   └── provider.test.ts
├── token aggregator
│   └── benchmark protocol
│       └── route_builder.test.ts
└── message aggregator
    └── benchmark protocol
        └── counter.test.sh
```

## Testing
 ```shell
 yarn run test:all # runs tests for token and message aggregators
 ```
 ```shell
 yarn run test:token-aggregators # runs tests for token aggregators
 ```
 ```shell
 yarn run test:message-aggregators # runs tests for message aggregators
 ```

### Run Transactions

```shell
yarn run:hyperlane # creates a hyperlane transaction on the goerli network
```
### Clear Run Logs

```shell
yarn clear:dry-run # clears foundry run logs
```
