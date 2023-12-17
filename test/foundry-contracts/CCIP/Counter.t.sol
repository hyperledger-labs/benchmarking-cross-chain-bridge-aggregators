// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {StdCheats} from "forge-std/StdCheats.sol";
import {CCIP_Counter} from "@benchmarking-cross-chain-bridges/CCIP/Counter.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

/// @title CCIPCounterTest
/// @dev A contract for testing the CCIP_Counter contract
contract CCIPCounterTest is Test {
    CCIP_Counter public counter;

    // Same values as the constact local in the CCIP folder.
    address public constant CCIP_ROUTER_MUMBAI =
        0x70499c328e1E2a3c41108bd3730F6670a44595D1;
    uint64 public constant CCIP_CHAIN_SELECTOR_MUMBAI = 12532609583862916517;

    /// @dev Sets up the test environment by deploying a new instance of CCIP_Counter
    function setUp() public {
        counter = new CCIP_Counter(CCIP_ROUTER_MUMBAI);
    }

    /// @dev Tests the ccipReceive function of CCIP_Counter contract
    /// @param x The value to be passed to the ccipReceive function
    function testFuzz_ccipReceive(uint256 x) public {
        // Create a new CCIP message
        Client.Any2EVMMessage memory any2EvmMessage = Client.Any2EVMMessage({
            messageId: bytes32(0),
            sourceChainSelector: CCIP_CHAIN_SELECTOR_MUMBAI,
            sender: abi.encode(address(msg.sender)),
            data: abi.encode(x),
            destTokenAmounts: new Client.EVMTokenAmount[](0)
        });

        uint256 initialNumber = counter.number();

        vm.prank(CCIP_ROUTER_MUMBAI);

        counter.ccipReceive(any2EvmMessage);

        assertEq(counter.number(), initialNumber + x);
    }
}
