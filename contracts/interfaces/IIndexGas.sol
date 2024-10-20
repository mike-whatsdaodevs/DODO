// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

interface IIndexGas {

    function staticGasUsed() external view returns (uint256);
    function basefee() external view returns (uint256);

    /// ((used * 2300) / 1E18) * 1E6 ;
    function gasExchageUnderlying(uint256 _gasUsed) external view returns (uint256);

    function calcuPositionGasUsed(uint256 positionId) external view returns (uint256);
}
