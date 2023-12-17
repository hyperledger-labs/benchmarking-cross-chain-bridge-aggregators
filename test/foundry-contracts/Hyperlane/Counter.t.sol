// SPDX-License-Identifier: UNLICENSED

/**
 * @title HyperlaneCounterTest
 * @dev This contract is used for testing the Hyperlane_Counter contract.
 */
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";

contract HyperlaneCounterTest is Test {
    Hyperlane_Counter public counter;

    /**
     * @dev Sets up the test environment by deploying a new instance of Hyperlane_Counter.
     */
    function setUp() public {
        counter = new Hyperlane_Counter();
    }

    /**
     * @dev Tests the handle function of the Hyperlane_Counter contract.
     * @param x The input value to be passed to the handle function.
     */
    function testFuzz_handle(uint256 x) public {
        uint32 origin = 5;
        bytes32 sender;
        address senderAddr = address(this);

        assembly {
            sender := mload(0x00)
            mstore(sender, senderAddr)
        }
        bytes memory body = abi.encode(x);

        uint256 initialNumber = counter.number();

        counter.handle(origin, sender, body);

        assertEq(counter.number(), initialNumber + x);
    }
}
