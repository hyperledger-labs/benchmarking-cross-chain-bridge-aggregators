import { build_route } from '../../src/uniswap/route_builder';
import { ethers, providers } from 'ethers';
import { expect } from 'chai';
import { SwapRoute } from '@uniswap/smart-order-router';
import { ChainId } from '@uniswap/sdk-core';

describe('UNISWAP:Router', () => {

    describe('buildRoute', () => {
        it('should return a SwapRoute Object for a GOERLI ETH to USDC swap', (done) => {
            const chainId = ChainId.GOERLI;
            const from_token = 'ETH';
            const to_token = 'USDC';
            const amount = (0.005 * 10 ** 18).toString();
            build_route(chainId, from_token, to_token, amount).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a SwapRoute Object for a GOERLI USDC to ETH swap', (done) => {
            const chainId = ChainId.GOERLI;
            const from_token = 'USDC';
            const to_token = 'ETH';
            const amount = (10 ** 6).toString();
            build_route(chainId, from_token, to_token, amount).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should fail a GOERLI ETH to WETH swap (Reason: Same token)', (done) => {
            const chainId = ChainId.GOERLI;
            const from_token = 'ETH';
            const to_token = 'WETH';
            const amount = (10 ** 6).toString();
            build_route(chainId, from_token, to_token, amount).then((route) => {
                done(new Error('Expected an error, but got a route.'));
            }).catch((error) => {
                expect(error.message).to.equal('Route not found');
                done();
            });
        });

        it('should return a SwapRoute Object for a GOERLI USDC to WETH swap', (done) => {
            const chainId = ChainId.GOERLI;
            const from_token = 'USDC';
            const to_token = 'WETH';
            const amount = (10 ** 6).toString();
            build_route(chainId, from_token, to_token, amount).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should fail a GOERLI USDC to USDC swap (Reason: Same token)', (done) => {
            const chainId = ChainId.GOERLI;
            const from_token = 'USDC';
            const to_token = 'USDC';
            const amount = (10 ** 6).toString();
            build_route(chainId, from_token, to_token, amount).then((route) => {
                done(new Error('Expected an error, but got a route.'));
            }).catch((error) => {
                expect(error.message).to.equal('Route not found');
                done();
            });
        });
    });
});
