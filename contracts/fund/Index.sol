// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {IIndex} from "../interfaces/IIndex.sol";
import {PositionSet} from "../libraries/PositionSet.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Enum} from "../libraries/Enum.sol";
import {Constants} from "../libraries/Constants.sol";
import {TransferHelper } from "../libraries/TransferHelper.sol";
import {UniswapAdapter, ISwapRouter02} from "../libraries/UniswapAdapter.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Path} from "../libraries/Path.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {IFilter} from "../interfaces/IFilter.sol";
import {IndexGas} from "./IndexGas.sol";

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract Index is IIndex, IndexGas, OwnableUpgradeable, UUPSUpgradeable, PausableUpgradeable {

    using TransferHelper for address;
    using Address for address;
    using Path for bytes; 
    using SafeMath for uint256;
    using UniswapAdapter for address;
    using PositionSet for PositionSet.Set;

    address public constant underlyingToken = Constants.USDT;
    address public constant uniswapRouter = Constants.UNISWAP_ROUTER;

    //// positons
    PositionSet.Set positionSet;

    /// benchmark price            
    mapping(address => uint256) public benchmark;

    /// position status
    mapping(uint256 => Enum.PositionStatus) public override positionStatus;
    mapping(bytes32 => uint256) public positionIdsHashList;

    /// position set counter
    mapping(uint256 => uint256) public counter;

    /// index id
    uint256 public id;

    bool public override isDynamic;

    //// position id
    uint256 public override positionId;
    /// position closed amount
    uint256 public closedPositionCount;

    /// index name
    string public name;

    /// index fee rate
    uint256 public feeRate;

    /// position balances
    /// positionId => token adress => balance
    mapping(uint256 => mapping(address => uint256)) public override positionBalance;

    mapping(address => mapping(address => uint256)) public tokenSwithAmount;
    uint256 public setSwithCounter;

    address public filter;

    address public THIS;

    /// gas
    constructor() {
        _disableInitializers();
    }

    function initialize(
        uint256 indexId, 
        bool isDynamicIndex,
        string memory indexName,
        address _filter
    ) external initializer {
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();

        id = indexId;
        isDynamic = isDynamicIndex;
        name = indexName;
        feeRate = 100;
        filter = _filter;
        THIS = address(this);
        emit CreatedIndex(id, THIS, feeRate, name, block.timestamp);
    }
   
    receive() external payable {}
   
    modifier onlyOperator() {
        require(IFilter(filter).indexManagers(THIS, msg.sender), "E: caller is not allowed");
        _;
    }

    /// index id increate
    function idIncrease() private {
        positionId += 1;
    }

    /**
     * @dev fund amount on index
     * 
     * @param token token address
     * @return amount
     */
    function tokenBalance(address token) public view returns (uint256) {
        return IERC20(token).balanceOf(THIS);
    }

    /**
     * @dev approve token allowance to protocol
     * @param token: token address
     * @param protocol: protocol address
     * 
     * Requirements:
     *  - token is allowed
     *  - protocol is allowed
     */
    function safeApprove(address token, address protocol) external onlyOperator {
        if(!IFilter(filter).isAllowedProtocols(protocol)) {
            revert();
        }

        if(!IFilter(filter).isAllowedToken(token)) {
            revert();
        }
        token.safeApprove(protocol, type(uint256).max);
    }

    /**
     * @dev change position status
     * @param positionId: id
     * @param status: new status
     * 
     * Requirements:
     *  - status large than current status
     */
    function changePositionStatus(uint256 positionId, Enum.PositionStatus status) external onlyOwner {
        Enum.PositionStatus currentStatus = positionStatus[positionId];
        if(status <= currentStatus) {
            revert();
        }
        positionStatus[positionId] = status;
    }

    /**
     * @dev check position owner
     * @param positionId: id
     * @param ownerAddress: owner address
     * 
     * Requirements:
     *  - positionId is exists
     * @return bool
     */
    function checkPositionOwner(uint256 positionId, address ownerAddress) external view returns (bool) {
        (PositionSet.Position memory position, bool isExist) = getPositionById(positionId);
        if(!isExist) {
            return false;
        }

        if(position.owner != ownerAddress) {
            return false;
        }
        return true;
    }

    /**
     * @dev get position info by position id
     * @param positionId: id
     * 
     * Requirements:
     *  - positionId is exist
     * 
     * @return position position info
     * @return isExist
     */
    function getPositionById(uint256 positionId) public view returns (
        PositionSet.Position memory position,
        bool isExist
    ) {
        uint256 index = positionSet.getIndex(positionId);
        if(index == 0) {
            return (position, isExist);
        }

        position = positionSet.at(index - 1);
        isExist = true;
    }

    /// hash positionIds
    function hashPositionIds(uint256[] memory positionIds, address tokenIn, address tokenOut) public pure returns (bytes32) {
        return keccak256(abi.encode(positionIds, tokenIn, tokenOut));
    }
    
     /**
     * @dev check position owner
     * @param orderId: order id of set
     * 
     * Requirements:
     *  - orderId is exists
     * @return position position info
     * @return isExist
     */
    function getPositionByOrderId(uint256 orderId) external view returns (
        PositionSet.Position memory position,
        bool isExist
    ) {
        uint256 length = positionSet.length();
        if(orderId > length) {
            return (position, isExist);
        }
        position = positionSet.at(orderId);
        isExist = true;
    }

    /**
     * @dev create position
     * @param initialOwner: postion owner
     * @param amount: postion amount
     * @param currentIndex: postion current index value
     * @param healthFactor: postion healthFactor
     * @param expiration: postion expiration time
     * 
     * Requirements:
     *  - caller must be dodo 
     *  - amount not be 0
     * 
     * @return uint256: position id
     */
    function createPosition(
        address initialOwner, 
        uint256 amount,
        uint128 currentIndex,
        uint128 healthFactor,
        uint256 expiration
    ) external onlyOperator returns (uint256) {
        uint256 internalGas = gasleft();
        uint256 currentPositionId = positionId;
        PositionSet.Position memory position = PositionSet.Position(
            currentPositionId, 
            initialOwner,
            amount,
            currentIndex,
            healthFactor,
            expiration
        );
        positionSet.add(position);

        uint256 underlyingTokenAmount = IERC20(underlyingToken).balanceOf(THIS);

        positionBalance[currentPositionId][underlyingToken] = amount;

        idIncrease();

        positionStatus[currentPositionId] = Enum.PositionStatus.CREATED;

        emit CreatePosition(
            currentPositionId,
            amount,
            currentIndex, 
            healthFactor,
            expiration,
            block.timestamp
        );

        initPositionGasUsedAverage(currentPositionId);

        gasUsed += internalGas - gasleft();

        return currentPositionId;
    }

    /**
     * @dev get position token balance
     * @param token: token address
     * @param positionIds: array of position id
     * 
     * @return tokenInBalance balance
     * @return length count of ids
     */
    function getPositionsBalance(address token, uint256[] memory positionIds) public view returns (
        uint256 tokenInBalance, 
        uint256 length
    ) {
        length = positionIds.length;
        for(uint256 i; i < length; ++i) {
            uint256 balance = positionBalance[positionIds[i]][token];
            if(balance == 0) { revert(); }
            tokenInBalance = tokenInBalance.add(balance);
        }
    }

    function positionBalanceCounter(uint256 positionId, uint256 indexTokensLength) private returns (bool) {
        counter[positionId] += 1;
        if(counter[positionId] >= indexTokensLength) {
            delete counter[positionId];
            return true;
        }
        return false;
    }

    /**
     * @dev set position token balance
     */
    function setPositionsBalance(SetBalnaceParams memory params) public onlyOperator {
        uint256 internalGas = gasleft();
        bytes32 hash = hashPositionIds(params.positionIds, params.tokenIn, params.tokenOut);
        uint256 amountOut = positionIdsHashList[hash];
        
        uint256 indexTokensLength = IFilter(filter).indexTokensLenth(THIS);
        (uint256 positionsBalance, uint256 length) = getPositionsBalance(params.tokenIn, params.positionIds);

        bool isBuy = params.tokenIn == underlyingToken;
        uint256 i;
        for(; i < length; ++i) {
            if(i < params.offset) {
                continue;
            }
            if(i >= params.offset.add(params.size)) {
                break;
            } 
            uint256 pid = params.positionIds[i];

            positionBalance[pid][params.tokenOut] += amountOut.
                mul(positionBalance[pid][params.tokenIn]).
                div(positionsBalance);

            {
                bool finishSet = positionBalanceCounter(pid, indexTokensLength);
                if(finishSet) {
                    positionStatus[pid] = isBuy ? Enum.PositionStatus.SPOT : Enum.PositionStatus.SOLD;
                    positionBalance[pid][params.tokenIn] = 0;
                } 
                if(!isBuy) {
                    positionBalance[pid][params.tokenIn] = 0;
                } 
            }
            if(positionStatus[pid] >= Enum.PositionStatus.SOLD) {
                closedPositionGasUsedAverage(pid, positionId.sub(closedPositionCount));
                closedPositionCount ++;
            }
        }
        if(i == length) {
            delete positionIdsHashList[hash];
        }
        gasUsed += internalGas - gasleft();
    }

    function setPositionsSwithBalance(address tokenBefore, address tokenAfter, uint256[] calldata positionIds) external onlyOperator {
        uint256 internalGas = gasleft();
        uint256 amountBefore = tokenSwithAmount[tokenBefore][tokenAfter];
        uint256 amountNow = tokenBalance(tokenAfter);
        uint256 length = positionIds.length;
        for(uint256 i; i < length; i ++) {
            uint256 pid = positionIds[i];
            uint256 beforeBalance = positionBalance[pid][tokenBefore];

            if(beforeBalance == 0) {
                continue;
            }
            positionBalance[pid][tokenAfter] = beforeBalance.mul(amountNow).div(amountBefore);
            positionBalance[pid][tokenBefore] = 0;
            setSwithCounter ++;
        }
        uint256 activePosition = positionId.sub(closedPositionCount);
        if(setSwithCounter == activePosition) {
            delete tokenSwithAmount[tokenBefore][tokenAfter];
            setSwithCounter = 0;
        }
        gasUsed += internalGas - gasleft();
    }

    function setPositionIdsHash(
        uint256[] memory positionIds, 
        address tokenIn,
        address tokenOut,
        uint256 amountOut
    ) private returns (bytes32 positionIdsHash) {
        positionIdsHash = hashPositionIds(positionIds, tokenIn, tokenOut);
        uint256 oldAmountOut = positionIdsHashList[positionIdsHash];
        
        require(oldAmountOut == 0, "E: hash has set");
        positionIdsHashList[positionIdsHash] = amountOut;
    }

    // /**
    //  * @dev swap tokens by uniswao v2
    //  * @param positionIds: array of position id
    //  * @param amountIn: amount to swap
    //  * @param amountOutMin: minimum amount to receive;
    //  * @param path: swap path
    //  * 
    //  * Requirements:
    //  *  - token in is allowed
    //  *  - token out is allowed
    //  * 
    //  * @return uint256
    //  */
    // function swapPositionV2(
    //     uint256[] memory positionIds,
    //     uint256 amountIn,
    //     uint256 amountOutMin,
    //     address[] calldata path
    // ) public payable returns (uint256) {
    //     require(path.length >= 2, "PA6");

    //     (address tokenIn, address tokenOut) = (path[0], path[path.length - 1]);
    //     (uint256 tokenInBalance, uint256 positionCount) = getPositionsBalance(tokenIn, positionIds);
    //     validateSwapParams(
    //         tokenIn, 
    //         tokenOut, 
    //         address(this), 
    //         amountIn, 
    //         tokenInBalance
    //     );

    //     uint256 amountOut = uniswapRouter.uniswapV2(amountIn, amountOutMin, path, msg.value);

    //     if(positionCount == 1) {
    //         positionBalance[positionId][tokenIn] = tokenInBalance.sub(amountIn);
    //         positionBalance[positionId][tokenOut] = positionBalance[positionId][tokenOut].add(amountOut);
    //     } else {

    //         bytes32 positionIdsHash = setPositionIdsHash(positionIds, tokenIn, tokenOut, amountOut);
    //         emit PositionsSwap(0, positionCount, positionIdsHash, amountOut);
    //     }

    //     emit Swap(tokenIn, tokenOut, amountIn, amountOut, block.timestamp);

    //     return amountOut;
    // }

    // /**
    //  * @dev swap tokens by uniswao v3 single router
    //  * @param positionIds: array of position id
    //  * @param params: ISwapRouter02.ExactInputSingleParams
    //  * 
    //  * Requirements:
    //  *  - token in is allowed
    //  *  - token out is allowed
    //  * 
    //  * @return uint256
    //  */
    // function swapPositionsV3Single(
    //     uint256[] memory positionIds,
    //     ISwapRouter02.ExactInputSingleParams calldata params
    // ) external payable returns (uint256) {
    //     (uint256 tokenInBalance, uint256 positionCount) = getPositionsBalance(params.tokenIn, positionIds);
    //     validateSwapParams(
    //         params.tokenIn, 
    //         params.tokenOut, 
    //         params.recipient, 
    //         params.amountIn, 
    //         tokenInBalance
    //     );

    //     uint256 amountOut = uniswapRouter.uniswapV3Single(params, msg.value);

    //     if(positionCount == 1) {
    //         positionBalance[positionId][params.tokenIn] = tokenInBalance.sub(params.amountIn);
            
    //         uint256 tokenOutBalance = positionBalance[positionId][params.tokenOut];
    //         positionBalance[positionId][params.tokenOut] = tokenOutBalance.add(amountOut);
    //     } else {
    //         bytes32 positionIdsHash = setPositionIdsHash(
    //             positionIds, 
    //             params.tokenIn, 
    //             params.tokenOut, 
    //             amountOut
    //         );

    //         emit PositionsSwap(0, positionCount, positionIdsHash, amountOut);
    //     }

    //     emit Swap(params.tokenIn, params.tokenOut, params.amountIn, amountOut, block.timestamp);

    //     return amountOut;
    // }

    // /**
    //  * @dev swap tokens by uniswao v3 multi router
    //  * @param positionIds: array of position id
    //  * @param params: ISwapRouter02.ExactInputParams
    //  * 
    //  * Requirements:
    //  *  - token in is allowed
    //  *  - token out is allowed
    //  * 
    //  * @return uint256
    //  */
    // function swapPositionsV3ExactInput(
    //     uint256[] memory positionIds,
    //     ISwapRouter02.ExactInputParams calldata params
    // ) external payable returns (uint256) {
    //     (address tokenIn, address tokenOut) = params.path.decode();

    //     (uint256 tokenInBalance, uint256 positionCount) = getPositionsBalance(tokenIn, positionIds);
    //     validateSwapParams(tokenIn, tokenOut, params.recipient, params.amountIn, tokenInBalance);

    //     uint256 amountOut = uniswapRouter.uniswapV3(params, msg.value);

    //     if(positionCount == 1) {
    //         positionBalance[positionId][tokenIn] = tokenInBalance.sub(params.amountIn);
            
    //         uint256 tokenOutBalance = positionBalance[positionId][tokenOut];
    //         positionBalance[positionId][tokenOut] = tokenOutBalance.add(amountOut);

    //         positionStatus[positionId] = tokenOut == underlyingToken 
    //             ? Enum.PositionStatus.SOLD 
    //             : Enum.PositionStatus.SPOT;
    //     } else {
    //         bytes32 positionIdsHash = setPositionIdsHash(
    //             positionIds, 
    //             tokenIn, 
    //             tokenOut, 
    //             amountOut
    //         );
    //         emit PositionsSwap(0, positionCount, positionIdsHash, amountOut);
    //     }

    //     emit Swap(tokenIn, tokenOut, params.amountIn, amountOut, block.timestamp);

    //     return amountOut;
    // }

    function validateSwapParams(
        address tokenIn, 
        address tokenOut, 
        address recipient, 
        uint256 amountIn,
        uint256 tokenInBalance
    ) private returns (uint256) {
        if(! IFilter(filter).isAllowedToken(tokenIn)) {
            revert TokenNotAllow(tokenIn);
        }

        if(! IFilter(filter).isAllowedToken(tokenOut)) {
            revert TokenNotAllow(tokenOut);
        }

        if(recipient != THIS) {
            revert RecipientNotAllow(recipient);
        }

        if(amountIn > tokenInBalance) {
            revert AmountInError(amountIn);
        }
    }

    function validateSwapParams(
        address tokenIn, 
        address tokenOut, 
        address recipient
    ) private returns (uint256) {
        if(! IFilter(filter).isAllowedToken(tokenIn)) {
            revert TokenNotAllow(tokenIn);
        }

        if(! IFilter(filter).isAllowedToken(tokenOut)) {
            revert TokenNotAllow(tokenOut);
        }

        if(recipient != THIS) {
            revert RecipientNotAllow(recipient);
        }
    }

    /// decode V3 swap path
    function decodePath(bytes calldata path) external view returns (address token0, address token1) {
        (token0, token1) = Path.decode(path);
    }   

    /// decode calldata
    function _decodeCalldata(bytes calldata data) private pure returns (bytes4 selector, bytes calldata params) {
        require(data.length > 3, "E: data error");        
        selector = bytes4(data[0: 4]);
        params = data[4:];
    }

    /**
     * @dev multi swap
     * @param data: array of swap calldata
     * 
     */
    function swapMultiCall(uint256[][] memory positionIdsArray, bytes[] calldata data) external payable onlyOperator {
        uint256 internalGas = gasleft();
        uint256 length = data.length;
        uint256[] memory amountInArr = new uint256[](length);
        address[] memory tokenInArr = new address[](length);
        address[] memory tokenOutArr = new address[](length);

        for(uint256 i; i < length; i ++) {
            (bytes4 selector, bytes memory params) = _decodeCalldata(data[i]);
            (tokenInArr[i], tokenOutArr[i], amountInArr[i]) = _checkSingleSwapCall(selector, params);
        }
        bytes[] memory results = uniswapRouter.uniMulticall(data, msg.value);
        for(uint256 i; i < length; i++) {
            uint256 amountOut = abi.decode(results[i], (uint256));

            if(positionIdsArray[i].length == 0) {
                tokenSwithAmount[tokenInArr[i]][tokenOutArr[i]] = amountInArr[i];

            } else {
                bytes32 positionIdsHash = setPositionIdsHash(
                    positionIdsArray[i], 
                    tokenInArr[i], 
                    tokenOutArr[i], 
                    amountOut
                );
                emit PositionsSwap(i, positionIdsArray[i].length, positionIdsHash, amountOut);

            }
        }
        gasUsed += internalGas - gasleft();
    }

    function swapAndSet(uint256[][] memory positionIdsArray, bytes[] calldata data) external payable onlyOperator {
        uint256 internalGas = gasleft();
        uint256 length = data.length;
        uint256[] memory amountInArr = new uint256[](length);
        address[] memory tokenInArr = new address[](length);
        address[] memory tokenOutArr = new address[](length);

        for(uint256 i; i < length; i ++) {
            (bytes4 selector, bytes memory params) = _decodeCalldata(data[i]);
            (tokenInArr[i], tokenOutArr[i], amountInArr[i]) = _checkSingleSwapCall(selector, params);
        }
        bytes[] memory results = uniswapRouter.uniMulticall(data, msg.value);
        for(uint256 i; i < length; i++) {
            uint256 amountOut = abi.decode(results[i], (uint256));
            bytes32 positionIdsHash = setPositionIdsHash(
                positionIdsArray[i], 
                tokenInArr[i], 
                tokenOutArr[i], 
                amountOut
            );

            SetBalnaceParams memory setParams = SetBalnaceParams(
                tokenInArr[i], 
                tokenOutArr[i],
                positionIdsArray[i],
                0,
                positionIdsArray[i].length  
            );
            setPositionsBalance(setParams);
        }
        gasUsed += internalGas - gasleft();
    }

    // /**
    //  * @dev swap tokens by protocol
    //  * @param protocol : protocol address
    //  * @param data: calldata for swap
    //  * Requirements
    //  * - protocol is allowned
    //  */
    // function swapTokens(address protocol, bytes calldata data) external payable {
    //     require(data.length > 3, "E: data error");
    //     if(!isAllowedProtocols(protocol)) {
    //         revert ProtocolNotAllowed(protocol);
    //     }

    //     (bytes4 selector, bytes calldata params) = _decodeCalldata(data);
    //     // execute first to analyse result
    //     if (protocol == Constants.WETH9) {
    //         // weth9 deposit/withdraw
    //         require(selector == 0xd0e30db0 || selector == 0x2e1a7d4d, "PA2");
    //     } else if (protocol == uniswapRouter) {
    //         _checkSingleSwapCall(selector, params);
    //     } else {
    //         revert("SELECTOR");
    //     }

    //     protocol.functionCallWithValue(data, msg.value);
    // }

    /**
     * @dev check every swap calldata
     * @param selector : calldata selector
     * @param params: calldata
     * Requirements
     * - token in is allowned
     * - token out is allowned
     * - recipient address is address(this)
     */
    function _checkSingleSwapCall(
        bytes4 selector,
        bytes memory params
    ) private returns (address tokenIn, address tokenOut, uint256 amountIn) {
        address recipient;
        if (selector == 0x04e45aaf || selector == 0x5023b4df) {
            // exactInputSingle/exactOutputSingle
            (tokenIn, tokenOut, , recipient, amountIn, , ) = abi.decode(params, (address,address,uint24,address,uint256,uint256,uint160));
        } else if (selector == 0xb858183f || selector == 0x09b81346) {
            // exactInput/exactOutput
            ExactSwapParams memory swap = abi.decode(params, (ExactSwapParams));
            (tokenIn, tokenOut) = swap.path.decode();
            recipient = swap.recipient;
            amountIn = swap.amountIn;
        } else if (selector == 0x472b43f3 || selector == 0x42712a67) {
            // swapExactTokensForTokens/swapTokensForExactTokens
            address [] memory path;
            (amountIn,,path, recipient) = abi.decode(params, (uint256,uint256,address[],address));
            require(path.length >= 2, "PA6");
            (tokenIn, tokenOut) = (path[0], path[path.length - 1]);
        } else {
            revert("SELECTOR");
        }

        validateSwapParams(tokenIn, tokenOut, recipient);
    }

    /// @dev manage fee rate
    function manageFeeRate(uint256 newFeeRate) external onlyOwner {
        require(newFeeRate > 0 && newFeeRate < Constants.DENOMINATOR, "E: Fee rate error");

        emit ChangeFeeRate(THIS, feeRate, newFeeRate, block.timestamp);
        feeRate = newFeeRate;
    }

    /// set benchmark
    function setBenchmark(address[] memory tokens, uint256[] memory prices) external onlyOwner {
        uint256 length = tokens.length;
        for(uint256 i; i < length; i++) {
            benchmark[tokens[i]] = prices[i];
        }

        emit SetBenchMark(tokens, prices, block.timestamp);
    }

    /**
     * @dev withdraw position token
     * @param positionId : position id
     * Requirements
     * - position id is exist
     * - currentStatus large than REQUEST_LIQUIDATION
     * - position owner id transaction caller
     */
    function withdraw(uint256 positionId) external onlyOperator returns (uint256 amount) {
        (PositionSet.Position memory position, bool isExist) = getPositionById(positionId);
        if(! isExist) {
            revert();
        }

        address recipient = position.owner;

        Enum.PositionStatus currentStatus = positionStatus[positionId];
        /// must large REQUEST_LIQUIDATION
        if(Enum.PositionStatus.SOLD != currentStatus) {
            revert();
        }

        uint256 positionGasUsed;
        if(isDynamic) {
            positionGasUsed = calcuPositionGasUsed(positionId);
        } else {
            positionGasUsed = staticGasUsed;
        }
        
        amount = positionBalance[positionId][underlyingToken];
       
        uint256 gasfee = gasExchageUnderlying(positionGasUsed * basefee);        
        uint256 platformFee = amount.mul(50).div(Constants.DENOMINATOR);
        platformFee = platformFee.add(gasfee);
        
        if(platformFee != 0) {

            //// gas fee exceed amount
            if(platformFee > amount) {
                platformFee = amount;
            }
            underlyingToken.safeTransfer(gasFeeRecipient, platformFee);
        }
        amount = amount.sub(platformFee);
        if(amount > 0) {
            underlyingToken.safeTransfer(recipient, amount.sub(platformFee));
        }

        positionBalance[positionId][underlyingToken] = 0;
        positionStatus[positionId] = Enum.PositionStatus.WITHDRAWN;

        emit Withdraw(positionId, tx.origin, amount, block.timestamp);
    }


    //// gas set
    function updateGasFeeRecipient(address recipient) external onlyOwner {
        setGasFeeRecipient(recipient);
    }

    function updateGasBasefee(uint256 newBaseFee) external onlyOwner {
        setBaseFee(newBaseFee);
    }

    function updateGasExchangePrice(uint256 newExchangePrice) external onlyOwner {
        setExchangePrice(newExchangePrice);
    }

    function updateGasStaticGasUsed(uint256 staticGas) external onlyOwner {
        setStaticGasUsed(staticGas);
    }

    /// force withdraw token balance
    function recovery(address token, address recipient) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(THIS);
        token.safeTransfer(recipient, balance);
        emit Withdraw(0, recipient, balance, block.timestamp);
    }
    
    /// uups interface
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        view
        onlyOwner
    { }
}
