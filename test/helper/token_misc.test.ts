import { transferEventFromBlock } from '@benchmarking-cross-chain-bridges/helper/token_misc';
import { expect } from 'chai';

describe('should return value from a transfer event', () => {
    it('for Goerli from Block to Block', async () => {
        const chain_name = 'GOERLI';
        const token = 'USDC';
        const from_block = 9780550;
        const to_block = 9780560;
        const to_address = '0x548575786EEbE8B31e0Bd244B93Cd501c6e767a8';

        const balance = await transferEventFromBlock(chain_name, token, from_block, to_block, to_address);
        expect(balance).to.be.greaterThan(0);

        console.log(`Balance: ${balance}`);
    });
});