// SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./owner/Manage.sol";

contract BFuelSwap is ReentrancyGuard, Manage {
    using SafeMath for uint256;

    IERC20 payToken;
    IERC20 bfuel;

    address payable wallet;


    // how much usdt to 1 bfuel
    uint256 public price = 0.0125 * 1E6;

    uint256 constant _1BFuel = 1E18;

    constructor(address _pay, address _bfuel, address _wallet) {
        payToken = IERC20(_pay);
        bfuel = IERC20(_bfuel);
        wallet = payable(_wallet);
    }

    event SetMfuel(address manage, address token);
    event SetPayToken(address manage, address token);
    event SetPrice(address manage, uint256 _price);
    event Swap(address buyer, uint256 _price, uint256 payAmount, uint256 bfuelAmount);
    event TacKBack(address recipient, uint256 amount, uint256 blocktime);

    receive() payable external {
        revert();
    }

    /**
     * @dev swap erc20 token with bfuel
     * 
     * uint256 _amount: bfuel amount, 
     * 
     * Notice
     * - need add decimal 0
     */ 
    function swap(uint256 payamount) external nonReentrant {
        uint256 bfuelAmount = payamount.mul(_1BFuel).div(price);
        payToken.transferFrom(msg.sender, wallet, payamount);
        bfuel.transfer(msg.sender, bfuelAmount);
        emit Swap(msg.sender, price, payamount, bfuelAmount);
    }

    function setBfuel(address _token) external onlyManage {
        require(_token != address(0), "token is zero");
        bfuel = IERC20(_token);
        emit SetMfuel(msg.sender, _token);
    }

    function changeWallet(address _newWallet) external onlyManage {
        require(_newWallet != address(0), "new wallet is zero");
        wallet = payable(_newWallet);
    }

    function setPayToken(address _token) external onlyManage {
        require(_token != address(0), "token is zero");
        payToken = IERC20(_token);
        emit SetPayToken(msg.sender, _token);
    }

    function setPrice(uint256 _price) external onlyManage {
        price = _price;
        emit SetPrice(msg.sender, _price);
    }

    function leftBalance() public view returns(uint) {
        return bfuel.balanceOf(address(this));
    }

    function takeBackBfuel(address recipient) external onlyManage {
        uint256 amount = leftBalance();
        bfuel.transfer(recipient, amount);

        emit TacKBack(recipient, amount, block.timestamp);
    }

    function takeBackTokens(address recipient, address token) external onlyManage {
        uint256 amount = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(recipient, amount);

        emit TacKBack(recipient, amount, block.timestamp);
    }

}















