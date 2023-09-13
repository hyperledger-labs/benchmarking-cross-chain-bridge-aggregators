/**
 * @title DeployCounterScript
 * @dev A script to deploy a Hyperlane_Counter contract on a specified domain using a HyperlaneHelperScript.
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {HelperScript} from "../Helper/Helper.s.sol";
import {Hashi_Counter} from "@benchmarking-cross-chain-bridges/Hashi/Counter.sol";
import {Yaho} from "@hashi/Yaho.sol";
import {Message} from "@hashi/interfaces/IMessage.sol";

contract CounterSourceTxScript is Script {
    Yaho public yaho;

    address counter;
    address DEPLOYED_YAHO;
    address DEPLOYED_AMBRELAY;
    address DEPLOYED_AMBADAPTER;
    uint256 number;
    uint256 DESTINATION_DOMAIN;

    uint256 deployerPrivateKey;
    bool isTest;
    HelperScript helper;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        isTest = vm.envBool("TEST");
        helper = new HelperScript("Hashi", isTest);

        DESTINATION_DOMAIN = vm.envUint("HASHI_DESTINATION_DOMAIN");
        number = vm.envUint("HASHI_NUMBER");

        counter = helper.get_deployed_address("Counter");
        DEPLOYED_YAHO = helper.get_deployed_address("Yaho");
        DEPLOYED_AMBRELAY = helper.get_deployed_address("AMBRelay");
        DEPLOYED_AMBADAPTER = helper.get_deployed_address("AMBAdapter");

        yaho = Yaho(DEPLOYED_YAHO);
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        bytes memory tx_data = create_tx(number);

        Message memory message = Message(counter, DESTINATION_DOMAIN, tx_data);

        Message[] memory messages = new Message[](1);
        messages[0] = message;

        address[] memory adapters = new address[](1);
        adapters[0] = DEPLOYED_AMBADAPTER;

        address[] memory destinationAdapters = new address[](1);
        destinationAdapters[0] = DEPLOYED_AMBRELAY;

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

    function create_tx(uint256 _number) public pure returns (bytes memory) {
        return (
            abi.encodeWithSignature("handle(bytes)", abi.encodePacked(_number))
        );
    }
}
