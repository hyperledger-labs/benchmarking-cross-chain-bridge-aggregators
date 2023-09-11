import { expect } from 'chai';

import { script_interface } from '@benchmarking-cross-chain-bridges/message-aggregators/CCIP/dispatcher';
import { CCIP_Contract_Names } from '@benchmarking-cross-chain-bridges/message-aggregators/CCIP/constants_local';
import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/token-constants_global';

const mode = 'test';
const confirmationResponse = false;

describe('Get fees for a Cross-Chain Tx from Sepolia to Mumbai', () => {
    it('should get onchain fees for a transaction paid with LINK', (done) => {
        const toChain = CHAIN_MAP["SEPOLIA"].chainId;
        const contractName = CCIP_Contract_Names.Call_FeeTxLink;
        const operation = 'call';

        script_interface(toChain, contractName, operation, mode, confirmationResponse).then((stdout) => {
            console.log(stdout);
            expect(stdout).to.be.a('string');
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });

    it('should get onchain fees for a transaction paid with Native currency', (done) => {
        const toChain = CHAIN_MAP["SEPOLIA"].chainId;
        const contractName = CCIP_Contract_Names.Call_FeeTxNative;
        const operation = 'call';

        script_interface(toChain, contractName, operation, mode, confirmationResponse).then((stdout) => {
            console.log(stdout);
            expect(stdout).to.be.a('string');
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });
});