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

export const MAINNET: CHAIN = {
    chainId: 1,
    name: 'MAINNET',
    token_map: {
        "ETH": "0x0000000000000000000000000000000000000000",
        "WETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "MATIC": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "LINK": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    },
    address_map: {},
};

export const GOERLI: CHAIN = {
    chainId: 5,
    name: 'GOERLI',
    token_map: {
        "ETH": "0x0000000000000000000000000000000000000000",
        "WETH": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        "DAI": "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
        "USDC": "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        "LINK": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    address_map: {
        "HASHI_YAHO": "0x2fcbfd5bef7c94b77cf920fcc5e76d908a52bccc",
        "HASHI_AMB_RELAY": "0xb01faaf162732752b24646c7475c445cceceb8a1",
        "HYPERLANE_MAILBOX": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
        "HYPERLANE_IGP": "0xCC737a94FecaeC165AbCf12dED095BB13F037685"
    },
};


export const SEPOLIA: CHAIN = {
    chainId: 11155111,
    name: 'SEPOLIA',
    token_map: {
        "ETH": "0x0000000000000000000000000000000000000000",
        "WETH": "0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534",
        "DAI": "0x8b4A7e23c39Ef39f2ab1215D6648ce4B93E92D17",
        "LINK": "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
    address_map: {
        "CCIP_ROUTER": "0xD0daae2231E9CB96b94C8512223533293C3693Bf",
        "HYPERLANE_MAILBOX": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
        "HYPERLANE_IGP": "0xCC737a94FecaeC165AbCf12dED095BB13F037685"
    },
}

export const POLYGON: CHAIN = {
    chainId: 137,
    name: 'POLYGON',
    token_map: {
        "MATIC": "0x0000000000000000000000000000000000000000",
        "WETH": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        "DAI": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        "USDC": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        "LINK": "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
    },
    address_map: {},
};


export const MUMBAI: CHAIN = {
    chainId: 80001,
    name: 'MUMBAI',
    token_map: {
        "MATIC": "0x0000000000000000000000000000000000000000",
        "WETH": "0x47cE7E72334Fe164954D4f9dd95f3D20A26e8e2b",
        "DAI": "0xC1E1C0Ab645Bd3C3156b20953784992013FDa98d",
        "USDC": "0xF493Af87835D243058103006e829c72f3d34b891",
        "LINK": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    address_map: {
        "CCIP_ROUTER": "0x70499c328e1E2a3c41108bd3730F6670a44595D1",
        "HYPERLANE_MAILBOX": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
        "HYPERLANE_IGP": "0xCC737a94FecaeC165AbCf12dED095BB13F037685"
    },
}


export const GNOSIS: CHAIN = {
    chainId: 100,
    name: 'GNOSIS',
    token_map: {
        "DAI": "0x0000000000000000000000000000000000000000",
        "WETH": "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
        "MATIC": "0x7122d7661c4564b7C6Cd4878B06766489a6028A2",
        "USDC": "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
        "LINK": "0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2"
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
    "MATIC",
    "DAI",
    "USDC",
    "LINK",
];

export const SUPPORTED_CHAINS: { [key: string]: string[] } = {
    "LIFI": ["MAINNET", "GOERLI", "POLYGON"],
    "SOCKET": ["MAINNET", "POLYGON"],
    "UNISWAP": ["MAINNET", "GOERLI", "POLYGON"],
    "COW": ["MAINNET", "GOERLI", "POLYGON"],
    "SUSHI": ["MAINNET", "GOERLI", "POLYGON"],
    "XY": ["MAINNET", "POLYGON"],
    "CCIP": ["SEPOLIA", "MUMBAI"],
    "HASHI": ["GOERLI", "GNOSIS"],
    "HYPERLANE": ["GOERLI", "SEPOLIA", "MUMBAI"],
}

export const CHAIN_ID_MAP: { [key: number]: string } = {
    [MAINNET.chainId]: "MAINNET",
    [GOERLI.chainId]: "GOERLI",
    [SEPOLIA.chainId]: "SEPOLIA",
    [POLYGON.chainId]: "POLYGON",
    [MUMBAI.chainId]: "MUMBAI",
    [GNOSIS.chainId]: "GNOSIS",
};

export const CHAIN_MAP: { [key: string]: CHAIN } = {
    "MAINNET": MAINNET,
    "GOERLI": GOERLI,
    "SEPOLIA": SEPOLIA,
    "POLYGON": POLYGON,
    "MUMBAI": MUMBAI,
    "GNOSIS": GNOSIS,
};