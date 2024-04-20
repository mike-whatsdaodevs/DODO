// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IKyberNetworkProxy {
    function getExpectedRate(
        address _src,
        address _dest,
        uint256 _srcQty
    )
        external
        view
        returns (uint256, uint256);

    function trade(
        address _src,
        uint256 _srcAmount,
        address _dest,
        address _destAddress,
        uint256 _maxDestAmount,
        uint256 _minConversionRate,
        address _referalFeeAddress
    )
        external
        payable
        returns (uint256);
}
