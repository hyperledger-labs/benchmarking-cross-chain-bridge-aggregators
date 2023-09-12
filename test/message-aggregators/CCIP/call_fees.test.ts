import { expect } from 'chai';

import { script_interface } from '@benchmarking-cross-chain-bridges/message-aggregators/CCIP/dispatcher';
import { CCIP_Contract_Names } from '@benchmarking-cross-chain-bridges/message-aggregators/CCIP/constants_local';
import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/token-constants_global';

const mode = 'test';
const confirmationResponse = false;
const sourceChain = CHAIN_MAP["SEPOLIA"].chainId;
const destChain = CHAIN_MAP["MUMBAI"].chainId;
const operation = 'call';
const val = 20;

describe('Get fees for a Cross-Chain Tx from Sepolia to Mumbai', () => {
    const txChain = sourceChain;

    it('should get onchain fees for a transaction paid with LINK', (done) => {
        const contractName = CCIP_Contract_Names.Call_FeeTxLink;

        script_interface(sourceChain, destChain, txChain, contractName, operation, val, mode, confirmationResponse).then((stdout) => {
            console.log(stdout);
            expect(stdout).to.be.a('string');
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });

    it('should get onchain fees for a transaction paid with Native currency', (done) => {
        const contractName = CCIP_Contract_Names.Call_FeeTxNative;

        script_interface(sourceChain, destChain, txChain, contractName, operation, val, mode, confirmationResponse).then((stdout) => {
            console.log(stdout);
            expect(stdout).to.be.a('string');
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });
});