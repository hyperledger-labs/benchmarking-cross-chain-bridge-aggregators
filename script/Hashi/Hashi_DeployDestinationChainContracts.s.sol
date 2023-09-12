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
import {IAMB} from "@hashi/adapters/AMB/IAMB.sol";
import {AMBAdapter} from "@hashi/adapters/AMB/AMBAdapter.sol";
import {HelperScript} from "../Helper/Helper.s.sol";

import {Hashi_Counter} from "@benchmarking-cross-chain-bridges/Hashi/Counter.sol";

contract DeployYaruScript is Script {
    Yaru public yaru;

    address HASHI;
    address YAHO;
    uint256 SOURCE_DOMAIN;
    uint256 DESTINATION_DOMAIN;

    uint256 deployerPrivateKey;
    bool isTest;
    HelperScript helper;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        isTest = vm.envBool("TEST");
        helper = new HelperScript("Hashi", isTest);

        YAHO = vm.envAddress("HASHI_YAHO_SOURCE");
        HASHI = vm.envAddress("HASHI_HASHI_DEST");
        SOURCE_DOMAIN = vm.envUint("HASHI_SOURCE_DOMAIN");
        DESTINATION_DOMAIN = vm.envUint("HASHI_DESTINATION_DOMAIN");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Yaru on Destination chain with Source chain as a parameter
        yaru = new Yaru(IHashi(HASHI), address(YAHO), SOURCE_DOMAIN);

        vm.stopBroadcast();

        helper.write_deployed_address("Yaru", address(yaru));
    }
}

contract DeployAMBAdapterScript is Script {
    address AMB;
    address DEPLOYED_AMB_RELAY;
    string SOURCE_DOMAIN;
    uint256 DESTINATION_DOMAIN;

    uint256 deployerPrivateKey;
    bool isTest;
    HelperScript helper;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        isTest = vm.envBool("TEST");
        helper = new HelperScript("Hashi", isTest);

        SOURCE_DOMAIN = vm.envString("HASHI_SOURCE_DOMAIN");
        DESTINATION_DOMAIN = vm.envUint("HASHI_DESTINATION_DOMAIN");
        AMB = vm.envAddress("HASHI_AMB_ADAPTER_DEST");
        DEPLOYED_AMB_RELAY = helper.get_deployed_address("AMBRelay");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        // Deploy AMBAdapter on Destination chain
        AMBAdapter ambAdapter = new AMBAdapter(
            IAMB(AMB),
            DEPLOYED_AMB_RELAY,
            bytes32(DESTINATION_DOMAIN)
        );

        vm.stopBroadcast();

        helper.write_deployed_address("AMBAdapter", address(ambAdapter));
    }
}

contract DeployCounterScript is Script {
    Hashi_Counter public counter;
    string SOURCE_DOMAIN;

    uint256 deployerPrivateKey;
    bool isTest;
    HelperScript helper;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        isTest = vm.envBool("TEST");
        helper = new HelperScript("Hashi", isTest);

        SOURCE_DOMAIN = vm.envString("HASHI_SOURCE_DOMAIN");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        counter = new Hashi_Counter();

        vm.stopBroadcast();

        helper.write_deployed_address("Counter", address(counter));
    }
}
