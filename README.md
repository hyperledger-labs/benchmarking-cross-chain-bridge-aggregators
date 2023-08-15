Project structure:

```
src
├── helper
├── aggregator type
    │   ├── constants_global.ts
    │   ├── inp_validator.ts
    │   ├── provider.ts
    └── benchmark protocol
        ├── config.ts
        ├── constants_local.ts
        └── route_builder.ts

test
├── helper
│   └── provider.test.ts
├── aggregator type
    └── benchmark protocol
        └── route_builder.test.ts
```

Run: <br>
 ```
 yarn run test:all # runs tests for token and message aggregators
 ```
 ```
 yarn run test:token-aggregators # runs tests for token aggregators
 ```
  ```
 yarn run test:bridge-aggregators # runs tests for bridge aggregators
 ```