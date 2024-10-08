// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import { IDODO } from "../interfaces/IDODO.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IIndex, Enum } from "../interfaces/IIndex.sol";
import { Constants } from "../libraries/Constants.sol";
import { IndexProxy } from "./IndexProxy.sol";
import { TransferHelper } from "../libraries/TransferHelper.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Enum } from "../libraries/Enum.sol";
import { PositionSet } from "../libraries/PositionSet.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract DODOUpgradeable is IDODO, UUPSUpgradeable {
    using TransferHelper for address;
    using SafeMath for uint256;

    uint256 public id;
    address public constant underlyingToken = Constants.USDT;

    mapping(uint256 => address) public indexMap;

    address[] public indexList;

    address public indexImplement;

    constructor() {
        _disableInitializers();
    }

    function initialize(address _indexImplement) external initializer {
        indexImplement = _indexImplement;
    }

    function idIncrease() private {
        id += 1;
    }

    /**
     * @dev create index 
     * @param name: array of position id
     * @param allowedTokens: array of token address
     * @return uint256 index id
     */
    function createIndex(
        string memory name, 
        address[] calldata allowedTokens
    ) external returns (uint256) {
        uint256 currentIndexId = id;
        _checkName(name);

        bytes32 salt = keccak256(abi.encodePacked(currentIndexId));
        address index = address(new IndexProxy{salt: salt}(indexImplement, ""));

        indexList.push(index);
        indexMap[currentIndexId] = index;

        idIncrease();
        emit CreateIndex(currentIndexId, address(index), block.timestamp);
    }

    /**
     * @dev check index name
     * @param name: index name
     * 
     * Requirements:
     *  - large than 3 bytes
     *  - less than 17 bytes
     */
    function _checkName(string memory name) private pure{
        uint256 length = bytes(name).length;
        if(length < Constants.NAME_MIN_SIZE || length > Constants.NAME_MAX_SIZE) {
            revert("Name Error");
        }
    }

    /**
     * @dev buy position
     * @param indexId: index id 
     * @param amount: amount of underlying token
     * @param currentIndex current index value
     * @param healthFactor index health factor
     * @param expiration time
     * 
     * @return positionId
     */
    function buy(
        uint256 indexId,
        uint256 amount,
        uint128 currentIndex, 
        uint128 healthFactor,
        uint256 expiration
    ) external returns (uint256 positionId) {
        address indexAddress = indexList[indexId];
        uint256 indexFeerate = IIndex(indexAddress).feeRate();

        uint256 fee = amount.mul(indexFeerate).div(Constants.DENOMINATOR);

        underlyingToken.safeTransferFrom(msg.sender, address(this), fee);

        uint256 amountWithoutFee = amount.sub(fee);
        underlyingToken.safeTransferFrom(msg.sender, indexAddress, amountWithoutFee);

        positionId = IIndex(indexAddress).createPosition(
            msg.sender, 
            amountWithoutFee,
            currentIndex,
            healthFactor,
            expiration
        );

        emit CreatePosition(
            indexId, 
            msg.sender, 
            positionId,
            amount,
            fee,
            block.timestamp
        );
    }

    /**
     * @dev sell position
     * @param indexId: index id 
     * @param positionId position id
     * 
     * Requirements 
     *  - positionId is exists
     *  - caller is position owner
     */
    function sell(uint256 indexId, uint256 positionId) external {
        address indexAddress = indexList[indexId];
        bool isPositionOwner = IIndex(indexAddress).checkPositionOwner(positionId, msg.sender);

        if(! isPositionOwner) {
            return;
        }

        IIndex(indexAddress).changePositionStatus(
            positionId, 
            Enum.PositionStatus.REQUEST_LIQUIDATION
        );

        emit RequestLiquidation( 
            indexId, 
            positionId, 
            indexAddress,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @dev withdraw position fund
     * @param indexId: index id 
     * @param positionId position id
     * 
     * Requirements 
     *  - positionId is exists
     *  - caller is position owner
     *  - position status is sold / liquidatd
     */
    function withdrawPosition(uint256 indexId, uint256 positionId) external {
        address indexAddress = indexList[indexId];
        bool isPositionOwner = IIndex(indexAddress).checkPositionOwner(positionId, msg.sender);

        if(! isPositionOwner) {
            return;
        }

        uint256 amount = IIndex(indexAddress).withdraw(positionId, msg.sender);
        emit Withdraw(indexId, indexAddress, msg.sender, amount, block.timestamp);
    }

    /// uups interface
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        view
    { }

}