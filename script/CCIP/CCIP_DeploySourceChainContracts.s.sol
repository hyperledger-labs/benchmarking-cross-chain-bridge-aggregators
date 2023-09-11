// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {CCIP_Sender} from "@benchmarking-cross-chain-bridges/CCIP/SourceContract.sol";
import {HelperScript} from "../Helper/Helper.s.sol";

contract DeploySenderScript is Script {
    CCIP_Sender sender;

    address ROUTER_ADDRESS;
    address LINK_ADDRESS;

    uint256 deployerPrivateKey;
    bool isTest;
    HelperScript helper;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        isTest = vm.envBool("TEST");
        helper = new HelperScript("CCIP", isTest);

        ROUTER_ADDRESS = vm.envAddress("CCIP_ROUTER_ADDRESS");
        LINK_ADDRESS = vm.envAddress("CCIP_LINK_ADDRESS");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        sender = new CCIP_Sender(ROUTER_ADDRESS, LINK_ADDRESS);
        vm.stopBroadcast();

        helper.write_deployed_address("Sender", address(sender));
    }
}
