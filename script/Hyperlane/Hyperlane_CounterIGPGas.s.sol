/**
 * @title CounterIGPGasScript
 * @dev A script that interacts with the HyperlaneHelperScript and Hyperlane_Counter contracts to pay for gas on the Hyperlane network.
 * @notice This script is used to pay for gas on the Hyperlane network by creating an IGP payment and calling the IGP contract with the payment.
 * @notice The script requires the following environment variables to be set: KEY_PRIVATE, KEY_PUBLIC, HYPERLANE_MAILBOX_ADDRESS, HYPERLANE_IGP_ADDRESS, HYPERLANE_SOURCE_DOMAIN, HYPERLANE_DESTINATION_DOMAIN, HYPERLANE_DESTINATION_DOMAIN, HYPERLANE_GAS_AMOUNT.
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";
import {HelperScript} from "../Helper/Helper.s.sol";

contract CounterIGPGasScript is Script {
    address sender_address;
    address MAILBOX;
    address IGP;
    string SOURCE_DOMAIN;
    string DESTINATION_DOMAIN;
    uint32 DESTINATION_DOMAIN_INT;
    uint GAS_AMOUNT;

    bytes32 hyperlane_message_id;
    bytes igp_quote;

    uint256 deployerPrivateKey;
    bool isTest;
    HelperScript helper;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        isTest = vm.envBool("TEST");
        helper = new HelperScript("Hyperlane", isTest);

        sender_address = vm.envAddress("KEY_PUBLIC");

        MAILBOX = vm.envAddress("HYPERLANE_MAILBOX_ADDRESS");
        IGP = vm.envAddress("HYPERLANE_IGP_ADDRESS");

        SOURCE_DOMAIN = vm.envString("HYPERLANE_SOURCE_DOMAIN");
        DESTINATION_DOMAIN = vm.envString("HYPERLANE_DESTINATION_DOMAIN");
        DESTINATION_DOMAIN_INT = uint32(
            vm.envUint("HYPERLANE_DESTINATION_DOMAIN")
        );

        GAS_AMOUNT = vm.envUint("HYPERLANE_GAS_AMOUNT");

        hyperlane_message_id = abi.decode(
            helper.get_tx_data(
                "Hyperlane_CounterSourceTx",
                SOURCE_DOMAIN,
                ".receipts[1].logs[1].topics[1]"
            ),
            (bytes32)
        );

        require(
            hyperlane_message_id != bytes32(0),
            "CounterIGPGasScript: failed to get hyperlane_message_id"
        );

        console2.log("hyperlane_message_id: ");
        console2.logBytes32(hyperlane_message_id);

        igp_quote = get_igp_quote(DESTINATION_DOMAIN_INT, GAS_AMOUNT);

        require(
            igp_quote.length != 0,
            "CounterIGPGasScript: failed to get igp_quote"
        );

        console2.log("igp_quote: ");
        console2.logBytes(igp_quote);
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        (bool success, bytes memory data) = IGP.call(igp_quote);

        require(success, "CounterIGPPayScript: failed to get quote");
        vm.stopBroadcast();

        uint256 GAS_PAYMENT_QUOTE = abi.decode(data, (uint256));
        console2.log("GAS_PAYMENT_QUOTE: ", GAS_PAYMENT_QUOTE);

        bytes memory igp_payment = create_igp_payment(
            hyperlane_message_id,
            DESTINATION_DOMAIN_INT,
            GAS_AMOUNT,
            sender_address
        );

        vm.startBroadcast(deployerPrivateKey);
        (success, ) = IGP.call{value: GAS_PAYMENT_QUOTE}(igp_payment);

        require(success, "CounterIGPPayScript: failed to pay for gas");
        vm.stopBroadcast();
    }

    function get_igp_quote(
        uint32 _destDomain,
        uint256 _gasAmount
    ) public pure returns (bytes memory) {
        return (
            abi.encodeWithSignature(
                "quoteGasPayment(uint32,uint256)",
                _destDomain,
                _gasAmount
            )
        );
    }

    /**
     * @dev Creates a gas payment for Hyperlane.
     * @param _hyperlane_message_id The ID of the Hyperlane message.
     * @param _destDomain The destination domain for the gas payment.
     * @param _gasAmount The amount of gas to pay for.
     * @param _sender The sender address for the gas payment.
     * @return The encoded gas payment.
     */
    function create_igp_payment(
        bytes32 _hyperlane_message_id,
        uint32 _destDomain,
        uint256 _gasAmount,
        address _sender
    ) public pure returns (bytes memory) {
        return (
            abi.encodeWithSignature(
                "payForGas(bytes32,uint32,uint256,address)",
                _hyperlane_message_id,
                _destDomain,
                _gasAmount,
                _sender
            )
        );
    }
}
