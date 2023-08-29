## Benchmarking Cross-Chain Bridges
This project aims to provide a systematic comparison between cross-chain bridge aggregators (message aggregators and token aggregators/DEXs).

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

## Running the project
The different testing modules of the project are implemented as scripts that can be ran via yarn or npm.

 ```shell
 yarn run test:all # runs tests for token and message aggregators
 ```

 ```shell
 yarn run test:helper # makes sure env variables are setup, networks are supported, transactions can be signed
 ```

 ```shell
 yarn run test:token-aggregators # generate the route.json files that contain the different trading routes and quotas
 ```
 ```shell
 yarn run test:message-aggregators # deploys contracts and issues transactions for interacting with the counter contracts 
 ```



## Run Transactions

```shell
yarn run:hyperlane # creates a hyperlane transaction on the goerli network
```
### Clear Run Logs

```shell
yarn clear:dry-run # clears foundry run logs
```

## Troubleshooting
This project was tested in a MacOS M1 v13.4 (22F66), node version v18.17.1.

Make sure you have permission to run the ``.sh``scripts. You may run ``chmod -R 777 .``. 

Sometimes running 

## Contributors
https://github.com/RafaelAPB
https://github.com/AndreAugusto11
https://github.com/shankars99


## Acknowledgments 
This project is sponsored by Hyperledger and Blockdaemon. 

