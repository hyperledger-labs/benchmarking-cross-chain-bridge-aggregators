// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {Script} from "forge-std/Script.sol";
import {stdJson} from "forge-std/StdJson.sol";

using stdJson for string;

contract HyperlaneHelperScript is Script {
    string root = vm.projectRoot();
    string path =
        string.concat(
            root,
            "/broadcast/Counter_source_tx.s.sol/",
            vm.envString("HYPERLANE_DESTINATION_DOMAIN_GOERLI"),
            "/run-latest.json"
        );

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

    function get_tx_data(
        string memory _key
    ) public view returns (bytes memory) {
        string memory json = vm.readFile(path);

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
