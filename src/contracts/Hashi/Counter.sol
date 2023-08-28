// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/**
 * @title Regular Counter
 * @dev A contract that increments a number based on the value passed in through a message.
 */
contract Hashi_Counter {
    uint256 public number;
    event Received(address sender, bytes body);

    /**
     * @dev Handles the incoming message and increments the number by the value passed in.
     * @param _body The body of the message, containing the value to increment the number by.
     */
    function handle(bytes calldata _body) external {
        uint256 _addNumber = abi.decode(_body, (uint256));
        increment(_addNumber);
        emit Received(msg.sender, _body);
    }

    /**
     * @dev Increments the number by the given value.
     * @param _addNumber The value to increment the number by.
     */
    function increment(uint256 _addNumber) internal {
        number = number + _addNumber;
    }
}
