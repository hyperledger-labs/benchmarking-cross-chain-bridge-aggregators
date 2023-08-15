// https://aggregator-api.xy.finance/v1/docs#/Aggregator%20API/get_quote_quote_get

import { TOKEN_MAP } from "./constants_local";
import { validate_chain, validate_tokens, validate_keys } from '../helper/inp_validator';

export async function build_route(from_chain_id: number, to_chain_id: number, from_token: string, to_token: string, amount: string) {

    validate_chain("XY", from_chain_id, to_chain_id);
    validate_tokens(from_token, to_token);
    const KEY_PUBLIC = validate_keys().public;

    const from_token_address = TOKEN_MAP[from_chain_id][from_token];
    const to_token_address = TOKEN_MAP[to_chain_id][to_token];

    const queryParams = new URLSearchParams({
        srcChainId: from_chain_id.toString(),
        srcQuoteTokenAddress: from_token_address,
        srcQuoteTokenAmount: amount,
        dstChainId: to_chain_id.toString(),
        dstQuoteTokenAddress: to_token_address,
        slippage: "0.03",
    });

    const url = `https://aggregator-api.xy.finance/v1/quote?${queryParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}