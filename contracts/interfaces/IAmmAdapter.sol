// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IAmmAdapter
 * @author Set Protocol
 */
interface IAmmAdapter {

    function getProvideLiquidityCalldata(
        address _setToken,
        address _pool,
        address[] calldata _components,
        uint256[] calldata _maxTokensIn,
        uint256 _minLiquidity
    )
        external
        view
        returns (address _target, uint256 _value, bytes memory _calldata);

    function getProvideLiquiditySingleAssetCalldata(
        address _setToken,
        address _pool,
        address _component,
        uint256 _maxTokenIn,
        uint256 _minLiquidity
    ) external view returns (address _target, uint256 _value, bytes memory _calldata);

    function getRemoveLiquidityCalldata(
        address _setToken,
        address _pool,
        address[] calldata _components,
        uint256[] calldata _minTokensOut,
        uint256 _liquidity
    ) external view returns (address _target, uint256 _value, bytes memory _calldata);

    function getRemoveLiquiditySingleAssetCalldata(
        address _setToken,
        address _pool,
        address _component,
        uint256 _minTokenOut,
        uint256 _liquidity
    ) external view returns (address _target, uint256 _value, bytes memory _calldata);

    function getSpenderAddress(address _pool) external view returns(address);
    function isValidPool(address _pool, address[] memory _components) external view returns(bool);
}