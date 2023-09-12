import { expect } from 'chai';

import { script_interface } from '@benchmarking-cross-chain-bridges/message-aggregators/CCIP/dispatcher';
import { CCIP_Contract_Names } from '@benchmarking-cross-chain-bridges/message-aggregators/CCIP/constants_local';
import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/token-constants_global';

const mode = 'test';
const confirmationResponse = false;
const sourceChain = CHAIN_MAP["SEPOLIA"].chainId;
const destChain = CHAIN_MAP["MUMBAI"].chainId;
const operation = 'deploy';
const val = 0;

describe('Deploys Sender contract on the Source Chain', () => {
    const txChain = sourceChain;

    it('should simulate deployment of a CCIP_Sender on Sepolia', (done) => {
        const contractName = CCIP_Contract_Names.Sender;

        script_interface(sourceChain, destChain, txChain, contractName, operation, val, mode, confirmationResponse).then((contract_address) => {
            expect(contract_address).to.be.a('string');
            expect(contract_address).to.have.lengthOf(42);
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });
});

describe('Deploys Counter contract on the Destination Chain', () => {
    const txChain = destChain;

    it('should simulate deployment of a CCIP_Receiver on Mumbai', (done) => {
        const contractName = CCIP_Contract_Names.Counter;

        script_interface(sourceChain, destChain, txChain, contractName, operation, val, mode, confirmationResponse).then((contract_address) => {
            expect(contract_address).to.be.a('string');
            expect(contract_address).to.have.lengthOf(42);
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });
});