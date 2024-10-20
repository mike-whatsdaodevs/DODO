// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {IIndexGas} from "../interfaces/IIndexGas.sol";

contract IndexGas is IIndexGas {

    using SafeMath for uint256;

    bytes32 public constant KEY_STORE_LOCK = keccak256("KEY_STORE_LOCK");
    /// gas
    uint256 public gasUsed;
    uint256 public lastGasUsed;
    uint256 public averageGasUsed;
    uint256 public override staticGasUsed;
    uint256 public exchangePrice;
    address public gasFeeRecipient;
    uint256 public override basefee;

    struct GasUsedAverage {
        uint256 created;
        uint256 closed;
    }
    mapping(uint256 => GasUsedAverage) public positionsGasUsedAverage;

    function calcuAverageGasUsed(uint256 activePosition) internal returns (uint256) {
        uint256 gas = gasUsed.sub(lastGasUsed);
        uint256 currentAverage = activePosition == 0 ? gas : gas.div(activePosition);
        averageGasUsed += currentAverage;
        lastGasUsed = gasUsed;
    }

    function initPositionGasUsedAverage(uint256 positionId) internal {
        positionsGasUsedAverage[positionId].created = averageGasUsed; 
    }

    function closedPositionGasUsedAverage(uint256 positionId, uint256 activePosition) internal {
        if (! isLocked()) {
            calcuAverageGasUsed(activePosition);
            lock();
        }
        positionsGasUsedAverage[positionId].closed = averageGasUsed;
    }

    function setExchangePrice(uint256 newExchangePrice) external {
        exchangePrice = newExchangePrice;
    }

    function setStaticGasUsed(uint256 staticGas) external {
        staticGasUsed = staticGas;
    }

    /// ((used * 2300) / 1E18) * 1E6 ;
    function gasExchageUnderlying(uint256 _gasUsed) public view override returns (uint256) {
        return (_gasUsed * exchangePrice).mul(1E6).div(1E18) ;
    }

    function setGasFeeRecipient(address recipient) internal {
        gasFeeRecipient = recipient;
    }

    function setBaseFee(uint256 newBaseFee) external {
        basefee = newBaseFee;
    }

    function calcuPositionGasUsed(uint256 positionId) public view override returns (uint256) {
        GasUsedAverage memory average = positionsGasUsedAverage[positionId];
        return average.closed - average.created;
    }

    function lock() internal {
        bytes32 lockFlag = KEY_STORE_LOCK;
        assembly ("memory-safe") {
            tstore(lockFlag, 1)
        }
    }

    function isLocked() internal view returns (bool locked) {
        bytes32 lockFlag = KEY_STORE_LOCK;
        assembly {
            locked := tload(lockFlag)
        }
    }

}
