import { exec } from 'child_process';

import { validate_chain, validate_keys } from '../../helper/inp_validator';
import { get_deployed_contract_address, get_contract_address, get_token_address, get_rpc_url, get_contract_file_name } from './constants_local';
import { get_tx_hash } from './config';
import { link } from 'fs';

export async function deploy_contract(toChain: number, contract_name: string, operation: string, mode: string = 'test', confirmationResponse: boolean = false) {
    validate_chain('CCIP', toChain, toChain);
    const key_pair = validate_keys();

    const paths = get_contract_file_name(contract_name);
    const rpc_url = get_rpc_url(toChain);
    const dispatcher_path = paths[0];
    const contract_path = paths[1];

    const router_address = get_contract_address(toChain, 'CCIP_ROUTER');
    const link_address = get_token_address(toChain, 'LINK');

    // If mode is not test, ask for user confirmation
    if (mode === 'broadcast' && !confirmationResponse) {
        throw new Error(`User input confirmationResponse was ${confirmationResponse}. Aborting.`);
    }

    console.log(`./${dispatcher_path} ${mode} ${rpc_url} ${operation} ${contract_path}`);

    return new Promise((resolve, reject) => {
        exec(`./${dispatcher_path} ${mode} ${rpc_url} ${operation} ${contract_path} ${router_address} ${link_address}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(stdout);
                if (operation === 'deploy') {
                    return get_deployed_contract_address(contract_name);
                } else {
                    //TODO: Return tx hash
                    return "tx successful";
                }
            }
        });
    });
}