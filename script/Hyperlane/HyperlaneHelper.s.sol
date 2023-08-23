// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {Script} from "forge-std/Script.sol";
import {stdJson} from "forge-std/StdJson.sol";

using stdJson for string;

contract HyperlaneHelperScript is Script {
    string root = vm.projectRoot();
    string path = string.concat(root, "/broadcast/");

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
