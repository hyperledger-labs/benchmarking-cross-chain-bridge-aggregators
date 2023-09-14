// @ts-nocheck

import { validate_chain, validate_tokens, validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { TOKEN_MAP } from './constants_local'
import { CHAIN_ID_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { Quote } from './types';
import { Order } from '@gnosis.pm/gp-v2-contracts';

export async function build_route(sourceChain: number, destChain: number, fromToken: string, toToken: string, amount: string, operation: string): Promise<Quote> {

    if (sourceChain !== destChain) throw new Error("Source and destination chains must be the same for COWswap");

    validate_chain("COW", sourceChain, destChain);
    validate_tokens(fromToken, toToken);
    const KEY_PUBLIC = validate_keys().public;

    const fromToken_address = TOKEN_MAP[sourceChain][fromToken];
    const toToken_address = TOKEN_MAP[destChain][toToken];

    const network = CHAIN_ID_MAP[sourceChain];
    const url = `https://api.cow.fi/${network.toLowerCase()}/api/v1/quote`;
    const current_unix_timestamp = Math.round((new Date()).getTime() / 1000);

    if (operation !== "sell" && operation !== "buy") throw new Error("Operation must be either 'sell' or 'buy'");


    var sellAmountBeforeFee = amount;
    var buyAmountBeforeFee = '0';
    if (operation === 'buy') {
        sellAmountBeforeFee = '0';
        buyAmountBeforeFee = amount;
    }


    const order: Order = {
        sellToken: fromToken_address,
        buyToken: toToken_address,
        receiver: KEY_PUBLIC,
        validTo: current_unix_timestamp + 60 * 60 * 2,
        // appData is keccak("Hyperledger Benchmark Cross-Chain Bridges - Shankar")
        appData: '0x420b2cd7e0de3377492d507a33f20a6e733552f57c1829fc99478954d47ce63d',
        partiallyFillable: false,
        sellTokenBalance: 'erc20',
        buyTokenBalance: 'erc20',
        from: KEY_PUBLIC,
        kind: operation,
        sellAmountBeforeFee: sellAmountBeforeFee,
        buyAmountAfterFee: buyAmountBeforeFee,
    };

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    };

    const response = await fetch(url, requestOptions);

    const resp_data: Quote = await response.json();

    return resp_data;
}