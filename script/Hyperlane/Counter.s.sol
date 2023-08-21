// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";
import {DeployerScript} from "./Deployer.s.sol";

contract CounterScript is Script {
    Hyperlane_Counter counter;

    function setUp() public {
        counter = new DeployerScript().deploy();
    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        vm.startBroadcast(deployerPrivateKey);

        counter = new Hyperlane_Counter();

        vm.stopBroadcast();
    }
}
