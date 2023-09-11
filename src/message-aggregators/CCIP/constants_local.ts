import { CHAIN_ID_MAP } from "../../helper/token-constants_global";
import { _get_contract_address, _get_deployed_contract_address, _get_contract_file_name, _get_tx_hash } from "../../helper/transaction_parser";
import { validate_rpc_url } from "../../helper/inp_validator";

export enum CCIP_Contract_Names {
    "Sender" = "Sender",
    "Counter" = "Counter",
    "Send_SourceTxLink" = "Send_SourceTxLink",
    "Send_SourceTxNative" = "Send_SourceTxNative",
    "Call_FeeTxLink" = "Call_FeeTxLink",
    "Call_FeeTxNative" = "Call_FeeTxNative"
}

const contract_script_map: { [key: string]: string } = {
    "Sender": "CCIP_DeploySourceChainContracts.s.sol:DeploySenderScript",
    "Counter": "CCIP_DeployDestinationChainContracts.s.sol:DeployCounterScript",
    "Send_SourceTxLink": "CCIP_CounterSourceTx.s.sol:CounterSourceTxPayLINKScript",
    "Send_SourceTxNative": "CCIP_CounterSourceTx.s.sol:CounterSourceTxPayLINKScript",
    "Call_FeeTxLink": "CCIP_CounterSourceTxFee.s.sol:SourceTxFeeLINKScript",
    "Call_FeeTxNative": "CCIP_CounterSourceTxFee.s.sol:SourceTxFeeNativeScript",
};

const domain_identifier_map: { [key: string]: string } = {
    "SEPOLIA": "16015286601757825753",
    "MUMBAI": "12532609583862916517"
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
    return _get_contract_file_name('CCIP', contract_script_map, contract_name);
}

export function get_deployed_contract_address(contract_name: string): string {
    return _get_deployed_contract_address('CCIP', contract_name);
}

export function get_rpc_url(toChain: number): string {
    return validate_rpc_url(CHAIN_ID_MAP[toChain]);
}

export function get_tx_hash(chain_id: number, contract_name: string, mode_path: string): string {
    return _get_tx_hash(chain_id, contract_name, mode_path)
}