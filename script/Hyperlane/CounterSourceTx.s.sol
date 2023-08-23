// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {HyperlaneHelperScript} from "./HyperlaneHelper.s.sol";

contract CounterSourceTxScript is Script {
    HyperlaneHelperScript hyperlane;
    address MAILBOX;

    string DESTINATION_DOMAIN;
    uint32 DESTINATION_DOMAIN_INT;

    uint256 deployerPrivateKey;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");

        MAILBOX = vm.envAddress("HYPERLANE_MAILBOX_ADDRESS");

        DESTINATION_DOMAIN = vm.envString("HYPERLANE_DESTINATION_DOMAIN");
        DESTINATION_DOMAIN_INT = uint32(
            vm.envUint("HYPERLANE_DESTINATION_DOMAIN")
        );

        hyperlane = new HyperlaneHelperScript();
    }

    function run() public {
        bytes memory counterAddressBytes = hyperlane.get_tx_data(
            "DeployCounter",
            DESTINATION_DOMAIN,
            ".transactions[0].contractAddress"
        );

        address counter = abi.decode(counterAddressBytes, (address));

        console2.log("Counter address: %s", address(counter));

        bytes memory send_tx = hyperlane.create_source_tx(
            DESTINATION_DOMAIN_INT,
            counter,
            20
        );

        vm.startBroadcast(deployerPrivateKey);
        (bool success, ) = MAILBOX.call(send_tx);

        require(success, "CounterScript: failed to send tx");
        vm.stopBroadcast();
    }
}
