import {
    AlphaRouter,
    SwapOptionsSwapRouter02,
    SwapOptionsUniversalRouter,
    SwapRoute,
} from '@uniswap/smart-order-router'

import { TradeType, CurrencyAmount, Token, Ether } from '@uniswap/sdk-core'

import { validate_chain, validate_tokens } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { TOKEN_MAP } from './constants_local';
import { define_alpha_router, create_router } from './config';

/**
 * Builds a swap route using the AlphaRouter from the @uniswap/smart-order-router package.
 * @param chainId - The chain ID of the network.
 * @param fromToken - The symbol or address of the token to swap from.
 * @param toToken - The symbol or address of the token to swap to.
 * @param amount - The amount of the fromToken to swap.
 * @returns A Promise that resolves to a SwapRoute object.
 * @throws An error if the fromToken or toToken is invalid, or if the private or public key is missing.
 */
export async function build_route(from_chain_id: number, to_chain_id: number, fromToken: string, toToken: string, amount: string, router_type: string): Promise<SwapRoute> {

    validate_tokens(fromToken, toToken, from_chain_id === to_chain_id);
    validate_chain('UNISWAP', from_chain_id, to_chain_id);

    if (from_chain_id !== to_chain_id) {
        throw new Error("UNISWAP: Only same chain swaps are supported");
    }

    // Create a router for the input chain with the provider
    // using the default configuring in config.ts
    const router: AlphaRouter = define_alpha_router(from_chain_id);
    const options: SwapOptionsSwapRouter02 | SwapOptionsUniversalRouter = create_router(router_type);

    let from_token: Token | Ether;
    if (fromToken === 'ETH') {
        from_token = Ether.onChain(from_chain_id);
    } else {
        from_token = TOKEN_MAP[from_chain_id][fromToken];
    }

    let to_token: Token | Ether;
    if (toToken === 'ETH') {
        to_token = Ether.onChain(from_chain_id);
    } else {
        to_token = TOKEN_MAP[from_chain_id][toToken];
    }

    const route: SwapRoute = await router.route(
        CurrencyAmount.fromRawAmount(
            from_token,
            amount
        ),
        to_token,
        TradeType.EXACT_INPUT,
        options
    ).catch((error) => {
        throw error;
    }).then((route) => {
        if (!route) {
            throw new Error('Route not found');
        }
        return route;
    });

    return route;
};