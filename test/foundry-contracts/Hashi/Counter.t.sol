// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Hashi_Counter} from "@benchmarking-cross-chain-bridges/Hashi/Counter.sol";

/// @title HashiCounterTest
/// @dev A contract for testing the Hashi_Counter contract
contract HashiCounterTest is Test {
    Hashi_Counter public counter;

    /// @dev Sets up the test environment by deploying a new instance of Hashi_Counter
    function setUp() public {
        counter = new Hashi_Counter();
    }

    /// @dev Tests the handle function of Hashi_Counter by passing a value and checking if the counter is incremented correctly
    /// @param x The value to be passed to the handle function
    function testFuzz_handle(uint256 x) public {
        bytes memory body = abi.encode(x);

        uint256 initialNumber = counter.number();

        counter.handle(body);

        assertEq(counter.number(), initialNumber + x);
    }

    /// @dev Tests the handle function of Hashi_Counter using the call() method by passing a value and checking if the counter is incremented correctly
    /// @param x The value to be passed to the handle function
    function testFuzz_calldataHandle(uint256 x) public {
        bytes memory body = abi.encode(x);

        uint256 initialNumber = counter.number();

        (bool success, ) = address(counter).call(
            abi.encodeWithSignature("handle(bytes)", body)
        );

        assertEq(success, true);
        assertEq(counter.number(), initialNumber + x);
    }
}
