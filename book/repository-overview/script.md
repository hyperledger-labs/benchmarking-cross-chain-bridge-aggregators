# /script

### Helper

<details>

<summary>structure</summary>

```
script/Helper
└── Helper.s.sol
```

</details>

Helper.s.sol contains scripts that interact with the filesystem. It saves logs, deployed contract addresses, gets transaction data from foundry's  [#broadcast-and-cache](miscellaneous.md#broadcast-and-cache "mention")

&#x20;By default they are set to TEST mode where the transactions happen on a forked network.&#x20;

### Aggregator

<details>

<summary>structure</summary>

```
script/Aggregator
├── Transaction Senders.s.ol 
└── Contract Seployers.s.sol
```

</details>

This deploys the required contracts, the inputs to the contracts are command line generated from&#x20;

[#message-aggregators](src.md#message-aggregators "mention"). By default all transactions are executed on a forked network.
