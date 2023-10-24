export type XYSwapDescription = {
    chainId: number,
    provider: string,
    srcTokenAddress: string,
    dstTokenAddress: string,
    srcTokenAmount: string,
    dstTokenAmount: string,
    dexNames: string[]
}

export type XYBridgeDescription = {
    provider: string,
    srcChainId: number,
    srcBridgeTokenAddress: string,
    dstChainId: number,
    dstBridgeTokenAddress: string,
    srcBridgeTokenAmount: string,
    dstBridgeTokenAmount: string,
    bridgeContractAddress: string,
    bridgeFeeAmount: string,
    bridgeFeeToken: XYToken,
    srcBridgeToken: XYToken,
    dstBridgeToken: XYToken
}

export type XYToken = {
    chainId: number,
    address: string,
    decimals: number,
    symbol: string
}

export type XYRoute = {
    srcChainId: number,
    srcQuoteTokenAddress: string,
    srcQuoteTokenAmount: string,
    dstChainId: number,
    dstQuoteTokenAddress: string,
    slippage: number,
    srcSwapDescription: XYSwapDescription,
    bridgeDescription: XYBridgeDescription,
    dstSwapDescription: XYSwapDescription,
    dstQuoteTokenAmount: string,
    minReceiveAmount: string,
    affiliateFeeAmount: string,
    withholdingFeeAmount: string,
    routeType: string,
    tags: any[],
    contractAddress: string,
    withholdingFeeToken: number,
    srcQuoteToken: number,
    dstQuoteToken: number,
    srcQuoteTokenUsdValue: string,
    dstQuoteTokenUsdValue: string,
    transactionCounts: number,
    estimatedGas: string,
    estimatedTransferTime: number,
}

export type XYQuote = {
    success: boolean,
    routes: XYRoute[]
}

export type XYTx = {
    srcChainId: number,
    srcQuoteTokenAddress: string,
    srcQuoteTokenAmount: string,
    dstChainId: number,
    dstQuoteTokenAddress: string,
    slippage: number,
    receiver: string,
    affiliate: string,
    commissionRate: number,
    bridgeProvider: string,
    srcBridgeTokenAddress: string,
    dstBridgeTokenAddress: string,
    srcSwapProvider: string,
    dstSwapProvider?: string,
};