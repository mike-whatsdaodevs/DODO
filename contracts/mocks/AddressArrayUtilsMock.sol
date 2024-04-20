// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { AddressArrayUtils } from "../lib/AddressArrayUtils.sol";


contract AddressArrayUtilsMock {
    using AddressArrayUtils for address[];

    address[] public storageArray;

    function testIndexOf(address[] memory A, address a) external pure returns (uint256, bool) {
        return A.indexOf(a);
    }

    function testContains(address[] memory A, address a) external pure returns (bool) {
        return A.contains(a);
    }

    function testHasDuplicate(address[] memory A) external pure returns (bool) {
        return A.hasDuplicate();
    }

    function testRemove(address[] memory A, address a) external pure returns (address[] memory) {
        return A.remove(a);
    }

    function testRemoveStorage(address a) external {
        storageArray.removeStorage(a);
    }

    function testPop(address[] memory A, uint256 index) external pure returns (address[] memory, address) {
        return A.pop(index);
    }

    function testValidatePairsWithArrayUint(address[] memory A, uint[] memory a) external pure {
        A.validatePairsWithArray(a);
    }

    function testValidatePairsWithArrayBool(address[] memory A, bool[] memory a) external pure {
        A.validatePairsWithArray(a);
    }

    function testValidatePairsWithArrayString(address[] memory A, string[] memory a) external pure {
        A.validatePairsWithArray(a);
    }

    function testValidatePairsWithArrayAddress(address[] memory A, address[] memory a) external pure {
        A.validatePairsWithArray(a);
    }

    function testValidatePairsWithArrayBytes(address[] memory A, bytes[] memory a) external pure {
        A.validatePairsWithArray(a);
    }

    function setStorageArray(address[] memory A) external {
        storageArray = A;
    }

    function getStorageArray() external view returns(address[] memory) {
        return storageArray;
    }
}
