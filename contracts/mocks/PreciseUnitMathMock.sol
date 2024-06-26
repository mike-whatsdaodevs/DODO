// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { PreciseUnitMath } from "../lib/PreciseUnitMath.sol";


contract PreciseUnitMathMock {
    using PreciseUnitMath for uint256;
    using PreciseUnitMath for int256;

    function preciseUnit() external pure returns(uint256) {
        return PreciseUnitMath.preciseUnit();
    }

    function preciseUnitInt() external pure returns(int256) {
        return PreciseUnitMath.preciseUnitInt();
    }

    function maxInt256() external pure returns(int256) {
        return PreciseUnitMath.maxInt256();
    }

    function minInt256() external pure returns(int256) {
        return PreciseUnitMath.minInt256();
    }

    function preciseMul(uint256 a, uint256 b) external pure returns(uint256) {
        return a.preciseMul(b);
    }

    function preciseMulInt(int256 a, int256 b) external pure returns(int256) {
        return a.preciseMul(b);
    }

    function preciseMulCeil(uint256 a, uint256 b) external pure returns(uint256) {
        return a.preciseMulCeil(b);
    }

    function preciseDiv(uint256 a, uint256 b) external pure returns(uint256) {
        return a.preciseDiv(b);
    }

    function preciseDiv(int256 a, int256 b) external pure returns(int256) {
        return a.preciseDiv(b);
    }

    function preciseDivCeil(uint256 a, uint256 b) external pure returns(uint256) {
        return a.preciseDivCeil(b);
    }

    function preciseDivCeilInt(int256 a, int256 b) external pure returns(int256) {
        return a.preciseDivCeil(b);
    }

    function divDown(int256 a, int256 b) external pure returns(int256) {
        return a.divDown(b);
    }

    function conservativePreciseMul(int256 a, int256 b) external pure returns(int256) {
        return a.conservativePreciseMul(b);
    }

    function conservativePreciseDiv(int256 a, int256 b) external pure returns(int256) {
        return a.conservativePreciseDiv(b);
    }

    function safePower(uint256 a, uint256 b) external pure returns(uint256) {
        return a.safePower(b);
    }

    function approximatelyEquals(uint256 a, uint256 b, uint256 range) external pure returns (bool) {
        return a.approximatelyEquals(b, range);
    }

    function abs(int256 a) external pure returns (uint256) {
        return a.abs();
    }

    function neg(int256 a) external pure returns (int256) {
        return a.neg();
    }
}
