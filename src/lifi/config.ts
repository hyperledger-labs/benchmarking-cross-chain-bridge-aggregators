import fetch, { Headers, Request, Response } from 'cross-fetch';
import { LiFi } from '@lifi/sdk';

if (!globalThis.fetch) {
    const globalThisAny = globalThis
    globalThisAny.fetch = fetch
    globalThisAny.Headers = Headers
    globalThisAny.Request = Request
    globalThisAny.Response = Response
}

const lifi = new LiFi({
    integrator: 'hyperledger-benchmarking-cross-chain-bridges',
});

export { lifi };
