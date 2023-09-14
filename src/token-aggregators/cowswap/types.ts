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
        kind: "sell" | "buy";
        partiallyFillable: boolean;
        sellTokenBalance: "erc20";
        buyTokenBalance: "erc20";
        signingScheme: "eip712";
    };
    from: string;
    expiration: string;
    id: number;
};
