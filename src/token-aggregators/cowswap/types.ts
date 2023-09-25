import { Order } from "@gnosis.pm/gp-v2-contracts";
import { BigNumberish } from "ethers";

export type CoWReturn = {
    resp: Quote,
    orderReq: OrderRequest,
    order: Order
}

export type SignOrder = {
    signingScheme: string,
    signature: string,
    publicKey: string
}

export type OrderRequest = {
    sellToken: string,
    buyToken: string,
    receiver: string,
    validTo: number,
    appData: string,
    partiallyFillable: boolean,
    sellTokenBalance: string,
    buyTokenBalance: string,
    from: string,
    kind: "sell" | "buy",
    sellAmountBeforeFee: string,
    buyAmountAfterFee: string,
};

export type Quote = {
    quote: {
        sellToken: string;
        buyToken: string;
        receiver: string;
        sellAmount: string;
        buyAmount: string;
        validTo: number;
        appData: string;
        feeAmount: string;
        kind: "sell" | "buy"; // Adjust the possible values as needed
        partiallyFillable: boolean;
        sellTokenBalance: "erc20";
        buyTokenBalance: "erc20";
        signingScheme: "eip712";
    };
    from: string;
    expiration: string;
    id: number;
};

export type SignedOrder = {
    sellToken: string,
    buyToken: string,
    sellAmount: number,
    buyAmount: number,
    receiver: string,
    validTo: number,
    appData: string,
    feeAmount: string,
    kind: "sell" | "buy",
    partiallyFillable: boolean,
    sellTokenBalance: "erc20",
    buyTokenBalance: "erc20",
    signingScheme: "ethsign",
    signature: string,
    from: string
}

export type CreateOrder = {
    sellToken: string;
    buyToken: string;
    sellAmount: BigNumberish;
    buyAmount: BigNumberish;
    receiver: string;
    validTo: number;
    appData: string;
    feeAmount: BigNumberish;
    kind: string; // Assuming kind can only be "sell" or "buy"
    partiallyFillable: boolean;
    sellTokenBalance: string; // Assuming it can only be "erc20"
    buyTokenBalance: string;  // Assuming it can only be "erc20"
    signingScheme: string; // Assuming it can only be "ethsign"
    signature: string; // Replace with the correct type for your signature
    from: string;
};