// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IStakingAdapter
 * @author Set Protocol
 *
 */
interface IStakingAdapter {

    function getSpenderAddress(address _stakingContract) external view returns(address);

    function getStakeCallData(
        address _stakingContract,
        uint256 _notionalAmount
    )
        external
        view 
        returns(address, uint256, bytes memory);

    function getUnstakeCallData(
        address _stakingContract,
        uint256 _notionalAmount
    )
        external
        view 
        returns(address, uint256, bytes memory);
}