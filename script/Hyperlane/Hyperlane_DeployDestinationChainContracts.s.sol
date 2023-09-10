/**
 * @title DeployCounterScript
 * @dev A script to deploy a Hyperlane_Counter contract on a specified domain using a HyperlaneHelperScript.
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";

contract DeployCounterScript is Script {
    Hyperlane_Counter counter;
    uint32 DESTINATION_DOMAIN;
    uint256 deployerPrivateKey;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        DESTINATION_DOMAIN = uint32(vm.envUint("HYPERLANE_DESTINATION_DOMAIN"));
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        counter = new Hyperlane_Counter();
        vm.stopBroadcast();

        console2.log("Counter deployed at address: %s", address(counter));
    }
}
