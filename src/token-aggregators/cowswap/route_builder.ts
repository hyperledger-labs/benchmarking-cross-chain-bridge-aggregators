
import { validate_chain, validate_tokens, validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { CHAIN_ID_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { OrderRequest, Quote, CoWReturn } from './types';
import { create_order, get_order_from_quote } from './constants_local';

export async function build_route(sourceChain: number, destChain: number, fromToken: string, toToken: string, amount: string, operation: string, valid_time: number = 30): Promise<CoWReturn> {

    if (sourceChain !== destChain) throw new Error("Source and destination chains must be the same for COWswap");

    validate_chain("COW", sourceChain, destChain);
    validate_tokens(fromToken, toToken);
    const KEY_PUBLIC = validate_keys().public;
    const network = CHAIN_ID_MAP[sourceChain];
    const url = `https://api.cow.fi/${network.toLowerCase()}/api/v1/quote`;
    const current_unix_timestamp = Math.round((new Date()).getTime() / 1000);

    if (operation !== "sell" && operation !== "buy") throw new Error("Operation must be either 'sell' or 'buy'");

    //  cast keccak "Hyperledger Benchmark Cross-Chain Bridges - Shankar"
    const appData = "0x420b2cd7e0de3377492d507a33f20a6e733552f57c1829fc99478954d47ce63d";

    const orderRequest: OrderRequest = create_order(sourceChain, destChain, fromToken, toToken, amount, KEY_PUBLIC, current_unix_timestamp + valid_time * 60, appData, "erc20", "erc20", KEY_PUBLIC, operation);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderRequest)
    };

    const response = await fetch(url, requestOptions);
    const resp_data: Quote = await response.json();

    let cowRoute: CoWReturn = {
        resp: resp_data,
        orderReq: orderRequest,
        order: get_order_from_quote(resp_data)
    }

    return cowRoute;
}

