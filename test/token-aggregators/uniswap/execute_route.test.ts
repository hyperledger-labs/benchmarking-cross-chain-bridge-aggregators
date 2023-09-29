import { expect } from 'chai';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/uniswap/route_builder';
import { submit_order } from '@benchmarking-cross-chain-bridges/token-aggregators/uniswap/execute_route';
import { UNISWAPMethodParameters } from '@benchmarking-cross-chain-bridges/token-aggregators/uniswap/types';

describe.skip('should submit an GOERLI -> GOERLI order', () => {
    const fromChain = 5;
    const toChain = 5;

    it('should submit a swap for WETH to USDC swap', async () => {
        const fromToken = 'WETH';
        const toToken = 'USDC';
        const amount = (0.005 * 10 ** 18).toString();

        const quote = await build_route(fromChain, toChain, fromToken, toToken, amount);

        expect(quote).to.not.equal(null);
        expect(quote.methodParameters).to.not.equal(undefined);

        const methodParameters: UNISWAPMethodParameters = quote.methodParameters as UNISWAPMethodParameters;

        const tx_hash = await submit_order(fromChain, toChain.toString(), fromToken, methodParameters);

        expect(tx_hash.substring(0, 2)).to.equal('0x');
    });

    it('should submit a swap for USDC to WETH swap', async () => {
        const fromToken = 'USDC';
        const toToken = 'WETH';
        const amount = (400000 * 10 ** 6).toString();

        const quote = await build_route(fromChain, toChain, fromToken, toToken, amount);

        expect(quote).to.not.equal(null);
        expect(quote.methodParameters).to.not.equal(undefined);

        const methodParameters: UNISWAPMethodParameters = quote.methodParameters as UNISWAPMethodParameters;

        const tx_hash = await submit_order(fromChain, toChain.toString(), fromToken, methodParameters);

        expect(tx_hash.substring(0, 2)).to.equal('0x');
    });
});