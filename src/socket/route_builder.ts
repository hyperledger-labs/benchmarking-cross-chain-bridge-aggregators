import { BigNumber, Contract, ethers, Wallet } from 'ethers';
import fetch from 'cross-fetch';

import dotenv from 'dotenv';
dotenv.config();

const { KEY_PRIVATE, KEY_PUBLIC, ALCHEMY_KEY_GOERLI } = process.env;
let { SOCKET_API_KEY } = process.env;

export async function getQuote(fromChainId: number, fromTokenAddress: string, toChainId: number, toTokenAddress: string, fromAmount: number, userAddress: string, uniqueRoutesPerBridge: boolean, sort: string) {

    if (!SOCKET_API_KEY) {
        throw new Error('Missing Socket API Key. Get it from the Socket Docs.');
    }

    const response = await fetch(`https://api.socket.tech/v2/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&fromAmount=${fromAmount}&userAddress=${userAddress}&uniqueRoutesPerBridge=${uniqueRoutesPerBridge}&sort=${sort}`, {
        method: 'GET',
        headers: {
            'API-KEY': SOCKET_API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const json = await response.json();
    return json;
}