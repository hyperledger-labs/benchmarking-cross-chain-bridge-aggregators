import { build_route } from '../../src/lifi/route_builder';
import { expect } from 'chai';

describe('LiFi:Router', () => {
    it('should return a quote for a MAINNET WETH to USDC swap', (done) => {
        const from_chain_id = 1;
        const to_chain_id = 1;
        const from_token = 'WETH';
        const to_token = 'USDC';
        const amount = (1 * 10 ** 18).toString();

        build_route(from_chain_id, from_token, to_chain_id, to_token, amount).then((route) => {
            expect(route).to.not.equal(null);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});