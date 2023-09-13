/**
 * @title CounterSourceTxScript
 * @dev This contract is a script that creates a source transaction to deploy a counter contract on a destination domain using HyperlaneHelperScript.
 * It imports Script and console2 from forge-std/Script.sol and forge-std/console2.sol respectively.
 * It also imports HyperlaneHelperScript from ./HyperlaneHelper.s.sol.
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {HelperScript} from "../Helper/Helper.s.sol";

contract CounterSourceTxScript is Script {
    uint32 DESTINATION_DOMAIN_INT;
    string DESTINATION_DOMAIN;

    address DEPLOYED_DESTINATION_CONTRACT_ADDRESS;
    address MAILBOX;

    uint256 number;

    uint256 deployerPrivateKey;
    bool isTest;
    HelperScript helper;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        isTest = vm.envBool("TEST");
        helper = new HelperScript("Hyperlane", isTest);

        MAILBOX = vm.envAddress("HYPERLANE_MAILBOX_ADDRESS");

        DEPLOYED_DESTINATION_CONTRACT_ADDRESS = helper.get_deployed_address(
            "Counter"
        );

        DESTINATION_DOMAIN = vm.envString("HYPERLANE_DESTINATION_DOMAIN");
        DESTINATION_DOMAIN_INT = uint32(
            vm.envUint("HYPERLANE_DESTINATION_DOMAIN")
        );

        number = vm.envUint("HYPERLANE_COUNTER_NUMBER");
    }

    function run() public {
        bytes memory send_tx = create_source_tx(
            DESTINATION_DOMAIN_INT,
            DEPLOYED_DESTINATION_CONTRACT_ADDRESS,
            number
        );

        vm.startBroadcast(deployerPrivateKey);
        (bool success, ) = MAILBOX.call(send_tx);

        require(success, "CounterScript: failed to send tx");
        vm.stopBroadcast();
    }

    function create_source_tx(
        uint32 _destDomain,
        address _recipient,
        uint256 _number
    ) public pure returns (bytes memory) {
        bytes32 paddedRecipient = leftPadAddressToBytes32(_recipient);
        bytes memory body = abi.encodePacked(_number);

        return (
            abi.encodeWithSignature(
                "dispatch(uint32,bytes32,bytes)",
                _destDomain,
                paddedRecipient,
                body
            )
        );
    }

    /**
     * @dev Left-pads an address to a bytes32 value.
     * @param addr The address to pad.
     * @return The padded address.
     */
    function leftPadAddressToBytes32(
        address addr
    ) public pure returns (bytes32) {
        bytes32 result;
        assembly {
            result := addr
        }
        return result;
    }
}
