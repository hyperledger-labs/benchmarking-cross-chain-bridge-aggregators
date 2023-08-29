import { deploy_contract } from './deploy_contract';

async function deploy_contract_runner(toChain: number, contractName: string, mode: string, confirmationResponse: boolean) {
    deploy_contract(toChain, contractName, mode, confirmationResponse).then((contract_address) => {
        console.log(`${contractName} deployed at`, contract_address);
    }).catch((error) => {
        console.error(error);
    });
}

const mode = 'broadcast';
const confirmationResponse = true;

const fromChain = 5;
const toChain = 100;

async function call_runner() {
    const yahoAddress = await deploy_contract_runner(fromChain, 'Yaho', mode, confirmationResponse);

    const yaruAddress = await deploy_contract_runner(toChain, 'Yaru', mode, confirmationResponse);

    const ambRelayAddress = await deploy_contract_runner(fromChain, 'AMBRelay', mode, confirmationResponse);

    const ambAdapterAddress = await deploy_contract_runner(toChain, 'AMBAdapter', mode, confirmationResponse);

    const counterAddress = await deploy_contract_runner(toChain, 'Counter', mode, confirmationResponse);
}

call_runner();
