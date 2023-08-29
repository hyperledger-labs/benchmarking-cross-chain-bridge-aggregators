import { exec } from 'child_process';

import { validate_chain, validate_keys } from '../../helper/inp_validator';
import { get_contract, get_contract_address, get_rpc_url } from './constants_local';
import { get_tx_hash } from './config';

export async function deploy_contract(toChain: number, contract_name: string, mode: string = 'test', confirmationResponse: boolean = false) {
    validate_chain('HASHI', toChain, toChain);
    const key_pair = validate_keys();

    const paths = get_contract(contract_name);
    const rpc_url = get_rpc_url(toChain);
    const dispatcher_path = paths[0];
    const contract_path = paths[1];

    // If mode is not test, ask for user confirmation
    if (mode === 'broadcast' && !confirmationResponse) {
        throw new Error(`User input confirmationResponse was ${confirmationResponse}. Aborting.`);
    }

    return new Promise((resolve, reject) => {
        exec(`./${dispatcher_path} ${mode} ${rpc_url} ${contract_path}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                return get_contract_address(contract_name);
            }
        });
    });
}