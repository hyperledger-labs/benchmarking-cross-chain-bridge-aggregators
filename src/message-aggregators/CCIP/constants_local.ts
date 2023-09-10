import { CHAIN_ID_MAP } from "../../helper/token-constants_global";
import { _get_contract, _get_contract_address, _get_contract_file_name, validate_rpc_url } from "../../helper/inp_validator";

const contract_script_map: { [key: string]: string } = {
    "Deploy_Sender": "DeploySourceChainContracts.s.sol:DeploySenderScript",
    "Deploy_Counter": "DeployDestinationChainContracts.s.sol:DeployCounterScript",
    "Send_SourceTxLink": "CounterSourceTx.s.sol:CounterSourceTxPayLINKScript",
    "Send_SourceTxNative": "CounterSourceTx.s.sol:CounterSourceTxPayLINKScript",
    "Get_FeeTxLink": "CounterSourceTxFee.s.sol:SourceTxFeeLINKScript",
    "Get_FeeTxNative": "CounterSourceTxFee.s.sol:SourceTxFeeNativeScript",
};

const chain_router_address_map: { [key: string]: string } = {
    "Sepolia": "0xD0daae2231E9CB96b94C8512223533293C3693Bf",
    "Mumbai": "0x70499c328e1E2a3c41108bd3730F6670a44595D1"
};

const link_token_map: { [key: string]: string } = {
    "Sepolia": "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    "Mumbai": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
};

const domain_identifier_map: { [key: string]: string } = {
    "Sepolia": "16015286601757825753",
    "Mumbai": "12532609583862916517"
};

export function get_router_address(chain_name: string): string {
    if (chain_name in chain_router_address_map) {
        return chain_router_address_map[chain_name];
    }
    else {
        throw new Error(`Router for chain ${chain_name} not found in contract_map`);
    }
}

export function get_link_token(chain_name: string): string {
    if (chain_name in link_token_map) {
        return link_token_map[chain_name];
    }
    else {
        throw new Error(`Link token for chain ${chain_name} not found in contract_map`);
    }
}

export function get_domain_identifier(chain_name: string): string {
    if (chain_name in domain_identifier_map) {
        return domain_identifier_map[chain_name];
    }
    else {
        throw new Error(`Domain identifier for chain ${chain_name} not found in contract_map`);
    }
}

export function get_contract(contract_name: string): string[] {
    return _get_contract('CCIP', contract_script_map, contract_name);
}

export function get_contract_file_name(contract_name: string): string {
    return _get_contract_file_name('CCIP', contract_script_map, contract_name);
}

export function get_contract_address(contract_name: string): string {
    return _get_contract_address('CCIP', contract_name);
}

export function get_rpc_url(toChain: number): string {
    return validate_rpc_url(CHAIN_ID_MAP[toChain]);
}