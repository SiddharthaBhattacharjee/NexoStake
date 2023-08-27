// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
    mapping(address => uint256) public lastClaimed;
    IERC20 public betToken;
    uint256 public CLAIM_AMOUNT = 100 * 10 ** 18;

    constructor(address _betToken) {
        betToken = IERC20(_betToken);
    }

    function _getFaucetBalance() public view returns (uint256) {
        uint256 balance = betToken.balanceOf(address(this));
        return balance;
    }

    function claimTokens() public {
        require(
            block.timestamp - lastClaimed[msg.sender] > 86400,
            "You can't claim that frequently"
        );

        require(
            betToken.approve(address(this), CLAIM_AMOUNT),
            "Approval failed"
        );

        betToken.transferFrom(address(this), msg.sender, CLAIM_AMOUNT);
        lastClaimed[msg.sender] = block.timestamp;
    }
}
