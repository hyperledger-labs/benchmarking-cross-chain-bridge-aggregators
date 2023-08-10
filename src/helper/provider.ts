import { ethers } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";

import dotenv from 'dotenv';
dotenv.config();

const { KEY_PRIVATE, ALCHEMY_KEY_GOERLI } = process.env;

const config = {
    apiKey: ALCHEMY_KEY_GOERLI,
    network: Network.ETH_GOERLI,
};

export function getProvider(network: string, apiProvider: string): BaseProvider {
    const rpc_url: string | undefined = process.env[apiProvider.toUpperCase() + '_RPC_' + network.toUpperCase()];

    if (!rpc_url) {
        throw new Error(`RPC URL not found for ${apiProvider} and ${network}`);
    }

    const rpc = new ethers.providers.JsonRpcProvider(rpc_url);

    return rpc as BaseProvider;
}

export async function create_tx(from: string, to: string, value: string, gasLimit: string, data: string, chainId: number): Promise<string> {

    if (!KEY_PRIVATE) {
        throw new Error('Missing private key');
    }

    const ALCHEMY = new Alchemy(config);
    const wallet = new Wallet(KEY_PRIVATE)

    const rawTransaction = {
        from: from,
        to: to,
        value: value,
        gasLimit: gasLimit,
        maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
        maxFeePerGas: Utils.parseUnits("20", "gwei"),
        data: data,
        nonce: await ALCHEMY.core.getTransactionCount(wallet.getAddress()),
        type: 2,
        chainId: chainId,
    };

    const signedTransaction = await wallet.signTransaction(rawTransaction);

    return signedTransaction;
};

export async function send_tx(signedTransaction: string): Promise<ethers.providers.TransactionResponse> {
    const alchemy = new Alchemy(config);

    const response = await alchemy.transact.sendTransaction(signedTransaction);

    return response;
};
