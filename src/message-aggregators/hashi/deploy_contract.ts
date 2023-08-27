import { exec } from 'child_process';

import { validate_chain, validate_keys } from '../../helper/inp_validator';
import { get_contract, get_rpc_url } from './constants_local';

export async function deploy_contract(toChain: number, contract_name: string, mode: string = 'test') {
    validate_chain('HASHI', toChain, toChain);
    const key_pair = validate_keys();

    const paths = get_contract(contract_name);
    const rpc_url = get_rpc_url(toChain);
    const dispatcher_path = paths[0];
    const contract_path = paths[1];

    console.log(`Running ./${dispatcher_path} test $RPC_GNOSIS ${contract_path}`);
    exec(`./${dispatcher_path} ${mode} ${rpc_url} ${contract_path}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return false;
        }
        return stdout;
    }
    );
}