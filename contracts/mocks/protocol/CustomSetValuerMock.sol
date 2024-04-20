// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ISetValuer } from "../../interfaces/ISetValuer.sol";
import { ISetToken } from "../../interfaces/ISetToken.sol";

/**
 * @title CustomSetValuerMock
 * @author Set Protocol
 *
 * Contract that returns a mocked valuation for a set.
 */
contract CustomSetValuerMock is ISetValuer {
    /* ============ State Variables ============ */

    mapping (address => uint256) valuation;

    /* ============ External Functions ============ */
    function setValuation(address _quoteAsset, uint256 _valuation) external {
        valuation[_quoteAsset] = _valuation;
    }

    /**
     * Gets the valuation of a SetToken using data from the price oracle. Reverts
     * if no price exists for a component in the SetToken. Note: this works for external
     * positions and negative (debt) positions.
     *
     * Note: There is a risk that the valuation is off if airdrops aren't retrieved or
     * debt builds up via interest and its not reflected in the position
     *
     * @param _quoteAsset      Address of token to quote valuation in
     *
     * @return                 SetToken valuation in terms of quote asset in precise units 1e18
     */
    function calculateSetTokenValuation(ISetToken /* _setToken */, address _quoteAsset) external view override returns (uint256) {
        return valuation[_quoteAsset];
    }
}
