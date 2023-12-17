# /benchmark-plots

### Coingecko vs Aggregator Quote

<details>

<summary>structure</summary>

```
benchmark-plots/coin_gecko_vs_quote
├── aggregator_sourcechain_to_destchain.pdf
└── aggregator_sourcechain_to_destchain.png

```



</details>

Contains plots that compare the coin gecko price against the aggregator's quote price.&#x20;

### Net Fee vs Gas Price

<details>

<summary>structure</summary>

```
benchmark-plots/net_fee_vs_gas_price
├── aggregator_sourcechain_to_destchain.pdf
└── aggregator_sourcechain_to_destchain.png
```

</details>

Plots that compare the aggregator fee + gas fee against the gas price of the source and destination networks (in case of cross-chain trades)

### Quote Difference

<details>

<summary>structure</summary>

```
benchmark-plots/quote_difference
├── aggregator_sourcechain_to_destchain.pdf
└── aggregator_sourcechain_to_destchain.png
```

</details>

These contain the difference in the aggregator quoted value and the coin gecko quoted value. This helps us find the difference in the token value between aggregators and between different swap chains with the same aggregator.&#x20;

### Over/Under Histogram

<details>

<summary>structure</summary>

```
over_under_histogram.pdf
over_under_histogram.png
```

</details>

Stores the number of quotes that have a +/- X% difference between the aggregator quote and coin gecko quote. This lets us find the variance in the aggregator quotes
