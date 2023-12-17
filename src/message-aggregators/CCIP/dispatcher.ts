import { exec } from 'child_process';

import { validate_chain, validate_keys } from '@benchmarking-cross-chain-bridges/helper/inp_validator';
import { get_deployed_contract_address, get_contract_address, get_token_address, get_rpc_url, get_contract_file_name, get_domain_identifier, get_tx_hash } from './constants_local';
import { CHAIN_ID_MAP } from '@benchmarking-cross-chain-bridges/helper/constants_global';

/**
 * Interface for the dispatcher.sh script.
 * @param sourceChain Source chain ID.
 * @param destChain Destination chain ID.
 * @param txChain Chain ID to broadcast the transaction on.
 * @param contractName Smart contract name that we are interacting with.
 * @param operation The operation to perform (deploy, send, call)
 * @param val Cross chain value to send to the destination contract.
 * @param mode The mode to run the script in (test, broadcast)
 * @param confirmationResponse Response from the user to confirm the transaction.
 * @returns Different values depending on the operation.
 */
export async function script_interface(sourceChain: number, destChain: number, txChain: number, contractName: string, operation: string, val: number = 0, mode: string = 'test', confirmationResponse: boolean = false) {
    validate_chain('CCIP', sourceChain, destChain, txChain);
    const key_pair = validate_keys();

    const paths = get_contract_file_name(contractName);
    const rpc_url = get_rpc_url(txChain);
    const dispatcher_path = paths[0];
    const contract_name = paths[1];
    const contract_file_name = paths[1].split(':')[0];

    const router_address = get_contract_address(sourceChain, 'CCIP_ROUTER');
    const link_address = get_token_address(sourceChain, 'LINK');
    const domain_identifier = get_domain_identifier(CHAIN_ID_MAP[destChain]);

    // If mode is not test, ask for user confirmation
    if (mode === 'broadcast' && !confirmationResponse) {
        throw new Error(`User input confirmationResponse was ${confirmationResponse}. Aborting.`);
    }

    // Creates the params string to pass to the dispatcher.sh script.
    let params = '--router_address ' + router_address + ' --link_address ' + link_address + ' --domain_identifier ' + domain_identifier + ' --number ' + val;

    return new Promise((resolve, reject) => {
        exec(`./${dispatcher_path} ${mode} ${rpc_url} ${operation} ${contract_name} ${params}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                if (operation === 'deploy') {
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