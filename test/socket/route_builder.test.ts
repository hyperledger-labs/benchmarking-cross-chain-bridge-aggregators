import { expect } from 'chai';

import { build_route } from '../../src/socket/route_builder';

describe('Socket:Router', () => {
    describe('build_route', () => {
        it('should pass a MAINNET WETH to USDC swap route', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 1;
            const from_token_address = 'WETH';
            const to_token_address = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, unique_routes, sort).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }
            ).catch((error) => {
                done(error);
            });
        });

        it('should pass a MAINNET WETH to MATIC USDC swap route', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 137;
            const from_token_address = 'WETH';
            const to_token_address = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, unique_routes, sort).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }
            ).catch((error) => {
                done(error);
            });
        });

        it('should fail a MAINNET DOGECOIN to USDC swap route', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 137;
            const from_token_address = 'DOGECOIN';
            const to_token_address = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, unique_routes, sort).then((route) => {
                expect(route).to.not.equal(null);
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
            const unique_routes = true; // Returns the best route for a given DEX / bridge combination
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, unique_routes, sort).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }
            ).catch((error) => {
                expect(error.message).to.equal('Invalid chain_id: 5 for protocol: SOCKET');
                done();
            });
        });
    });
});