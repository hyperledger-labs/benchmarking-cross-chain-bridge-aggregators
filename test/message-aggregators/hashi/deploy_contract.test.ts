import { expect } from 'chai';

import { script_interface } from '@benchmarking-cross-chain-bridges/message-aggregators/Hashi/dispatcher';

import { Hashi_Contract_Names } from '@benchmarking-cross-chain-bridges/message-aggregators/Hashi/constants_local';

import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/token-constants_global';

const mode = 'test';
const confirmationResponse = false;
const operation = 'deploy';
const value = 0;
const sourceChain = CHAIN_MAP.GOERLI.chainId;
const destChain = CHAIN_MAP.GNOSIS.chainId;

describe('Deploys Hashi contracts Yaho and Yaru', () => {
    it('should simulate deployment of Yaho on GOERLI', (done) => {
        const contractName = Hashi_Contract_Names.Yaho;
        const txChain = sourceChain;

        script_interface(sourceChain, destChain, sourceChain, contractName, operation, value, mode, confirmationResponse).then((contract_address) => {
            expect(contract_address).to.be.a('string');
            expect(contract_address).to.have.lengthOf(42);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should simulate deployment of Yaru on Gnosis', (done) => {
        const contractName = Hashi_Contract_Names.Yaru;
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

describe('Deploys AMB Message Relay and AMB Adapter', () => {
    it('should simulate deployment of AMBRelay on GOERLI', (done) => {
        const contractName = Hashi_Contract_Names.AMBRelay;
        const txChain = sourceChain;

        script_interface(sourceChain, destChain, txChain, contractName, operation, value, mode, confirmationResponse).then((contract_address) => {
            expect(contract_address).to.be.a('string');
            expect(contract_address).to.have.lengthOf(42);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should simulate deployment of AMBAdapter on Gnosis', (done) => {
        const contractName = Hashi_Contract_Names.AMBAdapter;
        const txChain = destChain;

        script_interface(sourceChain, destChain, destChain, contractName, operation, value, mode, confirmationResponse).then((contract_address) => {
            expect(contract_address).to.be.a('string');
            expect(contract_address).to.have.lengthOf(42);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('Deploys Counter to the destination chain', () => {
    it('should simulate deployment of Counter on GNOSIS', (done) => {
        const contractName = 'Counter';
        const txChain = destChain;

        script_interface(sourceChain, destChain, destChain, contractName, operation, value, mode, confirmationResponse).then((contract_address) => {
            expect(contract_address).to.be.a('string');
            expect(contract_address).to.have.lengthOf(42);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('Following deploys should fail', () => {
    it('real deployment of Yaho on GOERLI (confirmation is confirmationResponse)', (done) => {
        const contractName = 'Yaho';
        const txChain = sourceChain;

        script_interface(sourceChain, destChain, txChain, contractName, operation, value, mode, confirmationResponse).then((contract_address) => {
            expect(contract_address).to.be.a('string');
            expect(contract_address).to.have.lengthOf(42);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});