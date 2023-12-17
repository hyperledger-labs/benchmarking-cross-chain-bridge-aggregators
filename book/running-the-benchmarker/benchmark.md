# Benchmark

```sh
yarn run benchmark:auto
```

This is the script we expect users to run the most as it runs the auto\_run.sh from[#benchmark](../repository-overview/src.md#benchmark "mention")that batch logs quotes from API request to the aggregators. By default it runs a new batch every 5 minutes and runs 3 times. It is the same as:

```sh
./src/benchmark/runners/token-aggregators/auto_run.sh --time-interval 5 --time-scale m --run-count 3
```

```sh
yarn run benchmark:token-aggregator
```

Benchmarks all the token aggregators

```sh
yarn run benchmark:all
```

Benchmarks all the aggregators under [#benchmark](../repository-overview/src.md#benchmark "mention"). As of now, there are no message aggregators being benchmarked with scripts as they are manually benchmarked with the reports generated in [#broadcast-and-cache](../repository-overview/miscellaneous.md#broadcast-and-cache "mention").

```sh
yarn benchmark:<aggregator>
```

Allows you to benchmark individual aggregators, simply replace \<aggregator> with the aggregator you want to benchmark.&#x20;

Ex: `yarn` run `benchmark:cowswap`
