import { exec } from 'child_process';

import { validate_chain, validate_keys } from '../../helper/inp_validator';
import { get_deployed_contract_address, get_contract_address, get_token_address, get_rpc_url, get_contract_file_name, get_domain_identifier, get_tx_hash } from './constants_local';
import { CHAIN_ID_MAP } from '@benchmarking-cross-chain-bridges/helper/token-constants_global';

// txChain: number tells us which chain we're sending the transaction on
export async function script_interface(sourceChain: number, destChain: number, txChain: number, contractName: string, operation: string, val: number = 0, mode: string = 'test', confirmationResponse: boolean = false) {
    validate_chain('HASHI', sourceChain, destChain);
    const key_pair = validate_keys();

    const paths = get_contract_file_name(contractName);
    const rpc_url = get_rpc_url(txChain);
    const dispatcher_path = paths[0];
    const contract_name = paths[1];
    const contract_file_name = paths[1].split(':')[0];

    const yaho_source = get_contract_address(sourceChain, 'HASHI_YAHO');
    const yaru_dest = get_contract_address(destChain, 'HASHI_YARU');
    const hashi_dest = get_contract_address(destChain, 'HASHI_HASHI');
    const amb_relay = get_contract_address(sourceChain, 'HASHI_AMB_RELAY');
    const amb_adapter = get_contract_address(destChain, 'HASHI_AMB_ADAPTER');

    // If mode is not test, ask for user confirmation
    if (mode === 'broadcast' && !confirmationResponse) {
        throw new Error(`User input confirmationResponse was ${confirmationResponse}. Aborting.`);
    }

    let params = '--source_chain ' + sourceChain + ' --dest_chain ' + destChain + ' --yaho_source ' + yaho_source + ' --yaru_dest ' + yaru_dest + ' --hashi_dest ' + hashi_dest + ' --amb_relay ' + amb_relay + ' --amb_adapter ' + amb_adapter + ' --number ' + val;

    return new Promise((resolve, reject) => {
        exec(`./${dispatcher_path} ${mode} ${rpc_url} ${operation} ${contract_name} ${params}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                if (operation === 'deploy') {
                    console.log(stdout);
                    // console.log(get_deployed_contract_address(contractName));
                    resolve(get_deployed_contract_address(contractName));
                } else if (operation === 'send') {
                    const tx_hash = get_tx_hash(sourceChain, contract_file_name, mode);
                    resolve(tx_hash);
                } else if (operation === 'call') {
                    resolve(stdout);
                }
            }
        });
    });
}