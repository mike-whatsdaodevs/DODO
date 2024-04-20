// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { BytesArrayUtils } from "../lib/BytesArrayUtils.sol";


contract BytesArrayUtilsMock {
    using BytesArrayUtils for bytes;

    function testToBool(bytes memory _bytes, uint256 _start) external pure returns (bool) {
        return _bytes.toBool(_start);
    }
}
