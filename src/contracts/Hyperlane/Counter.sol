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

contract Hyperlane_Counter is IMessageRecipient {
    uint256 public number;
    event Received(uint32 origin, address sender, bytes body);

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _body
    ) external override {
        uint256 _addNumber = abi.decode(_body, (uint256));
        increment(_addNumber);
        emit Received(_origin, bytes32ToAddress(_sender), _body);
    }

    function increment(uint256 _addNumber) internal {
        number = number + _addNumber;
    }

    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
    }
}
