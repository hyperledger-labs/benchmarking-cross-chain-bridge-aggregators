import { expect } from 'chai';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/xy/route_builder';
import { submit_order } from '@benchmarking-cross-chain-bridges/token-aggregators/xy/execute_route';

describe.skip('XY:Router', () => {
    it('should return a quote for a ETHEREUM WETH to ETHEREUM USDC swap', async (done) => {
        const fromChain = 1;
        const fromToken = 'WETH';
        const toChain = 137;
        const toToken = 'USDC';
        const fromAmount = (1 * 10 ** 18).toString();

        try {
            const quotes = await build_route(fromChain, toChain, fromToken, toToken, fromAmount);
            const quote = quotes.routes[0];
            const hash = await submit_order(fromChain, fromToken, quote);

            console.log('hash:', hash);
            expect(hash).to.be.a('string');
        } catch (error) {
            console.error('Error in the test:', error);
            done(error);
        }
    });
});
