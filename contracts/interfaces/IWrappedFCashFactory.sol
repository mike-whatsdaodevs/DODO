// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IWrappedfCashFactory {
    function deployWrapper(uint16 currencyId, uint40 maturity) external returns(address);
    function computeAddress(uint16 currencyId, uint40 maturity) external view returns(address);
}


