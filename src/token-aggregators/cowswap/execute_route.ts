import { ethers } from "ethers";
import {
    domain,
    Order,
    SigningScheme,
    signOrder,
} from "@gnosis.pm/gp-v2-contracts"

import { get_signer } from "@benchmarking-cross-chain-bridges/helper/provider";
import { approveAllow } from "@benchmarking-cross-chain-bridges/helper/token-misc";
import { CHAIN_ID_MAP } from "@benchmarking-cross-chain-bridges/helper/constants_global";
import { validate_keys } from "@benchmarking-cross-chain-bridges/helper/inp_validator";
import { OrderRequest, CreateOrder, SignOrder } from './types';

export async function sign_order(chainId: number, order: Order): Promise<SignOrder> {
    const chain = CHAIN_ID_MAP[chainId];
    const [trader] = [get_signer(chain)];

    const raw_signature = await signOrder(
        domain(chainId, '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'),
        order,
        trader,
        SigningScheme.ETHSIGN
    );
    // Needed to turn the three part object into a single bytestring
    const signature = ethers.utils.joinSignature(raw_signature.data);
    return {
        signingScheme: "ethsign",
        signature: signature,
        publicKey: validate_keys().public
    }
}

export async function submit_order(chainId: number, orderRequest: OrderRequest, order: Order) {
    const sign_order_resp = await sign_order(chainId, order);

    const createOrder: CreateOrder = {
        sellToken: orderRequest.sellToken,
        buyToken: orderRequest.buyToken,
        sellAmount: order.sellAmount,
        buyAmount: order.buyAmount,
        receiver: orderRequest.receiver,
        validTo: orderRequest.validTo,
        appData: orderRequest.appData,
        feeAmount: order.feeAmount,
        kind: order.kind,
        partiallyFillable: order.partiallyFillable,
        sellTokenBalance: orderRequest.sellTokenBalance,
        buyTokenBalance: orderRequest.buyTokenBalance,
        signingScheme: sign_order_resp.signingScheme,
        signature: sign_order_resp.signature,
        from: sign_order_resp.publicKey
    };

    const chain_name = CHAIN_ID_MAP[chainId];

    await approveAllow(
        chain_name,
        createOrder.sellToken,
        '0xC92E8bdf79f0507f65a392b0ab4667716BFE0110',
    );

    const url = `https://api.cow.fi/${chain_name.toLowerCase()}/api/v1/orders`;

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createOrder)
    };

    const response = await fetch(url, requestOptions);

    const resp_data = await response.json();

    return resp_data;
}