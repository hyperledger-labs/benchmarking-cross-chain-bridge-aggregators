import {
    AlphaRouter,
    SwapOptionsSwapRouter02,
    SwapType,
} from '@uniswap/smart-order-router'

import { Percent } from '@uniswap/sdk-core'

import { get_provider } from '@benchmarking-cross-chain-bridges/helper/provider';
import { CHAIN_ID_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';

export function create_router(chainId: number): AlphaRouter {
    return new AlphaRouter({
        chainId: chainId,
        provider: get_provider(CHAIN_ID_MAP[chainId]),
    });
}

export function create_swap_options(): SwapOptionsSwapRouter02 {
    const KEY_PUBLIC = validate_keys().public;

    return {
        recipient: KEY_PUBLIC,
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
    };
}