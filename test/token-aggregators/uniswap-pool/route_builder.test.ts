import { expect } from 'chai';
import fs from 'fs';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/uniswap-pool/route_builder';

describe('Uniswap:Router', () => {
    describe('build_route', () => {
        it('should return a route for a GOERLI ETH to USDC swap', (done) => {
            const from_chain_id = 5;
            const to_chain_id = 5;
            const from_token = 'ETH';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should return a route for a ETHEREUM WETH to USDC swap', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 1;
            const from_token = 'ETH';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                fs.writeFileSync('run-data/token-routes/uniswap-route.json', JSON.stringify(route));
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                expect(error.message).to.equal('Unexpected pool type in route when constructing trade object');
                done();
            });
        });

        it('should return a route for a ETHEREUM USDC to ETH swap', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 1;
            const from_token = 'USDC';
            const to_token = 'ETH';
            const amount = (1 * 10 ** 6).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                expect(error.message).to.equal('Unexpected pool type in route when constructing trade object');
                done();
            });
        });

        it('should return a route for a ETHEREUM USDC to WETH swap', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 1;
            const from_token = 'USDC';
            const to_token = 'WETH';
            const amount = (1 * 10 ** 6).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                expect(error.message).to.equal('Unexpected pool type in route when constructing trade object');
                done();
            });
        });

        it('should fail a ETHEREUM USDC to USDC swap', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 1;
            const from_token = 'USDC';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 6).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount).then((route) => {
                done(new Error('Expected an error, but got a route.'));
            }).catch((error) => {
                expect(error.message).to.equal('from_token and to_token cannot be the same on same chain swap');
                done();
            });
        });

        it('should fail a ETHEREUM DOGECOIN to USDC swap', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 1;
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
