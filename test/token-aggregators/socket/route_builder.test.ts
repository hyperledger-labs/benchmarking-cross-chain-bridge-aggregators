import { expect } from 'chai';
import fs from 'fs';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/socket/route_builder';

describe('Socket:Router', () => {
    describe('build_route', () => {
        it('should return a route for a MAINNET WETH to USDC swap route', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 1;
            const from_token_address = 'WETH';
            const to_token_address = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, unique_routes, sort).then((route) => {
                expect(route.success).to.equal(true);
                done();
            }
            ).catch((error) => {
                done(error);
            });
        });

        it('should return a route for a MAINNET WETH to MATIC USDC swap route', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 137;
            const from_token_address = 'WETH';
            const to_token_address = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, unique_routes, sort).then((route) => {
                fs.writeFileSync('test/token-aggregators/socket/route.json', JSON.stringify(route));
                expect(route.success).to.equal(true);
                done();
            }
            ).catch((error) => {
                done(error);
            });
        });

        it('should return a route for a MAINNET DOGECOIN to USDC swap route', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 137;
            const from_token_address = 'DOGECOIN';
            const to_token_address = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, unique_routes, sort).then((route) => {
                expect(route.success).to.equal(true);
                done();
            }
            ).catch((error) => {
                expect(error.message).to.equal('Invalid from_token: DOGECOIN');
                done();
            });
        });

        it('should fail a GOERLI WETH to USDC swap route', (done) => {
            const from_chain_id = 5;
            const to_chain_id = 5;
            const from_token_address = 'WETH';
            const to_token_address = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, unique_routes, sort).then((route) => {
                expect(route.success).to.equal(true);
                done();
            }
            ).catch((error) => {
                expect(error.message).to.equal('Invalid chain_id: 5 for protocol: SOCKET');
                done();
            });
        });
    });
});