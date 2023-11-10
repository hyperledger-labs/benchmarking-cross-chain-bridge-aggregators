import { transferEventFromBlock, getBalanceAtBlock } from '@benchmarking-cross-chain-bridges/helper/token_misc';
import { expect } from 'chai';

describe('should return amount transferred in a USDC transfer event on the Goerli network', () => {
    const chain_name = 'GOERLI';
    const token = 'USDC';
    const to_address = '0x548575786EEbE8B31e0Bd244B93Cd501c6e767a8';
    it('for Goerli from Block 9780550 to Block 9780560', async () => {
        const from_block = 9780550;
        const to_block = 9780560;

        const balance = await transferEventFromBlock(chain_name, token, from_block, to_block, to_address);
        expect(balance).to.be.greaterThan(0);
    });
});

describe('should get USDC token balance value of an address on the GOERLI network', () => {
    const chain_name = 'GOERLI';
    const token = 'USDC';
    const to_address = '0x548575786EEbE8B31e0Bd244B93Cd501c6e767a8';

    it('for Goerli at block 9780550 (before UNISWAP swap)', async () => {
        const at_block = 9780550;

        const balance = await getBalanceAtBlock(chain_name, token, at_block, to_address);
        expect(balance).to.be.greaterThan(0);
    });

    it('for Goerli at block 9780560 (after UNISWAP swap)', async () => {
        const at_block = 9780560;

        const balance = await getBalanceAtBlock(chain_name, token, at_block, to_address);
        expect(balance).to.be.greaterThan(0);
    });
});