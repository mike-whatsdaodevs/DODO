// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";

// Mock contract implementation of 1Inch
contract OneInchExchangeMock {

    using Math for uint256;

    address public mockReceiveToken;
    address public mockSendToken;
    uint256 public mockReceiveAmount;
    uint256 public mockSendAmount;
    // Address of SetToken which will send/receive token
    address public setTokenAddress;

    constructor(
        address _mockSendToken,
        address _mockReceiveToken,
        uint256 _mockSendAmount,
        uint256 _mockReceiveAmount
    ) public {
        mockSendToken = _mockSendToken;
        mockReceiveToken = _mockReceiveToken;
        mockSendAmount = _mockSendAmount;
        mockReceiveAmount = _mockReceiveAmount;
    }

    // Initialize SetToken address which will send/receive tokens for the trade
    function addSetTokenAddress(address _setTokenAddress) external {
        setTokenAddress = _setTokenAddress;
    }

    function updateSendAmount(uint256 _newSendAmount) external {
        mockSendAmount = _newSendAmount;
    }

    function updateReceiveAmount(uint256 _newReceiveAmount) external {
        mockReceiveAmount = _newReceiveAmount;
    }

    // Conform to 1Inch Swap interface
    function swap(
        address _fromToken,
        address _toToken,
        uint256 _fromTokenAmount,
        uint256 _minReturnAmount,
        uint256 _guaranteedAmount,
        address payable _referrer,
        address[] calldata _callAddresses,
        bytes calldata _callDataConcat,
        uint256[] calldata _starts,
        uint256[] calldata _gasLimitsAndValues
    )
        external
        payable
        returns (uint256 returnAmount)
    {
        require(ERC20(mockSendToken).transferFrom(setTokenAddress, address(this), mockSendAmount), "ERC20 TransferFrom failed");
        require(ERC20(mockReceiveToken).transfer(setTokenAddress, mockReceiveAmount), "ERC20 transfer failed");

        // Used to silence compiler warnings
        _fromToken;
        _toToken;
        _fromTokenAmount;
        _minReturnAmount;
        _guaranteedAmount;
        _referrer;
        _callAddresses;
        _callDataConcat;
        _starts;
        _gasLimitsAndValues;

        return mockReceiveAmount;
    }
}