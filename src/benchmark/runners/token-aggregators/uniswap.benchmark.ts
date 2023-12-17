import { expect } from 'chai';

import { APIReport } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { make_api_report } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/token-aggregators/uniswap';

describe('Benchmarking Uniswap (Pool errors may occur!)', () => {

    describe.skip('should create reports for GOERLI -> GOERLI trades', () => {
        const sourceChain = 5;
        const destChain = 5;

        it('should benchmark WETH to USDC swap', async () => {
            const fromToken = 'WETH';
            const toToken = 'USDC';
            const amount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(sourceChain, destChain, fromToken, toToken, amount);

            expect(report).to.have.property('run_id');
        });
    });

    describe('should create reports for ETHEREUM -> ETHEREUM trades', () => {
        const sourceChain = 1;
        const destChain = 1;
        const fromToken = 'ETH';
        const toToken = 'DAI';
        const amount = (1 * 10 ** 18).toString();

        it('should benchmark ETH to DAI swap with universal router', async () => {
            const report: APIReport = await make_api_report(sourceChain, destChain, fromToken, toToken, amount);

            expect(report).to.have.property('run_id');
        });
    });
});