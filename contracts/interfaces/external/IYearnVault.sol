// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IYearnVault {
    function token() external view returns(address);
    function pricePerShare() external view returns(uint256);
}
