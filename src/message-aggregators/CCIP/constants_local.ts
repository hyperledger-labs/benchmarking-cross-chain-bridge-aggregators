import { CHAIN_ID_MAP } from "../../helper/token-constants_global";
import { _get_contract_address, _get_deployed_contract_address, _get_contract_file_name, validate_rpc_url } from "../../helper/inp_validator";

const contract_script_map: { [key: string]: string } = {
    "Sender": "DeploySourceChainContracts.s.sol:DeploySenderScript",
    "Counter": "DeployDestinationChainContracts.s.sol:DeployCounterScript",
    "Send_SourceTxLink": "CounterSourceTx.s.sol:CounterSourceTxPayLINKScript",
    "Send_SourceTxNative": "CounterSourceTx.s.sol:CounterSourceTxPayLINKScript",
    "Get_FeeTxLink": "CounterSourceTxFee.s.sol:SourceTxFeeLINKScript",
    "Get_FeeTxNative": "CounterSourceTxFee.s.sol:SourceTxFeeNativeScript",
};

const domain_identifier_map: { [key: string]: string } = {
    "Sepolia": "16015286601757825753",
    "Mumbai": "12532609583862916517"
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