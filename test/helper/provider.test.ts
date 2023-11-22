import { create_tx, send_tx, get_gas_price, get_latest_blockNum, get_provider } from '@benchmarking-cross-chain-bridges/helper/provider';
import { expect } from 'chai';

describe('provider:get_provider', () => {
    describe('supported network (GOERLI) and', () => {
        it('should return a BaseProvider', async () => {
            const network = 'GOERLI';
            const provider = get_provider(network);
            expect(provider).to.not.be.undefined;
        });
    });

    describe('unsupported network', () => {
        it('should throw an error for an unsupported network', async () => {
            const network = 'unsupported';
            expect(() => get_provider(network)).to.throw('RPC URL not found for unsupported');
        });
    });
});

describe('provider:create_tx', () => {
    it('should sign a transaction', async () => {
        const to = '0x87699e6d5ce5a1c01fCB3fD44626aE2e2ef6A5DD';
        const value = '1';
        const gas_limit = '100000';
        const data = '0x';
        const chain_id = 5;
        const signed_transaction = await create_tx(to, value, gas_limit, data, chain_id);
        expect(signed_transaction).to.be.a('string');
    });
});

describe('provider:get_gas_price', () => {
    it('should return a gas price', async () => {
        const network = 'GOERLI';
        const gas_price = await get_gas_price(network);
        expect(gas_price).to.be.a('number');
    });
});

describe('provider:get_latest_blockNum', () => {
    it('should return a block number', async () => {
        const network = 'GOERLI';
        const block_number = await get_latest_blockNum(network);
        expect(block_number).to.be.a('number');
    });
});

describe('provider:send_tx', () => {
    it.skip('should send a transaction', async () => {
        const to = '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455'; // GOERLI PoW Faucet
        const value = '1';
        const gas_limit = '21000';
        const data = '0x';
        const chain_id = 5;

        const signed_transaction = await create_tx(to, value, gas_limit, data, chain_id);

        await send_tx(signed_transaction, chain_id).then((response) => {
            expect(response).to.be.a('object');
        }).catch((error) => {
            console.error(error);
        }
        );
    });
});
