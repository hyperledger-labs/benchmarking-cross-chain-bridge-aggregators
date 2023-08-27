import { CHAIN_ID_MAP } from "../../helper/token-constants_global";

const dispatcher_path = 'src/message-aggregators/hashi/dispatcher.sh';

const contract_map: { [key: string]: string } = {
    "DeployYahoScript": "DeploySourceChainContracts.s.sol:DeployYahoScript",
    "DeployAMBMessageRelayer": "DeploySourceChainContracts.s.sol:DeployAMBRelayScript",
    "DeployYaruScript": "DeployDestinationChainContracts.s.sol:DeployYaruScript",
    "DeployAMBAdapter": "DeployDestinationChainContracts.s.sol:DeployAMBAdapterScript",
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

export function get_rpc_url(toChain: number): string {
    if (toChain in CHAIN_ID_MAP) {
        return process.env[`RPC_${CHAIN_ID_MAP[toChain]}`] as string;
    }
    else {
        throw new Error(`ChainId ${toChain} not found in CHAIN_ID_MAP`);
    }
}