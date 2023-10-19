import { CHAIN_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';

enum LIFI_URLS {
    ETHEREUM = 'https://li.quest/v1',
    TESTNET = 'https://staging.li.quest/v1',
}

function create_tokens(chain_name: string): { [key: string]: string } {
    return CHAIN_MAP[chain_name].token_map;
}

export const TOKEN_MAP: { [key: number]: { [key: string]: string } } = {
    1: create_tokens('ETHEREUM'),
    5: create_tokens('GOERLI'),
    137: create_tokens('POLYGON'),
};

export function get_lifi_url(chain_id: number): string {
    if (chain_id === 5 || chain_id === 80001) {
        return LIFI_URLS.TESTNET;
    } else {
        return LIFI_URLS.ETHEREUM;
    }
}