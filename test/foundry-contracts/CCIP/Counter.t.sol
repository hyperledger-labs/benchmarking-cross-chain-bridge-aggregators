// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {StdCheats} from "forge-std/StdCheats.sol";
import {CCIP_Counter} from "@benchmarking-cross-chain-bridges/CCIP/Counter.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract CCIPCounterTest is Test {
    CCIP_Counter public counter;
    address public constant CCIP_ROUTER_MUMBAI =
        0x70499c328e1E2a3c41108bd3730F6670a44595D1;
    uint64 public constant CCIP_CHAIN_SELECTOR_MUMBAI = 12532609583862916517;

    function setUp() public {
        counter = new CCIP_Counter(CCIP_ROUTER_MUMBAI);
    }

    function testFuzz_ccipReceive(uint256 x) public {
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
