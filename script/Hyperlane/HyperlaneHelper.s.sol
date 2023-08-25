// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {stdJson} from "forge-std/StdJson.sol";

using stdJson for string;

/**
 * @title HyperlaneHelperScript
 * @dev A contract that provides helper functions for Hyperlane scripts.
 */
contract HyperlaneHelperScript is Script {
    string root = vm.projectRoot();
    string path = string.concat(root, "/broadcast/");

    /**
     * @dev Creates a source transaction for Hyperlane.
     * @param _destDomain The destination domain for the transaction.
     * @param _recipient The recipient address for the transaction.
     * @param _number The amount of tokens to send in the transaction.
     * @return The encoded source transaction.
     */
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
     * @dev Gets a gas payment quote for Hyperlane.
     * @param _destDomain The destination domain for the gas payment.
     * @param _gasAmount The amount of gas to pay for.
     * @return The encoded gas payment quote.
     */
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

    /**
     * @dev Gets transaction data for Hyperlane.
     * @param _contract_file_name The name of the contract file.
     * @param _chain_id The ID of the chain.
     * @param _key The key for the transaction data.
     * @return The transaction data.
     */
    function get_tx_data(
        string memory _contract_file_name,
        string memory _chain_id,
        string memory _key
    ) public view returns (bytes memory) {
        string memory new_path = string.concat(
            path,
            _contract_file_name,
            ".s.sol/",
            _chain_id,
            "/run-latest.json"
        );

        string memory json = vm.readFile(new_path);

        bytes memory transactionHash = json.parseRaw(_key);
        return transactionHash;
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
