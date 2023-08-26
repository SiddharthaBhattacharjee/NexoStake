// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract BetToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(
        string memory _TokenName,
        string memory _TokenSymbol,
        uint256 _totalShares
    ) ERC20(_TokenName, _TokenSymbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        mint(msg.sender, _totalShares * 10 ** 18);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _sellToken(address to, address _ownerAddress) public {
        uint256 _balance = balanceOf(_ownerAddress);
        transferFrom(_ownerAddress, to, _balance);
    }
}
