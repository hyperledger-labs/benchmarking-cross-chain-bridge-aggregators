import { ethers } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";

import { validate_rpc_url, validate_keys } from './inp_validator';
import { CHAIN_ID_MAP } from './constants_global';

const rpc_data = validate_rpc_url('ALCHEMY', 'GOERLI');
let config = {
    apiKey: rpc_data[1],
    network: Network.ETH_GOERLI,
};

export function get_provider(network: string, api_provider: string): BaseProvider {
    const rpc_url = validate_rpc_url(api_provider, network)[0];

    const rpc = new ethers.providers.JsonRpcProvider(rpc_url);

    return rpc as BaseProvider;
}

export async function create_tx(to: string, value: string, gas_limit: string, data: string, chain_id: number): Promise<string> {

    const KEY_PAIR = validate_keys();

    const KEY_PUBLIC = KEY_PAIR.public;
    const KEY_PRIVATE = KEY_PAIR.private;

    const chain_name = CHAIN_ID_MAP[chain_id];
    const rpc_data = validate_rpc_url('ALCHEMY', chain_name);

    const ALCHEMY_KEY = rpc_data[1];
    const ALCHEMY_NETWORK = rpc_data[2] as Network;

    config = {
        apiKey: ALCHEMY_KEY,
        network: ALCHEMY_NETWORK,
    };

    const ALCHEMY = new Alchemy(config);
    const wallet = new Wallet(KEY_PRIVATE)

    const rawTransaction = {
        from: KEY_PUBLIC,
        to: to,
        value: value,
        gasLimit: gas_limit,
        maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
        maxFeePerGas: Utils.parseUnits("20", "gwei"),
        data: data,
        nonce: await ALCHEMY.core.getTransactionCount(wallet.getAddress()),
        type: 2,
        chainId: chain_id,
    };

    const signedTransaction = await wallet.signTransaction(rawTransaction);

    return signedTransaction;
};

export async function send_tx(signed_transaction: string): Promise<ethers.providers.TransactionResponse> {
    const alchemy = new Alchemy(config);

    const response = await alchemy.transact.sendTransaction(signed_transaction);

    return response;
};
