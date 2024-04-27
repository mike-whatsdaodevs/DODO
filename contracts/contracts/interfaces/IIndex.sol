// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {Enum} from "../libraries/Enum.sol";

interface IIndex {

    function feeRate() external view returns (uint256);

    function addIndexTokens(address[] memory addrs) external;

    function manageAllowedToken(address token, bool status) external;

    function removeIndexTokens(address[] memory addrs) external;

    function createPosition(
        address initialOwner, 
        uint256 amount,
        uint128 currentIndex,
        uint128 healthFactor
    ) external returns (uint256);
}
