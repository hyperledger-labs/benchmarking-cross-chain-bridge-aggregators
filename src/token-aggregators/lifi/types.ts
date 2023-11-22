export type Token = {
    address: string,
    chainId: number,
    symbol: string,
    decimals: number,
    name: string,
    coinKey: string,
    logoURI: string,
    priceUSD: string,
}

export type FeeCost = {
    name: string,
    description: string,
    token: Token,
    amount: string,
    amountUSD: string,
    percentage: string,
    included: boolean,
}

export type GasCost = {
    type: string,
    price: string,
    estimate: string,
    limit: string,
    amount: string,
    amountUSD: string,
    token: Token,
}

export type Estimate = {
    tool: string,
    approvalAddress: string,
    toAmountMin: string,
    toAmount: string,
    fromAmount: string,
    feeCosts: FeeCost[],
    gasCosts: GasCost[],
    executionDuration: number,
    fromAmountUSD: string,
    toAmountUSD: string,
    toolData?: {
        path: string[],
        routerAddress: string,
    }
}

export type Action = {
    fromToken: Token,
    fromAmount: string,
    toToken: Token,
    fromChainId: number,
    toChainId: number,
    slippage: number,
    fromAddress: string,
    toAddress: string,
}

export type IncludedStep = {
    id: string,
    type: string,
    action: Action,
    estimate: Estimate,
    tool: string,
    toolDetails: {
        key: string,
        name: string,
        logoURI: string,
    },
}

export type TransactionRequest = {
    data: string,
    to: string,
    value: string,
    from: string,
    chainId: number,
    gasPrice: string,
    gasLimit: string,
}

export type LiFiTransaction = {
    type: string,
    id: string,
    tool: string,
    toolDetails: {
        key: string,
        name: string,
        logoURI: string,
    },
    action: Action,
    estimate: Estimate,
    includedSteps: IncludedStep[],
    integrator: string,
    transactionRequest: TransactionRequest,
}