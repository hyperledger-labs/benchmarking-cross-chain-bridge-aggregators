import {
    AlphaRouter,
    SwapOptionsSwapRouter02,
    SwapType,
} from '@uniswap/smart-order-router'

import { Percent } from '@uniswap/sdk-core'
import { getProvider } from '../helper/provider';
import { CHAIN_MAP } from '../helper/constants_global';

import dotenv from "dotenv";
dotenv.config();

const { KEY_PUBLIC } = process.env;

export function create_router(chainId: number): AlphaRouter {
    return new AlphaRouter({
        chainId: chainId,
        provider: getProvider(CHAIN_MAP[chainId], 'ALCHEMY'),
    });
}

export function create_swap_options(): SwapOptionsSwapRouter02 {
    // Check for public key
    if (!KEY_PUBLIC) {
        throw new Error('Couldn\'t find KEY_PUBLIC (public key) in .env file');
    }

    return {
        recipient: KEY_PUBLIC,
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
    };
}