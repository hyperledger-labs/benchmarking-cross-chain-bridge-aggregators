// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract HyperlaneHelperScript {
    function create_tx(
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
