// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;
import {IIndex} from "../interfaces/IIndex.sol";
import {Enum} from "../libraries/Enum.sol";

contract IndexHelper {

    constructor() {}

    function batchGetPositionStatus(
        address indexAddress, 
        uint256[] memory positionIds
    ) external view returns (Enum.PositionStatus[] memory positionStatusArray) {
        uint256 length = positionIds.length;
        positionStatusArray = new Enum.PositionStatus[](length);
        for (uint256 i; i < length; i ++) {
            positionStatusArray[i] = IIndex(indexAddress).positionStatus(positionIds[i]);
        }
    }

   
}
