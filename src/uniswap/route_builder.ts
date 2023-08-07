import {
    AlphaRouter,
    SwapOptionsSwapRouter02,
    SwapRoute,
    SwapType,
} from '@uniswap/smart-order-router'

import { ChainId, TradeType, CurrencyAmount, Percent, Token, Ether, NativeCurrency } from '@uniswap/sdk-core'
import { getProvider } from '../helper/provider';

import dotenv from "dotenv";
dotenv.config();

const { KEY_PRIVATE, KEY_PUBLIC, ALCHEMY_KEY_GOERLI } = process.env;

export async function build_route(): Promise<SwapRoute> {

    if (!KEY_PRIVATE || !KEY_PUBLIC) {
        throw new Error('Missing private or public key');
    }

    const router: AlphaRouter = new AlphaRouter({
        chainId: ChainId.GOERLI,
        provider: getProvider('goerli', 'alchemy'),
    })

    const options: SwapOptionsSwapRouter02 = {
        recipient: KEY_PUBLIC,
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
    }

    const route: SwapRoute = await router.route(
        CurrencyAmount.fromRawAmount(
            Ether.onChain(ChainId.GOERLI),
            '1000000000000000000'
        ),
        new Token(ChainId.GOERLI, '0x07865c6E87B9F70255377e024ace6630C1Eaa37F', 18),
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