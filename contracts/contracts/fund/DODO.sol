// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import { IDODO } from "../interfaces/IDODO.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { PaymentGateway } from "./PaymentGateway.sol";
import { IIndex } from "../interfaces/IIndex.sol";
import { Index } from "./Index.sol";
import { TransferHelper } from "../libraries/TransferHelper.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Enum} from "../libraries/Enum.sol";

contract DODO is PaymentGateway {
    using TransferHelper for address;
    using SafeMath for uint256;

    uint256 public id;
    address public underlyingToken;

    uint256 constant DENOMINATOR = 10000;

    mapping(uint256 => address) public indexMap;

    address[] indexList;

    constructor(address _weth, address _underlyingToken) PaymentGateway(_weth) {
        underlyingToken = _underlyingToken;
    }

    function idIncrease() private {
        id += 1;
    }

    function createIndex(
        string memory name, 
        address[] calldata allowedTokens
    ) external returns (uint256) {
        uint256 currentIndexId = id;
        Index index = new Index(currentIndexId, name);

        indexList.push(address(index));
        indexMap[currentIndexId] = address(index);

        index.addIndexTokens(allowedTokens);

        idIncrease();
    }

    function buy(
        uint256 indexId,
        uint256 amount,
        uint128 currentIndex, 
        uint128 healthFactor
    ) external returns (uint256 positionId) {
        address indexAddress = indexList[indexId];
        uint256 indexFeerate = IIndex(indexAddress).feeRate();

        uint256 fee = amount.mul(indexFeerate).div(DENOMINATOR);

        underlyingToken.safeTransferFrom(msg.sender, address(this), fee);

        uint256 amountWithoutFee = amount.sub(fee);
        underlyingToken.safeTransferFrom(msg.sender, indexAddress, amountWithoutFee);

        positionId = IIndex(indexAddress).createPosition(
            msg.sender, 
            amountWithoutFee,
            currentIndex,
            healthFactor
        );
    }

    function sell(uint256 positionId) external {

    }


    function _refundETH() private {
        if (address(this).balance > 0) payable(msg.sender).transfer(address(this).balance);
    }
}
