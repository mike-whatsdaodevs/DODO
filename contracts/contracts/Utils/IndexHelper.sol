// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;
import {IIndex} from "../interfaces/IIndex.sol";
import {Enum} from "../libraries/Enum.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

    function batchGetIndexTokenBalance(
        address indexAddress,
        address[] calldata tokens
    ) external view returns(uint256[] memory balances) {
        uint256 length = tokens.length;
        balances = new uint256[](length);
        for (uint256 i; i < length; i ++) {
            balances[i] = IERC20(tokens[i]).balanceOf(indexAddress);
        }
    }

    function batchGetPositionTokenBalance(
        address indexAddress,
        uint256 positionId,
        address[] calldata tokens
    ) external view returns(uint256[] memory balances) {
        uint256 length = tokens.length;
        balances = new uint256[](length);
        for (uint256 i; i < length; i ++) {
            balances[i] = IIndex(indexAddress).positionBalance(positionId, tokens[i]);
        }
    }

    function batchGetPositionIdsByStatus(
        address indexAddress, 
        Enum.PositionStatus status
    ) external view returns (uint256[] memory positionIds) {
        uint256 currentPositionId = IIndex(indexAddress).positionId();
        positionIds = new uint256[](currentPositionId);

        uint counter;
        for (uint256 i; i < currentPositionId; i ++) {
            if(IIndex(indexAddress).positionStatus(i) == status) {
                positionIds[counter] = i;
                counter ++;
            }
        }
    }
}
