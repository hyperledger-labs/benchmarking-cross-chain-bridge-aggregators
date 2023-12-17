import { ethers } from 'ethers';

import { validate_rpc_url, validate_keys } from './inp_validator';
import { CHAIN_ID_MAP } from './constants_global';

/**
 * Gets the provider for a given chain.
 * @param chain_name The name of the chain.
 * @returns The provider.
 */
export function get_provider(chain_name: string) {
    const rpc_url = validate_rpc_url(chain_name);

    const rpc = new ethers.providers.JsonRpcProvider(rpc_url);

    return rpc;
}

/**
 * Creates a signer for a given chain.
 * @param chain_name The name of the chain.
 * @returns The signer.
 */
export function get_signer(chain_name: string) {
    const KEY_PRIVATE = validate_keys().private;
    const provider = get_provider(chain_name);
    const wallet = new ethers.Wallet(KEY_PRIVATE, provider);

    return wallet;
}

/**
 * Gets the gas price for a given chain.
 * @param chain_name The name of the chain.
 * @returns The gas price.
 */
export async function get_gas_price(chain_name: string): Promise<number> {
    const provider = get_provider(chain_name);
    const gasPrice = await provider.getGasPrice();

    return gasPrice.toNumber();
}

/**
 * Gets the latest block number on a given chain.
 * @param chain_name The name of the chain.
 * @returns The block number.
 */
export async function get_latest_blockNum(chain_name: string): Promise<number> {
    const provider = get_provider(chain_name);
    const blockNumber = await provider.getBlockNumber();

    return blockNumber;
}


/**
 * Creates a signed transaction for a given chain using the provided parameters.
 * @param to The recipient address of the transaction.
 * @param value The value to be sent in the transaction.
 * @param gas_limit The gas limit for the transaction.
 * @param data The data to be included in the transaction.
 * @param chain_id The ID of the chain for which the transaction is being created.
 * @returns A promise that resolves to the signed transaction.
 */
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

/**
 * Sends a signed transaction to a given chain.
 * @param signed_transaction The signed transaction to be sent.
 * @param chain_id The ID of the chain to which the transaction is to be sent.
 * @returns A promise that resolves to the transaction response.
 * @throws Error if the transaction fails.
 */
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
