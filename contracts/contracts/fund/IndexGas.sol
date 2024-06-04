// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract IndexGas {

    using SafeMath for uint256;
    /// gas
    uint256 public closedPositionCount;
    uint256 public gasUsed; 
    uint256 public staticIndexGasUsed;
    uint256 public exchangeRate;
    address public gasFeeRecipient;

    function addGasUsed(uint256 usedGas) internal {
        gasUsed += usedGas;
    } 


    function distributeGas(uint256 positionId) internal view returns (uint256) {
        uint256 activePosition = positionId.sub(closedPositionCount);
        return gasUsed.div(activePosition);
    }

    function setExchangeRate(uint256 newExchangeRate) external {
        exchangeRate =newExchangeRate;
    }

    function setGasFeeRecipient(address recipient) external {
        gasFeeRecipient = recipient;
    }

}
