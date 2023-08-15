import { Token, Pair, CurrencyAmount, Trade, TradeType } from '@sushiswap/sdk';

import { validate_chain, validate_tokens, validate_keys } from '../../helper/inp_validator';
import { TOKEN_MAP } from '../sushiswap/constants_local';

export async function build_route(from_chain_id: number, to_chain_id: number, from_token: string, to_token: string, amount: string): Promise<Trade<Token, Token, TradeType.EXACT_INPUT>[]> {

    validate_chain("SUSHI", from_chain_id, to_chain_id);
    validate_tokens(from_token, to_token);

    if (from_chain_id !== to_chain_id) {
        throw new Error("SUSHI: Only same chain swaps are supported");
    }

    const fromToken = TOKEN_MAP[from_chain_id][from_token] as Token;
    const toToken = TOKEN_MAP[to_chain_id][to_token] as Token;

    // TODO: Get the pair from a pool? with the real reserves
    const pair = new Pair(
        CurrencyAmount.fromRawAmount(fromToken, '50'),
        CurrencyAmount.fromRawAmount(toToken, '150')
    );

    const tradeOptions = {
        maxHops: 5,
        maxNumResults: 5,
    };

    const trade = Trade.bestTradeExactIn(
        [pair],
        CurrencyAmount.fromRawAmount(fromToken, amount),
        toToken,
        tradeOptions
    );

    return trade;
}