// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {CCIP_Counter} from "@benchmarking-cross-chain-bridges/CCIP/Counter.sol";
import {HelperScript} from "../Helper/Helper.s.sol";

contract DeployCounterScript is Script {
    CCIP_Counter counter;

    address ROUTER_ADDRESS;

    bool isTest;
    uint256 deployerPrivateKey;
    HelperScript helper;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");

        ROUTER_ADDRESS = vm.envAddress("CCIP_ROUTER_ADDRESS");

        isTest = vm.envBool("TEST");
        helper = new HelperScript("CCIP", isTest);
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        counter = new CCIP_Counter(ROUTER_ADDRESS);
        vm.stopBroadcast();

        helper.write_deployed_address("Counter", address(counter));
    }
}
