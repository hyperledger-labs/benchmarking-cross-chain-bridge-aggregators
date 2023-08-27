/**
 * @title DeployCounterScript
 * @dev A script to deploy a Hyperlane_Counter contract on a specified domain using a HyperlaneHelperScript.
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {Yaru} from "@hashi/Yaru.sol";
import {IHashi} from "@hashi/interfaces/IHashi.sol";

contract DeployYaruScript is Script {
    uint256 deployerPrivateKey;

    Yaru public yaru;

    address HASHI;
    address YAHO;
    uint256 SOURCE_DOMAIN;
    uint256 DESTINATION_DOMAIN;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");

        YAHO = vm.envAddress("HASHI_YAHO_GOERLI");
        HASHI = vm.envAddress("HASHI_HASHI_GNOSIS");
        SOURCE_DOMAIN = vm.envUint("HASHI_SOURCE_DOMAIN");
        DESTINATION_DOMAIN = vm.envUint("HASHI_DESTINATION_DOMAIN");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Yaru on Destination chain with Source chain as a parameter
        yaru = new Yaru(IHashi(HASHI), address(YAHO), SOURCE_DOMAIN);

        vm.stopBroadcast();

        console2.log(
            "Yaru deployed at address on chain %d: %s",
            DESTINATION_DOMAIN,
            address(yaru)
        );
    }
}
