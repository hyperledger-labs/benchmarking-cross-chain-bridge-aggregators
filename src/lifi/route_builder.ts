import { Order } from '@lifi/sdk';
import { lifi } from './config';

import fetch from 'cross-fetch';
import { validate_chain, validate_tokens } from '../helper/inp_validator';
import { TOKEN_MAP } from './constants_local';


export async function build_route(fromChain: string, toChain: string, fromToken: string, toToken: string, fromAmount: string) {
    const fromAddress = '0x548575786EEbE8B31e0Bd244B93Cd501c6e767a8';

    const queryParams = new URLSearchParams({
        fromChain: fromChain,
        toChain: toChain,
        fromToken: fromToken,
        toToken: toToken,
        fromAmount: fromAmount,
        fromAddress: fromAddress,
    });

    const url = `https://li.quest/v1/quote?${queryParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}