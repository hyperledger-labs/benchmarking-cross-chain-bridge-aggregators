// SPDX-License-Identifier: UNLICENSED

/**
 * @title SourceContractTest
 * @dev This contract is used for testing the SourceContract functionality.
 */
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {CCIP_Sender} from "@benchmarking-cross-chain-bridges/CCIP/SourceContract.sol";

contract SourceContractTest is Test {
    CCIP_Sender public deployed_ccip_sender;

    address public deployed_ccip_sender_addr_sep =
        0x55D1801E6409d27917db2431EC27734EAF86E5C2;

    address public deployed_counter_addr_mum =
        0x3a5185FDCb73fc7d03e7755956678608482690CF;

    uint64 public destination_domain_mum = 12532609583862916517;

    /**
     * @dev Sets up the initial state of the contract.
     */
    function setUp() public {
        deployed_ccip_sender = CCIP_Sender(
            payable(deployed_ccip_sender_addr_sep)
        );
    }

    /**
     * @dev Tests the `getFee` function of the SourceContract.
     * @param x The input parameter for the `getFee` function.
     */
    function testFuzz_getFee(uint256 x) public {
        uint256 fee = deployed_ccip_sender.getFee(
            destination_domain_mum,
            deployed_counter_addr_mum,
            x
        );

        assertGt(fee, 0);
    }
}
