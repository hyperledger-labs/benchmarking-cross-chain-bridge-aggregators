import { CHAIN_MAP } from '../helper/constants_global';

enum SOCKET_URLS {
    MAINNET = 'https://li.quest/v1',
    TESTNET = 'https://staging.li.quest/v1',
}

function create_tokens(chain_name: string): { [key: string]: string } {
    return CHAIN_MAP[chain_name].token_map;
}

export const TOKEN_MAP: { [key: number]: { [key: string]: string } } = {
    1: create_tokens('MAINNET'),
    5: create_tokens('GOERLI'),
};

export function get_socket_url(chain_id: number): string {
    if (chain_id === 5 || chain_id === 80001) {
        return SOCKET_URLS.TESTNET;
    } else {
        return SOCKET_URLS.MAINNET;
    }
}