// SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {IERC20Upgradeable as IERC20} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeMathUpgradeable as SafeMath} from "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract Exchange is OwnableUpgradeable, UUPSUpgradeable, PausableUpgradeable {
    using SafeMath for uint256;

    IERC20 payToken;
    IERC20 zfuel;
    address admin;

    address payable wallet;


    // how much erc20 to 1 zfuel
    uint256 public price = 1E20;

    uint256 constant _1Zfuel = 1E18;

     // how much ETH to 1 zfuel
    uint256 public ethprice;

    
    constructor() {
        _disableInitializers();
    }

    function initialize(address _pay, address _zfuel, address _wallet) external initializer {
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();

        payToken = IERC20(_pay);
        zfuel = IERC20(_zfuel);
        wallet = payable(_wallet);

        admin = msg.sender;
    }

    event SetZfuel(address manage, address token);
    event SetPayToken(address manage, address token);
    event SetPrice(address manage, uint256 _price);
    event Swap(address buyer, uint256 _price, uint256 payAmount, uint256 zfuelAmount);
    event TacKBack(address recipient, uint256 amount, uint256 blocktime);

    receive() payable external {
        swapForETH();
    }

    /**
     * @dev swap erc20 token with zfuel
     * 
     * uint256 _amount: zfuel amount, 
     * 
     * Notice
     * - need add decimal 0
     */ 
    function swap(uint256 payamount) external whenNotPaused {
        payamount = payamount.mul(1E18);
        uint256 zfuelAmount = payamount.mul(price).div(_1Zfuel);
        payToken.transferFrom(msg.sender, wallet, payamount);
        zfuel.transfer(msg.sender, zfuelAmount);
        emit Swap(msg.sender, price, payamount, zfuelAmount);
    }

    // @dev receive eth to swap Zfuel
    function swapForETH() public payable whenNotPaused {
        uint256 payamount = msg.value;
        uint256 zfuelAmount = payamount.mul(ethprice).div(_1Zfuel);
        zfuel.transfer(msg.sender, zfuelAmount);
        wallet.transfer(payamount);
        emit Swap(msg.sender, ethprice, payamount, zfuelAmount);
    }

    function setZfuel(address _token) external onlyOwner {
        require(_token != address(0), "token is zero");
        zfuel = IERC20(_token);
        emit SetZfuel(msg.sender, _token);
    }

    function setPayToken(address _token) external onlyOwner {
        require(_token != address(0), "token is zero");
        payToken = IERC20(_token);
        emit SetPayToken(msg.sender, _token);
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
        emit SetPrice(msg.sender, _price);
    }


    function setETHPrice(uint256 _price) external onlyOwner {
        ethprice = _price;
        emit SetPrice(msg.sender, _price);
    }

    function leftBalance() public view returns(uint) {
        return zfuel.balanceOf(address(this));
    }

    function takeBackZfuel(address recipient) external onlyOwner {
        uint256 amount = leftBalance();
        zfuel.transfer(recipient, amount);

        emit TacKBack(recipient, amount, block.timestamp);
    }

    function setWallet(address _wallet) external onlyOwner {
        require(_wallet != address(0), "address cant be zero");
        wallet = payable(_wallet);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Error");
        _;
    }

    function pause() public virtual onlyOwner {
        _pause();
    }

    function unpause() public virtual onlyOwner {
        _unpause();
    }

     /// uups interface
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        view
        onlyAdmin
    { }

}















