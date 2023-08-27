// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {stdJson} from "forge-std/StdJson.sol";

using stdJson for string;

/**
 * @title HashiHelperScript
 * @dev A contract that provides helper functions for Hashi scripts.
 */
contract HashiHelperScript is Script {
    string root = vm.projectRoot();
    string path = string.concat(root, "/broadcast/");

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
}
