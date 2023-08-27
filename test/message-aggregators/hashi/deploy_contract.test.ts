import { expect } from 'chai';

import { deploy_contract } from '@benchmarking-cross-chain-bridges/message-aggregators/hashi/deploy_contract';

describe('Hashi:Deploy', () => {
    it('should deploy Yaru on GOERLI', (done) => {
        const toChain = 5;
        const toToken = 'DeployYaruScript';

        deploy_contract(toChain, toToken, 'test').then((stdout) => {
            expect(stdout).to.not.be.equal(null);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('should deploy Yaho on Gnosis', (done) => {
        const toChain = 100;
        const toToken = 'DeployYahoScript';

        deploy_contract(toChain, toToken, 'test').then((stdout) => {
            expect(stdout).to.not.be.equal(null);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});