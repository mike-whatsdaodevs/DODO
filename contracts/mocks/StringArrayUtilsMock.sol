// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { StringArrayUtils } from "../lib/StringArrayUtils.sol";


contract StringArrayUtilsMock {
    using StringArrayUtils for string[];

    string[] public storageArray;

    function testIndexOf(string[] memory A, string memory a) external pure returns (uint256, bool) {
        return A.indexOf(a);
    }

    function testRemoveStorage(string memory a) external {
        storageArray.removeStorage(a);
    }

    function setStorageArray(string[] memory A) external {
        storageArray = A;
    }

    function getStorageArray() external view returns(string[] memory) {
        return storageArray;
    }
}
