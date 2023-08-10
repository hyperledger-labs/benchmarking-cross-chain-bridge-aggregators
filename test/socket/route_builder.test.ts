import { build_route } from '../../src/socket/route_builder';
import { expect } from 'chai';

describe('Socket:Router', () => {
    it('should return a quote for a MAINNET WETH to USDC swap', (done) => {
        const from_chain_id = 1;
        const to_chain_id = 1;
        const from_token_address = 'WETH';
        const to_token_address = 'USDC';
        const user_address = '0x58Daefe2A4224966535dfbBca1f3c90D09919c2D';
        const amount = 10 * 10 ** 18;
        const unique_routes = true; // Returns the best route for a given DEX / bridge combination
        const sort = 'gas';

        build_route(from_chain_id, from_token_address, to_chain_id, to_token_address, amount, user_address, unique_routes, sort).then((route) => {
            expect(route).to.not.equal(null);
            done();
        }
        ).catch((error) => {
            done(error);
        });
    });
});