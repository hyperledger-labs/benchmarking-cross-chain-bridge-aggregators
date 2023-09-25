import { expect } from 'chai';

import { Order } from '@gnosis.pm/gp-v2-contracts';
import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/cowswap/route_builder';
import { sign_order, submit_order } from '@benchmarking-cross-chain-bridges/token-aggregators/cowswap/execute_route';
import { CoWReturn, OrderRequest } from '@benchmarking-cross-chain-bridges/token-aggregators/cowswap/types';

const sourceChain = 5;
const destChain = 5;
const fromToken = 'WETH';
const toToken = 'USDC';

describe.skip('should sign orders for WETH -> USDC', () => {
    it('should create a WETH SELL order on WETH to USDC on GOERLI', async () => {
        const amount = (1 * 10 ** 18).toString();
        const operation = 'sell';

        const cowReturn: CoWReturn = await build_route(sourceChain, destChain, fromToken, toToken, amount, operation);
        const order: Order = cowReturn.order;

        const signature = (await sign_order(sourceChain, order)).signature;
        expect(signature.substring(0, 2)).to.equal('0x');
    });
});

describe.skip('should submit an order for WETH -> USDC', () => {
    it('should create a WETH SELL order on WETH to USDC on GOERLI', async () => {
        const fromToken = 'WETH';
        const toToken = 'USDC';
        const amount = (0.005 * 10 ** 18).toString();
        const operation = 'sell';

        const cowReturn: CoWReturn = await build_route(sourceChain, destChain, fromToken, toToken, amount, operation);
        const orderRequest: OrderRequest = cowReturn.orderReq;
        const order: Order = cowReturn.order;

        const signature = (await sign_order(sourceChain, order)).signature;
        expect(signature.substring(0, 2)).to.equal('0x');

        const uid = await submit_order(sourceChain, orderRequest, order);
        try {
            expect(uid.substring(0, 2)).to.equal('0x');
        }
        catch (e) {
            throw new Error(`Order submission failed: ${e}. \nCoW-API response is: ${JSON.stringify(uid)}`);
        }
    });
});