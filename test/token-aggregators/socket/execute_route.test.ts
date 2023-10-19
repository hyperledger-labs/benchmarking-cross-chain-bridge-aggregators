import { expect } from 'chai';
import fs from 'fs';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/socket/route_builder';
import { execute_route } from '@benchmarking-cross-chain-bridges/token-aggregators/socket/execute_route';

describe.skip('should submit an ETH -> POLYGON order', () => {
    const fromChain = 1;
    const toChain = 137;
    const amount = (0.005 * 10 ** 18).toString();
    const fromToken = 'WETH';
    const toToken = 'USDC';
    const multiTx = true;

    it('should submit a swap for WETH to USDC swap with singleTx', async () => {
        const quote = await build_route(fromChain, toChain, fromToken, toToken, amount, !multiTx);

        try {
            const execute = await execute_route(fromChain, fromToken, quote, !multiTx);
        }
        catch (error) {
            console.error(error);
        }
    });

    it('should submit a swap for WETH to USDC swap with multiTx', async () => {

        const quote = await build_route(fromChain, toChain, fromToken, toToken, amount, multiTx);

        try {
            const execute = await execute_route(fromChain, fromToken, quote, multiTx);
        }
        catch (error) {
            console.error(error);
        }
    });

});