import { expect } from 'chai';
import { APIReport } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { make_api_report } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/token-aggregators/lifi';

describe('Benchmarking Lifi', () => {

    describe.skip('should create reports for GOERLI -> GOERLI trades', () => {
        const fromChain = 5;
        const toChain = 5;

        it('should benchmark ETH to USDC swap', async () => {
            const fromToken = 'ETH';
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount);

            expect(report).to.have.property('run_id');
        });
    });

    describe('should create reports for ETHEREUM -> ETHEREUM trades', () => {
        const fromChain = 1;
        const toChain = 1;

        it('should benchmark ETH to USDC swap', async () => {
            const fromToken = 'ETH';
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount);

            expect(report).to.have.property('run_id');
        });
    });

    describe('should create reports for ETHEREUM -> POLYGON trades', () => {
        const fromChain = 1;
        const toChain = 137;

        it('should benchmark WETH to USDC swap', async () => {
            const fromToken = 'WETH';
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount);

            expect(report).to.have.property('run_id');
        });

        it('should benchmark WETH to MATIC swap', async () => {
            const fromToken = 'WETH';
            const toToken = 'MATIC';
            const fromAmount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount);

            expect(report).to.have.property('run_id');
        });
    });
});