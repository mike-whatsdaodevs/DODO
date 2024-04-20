// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * Curve StableSwap ERC20 <-> ERC20 pool.
 */
interface IStableSwapPool {

    function exchange(
        int128 i,
        int128 j,
        uint256 dx,
        uint256 min_dy
    ) external payable returns (uint256);

    function coins(uint256) external view returns (address);
}
