// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0 || ^0.8.0;

import { FixedPoint96 } from "@uniswap/v3-core/contracts/libraries/FixedPoint96.sol";
import { FullMath } from "@uniswap/v3-core/contracts/libraries/FullMath.sol";

import { PreciseUnitMath } from "../../../lib/PreciseUnitMath.sol";

/**
 * @title UniswapV3Math
 * @author Set Protocol
 *
 * Helper functions for managing UniswapV3 math.
 */
library UniswapV3Math {

    /**
     * @dev Converts a UniswapV3 sqrtPriceX96 value to a priceX96 value. This method is borrowed from
     * PerpProtocol's `lushan` repo, in lib/PerpMath.
     *
     * For more info about the sqrtPriceX96 format see:
     * https://docs.uniswap.org/sdk/guides/fetching-prices#understanding-sqrtprice
     *
     * @param _sqrtPriceX96     Square root of a UniswapV3 encoded fixed-point pool price.
     * @return                  _sqrtPriceX96 converted to a priceX96 value
     */
    function formatSqrtPriceX96ToPriceX96(uint160 _sqrtPriceX96) internal pure returns (uint256) {
        return FullMath.mulDiv(_sqrtPriceX96, _sqrtPriceX96, FixedPoint96.Q96);
    }

    /**
     * @dev Converts a UniswapV3 X96 format price into a PRECISE_UNIT price. This method is borrowed from
     * PerpProtocol's `lushan` repo, in lib/PerpMath
     *
     * For more info about the priceX96 format see:
     * https://docs.uniswap.org/sdk/guides/fetching-prices#understanding-sqrtprice
     *
     * @param _valueX96         UniswapV3 encoded fixed-point pool price
     * @return                  _priceX96 as a PRECISE_UNIT value
     */
    function formatX96ToX10_18(uint256 _valueX96) internal pure returns (uint256) {
        return FullMath.mulDiv(_valueX96, PreciseUnitMath.preciseUnit(), FixedPoint96.Q96);
    }
}
