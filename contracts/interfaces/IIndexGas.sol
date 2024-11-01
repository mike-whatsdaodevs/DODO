// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

interface IIndexGas {

    struct GasUsedAverage {
        uint256 created;
        uint256 closed;
    }

    function staticGasUsed() external view returns (uint256);
    function basefee() external view returns (uint256);

    /// ((used * 2300) / 1E18) * 1E6 ;
    function gasExchageUnderlying(uint256 _gasUsed) external view returns (uint256);

    function calcuPositionGasUsed(uint256 positionId) external view returns (uint256);

    function getGasUsedAverage(uint256 positionId) external view returns (GasUsedAverage memory);

    function averageGasUsed() external view returns (uint256);
}
