import { get_signer } from "@benchmarking-cross-chain-bridges/helper/provider";
import { approveAllow } from "@benchmarking-cross-chain-bridges/helper/token-misc";
import { CHAIN_ID_MAP } from "@benchmarking-cross-chain-bridges/helper/constants_global";

import { BigNumber } from "ethers";
import { UNISWAPMethodParameters } from "./types";
import { assert } from "console";

export async function submit_order(sourceChain: number, fromToken: string, quote: UNISWAPMethodParameters) {
    const chain_name = CHAIN_ID_MAP[sourceChain];
    const signer = get_signer(chain_name);

    const tx_callData = quote.calldata;
    const tx_value = BigNumber.from(quote.value);
    const spender_address = quote.to;

    await approveAllow(chain_name, fromToken, spender_address);

    const transactionRequest = {
        to: spender_address,
        data: tx_callData,
        value: tx_value,
        from: signer.address
    };

    const tx = await signer.sendTransaction(transactionRequest);

    await tx.wait();

    return tx.hash;
}