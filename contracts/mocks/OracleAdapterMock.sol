// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";

import { IOracle } from "../interfaces/IOracle.sol";

contract OracleAdapterMock {

    uint256 public dummyPrice;
    address public asset;

    constructor(address _asset, uint256 _dummyPrice)
        public
    { dummyPrice = _dummyPrice; asset = _asset; }

    function getPrice(address _assetOne, address _assetTwo)
        external
        view
        returns (bool, uint256)
    {
        _assetTwo; // Used to silence compiler warnings

        if (_assetOne == asset) {
            return (true, dummyPrice);
        } else {
            return (false, 0);
        }
    }
}