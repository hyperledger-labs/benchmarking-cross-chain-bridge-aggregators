// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {stdJson} from "forge-std/StdJson.sol";
import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";
import {HyperlaneHelperScript} from "./Hyperlane_Helper.s.sol";

using stdJson for string;

contract CounterIGPPayScript is Script {
    uint256 deployerPrivateKey;

    string DESTINATION_DOMAIN;
    string root;
    string path;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");
        root = vm.projectRoot();
        DESTINATION_DOMAIN = vm.envString("DESTINATION_DOMAIN_GOERLI");
        path = string.concat(
            root,
            "/broadcast/Counter_source_tx.s.sol/",
            DESTINATION_DOMAIN,
            "/run-latest.json"
        );

        vm.startBroadcast(deployerPrivateKey);
        vm.stopBroadcast();
    }

    function run() public {
        string memory json = vm.readFile(path);

        bytes memory transactionHash = json.parseRaw(".transactions[1].hash");

        console2.logBytes(transactionHash);
    }
}
