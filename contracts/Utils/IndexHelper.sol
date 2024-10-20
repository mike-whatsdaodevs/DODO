// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;
import {IIndex} from "../interfaces/IIndex.sol";
import {Enum} from "../libraries/Enum.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IFilter} from "../interfaces/IFilter.sol";
import {IIndexGas} from "../interfaces/IIndexGas.sol";

contract IndexHelper {

    IFilter public filter;

    constructor(address _filter) {
        filter = IFilter(_filter);
    }

    modifier onlyOperator(address indexAddress) {
        require(IFilter(filter).indexManagers(indexAddress, msg.sender), "E: caller is not allowed");
        _;
    }

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

    function changeIndexTokens(
        address indexAddress, 
        address[] memory addTokens, 
        address[] memory removedTokens
    ) external onlyOperator(indexAddress) {
        filter.addIndexTokens(indexAddress, addTokens);
        filter.removeIndexTokens(indexAddress, removedTokens);
    }

    function switchPositions(
        address indexAddress, 
        bytes calldata data,
        uint256[] memory positionIds,
        address removedToken,
        address addToken
    ) external onlyOperator(indexAddress) {
        uint256[][] memory positionArr = new uint256[][](1);
        bytes[] memory dataArr = new bytes[](1);
        dataArr[0] = data;
        IIndex(indexAddress).swapMultiCall(positionArr, dataArr);
        IIndex(indexAddress).setPositionsSwithBalance(
            removedToken, 
            addToken, 
            positionIds
        );
    }

    function changeIndexAndSwitch(
        address indexAddress, 
        bytes calldata data,
        address[] memory removedTokens,
        address[] memory addTokens
    ) external onlyOperator(indexAddress) {
        filter.addIndexTokens(indexAddress, addTokens);
        filter.removeIndexTokens(indexAddress, removedTokens);
        
        uint256[][] memory positionArr = new uint256[][](1);
        bytes[] memory dataArr = new bytes[](1);
        dataArr[0] = data;
        IIndex(indexAddress).swapMultiCall(positionArr, dataArr);
       
    }

    function sellAndWithdraw(
        address indexAddress,
        uint256[][] memory positionIdsArray, 
        bytes[] calldata data, 
        uint256[] calldata positionIds
    ) external onlyOperator(indexAddress) {
        IIndex(indexAddress).swapAndSet(positionIdsArray, data);
        /// IIndex(indexAddress).withdraw(positionId);
        _batchWithdraw(indexAddress, positionIds);
    }

    function getBasefee(address indexAddress) external view returns (uint256) {
        return IIndexGas(indexAddress).basefee();
    }

    function getGasUsedWithBaseFee(address indexAddress, uint256 gasUsed) external view returns (uint256) {
        return gasUsed * IIndexGas(indexAddress).basefee();
    }

    function usdtValue(address indexAddress, uint256 gas) external view returns (uint256) {
        return IIndexGas(indexAddress).gasExchageUnderlying(gas);
    }

    //// gas 
    function getPositionGasUsedValue(address indexAddress, uint256 positionId) external view returns (uint256 gasUsed, uint256 usdtValue) {
        bool isDynamic = IIndex(indexAddress).isDynamic();

        if(isDynamic) {
            gasUsed = IIndexGas(indexAddress).calcuPositionGasUsed(positionId);
        } else {
            gasUsed = IIndexGas(indexAddress).staticGasUsed();
        }

        uint256 basefee = IIndexGas(indexAddress).basefee();

        usdtValue = IIndexGas(indexAddress).gasExchageUnderlying(gasUsed * basefee);
    }


    function _batchWithdraw(address indexAddress, uint256[] calldata positionIds) internal {
        uint256 length = positionIds.length;
        for(uint256 i; i < length ;) {
            IIndex(indexAddress).withdraw(positionIds[i]);
            unchecked {
                ++ i;
            }
        }
    } 

    function batchWithdraw(address indexAddress, uint256[] calldata positionIds) external onlyOperator(indexAddress) {
        _batchWithdraw(indexAddress, positionIds);
    }
}
