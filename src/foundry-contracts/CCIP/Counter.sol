// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for receiving string data across chains.
contract Counter is CCIPReceiver {
    uint256 public number; // Store the last received text.
    event Received(address sender, bytes body);

    /// @notice Constructor initializes the contract with the router address.
    /// @param router The address of the router contract.
    constructor(address router) CCIPReceiver(router) {}

    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        uint256 _addNumber = abi.decode(any2EvmMessage.data, (uint256)); // abi-decoding of the received number
        increment(_addNumber);
        emit Received(
            abi.decode(any2EvmMessage.sender, (address)),
            any2EvmMessage.data
        );
    }

    /**
     * @dev Increments the number by the given value.
     * @param _addNumber The value to increment the number by.
     */
    function increment(uint256 _addNumber) internal {
        number = number + _addNumber;
    }
}
