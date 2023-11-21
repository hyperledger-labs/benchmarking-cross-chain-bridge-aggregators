import { validate_chain, validate_tokens, validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { get_lifi_url } from './constants_local';
import { LiFiTransaction } from './types';

// Test without rate limiting at : https://apidocs.li.fi/reference/get_quote
export async function build_route(fromChain: number, toChain: number, fromToken: string, toToken: string, fromAmount: string) {
    validate_chain('LIFI', fromChain, toChain);
    validate_tokens(fromToken, toToken, fromChain === toChain);

    const fromAddress = validate_keys().public;
    const lifi_url = get_lifi_url(fromChain);

    const queryParams = new URLSearchParams({
        fromChain: fromChain.toString(),
        toChain: toChain.toString(),
        fromToken: fromToken,
        toToken: toToken,
        fromAmount: fromAmount,
        fromAddress: fromAddress,
        order: 'RECOMMENDED'
    });

    const url = `${lifi_url}/quote?${queryParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    const data: LiFiTransaction = await response.json();
    return data;
}