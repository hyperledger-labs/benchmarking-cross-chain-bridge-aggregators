
const network = 'GOERLI';
const url = `https://api.cow.fi/${network.toLowerCase()}/api/v1/quote`;

const current_unix_timestamp = Math.round((new Date()).getTime() / 1000);

const data = {
    sellToken: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    buyToken: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    receiver: '0x0000000000000000000000000000000000000000',
    validTo: current_unix_timestamp + 60 * 60 * 2,
    appData: '0x0000000000000000000000000000000000000000000000000000000000000000',
    partiallyFillable: false,
    sellTokenBalance: 'erc20',
    buyTokenBalance: 'erc20',
    from: '0x55fe002aeff02f77364de339a1292923a15844b8',
    kind: 'sell',
    sellAmountBeforeFee: '10000000000'
};

const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};

fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    // error { errorType: 'NoLiquidity', description: 'not enough liquidity' }