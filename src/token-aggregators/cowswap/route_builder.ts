import { validate_chain, validate_tokens, validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { TOKEN_MAP } from './constants_local'
import { CHAIN_ID_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';

export async function build_route(from_chain_id: number, to_chain_id: number, from_token: string, to_token: string, amount: string) {

    validate_chain("COW", from_chain_id, to_chain_id);
    validate_tokens(from_token, to_token);
    const KEY_PUBLIC = validate_keys().public;

    const from_token_address = TOKEN_MAP[from_chain_id][from_token];
    const to_token_address = TOKEN_MAP[to_chain_id][to_token];

    const network = CHAIN_ID_MAP[from_chain_id];
    const url = `https://api.cow.fi/${network.toLowerCase()}/api/v1/quote`;
    const current_unix_timestamp = Math.round((new Date()).getTime() / 1000);

    const data = {
        sellToken: from_token_address,
        buyToken: to_token_address,
        receiver: KEY_PUBLIC,
        validTo: current_unix_timestamp + 60 * 60 * 2,
        appData: '0x0000000000000000000000000000000000000000000000000000000000000000',
        partiallyFillable: false,
        sellTokenBalance: 'erc20',
        buyTokenBalance: 'erc20',
        from: KEY_PUBLIC,
        kind: 'sell',
        sellAmountBeforeFee: amount,
    };

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, requestOptions);
    const resp_data = await response.json();

    return resp_data;
}