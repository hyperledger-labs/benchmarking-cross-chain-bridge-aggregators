export type LIFITransactionRequest = {
    data: string,
    to: string,
    value: string,
    from: string,
    chainId: number,
    gasPrice: string,
    gasLimit: string
}