import { expect } from 'chai';

import { APIReport } from './types/APIReport';
import { make_api_report } from './report-gen/lifi';

describe('should create reports for GOERLI -> GOERLI trades', () => {
    const fromChain = 5;
    const toChain = 5;

    it('should create an order for ETH to USDC swap', async () => {
        const fromToken = 'ETH';
        const toToken = 'USDC';
        const fromAmount = (1 * 10 ** 18).toString();

        const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount);

        expect(report).to.have.property('run_id');
    });

    it('should create an order for USDC to ETH swap', async () => {
        const fromToken = 'USDC';
        const toToken = 'ETH';
        const fromAmount = (1 * 10 ** 18).toString();

        const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount);

        expect(report).to.have.property('run_id');
    });
});

describe('should create reports for MAINNET -> POLYGON trades', () => {
    const fromChain = 1;
    const toChain = 137;

    it('should create an order for ETH to MATIC swap', async () => {
        const fromToken = 'ETH';
        const toToken = 'MATIC';
        const fromAmount = (1 * 10 ** 18).toString();

        const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount);

        expect(report).to.have.property('run_id');
    });
});