import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';

function create_tokens(chain_name: string): { [key: string]: string } {
    return CHAIN_MAP[chain_name].token_map;
}

export const TOKEN_MAP: { [key: number]: { [key: string]: string } } = {
    1: create_tokens('ETHEREUM'),
    137: create_tokens('POLYGON'),
};