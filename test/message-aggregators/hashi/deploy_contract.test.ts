import { expect } from 'chai';

import { deploy_contract } from '@benchmarking-cross-chain-bridges/message-aggregators/hashi/deploy_contract';

describe('Hashi:Deploy', () => {
    it('should simulate deployment of Yaru on GOERLI', (done) => {
        const toChain = 5;
        const toToken = 'DeployYaruScript';

        deploy_contract(toChain, toToken, 'test', false).then((stdout) => {
            expect(stdout).to.not.be.equal(undefined);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should simulate deployment of Yaho on Gnosis', (done) => {
        const toChain = 100;
        const toToken = 'DeployYahoScript';

        deploy_contract(toChain, toToken, 'test', false).then((stdout) => {
            expect(stdout).to.not.be.equal(undefined);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should fail real deployment of Yaru on GOERLI', (done) => {
        const toChain = 5;
        const toToken = 'DeployYaruScript';

        deploy_contract(toChain, toToken, 'broadcast', false).then((stdout) => {
            done();
        }).catch((error) => {
            expect(error.message).to.equal('User input confirmationResponse was false. Aborting.');
            done();
        });
    });
});