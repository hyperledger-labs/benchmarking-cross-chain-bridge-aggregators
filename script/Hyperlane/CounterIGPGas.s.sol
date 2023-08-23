// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";
import {HyperlaneHelperScript} from "./HyperlaneHelper.s.sol";

contract CounterIGPGasScript is Script {
    uint256 deployerPrivateKey;
    address sender;
    address MAILBOX;
    address IGP;
    string SOURCE_DOMAIN;
    string DESTINATION_DOMAIN;
    uint32 DESTINATION_DOMAIN_INT;
    uint GAS_AMOUNT;
    HyperlaneHelperScript hyperlane;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        sender = vm.envAddress("KEY_PUBLIC");

        MAILBOX = vm.envAddress("HYPERLANE_MAILBOX_ADDRESS");
        IGP = vm.envAddress("HYPERLANE_IGP_ADDRESS");

        SOURCE_DOMAIN = vm.envString("HYPERLANE_SOURCE_DOMAIN");
        DESTINATION_DOMAIN = vm.envString("HYPERLANE_DESTINATION_DOMAIN");
        DESTINATION_DOMAIN_INT = uint32(
            vm.envUint("HYPERLANE_DESTINATION_DOMAIN")
        );

        GAS_AMOUNT = vm.envUint("HYPERLANE_GAS_AMOUNT");

        hyperlane = new HyperlaneHelperScript();
    }

    function run() public {
        string memory pathModifier = "/";

        bytes32 hyperlane_message_id = abi.decode(
            hyperlane.get_tx_data(
                "Counter_igp_gas",
                pathModifier,
                ".receipts[1].logs[1].topics[1]"
            ),
            (bytes32)
        );

        console2.log("hyperlane_message_id: ");
        console2.logBytes32(hyperlane_message_id);

        bytes memory igp_quote = hyperlane.get_igp_quote(
            DESTINATION_DOMAIN_INT,
            GAS_AMOUNT
        );
        vm.startBroadcast(deployerPrivateKey);

        (bool success, bytes memory data) = IGP.call(igp_quote);

        uint256 GAS_PAYMENT_QUOTE = abi.decode(data, (uint256));

        require(success, "CounterIGPPayScript: failed to get quote");

        console2.log("GAS_PAYMENT_QUOTE: ", GAS_PAYMENT_QUOTE);
        vm.stopBroadcast();

        bytes memory igp_payment = hyperlane.create_igp_payment(
            hyperlane_message_id,
            DESTINATION_DOMAIN_INT,
            GAS_AMOUNT,
            sender
        );

        vm.startBroadcast(deployerPrivateKey);
        (success, ) = IGP.call{value: GAS_PAYMENT_QUOTE}(igp_payment);

        require(success, "CounterIGPPayScript: failed to pay for gas");
        vm.stopBroadcast();
    }
}
