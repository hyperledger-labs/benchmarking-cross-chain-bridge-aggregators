// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";
import {DeployerScript} from "./Deployer.s.sol";
import {HyperlaneHelperScript} from "./Hyperlane_Helper.s.sol";

contract CounterSourceScript is Script {
    Hyperlane_Counter counter;
    HyperlaneHelperScript hyperlane;
    address MAILBOX;
    uint32 DESTINATION_DOMAIN;
    uint256 deployerPrivateKey;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        hyperlane = new HyperlaneHelperScript();
        MAILBOX = vm.envAddress("MAILBOX_ADDRESS_GOERLI");
        DESTINATION_DOMAIN = uint32(vm.envUint("DESTINATION_DOMAIN_GOERLI"));

        vm.startBroadcast(deployerPrivateKey);
        counter = new Hyperlane_Counter();
        vm.stopBroadcast();
    }

    function run() public {
        console2.log("Counter deployed at address: %s", address(counter));

        bytes memory send_tx = hyperlane.create_tx(
            DESTINATION_DOMAIN,
            address(counter),
            20
        );

        vm.startBroadcast(deployerPrivateKey);
        (bool success, ) = MAILBOX.call(send_tx);

        require(success, "CounterScript: failed to send tx");
        vm.stopBroadcast();
    }
}
