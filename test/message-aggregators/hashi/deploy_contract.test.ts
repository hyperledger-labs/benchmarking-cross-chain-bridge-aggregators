import { expect } from 'chai';

import { deploy_contract } from '@benchmarking-cross-chain-bridges/message-aggregators/hashi/deploy_contract';

describe('Deploys Hashi contracts Yaho and Yaru', () => {
    it('should simulate deployment of Yaho on GOERLI', (done) => {
        const toChain = 5;
        const contractName = 'DeployYahoScript';

        deploy_contract(toChain, contractName, 'test', false).then((stdout) => {
            expect(stdout).to.not.be.equal(undefined);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should simulate deployment of Yaru on Gnosis', (done) => {
        const toChain = 100;
        const contractName = 'DeployYaruScript';

        deploy_contract(toChain, contractName, 'test', false).then((stdout) => {
            expect(stdout).to.not.be.equal(undefined);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should fail real deployment of Yaho on GOERLI', (done) => {
        const toChain = 5;
        const contractName = 'DeployYahoScript';

        deploy_contract(toChain, contractName, 'broadcast', false).then((stdout) => {
            done();
        }).catch((error) => {
            expect(error.message).to.equal('User input confirmationResponse was false. Aborting.');
            done();
        });
    });
});

describe('Deploys AMB Message Relay and AMB Adapter', () => {
    it('should simulate deployment of AMBRelay on GOERLI', (done) => {
        const toChain = 5;
        const contractName = 'DeployAMBRelayScript';

        deploy_contract(toChain, contractName, 'test', false).then((stdout) => {
            expect(stdout).to.not.be.equal(undefined);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should simulate deployment of AMBAdapter on Gnosis', (done) => {
        const toChain = 100;
        const contractName = 'DeployAMBAdapterScript';

        deploy_contract(toChain, contractName, 'test', false).then((stdout) => {
            expect(stdout).to.not.be.equal(undefined);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should fail real deployment of AMBRelay on GOERLI', (done) => {
        const toChain = 5;
        const contractName = 'AMBRelay';

        deploy_contract(toChain, contractName, 'broadcast', false).then((stdout) => {
            done();
        }).catch((error) => {
            expect(error.message).to.equal('User input confirmationResponse was false. Aborting.');
            done();
        });
    });
});