import { exec } from 'child_process';

import { validate_chain, validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { get_deployed_contract_address, get_contract_address, get_rpc_url, get_contract_file_name, get_tx_hash } from './constants_local';

/**
 * Interface for the dispatcher.sh script.
 * @param sourceChain The source chain ID.
 * @param destChain The destination chain ID.
 * @param txChain The chain ID to broadcast the transaction on.
 * @param contractName The smart contract name that we are interacting with.
 * @param operation The operation to perform (deploy, send, call)
 * @param val The cross chain value to send to the destination contract.
 * @param mode The mode to run the script in (test, broadcast)
 * @param confirmationResponse Response from the user to confirm the transaction.
 * @returns Different values depending on the operation.
 */
export async function script_interface(sourceChain: number, destChain: number, txChain: number, contractName: string, operation: string, val: number = 0, mode: string = 'test', confirmationResponse: boolean = false) {
    const key_pair = validate_keys();
    validate_chain('HASHI', sourceChain, destChain, txChain);

    const paths = get_contract_file_name(contractName);
    const rpc_url = get_rpc_url(txChain);
    const dispatcher_path = paths[0];
    const contract_name = paths[1];
    const contract_file_name = paths[1].split(':')[0];

    const yaho_source = get_contract_address(sourceChain, 'HASHI_YAHO');
    const hashi_dest = get_contract_address(destChain, 'HASHI_HASHI');
    const amb_relay = get_contract_address(sourceChain, 'HASHI_AMB_RELAY');
    const amb_adapter = get_contract_address(destChain, 'HASHI_AMB_ADAPTER');

    // If mode is not test, ask for user confirmation
    if (mode === 'broadcast' && !confirmationResponse) {
        throw new Error(`User input confirmationResponse was ${confirmationResponse}. Aborting.`);
    }

    // Creates the params string to pass to the dispatcher.sh script.
    let params = '--source_chain ' + sourceChain + ' --dest_chain ' + destChain + ' --yaho_source ' + yaho_source + ' --hashi_dest ' + hashi_dest + ' --amb_relay ' + amb_relay + ' --amb_adapter ' + amb_adapter + ' --number ' + val;

    return new Promise((resolve, reject) => {
        exec(`./${dispatcher_path} ${mode} ${rpc_url} ${operation} ${contract_name} ${params}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                if (operation === 'deploy') {
                    console.log(stdout);
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