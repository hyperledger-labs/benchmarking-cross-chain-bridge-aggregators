import { expect } from 'chai';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/lifi/route_builder';
import { submit_order } from '@benchmarking-cross-chain-bridges/token-aggregators/lifi/execute_route';

describe.skip('should submit an GOERLI -> GOERLI order', () => {
    it('should submit a swap for WETH to USDC swap', async () => {
        const fromChain = 5;
        const fromToken = 'WETH';
        const toChain = 5;
        const toToken = 'USDC';
        const fromAmount = (0.005 * 10 ** 18).toString();

        const quote = await build_route(fromChain, toChain, fromToken, toToken, fromAmount)
        expect(quote).to.not.equal(null);

        const txHash = await submit_order(fromChain, toChain, fromToken, quote);
        expect(txHash.substring(0, 2)).to.equal('0x');
    });
});