import { build_route } from '../../src/uniswap/route_builder';
import { ethers, providers } from 'ethers';
import { expect } from 'chai'; // Assuming you're using Chai for assertions
import { SwapRoute } from '@uniswap/smart-order-router';

describe('Router', () => {

    describe('buildRoute', () => {
        it('should return a SwapRoute Object for a GOERLI ETH to USDC swap', (done) => {
            build_route().then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                console.log(blockNumber);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });
});
