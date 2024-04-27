// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface IDODO {

    event CreateIndex(uint256 indexed indexId, address indexed indexAddress, uint256 timestamp);

    event CreatePosition(
        uint256 indexed indexId, 
        address indexed user, 
        uint256 indexed positionId,
        uint256 amount,
        uint256 fee,
        uint256 timestamp
    );

    event RequestLiquidation(
        uint256 indexed indexId, 
        uint256 indexed positionId, 
        address indexAddress,
        address user,
        uint256 timestamp
    );
}
