import { CHAIN_ID_MAP } from "@benchmarking-cross-chain-bridges/helper/constants_global";
import { _get_contract_address, _get_deployed_contract_address, _get_contract_file_name, _get_tx_hash } from "@benchmarking-cross-chain-bridges/helper/transaction_parser";
import { validate_rpc_url } from "@benchmarking-cross-chain-bridges/helper/inp_validator";

export const HYPERLANE_GAS_AMOUNT = "100000";

export enum Hyperlane_Contract_Names {
    Counter = "Counter",
    Send_SourceTx = "Send_SourceTx",
    Send_IGPGas = "Send_IGPGas"
}

const contract_script_map: { [key: string]: string } = {
    "Counter": "Hyperlane_DeployDestinationChainContracts.s.sol:DeployCounterScript",
    "Send_SourceTx": "Hyperlane_CounterSourceTx.s.sol:CounterSourceTxScript",
    "Send_IGPGas": "Hyperlane_CounterIGPGas.s.sol:CounterIGPGasScript",
};

const domain_identifier_map: { [key: string]: string } = {
    "GOERLI": "5",
    "SEPOLIA": "11155111",
    "MUMBAI": "80001"
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
    return _get_contract_file_name('Hyperlane', contract_script_map, contract_name);
}

export function get_deployed_contract_address(contract_name: string): string {
    return _get_deployed_contract_address('Hyperlane', contract_name);
}

export function get_rpc_url(toChain: number): string {
    return validate_rpc_url(CHAIN_ID_MAP[toChain]);
}

export function get_tx_hash(chain_id: number, contract_name: string, mode_path: string): string {
    return _get_tx_hash(chain_id, contract_name, mode_path)
}