import { expect } from 'chai';

import { script_interface } from '@benchmarking-cross-chain-bridges/message-aggregators/Hashi/dispatcher';

import { Hashi_Contract_Names } from '@benchmarking-cross-chain-bridges/message-aggregators/Hashi/constants_local';

import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';

const mode = 'test';
const confirmationResponse = false;
const operation = 'send';
const value = 20;
const sourceChain = CHAIN_MAP.GOERLI.chainId;
const destChain = CHAIN_MAP.GNOSIS.chainId;

describe.skip('Sends a cross-chain transaction to Counter', () => {
    it('should simulate sending a transaction from Goerli to Gnosis', (done) => {
        const contractName = Hashi_Contract_Names.Send_SourceTx;
        const txChain = sourceChain;

        script_interface(sourceChain, destChain, txChain, contractName, operation, value, mode, confirmationResponse).then((tx_hash) => {
            expect(tx_hash).to.be.a('string');
            expect(tx_hash).to.equal("we're in test so tx successful");
            done();
        }).catch((error) => {
            done(error);
        });
    });
});
