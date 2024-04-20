// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OracleMock {
    uint256 public price;

    constructor(uint256 _startingPrice) public {
        price = _startingPrice;
    }

    /* ============ External Functions ============ */
    function updatePrice(uint256 _newPrice) external {
        price = _newPrice;
    }

    /**
     * Returns the queried data from an oracle returning uint256
     *
     * @return  Current price of asset represented in uint256
     */
    function read() external view returns (uint256) {
        return price;
    }
}