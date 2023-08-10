import { Network } from 'alchemy-sdk';
import dotenv from 'dotenv';
dotenv.config();

import { SUPPORTED_CHAINS, SUPPORTED_TOKENS, CHAIN_ID_MAP, CHAIN, CHAIN_MAP } from './constants_global';

let { KEY_PUBLIC, KEY_PRIVATE, SOCKET_API_KEY } = process.env;

export function validate_chain(protocol_name: string, chain_id: number): CHAIN {
    if (!SUPPORTED_CHAINS[protocol_name].includes(CHAIN_ID_MAP[chain_id])) {
        throw new Error(`Invalid chain_id: ${chain_id} for protocol: ${protocol_name}`);
    }

    return CHAIN_MAP[chain_id];
}

export function validate_tokens(from_token: string, to_token: string): boolean {
    if (!SUPPORTED_TOKENS.includes(from_token)) {
        throw new Error(`Invalid from_token: ${from_token}`);
    } else if (!SUPPORTED_TOKENS.includes(to_token)) {
        throw new Error(`Invalid to_token: ${to_token}`);
    }

    return true;
}

export function validate_keys(only_pub: boolean): string[] {
    if (!KEY_PUBLIC) {
        throw new Error('Missing public key');
    }

    if (!only_pub && !KEY_PRIVATE) {
        throw new Error('Missing private key');
    }

    return [KEY_PUBLIC, KEY_PRIVATE || ''];
}


export function validate_api_key(protocol_name: string): boolean {
    switch (protocol_name) {
        case 'SOCKET':
            if (!SOCKET_API_KEY) {
                throw new Error('Missing Socket API Key. Get it from the Socket Docs.');
            }
            break;
        default:
            throw new Error(`Invalid protocol name: ${protocol_name}`);
    }

    return true;
}

export function validate_rpc_url(protocol_name: string, network: string): string[] {

    if (!protocol_name) {
        throw new Error('Missing protocol name');
    } else if (!network) {
        throw new Error('Missing network');
    }

    const rpc_url: string | undefined = process.env[protocol_name.toUpperCase() + '_RPC_' + network.toUpperCase()];

    const rpc_key: string | undefined = process.env[protocol_name.toUpperCase() + '_KEY_' + network.toUpperCase()];


    if (!rpc_url) {
        throw new Error(`RPC URL not found for ${protocol_name} and ${network}`);
    }

    if (!rpc_key) {
        throw new Error(`RPC KEY not found for ${protocol_name} and ${network}`);
    }

    const alchemy_network: Network = (Network as any)['ETH_' + network] as Network;

    if (!alchemy_network) {
        throw new Error(`Alchemy network not found for ${protocol_name} and ${network}`);
    }

    return [rpc_url, rpc_key, alchemy_network];
}