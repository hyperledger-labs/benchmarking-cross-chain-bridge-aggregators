Supports 3 operations:

deploy
call
send

export function get_contract_file_name(contract_name: string): string[] {
    return _get_contract_file_name('Hyperlane', contract_script_map, contract_name);
}
Hyperlane is the folder name which is why it isn't capitalized