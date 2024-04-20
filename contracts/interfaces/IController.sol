// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IPriceOracle } from "./IPriceOracle.sol";

interface IController {
    function addSet(address _setToken) external;
    function feeRecipient() external view returns(address);
    function getModuleFee(address _module, uint256 _feeType) external view returns(uint256);
    function isModule(address _module) external view returns(bool);
    function isSet(address _setToken) external view returns(bool);
    function isSystemContract(address _contractAddress) external view returns (bool);
    function resourceId(uint256 _id) external view returns(address);
    function getPriceOracle() external view returns(IPriceOracle);
}