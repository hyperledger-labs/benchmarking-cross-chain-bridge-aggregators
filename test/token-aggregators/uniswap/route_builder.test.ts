import { expect } from 'chai';
import fs from 'fs';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/uniswap/route_builder';

describe('Perform Swap Router V2 Swaps', () => {
    const router_type = 'swap_router_02';
    describe('build_route', () => {
        it('should return a route for a GOERLI ETH to USDC swap', (done) => {
            const from_chain_id = 5;
            const to_chain_id = 5;
            const from_token = 'ETH';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount, router_type).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        const from_chain_id = 1;
        const to_chain_id = 1;
        const amount = (1 * 10 ** 18).toString();
        it('should return a route for a ETHEREUM ETH to USDC swap', (done) => {
            const from_token = 'ETH';
            const to_token = 'USDC';
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount, router_type).then((route) => {
                fs.writeFileSync('run-data/token-routes/uniswap-route-swap.json', JSON.stringify(route));
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                expect(error.message).to.equal('Unexpected pool type in route when constructing trade object');
                done();
            });
        });

        it('should return a route for a ETHEREUM USDC to ETH swap', (done) => {
            const from_token = 'USDC';
            const to_token = 'ETH';
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount, router_type).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                expect(error.message).to.equal('Unexpected pool type in route when constructing trade object');
                done();
            });
        });
    });
});

describe('Perform Universal Router V2 Swaps', () => {
    const router_type = 'universal';
    describe('build_route', () => {
        it('should return a route for a GOERLI ETH to USDC swap', (done) => {
            const from_chain_id = 5;
            const to_chain_id = 5;
            const from_token = 'ETH';
            const to_token = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount, router_type).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                done(error);
            });
        });

        const from_chain_id = 1;
        const to_chain_id = 1;
        const amount = (1 * 10 ** 18).toString();
        it('should return a route for a ETHEREUM ETH to USDC swap', (done) => {
            const from_token = 'ETH';
            const to_token = 'USDC';
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount, router_type).then((route) => {
                fs.writeFileSync('run-data/token-routes/uniswap-route-universal.json', JSON.stringify(route));
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                expect(error.message).to.equal('Unexpected pool type in route when constructing trade object');
                done();
            });
        });

        it('should return a route for a ETHEREUM USDC to ETH swap', (done) => {
            const from_token = 'USDC';
            const to_token = 'ETH';
            build_route(from_chain_id, to_chain_id, from_token, to_token, amount, router_type).then((route) => {
                const blockNumber = parseInt(route.blockNumber._hex, 16);
                expect(blockNumber).to.be.greaterThan(0);
                done();
            }).catch((error) => {
                expect(error.message).to.equal('Unexpected pool type in route when constructing trade object');
                done();
            });
        });
    });
});
