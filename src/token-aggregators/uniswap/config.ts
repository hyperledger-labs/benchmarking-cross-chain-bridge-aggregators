import {
    AlphaRouter,
    SwapOptionsSwapRouter02,
    SwapOptionsUniversalRouter,
    SwapType,
} from '@uniswap/smart-order-router'

import { Percent } from '@uniswap/sdk-core'

import { get_provider } from '@benchmarking-cross-chain-bridges/helper/provider';
import { CHAIN_ID_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';

/**
 * Creates a new Alpha Router.
 * @param chainId The chain ID of the source chain.
 * @returns The Alpha Router.
 */
export function define_alpha_router(chainId: number): AlphaRouter {
    return new AlphaRouter({
        chainId: chainId,
        provider: get_provider(CHAIN_ID_MAP[chainId]),
    });
}

/**
 * Creates a new router.
 * @param router_type The type of router to create.
 * @returns The router.
 */
export function create_router(router_type: string): SwapOptionsSwapRouter02 | SwapOptionsUniversalRouter {
    const KEY_PUBLIC = validate_keys().public;

    if (router_type === 'universal_router') {
        return {
            recipient: KEY_PUBLIC,
            slippageTolerance: new Percent(50, 10_000),
            type: SwapType.UNIVERSAL_ROUTER,
        };
    }

    return {
        recipient: KEY_PUBLIC,
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
    };
}