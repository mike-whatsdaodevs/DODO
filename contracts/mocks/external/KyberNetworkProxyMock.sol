// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { SafeMath } from "../../lib/SafeMath.sol";

// Mock contract implementation of KyberNetworkProxy, where token can only be traded against WETH for simplicity.
// Adapted from Argent mock Kyber implementation
contract KyberNetworkProxyMock {

    using SafeMath for uint256;

    struct Token {
        bool exists;
        uint256 rate;
        uint256 decimals;
    }

    mapping (address => Token) public tokens;
    address public mockWethAddress;
    address owner;

    constructor(
        address _mockWethAddress
    ) public {
        mockWethAddress = _mockWethAddress;
        owner = msg.sender;
    }

    /**
     * Adds a tradable token to the Kyber instance
     *
     * @param _token        The token to add
     * @param _rate         The rate for the token as 1 TOKN = (rate/10**18) ETH
     * @param _decimals     The number of decimals for the token
     */
    function addToken(ERC20 _token, uint256 _rate, uint256 _decimals) public {
        require(msg.sender == owner, "KyberNetwork: unauthorized");
        tokens[address(_token)] = Token({exists: true, rate: _rate, decimals: _decimals});
    }

    function getExpectedRate(
        address _src,
        address _dest,
        uint256 _srcQty
    )
        public
        view
        returns (uint256 expectedRate, uint256 slippageRate)
    {
        _srcQty; // Used to silence compiler warnings

        if (_src == mockWethAddress) {
            expectedRate = 10**36 / tokens[_dest].rate;
            slippageRate = expectedRate;
        } else if (_dest == mockWethAddress) {
            expectedRate = tokens[_src].rate;
            slippageRate = expectedRate;
        } else {
            revert("KyberNetwork: Unknown token pair");
        }
    }

    function trade(
        ERC20 _src,
        uint _srcAmount,
        ERC20 _dest,
        address _destAddress,
        uint _maxDestAmount,
        uint /* _minConversionRate */,
        address /* _walletId */
    )
        public
        payable
        returns(uint destAmount)
    {
        uint expectedRate;
        uint srcAmount;
        if (address(_src) == mockWethAddress) {
            expectedRate = 10**36 / tokens[address(_dest)].rate;
            destAmount = expectedRate.mul(_srcAmount).div(10**(36 - tokens[address(_dest)].decimals));
            if (destAmount > _maxDestAmount) {
                destAmount = _maxDestAmount;
                srcAmount = _maxDestAmount.mul(10**(36 - tokens[address(_dest)].decimals)).div(expectedRate);
            } else {
                srcAmount = _srcAmount;
            }
            require(_src.transferFrom(msg.sender, address(this), srcAmount), "KyberNetwork: not enough WETH provided");
            require(ERC20(_dest).transfer(_destAddress, destAmount), "KyberNetwork: ERC20 transfer failed");
        } else if (address(_dest) == mockWethAddress) {
            expectedRate = tokens[address(_src)].rate;
            destAmount = expectedRate.mul(_srcAmount).div(10**tokens[address(_src)].decimals);
            if (destAmount > _maxDestAmount) {
                destAmount = _maxDestAmount;
                srcAmount = _maxDestAmount.mul(10**tokens[address(_src)].decimals).div(expectedRate);
            } else {
                srcAmount = _srcAmount;
            }
            require(_src.transferFrom(msg.sender, address(this), srcAmount), "KyberNetwork: not enough ERC20 provided");
            require(_dest.transfer(_destAddress, destAmount), "KyberNetwork: not enough WETH transferred back");
        } else {
            revert("KyberNetwork: Unknown token pair");
        }
    }
}