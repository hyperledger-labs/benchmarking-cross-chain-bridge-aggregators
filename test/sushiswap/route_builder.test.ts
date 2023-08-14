import { expect } from 'chai';
import { ChainId } from '@sushiswap/sdk';

import { build_route } from '../../src/sushiswap/route_builder';

describe('UNISWAP:Router', () => {
    describe('build_route', () => {
        it('should return a SwapRoute Object for a GOERLI WETH to USDC swap', (done) => {
            const from_chain_id = ChainId.GÖRLI;
            const to_chain_id = ChainId.GÖRLI;
            const from_token = 'WETH';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                expect(route.length).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a SwapRoute Object for a MAINNET WETH to USDC swap', (done) => {
            const from_chain_id = ChainId.MAINNET;
            const to_chain_id = ChainId.MAINNET;
            const from_token = 'WETH';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                expect(route.length).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a SwapRoute Object for a MAINNET USDC to WETH swap', (done) => {
            const from_chain_id = ChainId.MAINNET;
            const to_chain_id = ChainId.MAINNET;
            const from_token = 'USDC';
            const to_token = 'WETH';
            const amount = (1 * 10 ** 6).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                expect(route.length).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a SwapRoute Object for a MAINNET USDC to WETH swap', (done) => {
            const from_chain_id = ChainId.MAINNET;
            const to_chain_id = ChainId.MAINNET;
            const from_token = 'USDC';
            const to_token = 'WETH';
            const amount = (1 * 10 ** 6).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                expect(route.length).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should fail a MAINNET USDC to USDC swap', (done) => {
            const from_chain_id = ChainId.MAINNET;
            const to_chain_id = ChainId.MAINNET;
            const from_token = 'USDC';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 6).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                done(new Error('Expected an error, but got a route.'));
            }).catch((error) => {
                expect(error.message).to.equal('from_token and to_token cannot be the same');
                done();
            });
        });

        it('should fail a MAINNET DOGECOIN to USDC swap', (done) => {
            const from_chain_id = ChainId.MAINNET;
            const to_chain_id = ChainId.MAINNET;
            const from_token = 'DOGECOIN';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 6).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                done(new Error('Expected an error, but got a route.'));
            }).catch((error) => {
                expect(error.message).to.equal('Invalid from_token: DOGECOIN');
                done();
            });
        });
    });
});
