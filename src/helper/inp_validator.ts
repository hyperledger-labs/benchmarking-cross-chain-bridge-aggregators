import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

import { SUPPORTED_CHAINS, SUPPORTED_TOKENS, CHAIN_ID_MAP, CHAIN, CHAIN_MAP, KEY_PAIR } from './token-constants_global';

let { KEY_PUBLIC, KEY_PRIVATE, SOCKET_API_KEY } = process.env;

export function validate_chain(protocol_name: string, from_chain_id: number, to_chain_id: number): CHAIN[] {
    if (!SUPPORTED_CHAINS[protocol_name].includes(CHAIN_ID_MAP[from_chain_id])) {
        throw new Error(`Invalid chain_id: ${from_chain_id} for protocol: ${protocol_name}`);
    } else if (!SUPPORTED_CHAINS[protocol_name].includes(CHAIN_ID_MAP[to_chain_id])) {
        throw new Error(`Invalid chain_id: ${to_chain_id} for protocol: ${protocol_name}`);
    }

    return [CHAIN_MAP[from_chain_id], CHAIN_MAP[from_chain_id]];
}

export function validate_tokens(from_token: string, to_token: string): boolean {
    if (!SUPPORTED_TOKENS.includes(from_token)) {
        throw new Error(`Invalid from_token: ${from_token}`);
    } else if (!SUPPORTED_TOKENS.includes(to_token)) {
        throw new Error(`Invalid to_token: ${to_token}`);
    } else if (from_token === to_token) {
        throw new Error(`from_token and to_token cannot be the same`);
    }

    return true;
}

export function validate_keys(): KEY_PAIR {
    if (!KEY_PUBLIC) {
        throw new Error('Missing public key');
    }

    if (!KEY_PRIVATE) {
        throw new Error('Missing private key');
    }

    return { public: KEY_PUBLIC, private: KEY_PRIVATE };
}

export function validate_amount(amount: string): string {
    if (parseInt(amount) > 0) {
        throw new Error('Amount need to be greater than 0')
    };

    return amount;
}

export function validate_api_key(protocol_name: string): string {
    let api_key = '';
    switch (protocol_name) {
        case 'SOCKET':
            if (!SOCKET_API_KEY) {
                throw new Error('Missing Socket API Key. Get it from the Socket Docs.');
            } else {
                api_key = SOCKET_API_KEY;
            }
            break;
        default:
            throw new Error(`Invalid protocol name: ${protocol_name}`);
    }

    return api_key;
}

export function validate_rpc_url(network: string): string {
    if (!network) {
        throw new Error('Missing network');
    }

    const rpc_url: string | undefined = process.env['RPC_' + network.toUpperCase()];

    if (!rpc_url) {
        throw new Error(`RPC URL not found for ${network}`);
    }

    return rpc_url;
}

export function _get_contract_address(chain_id: number, contract_name: string, isToken: boolean): string {

    const chain_name = CHAIN_ID_MAP[chain_id];

    if (chain_name in CHAIN_MAP) {
        const chain = CHAIN_MAP[chain_name];
        if (isToken) {
            if (contract_name in chain.token_map) {
                return chain.token_map[contract_name];
            }
            else {
                throw new Error(`Token ${contract_name} not found in token_map`);
            }
        }
        else {
            if (contract_name in chain.address_map) {
                return chain.address_map[contract_name];
            }
            else {
                throw new Error(`Contract ${contract_name} not found in address_map`);
            }
        }
    }

    throw new Error(`Chain ${chain_name} not found in CHAIN_MAP`);
}

export function _get_contract_file_name(protocol_name: string, contract_map: { [key: string]: string }, contract_name: string): string[] {
    const dispatcher_path = `src/message-aggregators/${protocol_name}/dispatcher.sh`;
    if (contract_name in contract_map) {
        return [dispatcher_path, contract_map[contract_name]];
    }
    else {
        throw new Error(`Contract ${contract_name} not found in contract_map`);
    }
}

export function _get_deployed_contract_address(protocol_name: string, contract_name: string): string {
    const root_path = `src/message-aggregators/${protocol_name}`;
    const dispatcher_path = `${root_path}/dispatcher.sh`;
    const deployed_address_path = `${root_path}/deployed_addresses.json`;

    const json = JSON.parse(fs.readFileSync(deployed_address_path).toString());

    if (contract_name in json) {
        return json[contract_name];
    }
    else {
        throw new Error(`Contract ${contract_name} not found in deployed_address.json`);
    }
}
