// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";
import {HyperlaneHelperScript} from "./Hyperlane_Helper.s.sol";

contract CounterIGPPayScript is Script {
    uint256 deployerPrivateKey;
    string DESTINATION_DOMAIN;
    HyperlaneHelperScript hyperlane;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        DESTINATION_DOMAIN = vm.envString(
            "HYPERLANE_DESTINATION_DOMAIN_GOERLI"
        );

        hyperlane = new HyperlaneHelperScript();
    }

    function run() public {
        bytes memory transactionHash = hyperlane.get_tx_data(
            ".transactions[1].hash"
        );

        console2.logBytes(transactionHash);
    }
}
