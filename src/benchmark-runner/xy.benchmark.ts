import { expect } from 'chai';

import { APIReport } from './types/APIReport';
import { make_api_report } from './report-gen/xy';

describe('should create reports for ETHEREUM MAINNET -> POLYGON trades', () => {
    const sourceChain = 1;
    const destChain = 137;

    it('should create a WETH SELL order on a WETH to USDC trade', async () => {
        const fromToken = 'WETH';
        const toToken = 'USDC';
        const amount = (1 * 10 ** 18).toString();

        const report: APIReport = await make_api_report(sourceChain, destChain, fromToken, toToken, amount);

        expect(report).to.have.property('run_id');
    });
});