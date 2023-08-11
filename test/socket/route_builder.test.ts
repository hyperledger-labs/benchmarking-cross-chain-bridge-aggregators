import { expect } from 'chai';

import { build_route } from '../../src/socket/route_builder';

describe('Socket:Router', () => {
    describe('build_route', () => {
        it('should pass a MAINNET WETH to USDC swap route', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 1;
            const from_token_address = 'WETH';
            const to_token_address = 'USDC';
            const user_address = '0x58Daefe2A4224966535dfbBca1f3c90D09919c2D';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, user_address, unique_routes, sort).then((route) => {
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
            const user_address = '0x58Daefe2A4224966535dfbBca1f3c90D09919c2D';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, user_address, unique_routes, sort).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }
            ).catch((error) => {
                done(error);
            });
        });

        it('should fail a MAINNET DOGE to USDC swap route', (done) => {
            const from_chain_id = 1;
            const to_chain_id = 137;
            const from_token_address = 'DOGE';
            const to_token_address = 'USDC';
            const user_address = '0x58Daefe2A4224966535dfbBca1f3c90D09919c2D';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true;
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, user_address, unique_routes, sort).then((route) => {
                expect(route).to.not.equal(null);
                done();
            }
            ).catch((error) => {
                expect(error.message).to.equal('Invalid from_token: DOGE');
                done();
            });
        });

        it('should fail a GOERLI WETH to USDC swap route', (done) => {
            const from_chain_id = 5;
            const to_chain_id = 5;
            const from_token_address = 'WETH';
            const to_token_address = 'USDC';
            const user_address = '0x58Daefe2A4224966535dfbBca1f3c90D09919c2D';
            const amount = (1 * 10 ** 18).toString();
            const unique_routes = true; // Returns the best route for a given DEX / bridge combination
            const sort = 'gas';

            build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, user_address, unique_routes, sort).then((route) => {
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