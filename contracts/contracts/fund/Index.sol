// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {IIndex} from "../interfaces/IIndex.sol";
import {PositionSet} from "../libraries/PositionSet.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "../../@openzeppelin/contracts/security/Pausable.sol";
import {Enum} from "../libraries/Enum.sol";
import {Constants} from "../libraries/Constants.sol";
import {TransferHelper } from "../libraries/TransferHelper.sol";
import {UniswapAdapter, ISwapRouter02} from "../libraries/UniswapAdapter.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Path} from "../libraries/Path.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Filter} from "./Filter.sol";

contract Index is IIndex, Ownable, Filter {

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

    mapping(bytes32 => SwapAmountInAndOut) public positionIdsHashList;

    /// index id
    uint256 public immutable id;

    //// position id
    uint256 public positionId;

    /// index name
    string public name;

    /// index fee rate
    uint256 public feeRate;

    /// index fee amount
    uint256 public feeAmount;

    /// operators
    mapping(address => bool) public operators;

    /// position balances
    /// positionId => token adress => balance
    mapping(uint256 => mapping(address => uint256)) public override positionBalance;

    constructor(
        uint indexId, 
        string memory indexName
    ) {
        operators[msg.sender] = true;
        id = indexId;
        name = indexName;
        feeRate = 10;

        emit CreatedIndex(id, address(this), feeRate, name, block.timestamp);
    }
   
    receive() external payable {}
   
    modifier onlyOperator() {
        require(! operators[msg.sender], "E: only operator allowed");
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
    function tokenBalance(address token) external view returns (uint256) {
        IERC20(token).balanceOf(address(this));
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
    function safeApprove(address token, address protocol) external {
        if(!isAllowedProtocols(protocol)) {
            revert();
        }

        if(! isAllowedToken(token)) {
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
    function changePositionStatus(uint256 positionId, Enum.PositionStatus status) external {
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
    ) external returns (uint256) {
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

        uint256 underlyingTokenAmount = IERC20(underlyingToken).balanceOf(address(this));

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
            tokenInBalance = tokenInBalance.add(balance);
        }
    }

    /**
     * @dev set position token balance
     * @param tokenIn: token address
     * @param tokenOut: token address
     * @param positionIds: array of position id
     */
    function setPositionsBalance(address tokenIn, address tokenOut, uint256[] memory positionIds, uint256 offset, uint256 size) external {
        uint256 length = positionIds.length;
        bytes32 hash = hashPositionIds(positionIds, tokenIn, tokenOut);
        SwapAmountInAndOut memory inAndOut = positionIdsHashList[hash];
        uint256 amount;
        for(uint256 i; i < length; ++i) {
            if(i < offset || i >= offset.add(size)) {
                continue;
            }
            uint256 positionId = positionIds[i];
            uint256 pBalance = positionBalance[positionIds[i]][tokenIn];
            amount = inAndOut.amountOut.mul(pBalance).div(inAndOut.amountIn);
            positionBalance[positionId][tokenIn] = 0;
            positionBalance[positionId][tokenOut] = amount;

            positionStatus[positionId] = tokenOut == underlyingToken 
                ? Enum.PositionStatus.SOLD 
                : Enum.PositionStatus.SPOT;
        }
        delete positionIdsHashList[hash];
    }

    /**
     * @dev swap tokens by uniswao v2
     * @param positionIds: array of position id
     * @param amountIn: amount to swap
     * @param amountOutMin: minimum amount to receive;
     * @param path: swap path
     * 
     * Requirements:
     *  - token in is allowed
     *  - token out is allowed
     * 
     * @return uint256
     */
    function swapPositionV2(
        uint256[] memory positionIds,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path
    ) public payable returns (uint256) {
        require(path.length >= 2, "PA6");

        (address tokenIn, address tokenOut) = (path[0], path[path.length - 1]);

        require(isAllowedToken(tokenIn), "E: token error");
        require(isAllowedToken(tokenOut), "E: token error");

        (uint256 tokenInBalance, uint256 positionCount) = getPositionsBalance(tokenIn, positionIds);
        require(amountIn <= tokenInBalance, "E: amount in is too large");

        uint256 amountOut = uniswapRouter.uniswapV2(amountIn, amountOutMin, path, msg.value);

        if(positionCount == 1) {
            positionBalance[positionId][tokenIn] = tokenInBalance.sub(amountIn);
            positionBalance[positionId][tokenOut] = positionBalance[positionId][tokenOut].add(amountOut);
        } else {

            bytes32 positionIdsHash = setPositionIdsHash(positionIds, tokenIn, tokenOut, amountIn, amountOut);
            emit PositionsSwap(0, positionCount, positionIdsHash, amountOut);
        }

        emit Swap(tokenIn, tokenOut, amountIn, amountOut, block.timestamp);

        return amountOut;
    }

    function setPositionIdsHash(
        uint256[] memory positionIds, 
        address tokenIn,
        address tokenOut,
        uint256 amountIn, 
        uint256 amountOut
    ) private returns (bytes32 positionIdsHash) {
        positionIdsHash = hashPositionIds(positionIds, tokenIn, tokenOut);
        SwapAmountInAndOut memory inAndout = positionIdsHashList[positionIdsHash];
        
        require(inAndout.amountIn == 0 && inAndout.amountOut == 0, "E: hash has set");
        positionIdsHashList[positionIdsHash] = SwapAmountInAndOut(amountIn, amountOut);
    }

    /**
     * @dev swap tokens by uniswao v3 single router
     * @param positionIds: array of position id
     * @param params: ISwapRouter02.ExactInputSingleParams
     * 
     * Requirements:
     *  - token in is allowed
     *  - token out is allowed
     * 
     * @return uint256
     */
    function swapPositionsV3Single(
        uint256[] memory positionIds,
        ISwapRouter02.ExactInputSingleParams calldata params
    ) external payable returns (uint256) {
        require(isAllowedToken(params.tokenIn), "E: token error");
        require(isAllowedToken(params.tokenOut), "E: token error");

        (uint256 tokenInBalance, uint256 positionCount) = getPositionsBalance(params.tokenIn, positionIds);
        
        require(params.amountIn <= tokenInBalance, "E: amount in is too large");

        require(params.recipient == address(this), "E: recipient error");

        uint256 amountOut = uniswapRouter.uniswapV3Single(params, msg.value);

        if(positionCount == 1) {
            positionBalance[positionId][params.tokenIn] = tokenInBalance.sub(params.amountIn);
            
            uint256 tokenOutBalance = positionBalance[positionId][params.tokenOut];
            positionBalance[positionId][params.tokenOut] = tokenOutBalance.add(amountOut);
        } else {
            bytes32 positionIdsHash = setPositionIdsHash(
                positionIds, 
                params.tokenIn, 
                params.tokenOut, 
                params.amountIn, 
                amountOut
            );

            emit PositionsSwap(0, positionCount, positionIdsHash, amountOut);
        }

        emit Swap(params.tokenIn, params.tokenOut, params.amountIn, amountOut, block.timestamp);

        return amountOut;
    }

    /**
     * @dev swap tokens by uniswao v3 multi router
     * @param positionIds: array of position id
     * @param params: ISwapRouter02.ExactInputParams
     * 
     * Requirements:
     *  - token in is allowed
     *  - token out is allowed
     * 
     * @return uint256
     */
    function swapPositionsV3ExactInput(
        uint256[] memory positionIds,
        ISwapRouter02.ExactInputParams calldata params
    ) external payable returns (uint256) {
        (address tokenIn, address tokenOut) = params.path.decode();

        require(isAllowedToken(tokenIn), "E: token error");
        require(isAllowedToken(tokenOut), "E: token error");
        require(params.recipient == address(this), "E: recipient error");

        (uint256 tokenInBalance, uint256 positionCount) = getPositionsBalance(tokenIn, positionIds);
        require(params.amountIn <= tokenInBalance, "E: amount in is too large");

        uint256 amountOut = uniswapRouter.uniswapV3(params, msg.value);

        if(positionCount == 1) {
            positionBalance[positionId][tokenIn] = tokenInBalance.sub(params.amountIn);
            
            uint256 tokenOutBalance = positionBalance[positionId][tokenOut];
            positionBalance[positionId][tokenOut] = tokenOutBalance.add(amountOut);

            positionStatus[positionId] = tokenOut == underlyingToken 
                ? Enum.PositionStatus.SOLD 
                : Enum.PositionStatus.SPOT;
        } else {
            bytes32 positionIdsHash = setPositionIdsHash(
                positionIds, 
                tokenIn, 
                tokenOut, 
                params.amountIn, 
                amountOut
            );
            emit PositionsSwap(0, positionCount, positionIdsHash, amountOut);
        }

        emit Swap(tokenIn, tokenOut, params.amountIn, amountOut, block.timestamp);

        return amountOut;
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
    function swapMultiCall(uint256[][] memory positionIdsArray, bytes[] calldata data) external payable  {
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
                amountInArr[i], 
                amountOut
            );
            emit PositionsSwap(i, positionIdsArray[i].length, positionIdsHash, amountOut);
        }
    }
    
    /**
     * @dev swap tokens by protocol
     * @param protocol : protocol address
     * @param data: calldata for swap
     * Requirements
     * - protocol is allowned
     */
    function swapTokens(address protocol, bytes calldata data) external payable {
        require(data.length > 3, "E: data error");
        if(isAllowedProtocols(protocol)) {
            revert("protocol not support");
        }
        uint256 value = msg.value;
        (bytes4 selector, bytes calldata params) = _decodeCalldata(data);
        // execute first to analyse result
        if (protocol == Constants.WETH9) {
            // weth9 deposit/withdraw
            require(selector == 0xd0e30db0 || selector == 0x2e1a7d4d, "PA2");
        } else if (protocol == uniswapRouter) {
            _checkSingleSwapCall(selector, params);
        } else {
            revert();
        }

        protocol.functionCallWithValue(data, value);

    }

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
    ) private view returns (address tokenIn, address tokenOut, uint256 amountIn) {
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
            revert("PA2");
        }

        require(isAllowedToken(tokenIn), "E: token error");
        require(isAllowedToken(tokenOut), "E: token error");
        require(recipient == address(this), "E: recipient error");
    }

    function _refundETH() private {
        if (address(this).balance > 0) payable(msg.sender).transfer(address(this).balance);
    }

    /// @dev manage fee rate
    function manageFeeRate(uint256 newFeeRate) external {
        require(newFeeRate > 0, "E: error");

        emit ChangeFeeRate(address(this), feeRate, newFeeRate, block.timestamp);
        feeRate = newFeeRate;
    }

    /// set benchmark
    function setBenchmark(address[] memory tokens, uint256[] memory prices) external {
        uint256 length = tokens.length;
        for(uint256 i; i < length; i++) {
            benchmark[tokens[i]] = prices[i];
        }

        emit SetBenchMark(tokens, prices, block.timestamp);
    }

    /**
     * @dev withdraw position token
     * @param positionId : position id
     * @param recipient: address
     * Requirements
     * - position id is exist
     * - currentStatus large than REQUEST_LIQUIDATION
     * - position owner id transaction caller
     */
    function withdraw(uint256 positionId, address recipient) external returns (uint256 amount) {
        (PositionSet.Position memory position, bool isExist) = getPositionById(positionId);
        if(! isExist) {
            revert();
        }

        Enum.PositionStatus currentStatus = positionStatus[positionId];
        /// must large REQUEST_LIQUIDATION
        if(Enum.PositionStatus.SOLD != currentStatus) {
            revert();
        }

        if(position.owner != tx.origin) {
            revert();
        }

        amount = positionBalance[positionId][underlyingToken];
        
        underlyingToken.safeTransfer(recipient, amount);

        emit Withdraw(positionId, tx.origin, amount, block.timestamp);
    }

    /**
     * @dev manage index operator
     * 
     * @param operator: operator address
     */
    function manageOperator(address operator, bool status) external {
        operators[operator] = status;
    }
}
