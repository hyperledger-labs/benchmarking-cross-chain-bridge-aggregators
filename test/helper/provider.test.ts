import { create_tx, getProvider } from '../../src/helper/provider';
import { BaseProvider } from '@ethersproject/providers';
import { expect } from 'chai';

describe('getProvider', () => {

    describe('supported network (GOERLI) and apiProvider (Alchemy)', () => {
        it('should return a BaseProvider', async () => {
            const network = 'goerli';
            const apiProvider = 'alchemy';
            const provider: BaseProvider = getProvider(network, apiProvider);
            expect(provider).to.be.instanceOf(BaseProvider);
        });
    });

    describe('getProvider - unsupported network', () => {
        it('should throw an error for an unsupported network', async () => {
            const network = 'unsupported';
            const apiProvider = 'alchemy';
            expect(() => getProvider(network, apiProvider)).to.throw('RPC URL not found for alchemy and unsupported');
        });
    });

    describe('getProvider - unsupported apiProvider', () => {
        it('should throw an error for an unsupported apiProvider', async () => {
            const network = 'goerli';
            const apiProvider = 'unsupported';
            expect(() => getProvider(network, apiProvider)).to.throw('RPC URL not found for unsupported and goerli');
        });
    });
});

describe('create_tx', () => {
    it('should sign a transaction', async () => {
        const from = '0x548575786EEbE8B31e0Bd244B93Cd501c6e767a8';
        const to = '0x87699e6d5ce5a1c01fCB3fD44626aE2e2ef6A5DD';
        const value = '100';
        const gasLimit = '100000';
        const data = '0x';
        const chainId = 5;
        const signedTransaction = await create_tx(from, to, value, gasLimit, data, chainId);
        expect(signedTransaction).to.be.a('string');
    });
});

describe('send_tx', () => {
    it('should send a transaction', async () => {
        const from = '0x548575786EEbE8B31e0Bd244B93Cd501c6e767a8';
        const to = '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455'; // GOERLI PoW Faucet
        const value = '1';
        const gasLimit = '21000';
        const data = '0x';
        const chainId = 5;

        const signedTransaction = await create_tx(from, to, value, gasLimit, data, chainId);

        const provider = getProvider('goerli', 'alchemy');
        const response = await provider.sendTransaction(signedTransaction).then((response) => {
            expect(response).to.be.a('object');
        }).catch((error) => {
            console.log(error);
        }
        );
    });
});
