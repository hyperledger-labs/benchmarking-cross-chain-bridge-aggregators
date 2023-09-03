// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IMessageRecipient {
    /**
     * @notice Handle an interchain message
     * @param _origin Domain ID of the chain from which the message came
     * @param _sender Address of the message sender on the origin chain as bytes32
     * @param _body Raw bytes content of message body
     */
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _body
    ) external;
}

/**
 * @title Hyperlane_Counter
 * @dev A contract that increments a number based on the value passed in through a message.
 */
contract Hyperlane_Counter is IMessageRecipient {
    uint256 public number;
    event Received(address sender, bytes body);

    /**
     * @dev Handles the incoming message and increments the number by the value passed in.
     * @param _origin The origin of the message.
     * @param _sender The sender of the message.
     * @param _body The body of the message, containing the value to increment the number by.
     */
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _body
    ) external override {
        uint256 _addNumber = abi.decode(_body, (uint256));
        increment(_addNumber);
        emit Received(address(uint160(uint256(_sender))), _body);
    }

    /**
     * @dev Increments the number by the given value.
     * @param _addNumber The value to increment the number by.
     */
    function increment(uint256 _addNumber) internal {
        number = number + _addNumber;
    }
}
