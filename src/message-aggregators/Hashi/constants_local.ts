import { CHAIN_ID_MAP } from "@benchmarking-cross-chain-bridges/helper/constants_global";
import { _get_contract_address, _get_deployed_contract_address, _get_contract_file_name, _get_tx_hash } from "@benchmarking-cross-chain-bridges/helper/transaction_parser";
import { validate_rpc_url } from "@benchmarking-cross-chain-bridges/helper/inp_validator";

export enum Hashi_Contract_Names {
    "Yaho" = "Yaho",
    "AMBRelay" = "AMBRelay",
    "Yaru" = "Yaru",
    "AMBAdapter" = "AMBAdapter",
    "Counter" = "Counter",
    "Send_SourceTx" = "Send_SourceTxLink",
}

const contract_script_map: { [key: string]: string } = {
    "Yaho": "Hashi_DeploySourceChainContracts.s.sol:DeployYahoScript",
    "AMBRelay": "Hashi_DeploySourceChainContracts.s.sol:DeployAMBRelayScript",
    "Yaru": "Hashi_DeployDestinationChainContracts.s.sol:DeployYaruScript",
    "AMBAdapter": "Hashi_DeployDestinationChainContracts.s.sol:DeployAMBAdapterScript",
    "Counter": "Hashi_DeployDestinationChainContracts.s.sol:DeployCounterScript",
    "Send_SourceTxLink": "Hashi_CounterSourceTx.s.sol:CounterSourceTxScript",
};

const domain_identifier_map: { [key: string]: string } = {
    "Goerli": "5",
    "Mumbai": "100"
};

export function get_contract_address(chain_id: number, contract_name: string): string {
    return _get_contract_address(chain_id, contract_name, false);
}

export function get_token_address(chain_id: number, contract_name: string): string {
    return _get_contract_address(chain_id, contract_name, true);
}

export function get_domain_identifier(chain_name: string): string {
    if (chain_name in domain_identifier_map) {
        return domain_identifier_map[chain_name];
    }
    else {
        throw new Error(`Domain identifier for chain ${chain_name} not found in contract_map`);
    }
}

export function get_contract_file_name(contract_name: string): string[] {
    return _get_contract_file_name('Hashi', contract_script_map, contract_name);
}

export function get_deployed_contract_address(contract_name: string): string {
    return _get_deployed_contract_address('Hashi', contract_name);
}

export function get_rpc_url(toChain: number): string {
    return validate_rpc_url(CHAIN_ID_MAP[toChain]);
}

export function get_tx_hash(chain_id: number, contract_name: string, mode_path: string): string {
    return _get_tx_hash(chain_id, contract_name, mode_path)
}