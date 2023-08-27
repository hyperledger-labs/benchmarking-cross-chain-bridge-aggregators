/**
 * @title DeployCounterScript
 * @dev A script to deploy a Hyperlane_Counter contract on a specified domain using a HyperlaneHelperScript.
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {Yaho} from "@hashi/Yaho.sol";
import {IAMB} from "@hashi/adapters/AMB/IAMB.sol";
import {AMBMessageRelay} from "@hashi/adapters/AMB/AMBMessageRelayer.sol";

import {HashiHelperScript} from "./HashiHelper.s.sol";

contract DeployYahoScript is Script {
    HashiHelperScript hashiHelper;

    uint256 deployerPrivateKey;

    Yaho public yaho;

    uint256 SOURCE_DOMAIN;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        SOURCE_DOMAIN = vm.envUint("HASHI_SOURCE_DOMAIN");

        hashiHelper = new HashiHelperScript();
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Yaho on Source chain
        yaho = new Yaho();

        vm.stopBroadcast();

        hashiHelper.write_deployed_address("Yaho", address(yaho));
    }
}

contract DeployAMBRelayScript is Script {
    HashiHelperScript hashiHelper;
    uint256 deployerPrivateKey;

    AMBMessageRelay public ambRelay;

    uint256 SOURCE_DOMAIN;
    string DESTINATION_DOMAIN;
    address AMB;
    address DEPLOYED_YAHO;

    function setUp() public {
        hashiHelper = new HashiHelperScript();
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");

        SOURCE_DOMAIN = vm.envUint("HASHI_SOURCE_DOMAIN");
        DESTINATION_DOMAIN = vm.envString("HASHI_DESTINATION_DOMAIN");

        AMB = vm.envAddress("HASHI_AMB_GOERLI");

        DEPLOYED_YAHO = hashiHelper.get_deployed_address("Yaho");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        // Deploy AMBMessageRelay on Source chain
        ambRelay = new AMBMessageRelay(IAMB(AMB), Yaho(DEPLOYED_YAHO));

        vm.stopBroadcast();

        hashiHelper.write_deployed_address("AMBRelay", address(ambRelay));
    }
}
