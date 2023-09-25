import { ethers } from 'ethers';

import { validate_rpc_url, validate_keys } from './inp_validator';
import { CHAIN_ID_MAP } from './constants_global';

export function get_provider(chain_name: string) {
    const rpc_url = validate_rpc_url(chain_name);

    const rpc = new ethers.providers.JsonRpcProvider(rpc_url);

    return rpc;
}

export function get_signer(chain_name: string) {
    const KEY_PRIVATE = validate_keys().private;
    const provider = get_provider(chain_name);
    const wallet = new ethers.Wallet(KEY_PRIVATE, provider);

    return wallet;
}

export async function create_tx(to: string, value: string, gas_limit: string, data: string, chain_id: number): Promise<string> {

    const KEY_PAIR = validate_keys();

    const KEY_PUBLIC = KEY_PAIR.public;
    const KEY_PRIVATE = KEY_PAIR.private;

    const chain_name = CHAIN_ID_MAP[chain_id];

    const provider = get_provider(chain_name);
    const txCount = await provider.getTransactionCount(KEY_PUBLIC);
    const wallet = new ethers.Wallet(KEY_PRIVATE, provider);

    const rawTransaction: ethers.providers.TransactionRequest = {
        from: KEY_PUBLIC,
        to: to,
        value: ethers.utils.parseUnits(value, "wei"),
        gasLimit: ethers.BigNumber.from(gas_limit),
        maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
        maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
        nonce: ethers.BigNumber.from(txCount.toString()),
        type: 2,
        chainId: chain_id,
    };

    const signedTransaction = wallet.signTransaction(rawTransaction);

    return signedTransaction;
};

export async function send_tx(signed_transaction: any, chain_id: number): Promise<ethers.providers.TransactionResponse> {
    const chain_name = CHAIN_ID_MAP[chain_id];

    const provider = get_provider(chain_name);

    try {
        const txResponse = await provider.sendTransaction(signed_transaction);
        return txResponse;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
    }
};
