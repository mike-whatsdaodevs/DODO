// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


/**
 * @title IWrapAdapter
 * @author Set Protocol
 *
 */
interface IWrapAdapter {

    function ETH_TOKEN_ADDRESS() external view returns (address);

    function getWrapCallData(
        address _underlyingToken,
        address _wrappedToken,
        uint256 _underlyingUnits
    ) external view returns (address _subject, uint256 _value, bytes memory _calldata);

    function getUnwrapCallData(
        address _underlyingToken,
        address _wrappedToken,
        uint256 _wrappedTokenUnits
    ) external view returns (address _subject, uint256 _value, bytes memory _calldata);

    function getSpenderAddress(address _underlyingToken, address _wrappedToken) external view returns(address);
}