// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/*
Main factory contract
- Allows creation of contract only by owner
- Transfer Ownership of the bet contract to any address
*/

import "./core/BetContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IBetContract.sol";

contract BetFactory {
    address[] public deployedContracts;
    uint256 public totalBetsDeployed;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }

    function createNewBet(
        uint256 _betId,
        uint256 _totalShares,
        uint256 _initialYesPrice,
        uint256 _initialNoPrice,
        address _betToken
    ) public onlyOwner {
        address newContract = address(
            new BetContract(
                _betId,
                _totalShares,
                _initialYesPrice,
                _initialNoPrice,
                _betToken
            )
        );

        deployedContracts.push(newContract);
        totalBetsDeployed++;
    }

    function transferOwnershipExt(
        address newOwner,
        address _betContract
    ) public onlyOwner {
        IBetContract(_betContract).transferOwnership(newOwner);
    }
}
