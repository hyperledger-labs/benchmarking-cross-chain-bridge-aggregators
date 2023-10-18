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


            build_route(from_chain_id, to_chain_id, from_token_address, to_token_address, amount).then((route) => {
                expect(route.errors).to.equal(undefined);
                fs.writeFileSync('run-data/token-routes/socket-route.json', JSON.stringify(route));
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

            build_route(from_chain_id, to_chain_id, from_token_address, to_token_address, amount).then((route) => {
                expect(route.errors).to.equal(undefined);
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

            build_route(from_chain_id, to_chain_id, from_token_address, to_token_address, amount).then((route) => {
                expect(route.errors).to.equal(undefined);
                done();
            }
            ).catch((error) => {
                expect(error.message).to.equal('Invalid chain_id: 5 for protocol: SOCKET');
                done();
            });
        });
    });
});