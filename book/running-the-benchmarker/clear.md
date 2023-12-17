# Clear

```sh
yarn run clear:dry-run
```

Clears the foundry dry-run folder.

```sh
yarn run clear:run-data
```

Clears the foundry run-data folder.

```sh
yarn run clear:logs
```

Clears [#logs](../repository-overview/benchmark-data.md#logs "mention")

```sh
yarn run clear:benchmark-data
```

Clears the logged [benchmark-data.md](../repository-overview/benchmark-data.md "mention").

It is disabled by default as I do not know why you would run that unless you are resetting, also is a security measure against accidental clears as collecting the data is a time-consuming task.

```sh
yarn run clear:benchmark-plots
```

Clears [benchmark-plots.md](../repository-overview/benchmark-plots.md "mention")

```sh
yarn run clear:benchmark-tables
```

Clears [benchmark-tables.md](../repository-overview/benchmark-tables.md "mention")

```sh
yarn run clear:all
```

Runs all of the above clear scripts
