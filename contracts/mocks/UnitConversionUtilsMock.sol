// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { UnitConversionUtils } from "../lib/UnitConversionUtils.sol";

contract UnitConversionUtilsMock {
    using UnitConversionUtils for int256;
    using UnitConversionUtils for uint256;

    /* ============ External ============ */

    function testFromPreciseUnitToDecimalsUint(uint256 _amount, uint8 _decimals)
        public
        pure
        returns (uint256)
    {
        return _amount.fromPreciseUnitToDecimals(_decimals);
    }

    function testFromPreciseUnitToDecimalsInt(int256 _amount, uint8 _decimals)
        public
        pure
        returns (int256)
    {
        return _amount.fromPreciseUnitToDecimals(_decimals);
    }

    function testToPreciseUnitsFromDecimalsInt(int256 _amount, uint8 _decimals)
        public
        pure
        returns (int256)
    {
        return _amount.toPreciseUnitsFromDecimals(_decimals);
    }
}
