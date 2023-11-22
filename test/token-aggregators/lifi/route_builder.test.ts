import fs from 'fs';
import { expect } from 'chai';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/lifi/route_builder';
import { skip } from 'node:test';

describe('LiFi:Router', () => {
    describe('build_route - return route OR status 429 (rate limit)', () => {
        it('should return a route for a GOERLI WETH to GOERLI USDC swap', (done) => {
            const fromChain = 5;
            const fromToken = 'ETH';
            const toChain = 5;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }).catch((error) => {
                if (error.message === 'Request failed with status: 429') {
                    console.error('Rate Limited (status: 429)');
                    skip();
                    done();
                } else {
                    done(error);
                }
            });
        });

        it('should return a route for a ETHEREUM WETH to MATIC USDC swap', (done) => {
            const fromChain = 1;
            const fromToken = 'WETH';
            const toChain = 137;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                fs.writeFileSync('run-data/token-routes/lifi-route.json', JSON.stringify(route));

                expect(route).to.not.equal(null);
                done();
            }).catch((error) => {
                if (error.message === 'Request failed with status: 429') {
                    console.error('Rate Limited (status: 429)');
                    skip();
                    done();
                } else {
                    console.error(error);
                    done(error);
                }
            });
        });

        it('should return a route for a ETHEREUM WETH to USDC swap', (done) => {
            const fromChain = 1;
            const fromToken = 'WETH';
            const toChain = 1;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }).catch((error) => {
                if (error.message === 'Request failed with status: 429') {
                    console.error('Rate Limited (status: 429)');
                    skip();
                    done();
                } else {
                    done(error);
                }
            });
        });

        it('should return a route for a MATIC WETH to ETHEREUM USDC swap', (done) => {
            const fromChain = 137;
            const fromToken = 'WETH';
            const toChain = 1;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }).catch((error) => {
                if (error.message === 'Request failed with status: 429') {
                    console.error('Rate Limited (status: 429)');
                    skip();
                    done();
                } else {
                    done(error);
                }
            });
        });
    });
});