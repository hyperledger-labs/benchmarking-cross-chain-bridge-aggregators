import { expect } from 'chai';

import { APIReport } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { make_api_report } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/token-aggregators/cowswap';

describe('Benchmarking Cowswap', () => {

    describe.skip('should create reports for GOERLI -> GOERLI trades', () => {
        const sourceChain = 5;
        const destChain = 5;

        it('should create a WETH SELL order on a WETH to USDC trade', async () => {
            const fromToken = 'WETH';
            const toToken = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const operation = 'sell';

            const report: APIReport = await make_api_report(sourceChain, destChain, fromToken, toToken, amount, operation);

            expect(report).to.have.property('run_id');
        });
    });

    describe('should create reports for ETHEREUM -> ETHEREUM trades', () => {
        const sourceChain = 1;
        const destChain = 1;

        it('should create a WETH SELL order on a WETH to USDC trade', async () => {
            const fromToken = 'WETH';
            const toToken = 'USDC';
            const amount = (1 * 10 ** 18).toString();
            const operation = 'sell';

            const report: APIReport = await make_api_report(sourceChain, destChain, fromToken, toToken, amount, operation);

            expect(report).to.have.property('run_id');
        });
    });
});