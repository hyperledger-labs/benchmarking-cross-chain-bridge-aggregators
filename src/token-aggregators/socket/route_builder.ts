import dotenv from 'dotenv';
dotenv.config();

import { validate_api_key, validate_chain, validate_tokens, validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { TOKEN_MAP } from './constants_local'

export async function build_route(from_chain_id: number, to_chain_id: number, from_token: string, to_token: string, amount: string, unique_routes: boolean, sort: string) {

    const SOCKET_API_KEY = validate_api_key('SOCKET');
    validate_chain('SOCKET', from_chain_id, to_chain_id);
    validate_tokens(from_token, to_token, from_chain_id === to_chain_id);
    const user_address = validate_keys().public;

    const from_token_address = TOKEN_MAP[from_chain_id][from_token];
    const to_token_address = TOKEN_MAP[to_chain_id][to_token];

    try {
        const response = await fetch(`https://api.socket.tech/v2/quote?fromChainId=${from_chain_id}&fromTokenAddress=${from_token_address}&toChainId=${to_chain_id}&toTokenAddress=${to_token_address}&fromAmount=${amount}&userAddress=${user_address}&uniqueRoutesPerBridge=${unique_routes}&sort=${sort}`, {
            method: 'GET',
            headers: {
                'API-KEY': SOCKET_API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
}