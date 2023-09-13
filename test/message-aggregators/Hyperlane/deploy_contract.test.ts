import { expect } from 'chai';

import { script_interface } from '@benchmarking-cross-chain-bridges/message-aggregators/Hyperlane/dispatcher';

import { Hyperlane_Contract_Names } from '@benchmarking-cross-chain-bridges/message-aggregators/Hyperlane/constants_local';

import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';

const mode = 'test';
const confirmationResponse = false;
const operation = 'deploy';
const value = 0;
const sourceChain = CHAIN_MAP.GOERLI.chainId;
const destChain = CHAIN_MAP.MUMBAI.chainId;

describe.skip('Deploys Contracts on Destination Chain', () => {
    it('should simulate deployment of Hyperlane_Counter on Mumbai', (done) => {
        const contractName = Hyperlane_Contract_Names.Counter;
        const txChain = destChain;

        script_interface(sourceChain, destChain, txChain, contractName, operation, value, mode, confirmationResponse).then((contract_address) => {
            expect(contract_address).to.be.a('string');
            expect(contract_address).to.have.lengthOf(42);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});