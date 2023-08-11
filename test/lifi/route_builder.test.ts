import { expect } from 'chai';

import { build_route } from '../../src/lifi/route_builder';

describe('LiFi:Router', () => {
    describe('build_route', () => {
        it('should return a quote for a MAINNET WETH to USDC swap', (done) => {
            const fromChain = '1';
            const fromToken = 'WETH';
            const toChain = '1';
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            const result = build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }).catch((error) => {
                done(error);
            });
        });
        it('should return a quote for a MAINNET WETH to MATIC USDC swap', (done) => {
            const fromChain = '1';
            const fromToken = 'WETH';
            const toChain = '137';
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            const result = build_route(fromChain, toChain, fromToken, toToken, fromAmount).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });
});