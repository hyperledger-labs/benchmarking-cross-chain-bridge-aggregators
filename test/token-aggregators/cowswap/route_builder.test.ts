import { expect } from 'chai';
import fs from 'fs';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/cowswap/route_builder';

describe('Cowswap:Router', () => {
    describe('build_route', () => {
        it('should return a route for a MAINNET WETH to USDC swap', (done) => {
            const fromChain = 1;
            const fromToken = 'WETH';
            const toChain = 1;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                fs.writeFileSync('run-data/token-routes/cowswap-route.json', JSON.stringify(route));
                expect(route.id).to.not.equal(null);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a route for a GOERLI WETH to USDC swap', (done) => {
            const fromChain = 5;
            const fromToken = 'WETH';
            const toChain = 5;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route.id).to.not.equal(null);
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });
});