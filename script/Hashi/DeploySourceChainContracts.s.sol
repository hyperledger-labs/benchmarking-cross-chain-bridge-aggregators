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
    uint256 deployerPrivateKey;

    Yaho public yaho;

    uint256 SOURCE_DOMAIN;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        SOURCE_DOMAIN = vm.envUint("HASHI_SOURCE_DOMAIN");
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

contract DeployAMBRelayScript is Script {
    HashiHelperScript hashiHelper;
    uint256 deployerPrivateKey;

    AMBMessageRelay public ambRelay;

    uint256 SOURCE_DOMAIN;
    string DESTINATION_DOMAIN;
    address AMB_RELAY;
    address DEPLOYED_YAHO;

    function setUp() public {
        hashiHelper = new HashiHelperScript();
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");

        SOURCE_DOMAIN = vm.envUint("HASHI_SOURCE_DOMAIN");
        DESTINATION_DOMAIN = vm.envString("HASHI_DESTINATION_DOMAIN");

        AMB_RELAY = vm.envAddress("HASHI_AMB_RELAY_GOERLI");

        bytes memory counterAddressBytes = hashiHelper.get_tx_data(
            "DeploySourceChainContracts",
            DESTINATION_DOMAIN,
            ".transactions[0].contractAddress"
        );

        DEPLOYED_YAHO = abi.decode(counterAddressBytes, (address));
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        // Deploy AMBMessageRelay on Source chain
        ambRelay = new AMBMessageRelay(IAMB(AMB_RELAY), Yaho(DEPLOYED_YAHO));

        vm.stopBroadcast();

        console2.log(
            "AMB Relay deployed at address on chain %d: %s",
            SOURCE_DOMAIN,
            address(ambRelay)
        );
    }
}
