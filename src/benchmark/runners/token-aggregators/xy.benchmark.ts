import { expect } from 'chai';

import { APIReport } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { make_api_report } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/token-aggregators/xy';

describe('Benchmarking XY (get_token_price() may error if the coingecko pair is not correct)', () => {
    describe('should create reports for MAINNET ETHEREUM -> ETHEREUM trades', () => {
        const sourceChain = 1;
        const destChain = 1;

        it('should benchmark WETH to USDC swap', async () => {
            const fromToken = 'WETH';
            const toToken = 'USDC';
            const amount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(sourceChain, destChain, fromToken, toToken, amount);

            expect(report).to.have.property('run_id');
        });
    });

    describe('should create reports for ETHEREUM MAINNET -> POLYGON trades', () => {
        const sourceChain = 1;
        const destChain = 137;

        it('should benchmark WETH to USDC swap', async () => {
            const fromToken = 'WETH';
            const toToken = 'USDC';
            const amount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(sourceChain, destChain, fromToken, toToken, amount);

            expect(report).to.have.property('run_id');
        });

        it('should benchmark WETH to MATIC swap', async () => {
            const fromToken = 'WETH';
            const toToken = 'MATIC';
            const amount = (1 * 10 ** 18).toString();

            const report: APIReport = await make_api_report(sourceChain, destChain, fromToken, toToken, amount);

            expect(report).to.have.property('run_id');
        });
    });
});