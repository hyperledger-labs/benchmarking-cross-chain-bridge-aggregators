// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Ether, Token } from '@uniswap/sdk-core'

// Addresses

export const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
export const WETH_CONTRACT_ADDRESS = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'

// Currencies and Tokens

export const ETH_NATIVE = Ether;

export const USDC_TOKEN = new Token(
    ChainId.GOERLI,
    '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    6,
    'USDC',
    'USD//C'
)

export const DAI_TOKEN = new Token(
    ChainId.GOERLI,
    '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
    18,
    'DAI',
    'Dai Stablecoin'
)

export const WETH_TOKEN = new Token(
    ChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether'
)

// ABI's

export const ERC20_ABI = [
    // Read-Only Functions
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',

    // Authenticated Functions
    'function transfer(address to, uint amount) returns (bool)',
    'function approve(address _spender, uint256 _value) returns (bool)',

    // Events
    'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const WETH_ABI = [
    // Wrap ETH
    'function deposit() payable',

    // Unwrap ETH
    'function withdraw(uint wad) public',
]

// Transactions

export const MAX_FEE_PER_GAS = 100000000000
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 10000
export const token_map: { [key: string]: Token } = {
    "USDC": USDC_TOKEN,
    "DAI": DAI_TOKEN,
    "WETH": WETH_TOKEN,
};