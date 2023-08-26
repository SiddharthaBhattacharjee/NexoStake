// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../token/BetToken.sol";
import "../interface/IBetToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BetContract is Ownable {
    uint256 public betId;
    uint256 public totalShares;

    uint256 public yesPrice;
    uint256 public noPrice;

    address public yesToken;
    address public noToken;

    uint256 public yesVotes;
    uint256 public noVotes;

    Option winningOption;

    bool public settled;

    IERC20 public betToken;

    enum Option {
        Yes,
        No
    }

    mapping(address => Option) public chosenOption;
    mapping(address => bool) public betSettled;
    mapping(address => bool) public betPlaced;
    mapping(address => uint256) public amountInvested;
    mapping(address => uint256) public totalSharesBought;
    address[] public Addresses;
    uint256 totalBetsPlaced;

    constructor(
        uint256 _betId,
        uint256 _totalShares,
        uint256 _initialYesPrice,
        uint256 _initialNoPrice,
        address _betToken
    ) {
        betId = _betId;
        totalShares = _totalShares;
        yesPrice = _initialYesPrice;
        noPrice = _initialNoPrice;
        string memory _yTokenName = string(abi.encode(_betId, "YES_TOKEN"));
        string memory _nTokenName = string(abi.encode(_betId, "NO_TOKEN"));
        yesToken = address(new BetToken(_yTokenName, "YESTKN", 100));
        noToken = address(new BetToken(_nTokenName, "NOTKN", 100));
        betToken = IERC20(_betToken);
    }

    function placeBet(Option _option, uint256 _shares) external payable {
        require(
            _option == Option.Yes || _option == Option.No,
            "Invalid option"
        );
        require(!settled, "Bet is closed");
        require(!betPlaced[msg.sender], "Already placed a bet");
        require(
            totalBetsPlaced <= totalShares,
            "Reached Betting limit for this bet for give share amount"
        );

        uint256 betPrice = _option == Option.Yes ? yesPrice : noPrice;
        uint256 _totalBetPrice = betPrice * _shares;

        require(
            betToken.balanceOf(msg.sender) >= _totalBetPrice,
            "MSG VALUE >= bet price"
        );
        require(
            betToken.allowance(msg.sender, address(this)) >= _totalBetPrice,
            "No Allowance"
        );
        require(
            betToken.transferFrom(msg.sender, address(this), _totalBetPrice),
            "Token transfer failed"
        );

        require(
            IERC20(_option == Option.Yes ? yesToken : noToken).transfer(
                msg.sender,
                _shares
            ),
            "Token Shares transfer failed"
        );

        chosenOption[msg.sender] = _option;
        betPlaced[msg.sender] = true;
        totalBetsPlaced += _shares;
        totalSharesBought[msg.sender] = _shares;

        if (_option == Option.Yes) {
            yesVotes += _shares;
        } else {
            noVotes += _shares;
        }

        amountInvested[msg.sender] = betPrice;
        adjustPrices();
    }

    function adjustPrices() internal {
        // This is just a simple example, and you might want to use more sophisticated algorithms.

        uint256 totalVotes = yesVotes + noVotes;
        if (totalVotes > 0) {
            if (yesVotes > 0) {
                yesPrice = ((yesVotes * totalVotes * yesPrice) /
                    (totalVotes * 2));
            }
            if (noVotes > 0) {
                noPrice = ((noVotes * totalVotes * noPrice) / (totalVotes * 2));
            }
        }
    }

    function _transferShares(address to) public {
        require(betPlaced[msg.sender], "Not placed placed a bet");
        Option _option = chosenOption[msg.sender];
        uint256 _shares = totalSharesBought[msg.sender];
        uint256 _balanceDeposited = amountInvested[msg.sender];
        IBetToken(_option == Option.Yes ? yesToken : noToken)._sellToken(
            to,
            msg.sender
        );
        // Updating the betting state
        delete betPlaced[msg.sender];
        delete betPlaced[msg.sender];
        delete chosenOption[msg.sender];
        delete totalSharesBought[msg.sender];

        betPlaced[to] = true;
        chosenOption[to] = _option;
        amountInvested[to] = _balanceDeposited;
        totalSharesBought[to] = _shares;
        Addresses.push(to);
    }

    function settleBet(Option _winningOption) public onlyOwner {
        require(
            _winningOption == Option.Yes || _winningOption == Option.No,
            "Invalid option"
        );
        require(!settled, "Bet is already settled");

        winningOption = _winningOption;
        settled = true;
    }

    function redeemBet() public {
        require(settled, "Bet is not sattled");
        Option option = chosenOption[msg.sender];
        require(option == winningOption, "You are not on the winning team");
        require(!betSettled[msg.sender], "Bet settled for you");
        uint256 _balanceDeposited = amountInvested[msg.sender];
        betSettled[msg.sender] = true;
        require(
            betToken.approve(address(this), _balanceDeposited),
            "Approval failed"
        );
        betToken.transferFrom(address(this), msg.sender, _balanceDeposited * 2);
    }

    function _isBetting(address _user) public view returns (bool) {
        return betPlaced[_user];
    }
}
