// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract IndexGas {

    using SafeMath for uint256;
    /// gas
    uint256 public gasUsed; 
    uint256 public averageGasUsed;
    uint256 public staticGasUsed;
    uint256 public exchangeRate;
    address public gasFeeRecipient;

    struct GasUsedAverage {
        uint256 created;
        uint256 closed;
    }
    mapping(uint256 => GasUsedAverage) public positionsGasUsedAverage;

    function calcuAverageGasUsed(uint256 activePosition) internal returns (uint256) {
        uint256 currentAverage = activePosition == 0 ? gasUsed : gasUsed.div(activePosition);
        averageGasUsed += currentAverage;
    }

    function initPositionGasUsedAverage(uint256 positionId) internal {
        positionsGasUsedAverage[positionId].created = averageGasUsed; 
    }

    function closedPositionGasUsedAverage(uint256 positionId) internal {
        positionsGasUsedAverage[positionId].closed = averageGasUsed;
    }

    function setExchangeRate(uint256 newExchangeRate) external {
        exchangeRate = newExchangeRate;
    }

    function setStaticGasUsed(uint256 staticGas) external {
        staticGasUsed = staticGas;
    }

    function gasExchageUnderlying(uint256 _gasUsed) internal view returns (uint256) {
        return (_gasUsed * exchangeRate).div(1E18) ;
    }

    function setGasFeeRecipient(address recipient) external {
        gasFeeRecipient = recipient;
    }

    function calcuPositionGasUsed(uint256 positionId) public returns (uint256) {
        GasUsedAverage memory average = positionsGasUsedAverage[positionId];
        return average.closed - average.created;
    }

}
