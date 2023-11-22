import axios from "axios";

import { get_signer } from "@benchmarking-cross-chain-bridges/helper/provider";
import { approveAllow } from "@benchmarking-cross-chain-bridges/helper/token_misc";
import { CHAIN_ID_MAP } from "@benchmarking-cross-chain-bridges/helper/constants_global";
import { get_lifi_url } from "./constants_local";
import { TransactionRequest } from "./types";

const getStatus = async (bridge: string, fromChain: number, toChain: number, txHash: string) => {
    const lifi_url = get_lifi_url(fromChain);

    const result = await axios.get(`${lifi_url}/status`, {
        params: {
            bridge,
            fromChain,
            toChain,
            txHash,
        }
    });
    return result.data;
}

// NO LOW BALANCE CHECKS ON THE LIFI SMART CONTRACT
export async function submit_order(fromChain: number, toChain: number, fromToken: string, quote: any) {

    const chain_name = CHAIN_ID_MAP[fromChain];
    const signer = get_signer(chain_name);

    const spenderAddress = quote.estimate.approvalAddress;
    const transactionRequest: TransactionRequest = quote.transactionRequest;
    const bridge = quote.tool;

    await approveAllow(
        chain_name,
        fromToken,
        spenderAddress,
    );

    const tx = await signer.sendTransaction(transactionRequest);

    await tx.wait();

    // Only needed for cross chain transfers
    if (fromChain !== toChain) {
        let result;
        do {
            result = await getStatus(bridge, fromChain, toChain, tx.hash);
        } while (result.status !== 'DONE' && result.status !== 'FAILED')
    }

    return tx.hash;
}