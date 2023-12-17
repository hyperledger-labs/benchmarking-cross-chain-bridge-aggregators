# /benchmark-data

### Coingecko Price

<details>

<summary>structure</summary>

```
benchmark-data/coin_gecko_price
└── run-id
    ├── ETH-MATIC.json
    └── WETH-USD.json

```

</details>

Contains the coingecko price pairs for the token pairs used in a trade. This is used to work around coingeckos rate limits. We save the token pair pricing information and use the same for all aggregators that use the same pair to trade on. This standardizes the token pricing.&#x20;

### Aggregator

<details>

<summary>structure</summary>

```
benchmark-data/aggregator
└── Source Blockchain
    └── Destination Blockchain
        ├── run id.json
        └── run id.quote.json

```

</details>

Categorized by source-chain/dest-chain we store the raw quote in the aggregator's format as well as the  Benchmarker's APIReport format. We plan on adding a script that recomputes the APIReport from the raw quotes, this allows us to manipulate the stored data to generate different variations of the saved data. &#x20;

### Logs

<details>

<summary>structure</summary>

```
benchmark-data/logs
└── log batch run id
    └── benchmark run id.log

```

</details>

Contains the run logs for transactions, by default all should either pass or skip. Whenever a failure is identified it means the aggregator is either down or can not create a trade.&#x20;
