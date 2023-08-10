import { Order } from '@lifi/sdk';
import { lifi } from './config';
import { exit } from 'process';

import { validate_chain, validate_tokens } from '../helper/inp_validator';
import { TOKEN_MAP } from './constants_local';

export async function build_route(from_chain_id: number, from_token: string, to_chain_id: number, to_token: string, amount: string) {

    try {
        validate_chain('LIFI', from_chain_id, to_chain_id);
        validate_tokens(from_token, to_token);
    } catch (error) {
        throw error;
    }

    const from_token_address = TOKEN_MAP[from_chain_id][from_token];
    const to_token_address = TOKEN_MAP[to_chain_id][to_token];

    const result = await lifi.getRoutes({
        fromChainId: from_chain_id,
        fromTokenAddress: from_token_address,
        toChainId: to_chain_id,
        toTokenAddress: to_token_address,
        fromAmount: amount,
        options: {
            slippage: 3 / 100,
            order: 'SAFEST' as Order,
        },
    }).then((result) => {
        return result;
    }).catch((error) => {
        throw error;
    });

    return result.routes;
}