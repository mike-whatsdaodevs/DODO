// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ICErc20 } from "./ICErc20.sol";


/**
 * @title IComptroller
 * @author Set Protocol
 *
 * Interface for interacting with Compound Comptroller
 */
interface IComptroller {

    /**
     * @notice Add assets to be included in account liquidity calculation
     * @param cTokens The list of addresses of the cToken markets to be enabled
     * @return Success indicator for whether each corresponding market was entered
     */
    function enterMarkets(address[] memory cTokens) external returns (uint[] memory);

    /**
     * @notice Removes asset from sender's account liquidity calculation
     * @dev Sender must not have an outstanding borrow balance in the asset,
     *  or be providing neccessary collateral for an outstanding borrow.
     * @param cTokenAddress The address of the asset to be removed
     * @return Whether or not the account successfully exited the market
     */
    function exitMarket(address cTokenAddress) external returns (uint);

    function getAllMarkets() external view returns (ICErc20[] memory);

    function claimComp(address holder) external;

    function compAccrued(address holder) external view returns (uint);

    function getCompAddress() external view returns (address);
}