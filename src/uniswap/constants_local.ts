// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Ether, Token } from '@uniswap/sdk-core'
import { CHAINS, TOKENS } from '../helper/constants_global';
// Addresses

export const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
export const WETH_CONTRACT_ADDRESS = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'

// Currencies and Tokens

export const ETH_NATIVE = Ether;

function USDC_TOKEN(chainName: string): Token {
    return (new Token(
        CHAINS[chainName].chainId,
        CHAINS[chainName].token_map['USDC'],
        6,
        'USDC',
        'USD//C'
    ))
};

function DAI_TOKEN(chainName: string): Token {
    return (new Token(
        CHAINS[chainName].chainId,
        CHAINS[chainName].token_map['DAI'],
        18,
        'DAI',
        'Dai Stablecoin'
    ))
};

function WETH_TOKEN(chainName: string): Token {
    return (new Token(
        CHAINS[chainName].chainId,
        CHAINS[chainName].token_map['WETH'],
        18,
        'WETH',
        'Wrapped Ether'
    ))
};

function create_tokens(chainName: string): { [key: string]: Token } {
    return {
        'USDC': USDC_TOKEN(chainName),
        'DAI': DAI_TOKEN(chainName),
        'WETH': WETH_TOKEN(chainName),
    }
};

export const TOKEN_MAP: { [key: number]: { [key: string]: Token } } = {
    1: create_tokens('MAINNET'),
    5: create_tokens('GOERLI'),
};


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
