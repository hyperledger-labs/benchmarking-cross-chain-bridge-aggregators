import { expect } from 'chai';

import { deploy_contract } from '@benchmarking-cross-chain-bridges/message-aggregators/hashi/deploy_contract';

import { get_contract_address } from '@benchmarking-cross-chain-bridges/message-aggregators/hashi/constants_local';

describe('Deploys Hashi contracts Yaho and Yaru', () => {
    it('should simulate deployment of Yaho on GOERLI', (done) => {
        const toChain = 5;
        const contractName = 'Yaho';
        const old_address = get_contract_address(contractName);

        deploy_contract(toChain, contractName, 'test', false).then((contract_address) => {
            expect(contract_address).to.not.be.equal(undefined);
            expect(contract_address).to.not.be.equal(old_address);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should simulate deployment of Yaru on Gnosis', (done) => {
        const toChain = 100;
        const contractName = 'Yaru';
        const old_address = get_contract_address(contractName);

        deploy_contract(toChain, contractName, 'test', false).then((contract_address) => {
            expect(contract_address).to.not.be.equal(undefined);
            expect(contract_address).to.not.be.equal(old_address);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('Deploys AMB Message Relay and AMB Adapter', () => {
    it('should simulate deployment of AMBRelay on GOERLI', (done) => {
        const toChain = 5;
        const contractName = 'AMBRelay';
        const old_address = get_contract_address(contractName);

        deploy_contract(toChain, contractName, 'test', false).then((contract_address) => {
            expect(contract_address).to.not.be.equal(undefined);
            expect(contract_address).to.not.be.equal(old_address);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should simulate deployment of AMBAdapter on Gnosis', (done) => {
        const toChain = 100;
        const contractName = 'AMBAdapter';
        const old_address = get_contract_address(contractName);

        deploy_contract(toChain, contractName, 'test', false).then((contract_address) => {
            expect(contract_address).to.not.be.equal(undefined);
            expect(contract_address).to.not.be.equal(old_address);
            done();
        }).catch((error) => {
            console.error(error);
            done(error);
        });
    });
});

describe('Deploys Counter to the destination chain', () => {
    it('should simulate deployment of Counter on GNOSIS', (done) => {
        const toChain = 100;
        const contractName = 'Counter';

        const old_address = get_contract_address(contractName);

        deploy_contract(toChain, contractName, 'test', false).then((contract_address) => {
            expect(contract_address).to.not.be.equal(undefined);
            expect(contract_address).to.not.be.equal(old_address);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});

describe('Following deploys should fail', () => {
    it('real deployment of Yaho on GOERLI (confirmation is false)', (done) => {
        const toChain = 5;
        const contractName = 'Yaho';

        deploy_contract(toChain, contractName, 'broadcast', false).then((contract_address) => {
            done();
        }).catch((error) => {
            expect(error.message).to.equal('User input confirmationResponse was false. Aborting.');
            done();
        });
    });
});