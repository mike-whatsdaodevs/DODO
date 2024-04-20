// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { SafeMath } from "../../../lib/SafeMath.sol";
import { PreciseUnitMath } from "../../../lib/PreciseUnitMath.sol";
import { ICErc20 } from "../../../interfaces/external/ICErc20.sol";
import { IOracle } from "../../../interfaces/IOracle.sol";


/**
 * @title CTokenOracle
 * @author Set Protocol
 *
 * Oracle built to return cToken price by multiplying the underlying asset price by Compound's stored exchange rate
 */
contract CTokenOracle is IOracle {
    using SafeMath for uint256;
    using PreciseUnitMath for uint256;

    /* ============ State Variables ============ */
    ICErc20 public immutable cToken;
    IOracle public immutable underlyingOracle; // Underlying token oracle
    string public dataDescription;

    // CToken Full Unit
    uint256 public immutable cTokenFullUnit;

    // Underlying Asset Full Unit
    uint256 public immutable underlyingFullUnit;

    /* ============ Constructor ============ */

    /*
     * @param  _cToken             The address of Compound Token
     * @param  _underlyingOracle   The address of the underlying oracle
     * @param  _cTokenFullUnit     The full unit of the Compound Token
     * @param  _underlyingFullUnit The full unit of the underlying asset
     * @param  _dataDescription    Human readable description of oracle
     */
    constructor(
        ICErc20 _cToken,
        IOracle _underlyingOracle,
        uint256 _cTokenFullUnit,
        uint256 _underlyingFullUnit,
        string memory _dataDescription
    )
        public
    {
        cToken = _cToken;
        cTokenFullUnit = _cTokenFullUnit;
        underlyingFullUnit = _underlyingFullUnit;
        underlyingOracle = _underlyingOracle;
        dataDescription = _dataDescription;
    }

    /**
     * Returns the price value of a full cToken denominated in underlyingOracle value
     * The underlying oracle is assumed to return a price of 18 decimal
     * for a single full token of the underlying asset. The derived price
     * of the cToken is then the price of a unit of underlying multiplied
     * by the exchangeRate, adjusted for decimal differences, and descaled.
     */
    function read()
        external
        override
        view
        returns (uint256)
    {
        // Retrieve the price of the underlying
        uint256 underlyingPrice = underlyingOracle.read();

        // Retrieve cToken underlying to cToken stored conversion rate
        uint256 conversionRate = cToken.exchangeRateStored();

        // Price of underlying is the price value / Token * conversion / scaling factor
        // Values need to be converted based on full unit quantities
        return underlyingPrice.preciseMul(conversionRate).mul(cTokenFullUnit).div(underlyingFullUnit);
    }
}
