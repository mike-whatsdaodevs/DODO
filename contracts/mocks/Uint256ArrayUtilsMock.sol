// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Uint256ArrayUtils } from "../lib/Uint256ArrayUtils.sol";


contract Uint256ArrayUtilsMock {
    using Uint256ArrayUtils for uint256[];

    function testExtend(uint256[] memory A, uint256[] memory B) external pure returns (uint256[] memory) {
        return A.extend(B);
    }
}