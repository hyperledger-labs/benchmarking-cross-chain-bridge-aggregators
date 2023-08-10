Project structure:

```
src
├── helper
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
└── benchmark protocol
    └── route_builder.test.ts
```

Run: <br>
 `yarn run test:all`