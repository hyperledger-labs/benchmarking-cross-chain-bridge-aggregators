export interface KEY_PAIR {
    public: string,
    private: string,
}

export interface CHAIN {
    chainId: number,
    name: string,
    native_token: TOKEN,
    token_map: { [key: string]: string },
    address_map: { [key: string]: string },
};

export interface TOKEN {
    name: string,
    type: string,
    decimals: number,
}

export const ETH: TOKEN = {
    name: "ETH",
    type: "NATIVE",
    decimals: 18,
};

export const WETH: TOKEN = {
    name: "WETH",
    type: "WRAPPED-ERC20",
    decimals: 18,
};

export const MATIC: TOKEN = {
    name: "MATIC",
    type: "NATIVE",
    decimals: 18,
};

export const DAI: TOKEN = {
    name: "DAI",
    type: "STABLE-ERC20",
    decimals: 18,
};

export const USDC: TOKEN = {
    name: "USDC",
    type: "STABLE-ERC20",
    decimals: 6,
};

export const LINK: TOKEN = {
    name: "LINK",
    type: "ERC677",
    decimals: 18,
};

export const WMATIC: TOKEN = {
    name: "WMATIC",
    type: "WRAPPED-ERC20",
    decimals: 18,
};

export const TOKEN_MAP: { [key: string]: TOKEN } = {
    "ETH": ETH,
    "WETH": WETH,
    "MATIC": MATIC,
    "DAI": DAI,
    "USDC": USDC,
    "LINK": LINK,
    "WMATIC": WMATIC,
};

export const ETHEREUM: CHAIN = {
    chainId: 1,
    name: 'ETHEREUM',
    native_token: ETH,
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
    native_token: ETH,
    token_map: {
        "ETH": "0x0000000000000000000000000000000000000000",
        "WETH": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        "DAI": "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
        "USDC": "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        "LINK": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    address_map: {
        "HASHI_YAHO": "0xFD1040bb141696c3CeB74B6BaA3Aaf9fAD97099C",
        "HASHI_AMB_RELAY": "0x01268DB05965CeAc2a89566c42CD550ED7eE5ECD",
        "HASHI_AMB_HEADER_REPORTER": "0xeDC0B1D3De4496E0D917af42f29Cb71Eb2982319",
        "HASHI_SYGMA": "0x5cEA5130c49dCd262B9482E0A76eCE8b23Ae45Df",
        "HASHI_SYGMA_HEADER_REPORTER": "0x2f96d347c932Ac73b56E9352ecc0707e25173d88",
        "HASHI_WORMHOLE_RELAY": "0x0948402853a87a21Af501073CE47105f453Ac994",
        "HASHI_WORMHOLE_HEADER_REPORTER": "0xCC4fE8013d167E30b6B6EcAC3eC7F0e956C2b9df",
        "HASHI_L1CrossDomainMessenger_RELAY": "0x8448E15d0e706C0298dECA99F0b4744030e59d7d",
        "HASHI_L1CrossDomainMessenger_HEADER_REPORTER": "0x8AE397687fC53998f4704D9E7a73589A0D395013",
        "HYPERLANE_MAILBOX": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
        "HYPERLANE_IGP": "0xCC737a94FecaeC165AbCf12dED095BB13F037685"
    },
};


export const SEPOLIA: CHAIN = {
    chainId: 11155111,
    name: 'SEPOLIA',
    native_token: ETH,
    token_map: {
        "ETH": "0x0000000000000000000000000000000000000000",
        "WETH": "0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534",
        "DAI": "0x8b4A7e23c39Ef39f2ab1215D6648ce4B93E92D17",
        "LINK": "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
    address_map: {
        "CCIP_ROUTER": "0x0bf3de8c5d3e8a2b34d2beeb17abfcebaf363a59",
        "HYPERLANE_MAILBOX": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
        "HYPERLANE_IGP": "0xCC737a94FecaeC165AbCf12dED095BB13F037685"
    },
}

export const POLYGON: CHAIN = {
    chainId: 137,
    name: 'POLYGON',
    native_token: MATIC,
    token_map: {
        "MATIC": "0x0000000000000000000000000000000000000000",
        "WMATIC": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
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
    native_token: MATIC,
    token_map: {
        "MATIC": "0x0000000000000000000000000000000000000000",
        "WETH": "0x47cE7E72334Fe164954D4f9dd95f3D20A26e8e2b",
        "DAI": "0xC1E1C0Ab645Bd3C3156b20953784992013FDa98d",
        "USDC": "0xF493Af87835D243058103006e829c72f3d34b891",
        "LINK": "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    address_map: {
        "CCIP_ROUTER": "0x1035cabc275068e0f4b745a29cedf38e13af41b1",
        "HYPERLANE_MAILBOX": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
        "HYPERLANE_IGP": "0xCC737a94FecaeC165AbCf12dED095BB13F037685"
    },
}


export const GNOSIS: CHAIN = {
    chainId: 100,
    name: 'GNOSIS',
    native_token: DAI,
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

export const CHIADO: CHAIN = {
    chainId: 10200,
    name: 'CHIADO',
    native_token: DAI,
    token_map: {
        "DAI": "0x0000000000000000000000000000000000000000",
        "WETH": "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
        "MATIC": "0x7122d7661c4564b7C6Cd4878B06766489a6028A2",
        "USDC": "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
        "LINK": "0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2"
    },
    address_map: {
        "HASHI_HASHI": "0xA0B14A016F62d5f245048Ac67a8AF38ff81AE799",
        "HASHI_AMB_RELAY": "0x99Ca51a3534785ED619f46A79C7Ad65Fa8d85e7a",
        "HASHI_AMB_ADAPTER": "0x02EF808c1235EC235BdfEf9b5768527D86093711 ",
        "HASHI_TELEPATHY": "0xAED11f08AB2C45C6C6DF242B8513c7919E0A0f8f",
        "HASHI_TELEPATHY_LIGHT_CLIENT": "0xb1D85B0122C9CE0a68fDC6620a7416c77f984425"
    },
};


export const SUPPORTED_TOKENS: string[] = [
    "ETH",
    "WETH",
    "MATIC",
    "DAI",
    "USDC",
    "LINK",
    "WMATIC",
];

export const SUPPORTED_CHAINS: { [key: string]: string[] } = {
    "LIFI": ["ETHEREUM", "GOERLI", "POLYGON"],
    "SOCKET": ["ETHEREUM", "POLYGON"],
    "UNISWAP": ["ETHEREUM", "GOERLI", "POLYGON"],
    "COW": ["ETHEREUM", "GOERLI", "GNOSIS"],
    "SUSHI": ["ETHEREUM", "GOERLI", "POLYGON"],
    "XY": ["ETHEREUM", "POLYGON"],
    "CCIP": ["SEPOLIA", "MUMBAI"],
    "HASHI": ["GOERLI", "GNOSIS", "CHIADO"],
    "HYPERLANE": ["GOERLI", "SEPOLIA", "MUMBAI"],
}

export const CHAIN_ID_MAP: { [key: number]: string } = {
    [ETHEREUM.chainId]: "ETHEREUM",
    [GOERLI.chainId]: "GOERLI",
    [SEPOLIA.chainId]: "SEPOLIA",
    [POLYGON.chainId]: "POLYGON",
    [MUMBAI.chainId]: "MUMBAI",
    [GNOSIS.chainId]: "GNOSIS",
    [CHIADO.chainId]: "CHIADO",
};

export const CHAIN_MAP: { [key: string]: CHAIN } = {
    "ETHEREUM": ETHEREUM,
    "GOERLI": GOERLI,
    "SEPOLIA": SEPOLIA,
    "POLYGON": POLYGON,
    "MUMBAI": MUMBAI,
    "GNOSIS": GNOSIS,
    "CHIADO": CHIADO,
};

