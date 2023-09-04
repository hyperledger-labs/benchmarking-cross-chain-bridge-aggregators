// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {Counter} from "@benchmarking-cross-chain-bridges/CCIP/Counter.sol";

contract DeployCounterScript is Script {
    Counter counter;

    address ROUTER_ADDRESS;

    uint256 deployerPrivateKey;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");

        ROUTER_ADDRESS = vm.envAddress("CCIP_ROUTER_ADDRESS");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        counter = new Counter(ROUTER_ADDRESS);
        vm.stopBroadcast();

        console2.log("Counter deployed at address: %s", address(counter));
    }
}
