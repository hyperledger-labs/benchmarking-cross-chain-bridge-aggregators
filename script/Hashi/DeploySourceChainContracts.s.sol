/**
 * @title DeployCounterScript
 * @dev A script to deploy a Hyperlane_Counter contract on a specified domain using a HyperlaneHelperScript.
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {Yaho} from "@hashi/Yaho.sol";

contract DeploySourceChainContractsScript is Script {
    uint256 deployerPrivateKey;

    Yaho public yaho;

    uint256 SOURCE_DOMAIN;
    uint256 DESTINATION_DOMAIN;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Yaho on Source chain
        yaho = new Yaho();

        vm.stopBroadcast();

        console2.log(
            "Yaho deployed at address on chain %d: %s",
            SOURCE_DOMAIN,
            address(yaho)
        );
    }
}
