import { CHAIN_ID_MAP } from "../../helper/token-constants_global";
import fs from 'fs';

const hashi_root = 'src/message-aggregators/hashi';
const dispatcher_path = `${hashi_root}/dispatcher.sh`;
const deployed_address_path = `${hashi_root}/deployed_addresses.json`;

const contract_map: { [key: string]: string } = {
    "Yaho": "DeploySourceChainContracts.s.sol:DeployYahoScript",
    "AMBRelay": "DeploySourceChainContracts.s.sol:DeployAMBRelayScript",
    "Yaru": "DeployDestinationChainContracts.s.sol:DeployYaruScript",
    "AMBAdapter": "DeployDestinationChainContracts.s.sol:DeployAMBAdapterScript",
    "Counter": "DeployDestinationChainContracts.s.sol:DeployCounterScript",
};

export function get_contract(contract_name: string): string[] {
    if (contract_name in contract_map) {
        return [dispatcher_path, contract_map[contract_name]];
    }
    else {
        throw new Error(`Contract ${contract_name} not found in contract_map`);
    }
}

export function get_contract_file_name(contract_name: string): string {
    if (contract_name in contract_map) {
        return contract_map[contract_name].split(':')[0];
    }
    else {
        throw new Error(`Contract ${contract_name} not found in contract_map`);
    }
}

export function get_contract_address(contract_name: string): string {
    const json = JSON.parse(fs.readFileSync(deployed_address_path).toString());

    if (contract_name in json) {
        return json[contract_name];
    }
    else {
        throw new Error(`Contract ${contract_name} not found in deployed_address.json`);
    }
}

export function get_rpc_url(toChain: number): string {
    if (toChain in CHAIN_ID_MAP) {
        return process.env[`RPC_${CHAIN_ID_MAP[toChain]}`] as string;
    }
    else {
        throw new Error(`ChainId ${toChain} not found in CHAIN_ID_MAP`);
    }
}