// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {stdJson} from "forge-std/StdJson.sol";
import {console2} from "forge-std/console2.sol";

using stdJson for string;

/**
 * @title HashiHelperScript
 * @dev A contract that provides helper functions for Hashi scripts.
 */
contract HashiHelperScript is Script {
    string root = vm.projectRoot();
    string path = string.concat(root, "/broadcast/");
    string contract_address_json =
        "/src/message-aggregators/hashi/deployed_addresses.json";
    string path_contract_address = string.concat(root, contract_address_json);

    /**
     * @dev Gets transaction data for Hashi.
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
            "/dry-run/run-latest.json"
        );

        string memory json = vm.readFile(new_path);

        bytes memory transactionData = json.parseRaw(_key);
        return transactionData;
    }

    function get_deployed_address(
        string memory _contract_name
    ) public returns (address) {
        string memory json = vm.readFile(path_contract_address);

        address deployed_address = json.readAddress(
            string.concat(".", _contract_name)
        );

        return deployed_address;
    }

    function write_deployed_address(
        string calldata _contract_name,
        address _address
    ) public {
        vm.writeJson(
            vm.toString(_address),
            path_contract_address,
            string.concat(".", _contract_name)
        );

        console2.log(
            "Deployed address of %s is written to %s",
            _contract_name,
            contract_address_json
        );
    }
}
