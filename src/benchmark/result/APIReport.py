from typing import TypedDict, List, Union

class Asset(TypedDict):
    name: str
    description: str
    actual_value: float
    actual_value_usd: float
    effective_trade_value_usd: float
    difference_in_value: float
    approximated_gas_cost_gwei: float
    approximated_gas_cost_usd: float
    effective_trade_value_usd_with_gas: float

class Fee(TypedDict):
    name: str
    amount_usd: float

class Latency(TypedDict):
    name: str
    start_timestamp: int
    end_timestamp: int
    latency: float

class Token(TypedDict):
    name: str
    type: str
    address: str

class CoinGeckoPrice(TypedDict):
    pair: str
    price_per: float

class Network(TypedDict):
    network: dict[str, Union[str, int, float]]
    trade_token: Token
    native_token: CoinGeckoPrice

class Aggregator(TypedDict):
    name: str
    address: str
    fee: List[Fee]
    total_fee: float

class NetworkWrapper(TypedDict):
    network: Network
    trade_token: Token
    native_token: CoinGeckoPrice

class APIReport(TypedDict):
    run_id: int
    creation_date_time: str
    protocol: str
    source_network: NetworkWrapper
    aggregator: Aggregator
    destination_network: NetworkWrapper
    trade_value: Asset
    gas_included_fee: Fee
    latencies: List[Latency]
    coin_gecko_trade_price: CoinGeckoPrice

