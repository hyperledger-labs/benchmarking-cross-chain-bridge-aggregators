import { expect } from 'chai';

import { APIReport } from '@benchmarking-cross-chain-bridges/benchmark/types/APIReport';
import { make_api_report } from '@benchmarking-cross-chain-bridges/benchmark/report-gen/token-aggregators/socket';

describe('should create reports for MAINNET -> POLYGON trades', () => {
    const fromChain = 1;
    const toChain = 137;

    it('should create an order for ETH to MATIC swap', async () => {
        const fromToken = 'WETH';
        const toToken = 'USDC';
        const fromAmount = (1 * 10 ** 18).toString();
        const multiTx = true;

        const report: APIReport = await make_api_report(fromChain, toChain, fromToken, toToken, fromAmount, multiTx);

        expect(report).to.have.property('run_id');
    });
});