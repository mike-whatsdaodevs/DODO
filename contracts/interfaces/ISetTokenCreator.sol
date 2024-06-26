// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISetTokenCreator {
    function create(
        address[] memory _components,
        int256[] memory _units,
        address[] memory _modules,
        address _manager,
        string memory _name,
        string memory _symbol
    )
        external
        returns (address);
}
