import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';
import { OrderBalance, OrderKind, Order } from '@gnosis.pm/gp-v2-contracts';
import { SupportedChainId } from '@cowprotocol/cow-sdk'
import { COWOrderRequest, COWQuote } from './types';

function create_tokens(chain_name: string): { [key: string]: string } {
    return CHAIN_MAP[chain_name].token_map;
}

export const TOKEN_MAP: { [key: number]: { [key: string]: string } } = {
    1: create_tokens('ETHEREUM'),
    5: create_tokens('GOERLI'),
    100: create_tokens('GNOSIS'),
};

export function create_order(sourceChain: number, destChain: number, fromToken: string, toToken: string, amount: string, receiver: string, validTo: number, appData: string, sellTokenBalance: string, buyTokenBalance: string, from: string, kind: string): COWOrderRequest {
    const fromToken_address = TOKEN_MAP[sourceChain][fromToken];
    const toToken_address = TOKEN_MAP[destChain][toToken];

    var sellAmountBeforeFee = amount;
    var buyAmountAfterFee = '0';
    if (kind === 'buy') {
        sellAmountBeforeFee = '0';
        buyAmountAfterFee = amount;
    }
    const orderRequest: COWOrderRequest = {
        sellToken: fromToken_address,
        buyToken: toToken_address,
        receiver: receiver,
        validTo: validTo,
        appData: appData,
        partiallyFillable: false,
        sellTokenBalance: sellTokenBalance as OrderBalance,
        buyTokenBalance: buyTokenBalance as OrderBalance,
        kind: kind as OrderKind,
        from: from,
        sellAmountBeforeFee: sellAmountBeforeFee,
        buyAmountAfterFee: buyAmountAfterFee,
    }

    return orderRequest;
}

export function get_order_from_quote(quote: COWQuote): Order {
    const quote_obj = quote.quote;

    let order_kind = OrderKind.SELL;

    if (quote_obj.kind == 'buy') {
        order_kind = OrderKind.BUY;
    }

    return {
        sellToken: quote_obj.sellToken,
        buyToken: quote_obj.buyToken,
        sellAmount: quote_obj.sellAmount,
        buyAmount: quote_obj.buyAmount,
        validTo: quote_obj.validTo,
        appData: quote_obj.appData,
        feeAmount: quote_obj.feeAmount,
        kind: order_kind,
        partiallyFillable: quote_obj.partiallyFillable,
        receiver: quote_obj.receiver
    }
}

export function get_support_chain_id(chain_id: number): string {
    switch (chain_id) {
        case SupportedChainId.MAINNET:
            return "mainnet";
        case SupportedChainId.GOERLI:
            return "goerli";
        case SupportedChainId.GNOSIS_CHAIN:
            return "gnosis";
        default:
            throw new Error(`Chain id ${chain_id} is not supported`);
    }
}