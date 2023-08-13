import { ChainId, Token, Pair, CurrencyAmount, Route, Trade, TradeOptions, TradeType } from '@sushiswap/sdk';
import { TOKEN_MAP } from '../uniswap/constants_local';
import { ethers } from 'ethers'; // Import ethers.js library

async function generateSwapRoutes() {
    const chainId = ChainId.GÖRLI; // You can use the appropriate chain ID
    const fromToken = TOKEN_MAP[chainId]['WETH'] as Token;
    const toToken = TOKEN_MAP[chainId]['USDC'] as Token;

    const pair = new Pair(
        CurrencyAmount.fromRawAmount(fromToken, '50'),
        CurrencyAmount.fromRawAmount(toToken, '150')
    );

    const route = new Route([pair], fromToken, toToken);

    const tradeOptions = {
        maxHops: 10,
        maxNumResults: 5,
    };

    // 1691966815
    // 1628035200

    const trade = Trade.bestTradeExactIn(
        [pair],
        CurrencyAmount.fromRawAmount(fromToken, '100'),
        toToken,
        tradeOptions
    );

    console.log('Trade:', trade[0]);
}

generateSwapRoutes();
