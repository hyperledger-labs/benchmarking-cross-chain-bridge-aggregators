import fs from 'fs';
import { CHAIN_ID_MAP, CHAIN_MAP } from './constants_global';

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

export function _get_tx_data(chain_id: number, contract_name: string, mode_path: string): any {
    const data = fs.readFileSync(`broadcast/${contract_name}/${chain_id}/${mode_path}/run-latest.json`, `utf8`);
    return JSON.parse(data);
}

export function _get_tx_hash(chain_id: number, contract_name: string, mode: string): string {
    let mode_path = '';
    if (mode === 'test') {
        mode_path = 'dry-run';
    }
    const data = _get_tx_data(chain_id, contract_name, mode_path);

    if (mode === 'test') {
        return "we're in test so tx successful";
    }
    return JSON.parse(data).transactions[0].hash;
}
