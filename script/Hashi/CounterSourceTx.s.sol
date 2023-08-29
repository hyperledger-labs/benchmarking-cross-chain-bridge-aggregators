/**
 * @title DeployCounterScript
 * @dev A script to deploy a Hyperlane_Counter contract on a specified domain using a HyperlaneHelperScript.
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {HashiHelperScript} from "./HashiHelper.s.sol";
import {Hashi_Counter} from "@benchmarking-cross-chain-bridges/Hashi/Counter.sol";
import {Yaho} from "@hashi/Yaho.sol";
import {Message} from "@hashi/interfaces/IMessage.sol";

contract DeployYahoScript is Script {
    HashiHelperScript hashiHelper;
    Yaho public yaho;

    uint256 deployerPrivateKey;

    address counter;
    address deployed_yaho;
    address deployed_ambRelay;
    address deployed_ambAdapter;

    uint256 DESTINATION_DOMAIN;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        DESTINATION_DOMAIN = vm.envUint("HASHI_DESTINATION_DOMAIN");
        hashiHelper = new HashiHelperScript();

        counter = hashiHelper.get_deployed_address("Counter");

        deployed_yaho = hashiHelper.get_deployed_address("Yaho");
        deployed_ambRelay = hashiHelper.get_deployed_address("AMBRelay");
        deployed_ambAdapter = hashiHelper.get_deployed_address("AMBAdapter");

        yaho = Yaho(deployed_yaho);
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        bytes memory tx_data = hashiHelper.create_tx(20);

        Message memory message = Message(counter, DESTINATION_DOMAIN, tx_data);

        Message[] memory messages = new Message[](1);
        messages[0] = message;

        address[] memory adapters = new address[](1);
        adapters[0] = deployed_ambAdapter;

        address[] memory destinationAdapters = new address[](1);
        destinationAdapters[0] = deployed_ambRelay;

        (bytes32[] memory messageIds, bytes32[] memory adapterReciepts) = yaho
            .dispatchMessagesToAdapters(
                messages,
                adapters,
                destinationAdapters
            );

        console2.log("Message ID[0]: ");
        console2.logBytes32(messageIds[0]);
        console2.log("Adapter Reciept[0]: ");
        console2.logBytes32(adapterReciepts[0]);

        vm.stopBroadcast();
    }
}
