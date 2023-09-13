import { expect } from 'chai';

import { script_interface } from '@benchmarking-cross-chain-bridges/message-aggregators/CCIP/dispatcher';
import { CCIP_Contract_Names } from '@benchmarking-cross-chain-bridges/message-aggregators/CCIP/constants_local';
import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';

const mode = 'test';
const confirmationResponse = false;
const sourceChain = CHAIN_MAP["SEPOLIA"].chainId;
const destChain = CHAIN_MAP["MUMBAI"].chainId;
const operation = 'send';
const val = 20;

describe('Send a Cross-Chain Tx from Sepolia to Mumbai', () => {
    const txChain = sourceChain;

    it('should simulate a transaction paid with LINK', (done) => {
        const contractName = CCIP_Contract_Names.Send_SourceTxLink;

        script_interface(sourceChain, destChain, txChain, contractName, operation, val, mode, confirmationResponse).then((tx_hash) => {
            expect(tx_hash).to.be.a('string');
            expect(tx_hash).to.equal("we're in test so tx successful");
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });

    it('should simulate a transaction paid with native currency', (done) => {
        const contractName = CCIP_Contract_Names.Send_SourceTxNative;

        script_interface(sourceChain, destChain, txChain, contractName, operation, val, mode, confirmationResponse).then((tx_hash) => {
            expect(tx_hash).to.be.a('string');
            expect(tx_hash).to.equal("we're in test so tx successful");
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });
});