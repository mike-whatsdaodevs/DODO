// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {Enum} from "../libraries/Enum.sol";

interface IIndex {

    struct ExactSwapParams {
        bytes path;
        address recipient;
        uint256 amountIn;
        uint256 amountOutMinimum;
    }

    event CreatedIndex(
        uint256 indexed id, 
        address indexed indexAddress,
        uint256 feeRate,
        string name,
        uint256 timestamp
    );

    event CreatePosition(
        uint256 indexed positionId,
        uint256 amount,
        uint128 currentIndex, 
        uint128 healthFactor,
        uint256 timestamp
    );

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

    function checkPositionOwner(
        uint256 positionId, 
        address ownerAddress
    ) external view returns (bool);

    function changePositionStatus(
        uint256 positionId, 
        Enum.PositionStatus status
    ) external;
}
