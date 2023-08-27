export interface KEY_PAIR {
    public: string,
    private: string,
}

export interface CHAIN {
    chainId: number,
    name: string,
    token_map: { [key: string]: string },
    address_map: { [key: string]: string },
};

export const GOERLI: CHAIN = {
    chainId: 5,
    name: 'GOERLI',
    token_map: {
        "ETH": "0x0000000000000000000000000000000000000000",
        "USDC": "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        "DAI": "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
        "WETH": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    },
    address_map: {
        "HASHI_YAHO": "0x2fcbfd5bef7c94b77cf920fcc5e76d908a52bccc",
        "HASHI_AMB_RELAY": "0xb01faaf162732752b24646c7475c445cceceb8a1",
    },
};

export const MAINNET: CHAIN = {
    chainId: 1,
    name: 'MAINNET',
    token_map: {
        "ETH": "0x0000000000000000000000000000000000000000",
        "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "WETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    address_map: {},
};

export const POLYGON: CHAIN = {
    chainId: 137,
    name: 'POLYGON',
    token_map: {
        "MATIC": "0x0000000000000000000000000000000000000000",
        "USDC": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        "DAI": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        "WETH": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    },
    address_map: {},
};

export const GNOSIS: CHAIN = {
    chainId: 100,
    name: 'GNOSIS',
    token_map: {
        "DAI": "0x0000000000000000000000000000000000000000"
    },
    address_map: {
        "HASHI_AMB_ADAPTER": "0xe30606a7C2C0Cca6ddE1785cDE999494F164bC4a ",
        "HASHI_YARU": "0xb935Ce12B701d62caB5dE4a58f5A59559b50b3A2",
        "HASHI_HASHI": "0xf59aedc291e0aF64943541709cdd041D992b4De4",
    },
};


export const SUPPORTED_TOKENS: string[] = [
    "ETH",
    "WETH",
    "USDC",
    "DAI",
];

export const SUPPORTED_CHAINS: { [key: string]: string[] } = {
    "LIFI": ["MAINNET", "GOERLI", "POLYGON"],
    "SOCKET": ["MAINNET", "POLYGON"],
    "UNISWAP": ["MAINNET", "GOERLI", "POLYGON"],
    "COW": ["MAINNET", "GOERLI", "POLYGON"],
    "SUSHI": ["MAINNET", "GOERLI", "POLYGON"],
    "XY": ["MAINNET", "POLYGON"],
    "HASHI": ["GOERLI", "GNOSIS"],
}

export const CHAIN_ID_MAP: { [key: number]: string } = {
    [GOERLI.chainId]: "GOERLI",
    [MAINNET.chainId]: "MAINNET",
    [POLYGON.chainId]: "POLYGON",
    [GNOSIS.chainId]: "GNOSIS",
};

export const CHAIN_MAP: { [key: string]: CHAIN } = {
    "GOERLI": GOERLI,
    "MAINNET": MAINNET,
    "POLYGON": POLYGON,
    "GNOSIS": GNOSIS,
};