export interface CHAIN {
    chainId: number,
    name: string,
    token_map: { [key: string]: string },
};

export const GOERLI: CHAIN = {
    chainId: 5,
    name: 'GOERLI',
    token_map: {
        "USDC": "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        "DAI": "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
        "WETH": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    },
};

export const MAINNET: CHAIN = {
    chainId: 1,
    name: 'MAINNET',
    token_map: {
        "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "WETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
};

export const MATIC: CHAIN = {
    chainId: 137,
    name: 'MATIC',
    token_map: {
        "USDC": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        "DAI": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        "WETH": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    },
};

export const SUPPORTED_TOKENS: string[] = [
    "ETH",
    "WETH",
    "USDC",
    "DAI",
];

export const SUPPORTED_CHAINS: { [key: string]: string[] } = {
    "UNISWAP": ["MAINNET", "GOERLI"],
    "SOCKET": ["MAINNET", "MATIC"],
    "LIFI": ["MAINNET"],
}

export const CHAIN_ID_MAP: { [key: number]: string } = {
    [GOERLI.chainId]: "GOERLI",
    [MAINNET.chainId]: "MAINNET",
    [MATIC.chainId]: "MATIC",
};

export const CHAIN_MAP: { [key: string]: CHAIN } = {
    "GOERLI": GOERLI,
    "MAINNET": MAINNET,
    "MATIC": MATIC,
};