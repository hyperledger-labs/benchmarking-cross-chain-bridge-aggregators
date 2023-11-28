import { expect } from 'chai';
import fs from 'fs';

import { build_route } from '@benchmarking-cross-chain-bridges/token-aggregators/socket/route_builder';

const amount = (1 * 10 ** 18).toString();
const multiTx = false;
describe('Socket:Router', () => {
    describe('build_route', () => {
        it('should return a route for a ETHEREUM WETH to MATIC WMATIC swap route', (done) => {
            const fromChain = 1;
            const toChain = 137;
            const fromToken = 'WETH';
            const toToken = 'WMATIC';

            build_route(fromChain, toChain, fromToken, toToken, amount, !multiTx).then((route) => {
                expect(route.route.routeId).to.not.equal(undefined);
                fs.writeFileSync('run-data/token-routes/socket-route.json', JSON.stringify(route));
                done();
            }
            ).catch((error) => {
                done(error);
            });
        });

        it('should return a route for a ETHEREUM WETH to USDC swap route', (done) => {
            const fromChain = 1;
            const toChain = 1;
            const fromToken = 'WETH';
            const toToken = 'USDC';

            build_route(fromChain, toChain, fromToken, toToken, amount, !multiTx).then((route) => {
                expect(route.route.routeId).to.not.equal(undefined);
                done();
            }
            ).catch((error) => {
                done(error);
            });
        });

        it('should fail to return a route for a ETHEREUM DOGECOIN to USDC swap route', (done) => {
            const fromChain = 1;
            const toChain = 137;
            const fromToken = 'DOGECOIN';
            const toToken = 'USDC';

            build_route(fromChain, toChain, fromToken, toToken, amount, multiTx).then((route) => {
                expect(route.route.routeId).to.not.equal(undefined);
                done();
            }
            ).catch((error) => {
                expect(error.message).to.equal('Invalid from_token: DOGECOIN');
                done();
            });
        });

        it('should fail a GOERLI WETH to USDC swap route', (done) => {
            const fromChain = 5;
            const toChain = 5;
            const fromToken = 'WETH';
            const toToken = 'USDC';

            build_route(fromChain, toChain, fromToken, toToken, amount, multiTx).then((route) => {
                expect(route.route.routeId).to.not.equal(undefined);
                done();
            }
            ).catch((error) => {
                expect(error.message).to.equal('Invalid chain_id: 5 for protocol: SOCKET');
                done();
            });
        });
    });
});