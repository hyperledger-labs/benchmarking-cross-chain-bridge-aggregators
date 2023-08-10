interface CHAIN {
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

export const CHAINS: { [key: string]: CHAIN } = {
    "GOERLI": GOERLI,
    "MAINNET": MAINNET,
};

export const TOKENS: string[] = [
    "USDC",
    "DAI",
    "WETH",
];

export const CHAIN_MAP: { [key: number]: string } = {
    [GOERLI.chainId]: "GOERLI",
    [MAINNET.chainId]: "MAINNET",
};