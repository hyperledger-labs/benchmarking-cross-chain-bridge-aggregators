import { expect } from 'chai';
import fs from 'fs';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/xy/route_builder';

describe('XY:Router', () => {
    describe('build_route - should return route', () => {
        it('should return a quote for a ETHEREUM WETH to ETHEREUM USDC swap', (done) => {
            const fromChain = 1;
            const fromToken = 'WETH';
            const toChain = 1;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route.success).to.equal(true);
                fs.writeFileSync('run-data/token-routes/xy-route-same-chain.json', JSON.stringify(route));
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a quote for a ETHEREUM WETH to MATIC USDC swap', (done) => {
            const fromChain = 1;
            const fromToken = 'WETH';
            const toChain = 137;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                fs.writeFileSync('run-data/token-routes/xy-route-cross-chain.json', JSON.stringify(route));
                expect(route.success).to.equal(true);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a quote for a MATIC WETH to ETHEREUM USDC swap', (done) => {
            const fromChain = 137;
            const fromToken = 'WETH';
            const toChain = 1;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route.success).to.equal(true);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should fail to return a quote for a GOERLI WETH to USDC swap', (done) => {
            const fromChain = 5;
            const fromToken = 'WETH';
            const toChain = 5;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route.success).to.equal(false);
                done();
            }).catch((error) => {
                expect(error.message).to.equal('Invalid chain_id: 5 for protocol: XY');
                done();
            });
        });
    });
});