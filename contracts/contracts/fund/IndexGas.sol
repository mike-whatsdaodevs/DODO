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
        uint256 currentAverage = gasUsed.div(activePosition);
        averageGasUsed = currentAverage;
        return currentAverage;
    }

    function initPositionGasUsedAverage(uint256 positionId) internal {
        GasUsedAverage memory initAverage = GasUsedAverage(averageGasUsed, 0);
        positionsGasUsedAverage[positionId] = initAverage; 
    }

    function closedPositionGasUsedAverage(uint256 positionId, uint256 currentAverage) internal {
        GasUsedAverage memory average = positionsGasUsedAverage[positionId];
        average.closed = currentAverage;
        positionsGasUsedAverage[positionId] = average;
    }

    function setExchangeRate(uint256 newExchangeRate) external {
        exchangeRate = newExchangeRate;
    }

    function setStaticGasUsed(uint256 staticGas) external {
        staticGasUsed = staticGas;
    }

    function gasExchageUnderlying(uint256 _gasUsed) internal view returns (uint256) {
        return _gasUsed * exchangeRate;
    }

    function setGasFeeRecipient(address recipient) external {
        gasFeeRecipient = recipient;
    }

    function calcuPositionGasUsed(uint256 positionId) internal returns (uint256) {
        GasUsedAverage memory average = positionsGasUsedAverage[positionId];
        delete positionsGasUsedAverage[positionId];
        return average.closed - average.created;
    }

}
