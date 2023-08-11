import { create_tx, get_provider } from '../../src/helper/provider';
import { BaseProvider } from '@ethersproject/providers';
import { expect } from 'chai';

describe('provider:get_provider', () => {

    describe('supported network (GOERLI) and api_provider (Alchemy)', () => {
        it('should return a BaseProvider', async () => {
            const network = 'GOERLI';
            const api_provider = 'ALCHEMY';
            const provider: BaseProvider = get_provider(network, api_provider);
            expect(provider).to.be.instanceOf(BaseProvider);
        });
    });

    describe('unsupported network', () => {
        it('should throw an error for an unsupported network', async () => {
            const network = 'unsupported';
            const api_provider = 'ALCHEMY';
            expect(() => get_provider(network, api_provider)).to.throw('RPC URL not found for ALCHEMY and unsupported');
        });
    });

    describe('unsupported api_provider', () => {
        it('should throw an error for an unsupported api_provider', async () => {
            const network = 'GOERLI';
            const api_provider = 'unsupported';
            expect(() => get_provider(network, api_provider)).to.throw('RPC URL not found for unsupported and GOERLI');
        });
    });
});

describe('provider:create_tx', () => {
    it('should sign a transaction', async () => {
        const to = '0x87699e6d5ce5a1c01fCB3fD44626aE2e2ef6A5DD';
        const value = '100';
        const gas_limit = '100000';
        const data = '0x';
        const chain_id = 5;
        const signed_transaction = await create_tx(to, value, gas_limit, data, chain_id);
        expect(signed_transaction).to.be.a('string');
    });
});

describe('send_tx', () => {
    it.skip('should send a transaction', async () => {
        const to = '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455'; // GOERLI PoW Faucet
        const value = '1';
        const gas_limit = '21000';
        const data = '0x';
        const chain_id = 5;

        const signed_transaction = await create_tx(to, value, gas_limit, data, chain_id);

        const provider = get_provider('GOERLI', 'ALCHEMY');
        const response = await provider.sendTransaction(signed_transaction).then((response) => {
            expect(response).to.be.a('object');
        }).catch((error) => {
            console.log(error);
        }
        );
    });
});
