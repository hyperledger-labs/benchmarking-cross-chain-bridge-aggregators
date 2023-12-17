// https://aggregator-api.xy.finance/v1/docs#/Aggregator%20API/get_quote_quote_get

import { TOKEN_MAP, URL_QUOTES } from "./constants_local";
import { validate_chain, validate_tokens } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { XYQuote } from "./types";

/**
 * Builds a route for a swap transaction.
 * @param from_chain_id The source chain ID.
 * @param to_chain_id The destination chain ID.
 * @param from_token The token to sell.
 * @param to_token The token to buy.
 * @param amount The amount to sell.
 * @returns The XY route.
 */
export async function build_route(from_chain_id: number, to_chain_id: number, from_token: string, to_token: string, amount: string): Promise<XYQuote> {

    validate_chain("XY", from_chain_id, to_chain_id);
    validate_tokens(from_token, to_token, from_chain_id === to_chain_id);

    const from_token_address = TOKEN_MAP[from_chain_id][from_token];
    const to_token_address = TOKEN_MAP[to_chain_id][to_token];

    const queryTxParams = new URLSearchParams({
        srcChainId: from_chain_id.toString(),
        srcQuoteTokenAddress: from_token_address,
        srcQuoteTokenAmount: amount,
        dstChainId: to_chain_id.toString(),
        dstQuoteTokenAddress: to_token_address,
        slippage: "0.03",
    });

    const txUrl = `${URL_QUOTES}${queryTxParams.toString()}`;

    const response = await fetch(txUrl);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    const data: XYQuote = await response.json();
    return data;
}