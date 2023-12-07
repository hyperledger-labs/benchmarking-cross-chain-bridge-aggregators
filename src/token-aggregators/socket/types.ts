export type SocketQuoteSingleChain = {
    route: SocketRouteSingleChain;
    path: SocketPathSingleChain;
    address: string;
    amount: string;
}

export type SocketPathSingleChain = {
    fromToken: Token;
    toToken: Token;
}

export type Token = {
    chainId: number;
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
}

export type SocketRouteSingleChain = {
    routeId: string;
    isOnlySwapRoute: boolean;
    fromAmount: string;
    toAmount: string;
    sender: string;
    recipient: string;
    totalUserTx: number;
    totalGasFeesInUsd: number;
    userTxs: UserTx[];
    usedDexName: string;
    integratorFee: IntegratorFee;
    outputValueInUsd: number;
    receivedValueInUsd: number;
    inputValueInUsd: number;
}

export type IntegratorFee = {
    amount: string;
    asset: SocketAsset;
}

export type UserTx = {
    userTxType: string;
    txType: string;
    swapSlippage: number;
    chainId: number;
    protocol: Protocol;
    fromAsset: SocketAsset;
    approvalData: ApprovalData;
    fromAmount: string;
    toAsset: SocketAsset;
    toAmount: string;
    minAmountOut: string;
    gasFees: GasFees;
    sender: string;
    recipient: string;
    userTxIndex: number;
}

export type GasFees = {
    gasAmount: string;
    gasLimit: number;
    asset: SocketAsset;
    feesInUsd: number;
}

export type SocketAsset = {
    chainId: number;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    icon: string;
    logoURI: string;
    chainAgnosticId: string;
}

export type ApprovalData = {
    minimumApprovalAmount: string;
    approvalTokenAddress: string;
    allowanceTarget: string;
    owner: string;
}

export type Protocol = {
    name: string;
    displayName: string;
    icon: string;
}