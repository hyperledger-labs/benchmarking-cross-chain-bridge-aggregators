import { getQuote } from '../../src/socket/route_builder';
import { expect } from 'chai';

describe('Socket:Router', () => {
    it('should return a quote for a GOERLI WETH to USDC swap', (done) => {
        const fromChainId = 1;
        const toChainId = 42161;
        const fromTokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
        const toTokenAddress = "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0";
        const userAddress = "0x58Daefe2A4224966535dfbBca1f3c90D09919c2D";
        const fromAmount = 100000000;
        const uniqueRoutesPerBridge = true; // Returns the best route for a given DEX / bridge combination
        const sort = "gas";

        getQuote(fromChainId, fromTokenAddress, toChainId, toTokenAddress, fromAmount, userAddress, uniqueRoutesPerBridge, sort).then((quote) => {
            expect(quote.success).to.equal(true);
            done();
        }
        ).catch((error) => {
            done(error);
        });
    });
});