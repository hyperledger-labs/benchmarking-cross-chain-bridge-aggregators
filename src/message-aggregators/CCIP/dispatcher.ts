import { exec } from 'child_process';

import { validate_chain, validate_keys } from '../../helper/inp_validator';
import { get_deployed_contract_address, get_contract_address, get_token_address, get_rpc_url, get_contract_file_name, get_tx_hash } from './constants_local';

export async function script_interface(toChain: number, contractName: string, operation: string, mode: string = 'test', confirmationResponse: boolean = false) {
    validate_chain('CCIP', toChain, toChain);
    const key_pair = validate_keys();

    const paths = get_contract_file_name(contractName);
    const rpc_url = get_rpc_url(toChain);
    const dispatcher_path = paths[0];
    const contract_name = paths[1];
    const contract_file_name = paths[1].split(':')[0];


    const router_address = get_contract_address(toChain, 'CCIP_ROUTER');
    const link_address = get_token_address(toChain, 'LINK');

    // If mode is not test, ask for user confirmation
    if (mode === 'broadcast' && !confirmationResponse) {
        throw new Error(`User input confirmationResponse was ${confirmationResponse}. Aborting.`);
    }

    return new Promise((resolve, reject) => {
        exec(`./${dispatcher_path} ${mode} ${rpc_url} ${operation} ${contract_name} ${router_address} ${link_address}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                if (operation === 'deploy') {
                    resolve(get_deployed_contract_address(contractName));
                } else if (operation === 'send') {
                    const tx_hash = get_tx_hash(toChain, contract_file_name, mode);
                    resolve(tx_hash);
                } else if (operation === 'call') {
                    resolve(stdout);
                }
            }
        });
    });
}