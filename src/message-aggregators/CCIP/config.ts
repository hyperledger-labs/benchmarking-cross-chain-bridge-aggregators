import fs from 'fs';

export function get_tx_data(chain_id: number, contract_name: string, mode_path: string): any {
    const data = fs.readFileSync(`broadcast/${contract_name}/${chain_id}/${mode_path}/run-latest.json`, `utf8`);
    return JSON.parse(data);
}

export function get_tx_hash(chain_id: number, contract_name: string, mode: string): string {
    let mode_path = '';
    if (mode === 'test') {
        mode_path = 'dry-run';
    }
    const data = get_tx_data(chain_id, contract_name, mode_path);
    return JSON.parse(data).transactions[0].hash;
}