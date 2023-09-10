// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

import {CCIP_Sender} from "@benchmarking-cross-chain-bridges/CCIP/SourceContract.sol";

contract SourceTxFeeLINKScript is Script {
    CCIP_Sender source_contract;
    LinkTokenInterface linkToken;

    uint64 DESTINATION_DOMAIN;
    address SOURCE_CONTRACT_ADDRESS;
    address DESTINATION_CONTRACT_ADDRESS;
    address LINK_ADDRESS;

    uint256 number;

    uint256 deployerPrivateKey;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");

        SOURCE_CONTRACT_ADDRESS = vm.envAddress("CCIP_SENDER_ADDRESS");

        DESTINATION_CONTRACT_ADDRESS = vm.envAddress("CCIP_RECEIVER_ADDRESS");

        DESTINATION_DOMAIN = uint64(vm.envUint("CCIP_DESTINATION_DOMAIN"));

        LINK_ADDRESS = vm.envAddress("CCIP_LINK_ADDRESS");

        number = vm.envUint("CCIP_NUMBER");

        source_contract = CCIP_Sender(payable(SOURCE_CONTRACT_ADDRESS));
        linkToken = LinkTokenInterface(LINK_ADDRESS);
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        linkToken.transfer(SOURCE_CONTRACT_ADDRESS, 1e17);

        uint256 fee = source_contract.getFee(
            DESTINATION_DOMAIN,
            DESTINATION_CONTRACT_ADDRESS,
            number
        );

        console2.log("Fee for paying in link: ", fee);
        vm.stopBroadcast();
    }
}

contract SourceTxFeeNativeScript is Script {
    CCIP_Sender source_contract;

    uint64 DESTINATION_DOMAIN;
    address SOURCE_CONTRACT_ADDRESS;
    address DESTINATION_CONTRACT_ADDRESS;

    uint256 number;

    uint256 deployerPrivateKey;

    function setUp() public {
        deployerPrivateKey = vm.envUint("KEY_PRIVATE");

        SOURCE_CONTRACT_ADDRESS = vm.envAddress("CCIP_SENDER_ADDRESS");

        DESTINATION_CONTRACT_ADDRESS = vm.envAddress("CCIP_RECEIVER_ADDRESS");

        DESTINATION_DOMAIN = uint64(vm.envUint("CCIP_DESTINATION_DOMAIN"));

        number = vm.envUint("CCIP_NUMBER");

        source_contract = CCIP_Sender(payable(SOURCE_CONTRACT_ADDRESS));
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);

        payable(SOURCE_CONTRACT_ADDRESS).transfer(1e16);

        uint256 fee = source_contract.getFee(
            DESTINATION_DOMAIN,
            DESTINATION_CONTRACT_ADDRESS,
            number
        );

        console2.log("Fee for paying in native: ", fee);
        vm.stopBroadcast();
    }
}
