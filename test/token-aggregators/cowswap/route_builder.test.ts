import { expect } from 'chai';
import fs from 'fs';

import { Quote } from '@benchmarking-cross-chain-bridges/token-aggregators/cowswap/types';
import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/cowswap/route_builder';

describe('should generate quotes for WETH -> USDC', () => {
    const sourceChain = 5;
    const destChain = 5;

    it('should create a WETH SELL order on WETH to USDC on GOERLI', (done) => {
        const fromToken = 'WETH';
        const toToken = 'USDC';
        const amount = (1 * 10 ** 18).toString();
        const operation = 'sell';

        build_route(sourceChain, destChain, fromToken, toToken, amount, operation).then((quote) => {
            fs.writeFileSync('run-data/token-routes/cowswap-route-sell.json', JSON.stringify(quote));
            expect(quote).to.not.equal(null);
            expect(parseInt(quote.quote.feeAmount)).greaterThan(0);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should create a USDC BUY order on USDC from WETH on GOERLI', (done) => {
        const fromToken = 'USDC';
        const toToken = 'WETH';
        const amount = (1 * 10 ** 6).toString();
        const operation = 'buy';
        build_route(sourceChain, destChain, fromToken, toToken, amount, operation).then((quote) => {
            fs.writeFileSync('run-data/token-routes/cowswap-route-buy.json', JSON.stringify(quote));
            expect(quote).to.not.equal(null);
            expect(parseInt(quote.quote.feeAmount)).greaterThan(0);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});
