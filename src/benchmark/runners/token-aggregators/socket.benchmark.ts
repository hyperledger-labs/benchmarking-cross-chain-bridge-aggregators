import { expect } from 'chai';

import { APIReport } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { make_api_report } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/token-aggregators/socket';

const multiTx = true;
describe('Benchmarking Socket', () => {

    describe('should create reports for MAINNET -> POLYGON trades', () => {
        const fromChain = 1;
        const toChain = 137;

        it('should create an order for WETH to USDC swap', async () => {
            const fromToken = 'WETH';
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount, multiTx);

            expect(report).to.have.property('run_id');
        });

        // it('should create an order for WETH to MATIC swap', async () => {
        //     const fromToken = 'WETH';
        //     const toToken = 'WMATIC';
        //     const fromAmount = (1 * 10 ** 18).toString();

        //     const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount, multiTx);

        //     expect(report).to.have.property('run_id');
        // });
    });

    describe('should create reports for MAINNET -> MAINNET trades', () => {
        const fromChain = 1;
        const toChain = 1;

        it('should create an order for ETH to USDC swap', async () => {
            const fromToken = 'WETH';
            const toToken = 'USDC';
            const fromAmount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount, multiTx);

            expect(report).to.have.property('run_id');
        });
    });
});