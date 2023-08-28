// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Hashi_Counter} from "@benchmarking-cross-chain-bridges/Hashi/Counter.sol";

contract HashiCounterTest is Test {
    Hashi_Counter public counter;

    function setUp() public {
        counter = new Hashi_Counter();
    }

    function testFuzz_handle(uint256 x) public {
        bytes memory body = abi.encode(x);

        uint256 initialNumber = counter.number();

        counter.handle(body);

        assertEq(counter.number(), initialNumber + x);
    }
}
