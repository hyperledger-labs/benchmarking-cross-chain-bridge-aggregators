import {
    AlphaRouter,
    SwapOptionsSwapRouter02,
    SwapRoute,
    SwapType,
} from '@uniswap/smart-order-router'

import { ChainId, TradeType, CurrencyAmount, Percent, Token, Ether } from '@uniswap/sdk-core'
import { getProvider } from '../helper/provider';
import { TOKEN_MAP } from './constants_local';

import dotenv from "dotenv";
dotenv.config();

const { KEY_PRIVATE, KEY_PUBLIC, ALCHEMY_KEY_GOERLI } = process.env;

export async function build_route(chainId: number, fromToken: string, toToken: string, amount: string): Promise<SwapRoute> {

    // check if from_token and to_token are valid
    if (!TOKEN_MAP[chainId][fromToken] && fromToken !== 'ETH') {
        throw new Error('Invalid from_token');
    } else if (!TOKEN_MAP[chainId][toToken] && toToken !== 'ETH') {
        throw new Error('Invalid to_token');
    }

    if (!KEY_PUBLIC) {
        throw new Error('Missing private or public key');
    }

    const router: AlphaRouter = new AlphaRouter({
        chainId: chainId,
        provider: getProvider('goerli', 'alchemy'),
    })

    const options: SwapOptionsSwapRouter02 = {
        recipient: KEY_PUBLIC,
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
    }

    let from_token: Token | Ether;
    if (fromToken === 'ETH') {
        from_token = Ether.onChain(chainId);
    } else {
        from_token = TOKEN_MAP[chainId][fromToken];
    }

    let to_token: Token | Ether;
    if (toToken === 'ETH') {
        to_token = Ether.onChain(chainId);
    } else {
        to_token = TOKEN_MAP[chainId][toToken];
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
        console.log(error);
    }).then((route) => {

        if (!route) {
            throw new Error('Route not found');
        }

        return route;
    });

    return route;
};