import { expect } from 'chai';

import { build_route } from '../../src/cowswap/route_builder';

describe('CoW:Router', () => {
    describe('build_route', () => {
        it('should return a quote for a MAINNET WETH to USDC swap', (done) => {
            const fromChain = 1;
            const fromToken = 'WETH';
            const toChain = 1;
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route.id).to.not.equal(null);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a quote for a GOERLI WETH to USDC swap', (done) => {
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