// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Hyperlane_Counter} from "@benchmarking-cross-chain-bridges/Hyperlane/Counter.sol";

contract DeployerScript {
    function deploy() public returns (Hyperlane_Counter) {
        Hyperlane_Counter counter = new Hyperlane_Counter();

        return counter;
    }
}
