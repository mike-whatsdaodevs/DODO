// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {IIndex} from "../interfaces/IIndex.sol";
import {PositionSet} from "../libraries/PositionSet.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "../../@openzeppelin/contracts/security/Pausable.sol";
import {Enum} from "../libraries/Enum.sol";
import {TransferHelper } from "../libraries/TransferHelper.sol";

import {UniswapAdapter, ISwapRouter02} from "../libraries/UniswapAdapter.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Path} from "../libraries/Path.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Filter} from "./Filter.sol";

contract Index is IIndex, Ownable, Filter {

    using TransferHelper for address;
    using Address for address;
    using Path for bytes; 
    using SafeMath for uint256;
    using UniswapAdapter for address;

    address public constant weth9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant underlyingToken = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
        /// eth 
    address public immutable uniswapRouter = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;

    using PositionSet for PositionSet.Set;

    //// positons
    PositionSet.Set positionSet;

    /// benchmark price 
    mapping(address => uint256) public benchmark;

    mapping(uint256 => Enum.PositionStatus) public positionStatus;

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

    /// 
    mapping(address => bool) public operators;

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

    function safeApprove(address token, address protocol) external {
        if(!isAllowedProtocols(protocol)) {
            revert();
        }

        if(! isAllowedToken(token)) {
            revert();
        }
        token.safeApprove(protocol, type(uint256).max);
    }

    function getPositionById(uint256 positionId) public view returns (
        PositionSet.Position memory position,
        bool isExist
    ) {
        uint256 index = positionSet.getIndex(positionId);
        if(index == 0) {
            return (position, isExist);
        }

        PositionSet.Position memory position = positionSet.at(index);
        isExist = true;
    }

    function changePositionStatus(uint256 positionId, Enum.PositionStatus status) external {
        Enum.PositionStatus currentStatus = positionStatus[positionId];
        if(status <= currentStatus) {
            revert();
        }
        positionStatus[positionId] = status;
    }

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
   
    function getPositionByIndex(uint256 indexId) external view returns (PositionSet.Position memory position) {
        uint256 length = positionSet.length();
        if(length > indexId) {
            return position;
        }
        position = positionSet.at(indexId);
    }

    /**
     * @dev create position
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

    function setPositionsBalance(address token, uint256[] memory positionIds, uint256[] memory values) external {
        uint256 length = positionIds.length;
        for(uint256 i; i < length; ++i) {
            positionBalance[positionIds[i]][token] = values[i];
        }
    }

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
            emit PositionsSwap(positionCount);
        }

        emit Swap(tokenIn, tokenOut, amountIn, amountOut, block.timestamp);

        return amountOut;
    }

    function swapPositionsV3Single(
        uint256[] memory positionIds,
        ISwapRouter02.ExactInputSingleParams calldata params
    ) external payable returns (uint256) {
        require(isAllowedToken(params.tokenIn), "E: token error");
        require(isAllowedToken(params.tokenOut), "E: token error");

        (uint256 tokenInBalance, uint256 positionCount) = getPositionsBalance(params.tokenIn, positionIds);
        if(params.amountIn > tokenInBalance) {
            revert();
        }
        require(params.recipient == address(this), "E: recipient error");

        uint256 amountOut = uniswapRouter.uniswapV3Single(params, msg.value);

        if(positionCount == 1) {
            positionBalance[positionId][params.tokenIn] = tokenInBalance.sub(tokenInBalance);
            
            uint256 tokenOutBalance = positionBalance[positionId][params.tokenOut];
            positionBalance[positionId][params.tokenOut] = tokenOutBalance.add(amountOut);
        } else {
            emit PositionsSwap(positionCount);
        }

        emit Swap(params.tokenIn, params.tokenOut, params.amountIn, amountOut, block.timestamp);

        return amountOut;
    }

    function swapPositionsV3ExactInput(
        uint256[] memory positionIds,
        ISwapRouter02.ExactInputParams calldata params
    ) external payable returns (uint256) {
        (address tokenIn, address tokenOut) = params.path.decode();

        require(isAllowedToken(tokenIn), "E: token error");
        require(isAllowedToken(tokenOut), "E: token error");
        require(params.recipient == address(this), "E: recipient error");

        (uint256 tokenInBalance, uint256 positionCount) = getPositionsBalance(tokenIn, positionIds);
        if(params.amountIn > tokenInBalance) {
            revert("balance error");
        }

        uint256 amountOut = uniswapRouter.uniswapV3(params, msg.value);

        if(positionCount == 1) {
            positionBalance[positionId][tokenIn] = tokenInBalance.sub(tokenInBalance);
            
            uint256 tokenOutBalance = positionBalance[positionId][tokenOut];
            positionBalance[positionId][tokenOut] = tokenOutBalance.add(amountOut);
        } else {
            emit PositionsSwap(positionCount);
        }

        emit Swap(tokenIn, tokenOut, params.amountIn, amountOut, block.timestamp);

        return amountOut;
    }

    function decodePath(bytes calldata path) external view returns (address token0, address token1) {
        (token0, token1) = Path.decode(path);
    }

    function _decodeCalldata(bytes calldata data) private pure returns (bytes4 selector, bytes memory params) {
        selector = bytes4(data[0: 4]);
        params = data[4:];
    }

    function swapTokens(address protocol, bytes calldata data) external payable {
        require(data.length > 3, "E: data error");
        if(isAllowedProtocols(protocol)) {
            revert();
        }
        uint256 value = msg.value;
        (bytes4 selector, bytes memory params) = _decodeCalldata(data);
        // execute first to analyse result
        if (protocol == weth9) {
            // weth9 deposit/withdraw
            require(selector == 0xd0e30db0 || selector == 0x2e1a7d4d, "PA2");
        } else if (protocol == uniswapRouter) {
            _analyseSwapCalls(selector, params, value);
        } else {
            revert();
        }

        protocol.functionCallWithValue(data, value);

    }

    function _isMultiCall(bytes4 selector) private pure returns (bool) {
        return selector == 0xac9650d8 || selector == 0x5ae401dc || selector == 0x1f0464d1;
    }

    function _analyseSwapCalls(bytes4 selector, bytes memory params, uint256 value) private view {
        bool isTokenInETH;
        bool isTokenOutETH;
        if (_isMultiCall(selector)) {
            revert();
            // (bytes4[] memory selectorArr, bytes[] memory paramsArr) = _decodeMultiCall(selector, params);
            // for (uint256 i = 0; i < selectorArr.length; i++) {
            //     (isTokenInETH, isTokenOutETH) = _checkSingleSwapCall(selectorArr[i], paramsArr[i], value);
            //     // if swap native ETH, must check multicall
            //     if (isTokenInETH) {
            //         // must call refundETH last
            //         require(selectorArr[selectorArr.length - 1] == 0x12210e8a, "PA3");
            //     }
            //     if (isTokenOutETH) {
            //         // must call unwrapWETH9 last
            //         require(selectorArr[selectorArr.length - 1] == 0x49404b7c, "PA3");
            //     }
            // }
        } else {
            (isTokenInETH, isTokenOutETH) = _checkSingleSwapCall(selector, params, value);
            require(!isTokenInETH && !isTokenOutETH, "PA2");
        }
    }

    // function _decodeMultiCall(bytes4 selector, bytes memory params) private pure returns (bytes4[] memory selectorArr, bytes[] memory paramsArr) {
    //     bytes[] memory arr;
    //     if (selector == 0xac9650d8) {
    //         // multicall(bytes[])
    //         (arr) = abi.decode(params, (bytes[]));
    //     } else if (selector == 0x5ae401dc) {
    //         // multicall(uint256,bytes[])
    //         (, arr) = abi.decode(params, (uint256, bytes[]));
    //     } else if (selector == 0x1f0464d1) {
    //         // multicall(bytes32,bytes[])
    //         (, arr) = abi.decode(params, (bytes32, bytes[]));
    //     }
    //     selectorArr = new bytes4[](arr.length);
    //     paramsArr = new bytes[](arr.length);
    //     for (uint256 i = 0; i < arr.length; i++) {
    //         (selectorArr[i], paramsArr[i]) = _decodeCalldata(arr[i]);
    //     }
    // }

    function _checkSingleSwapCall(
        bytes4 selector,
        bytes memory params,
        uint256 value
    ) private view returns (bool isTokenInETH, bool isTokenOutETH) {
        address tokenIn;
        address tokenOut;
        address recipient;
        if (selector == 0x04e45aaf || selector == 0x5023b4df) {
            // exactInputSingle/exactOutputSingle
            (tokenIn,tokenOut, ,recipient, , , ) = abi.decode(params, (address,address,uint24,address,uint256,uint256,uint160));
        } else if (selector == 0xb858183f || selector == 0x09b81346) {
            // exactInput/exactOutput
            ExactSwapParams memory swap = abi.decode(params, (ExactSwapParams));
            (tokenIn,tokenOut) = swap.path.decode();
            recipient = swap.recipient;
        } else if (selector == 0x472b43f3 || selector == 0x42712a67) {
            // swapExactTokensForTokens/swapTokensForExactTokens
            (,,address[] memory path,address recipient) = abi.decode(params, (uint256,uint256,address[],address));
            require(path.length >= 2, "PA6");
            tokenIn = path[0];
            tokenOut = path[path.length - 1];
        } else if (selector == 0x49404b7c) {
            // unwrapWETH9
            ( ,recipient) = abi.decode(params, (uint256,address));
        } else if (selector == 0x12210e8a) {
            // refundETH
        } else {
            revert("PA2");
        }

        if(tokenIn != address(0)) {
            require(isAllowedToken(tokenIn), "E: token error");
        }

        if(tokenOut != address(0)) {
            require(isAllowedToken(tokenOut), "E: token error");
        }
        require(recipient == address(this), "E: recipient error");
    }

    function _refundETH() private {
        if (address(this).balance > 0) payable(msg.sender).transfer(address(this).balance);
    }

    /**
     * @dev manage fee rate
     */
    function manageFeeRate(uint256 newFeeRate) external {
        require(newFeeRate > 0, "E: error");

        emit ChangeFeeRate(address(this), feeRate, newFeeRate, block.timestamp);
        feeRate = newFeeRate;
    }

    function setBenchmark(address[] memory tokens, uint256[] memory prices) external {
        uint256 length = tokens.length;
        for(uint256 i; i < length; i++) {
            benchmark[tokens[i]] = prices[i];
        }

        emit SetBenchMark(tokens, prices, block.timestamp);
    }

    function withdraw(uint256 positionId, address recipient) external returns (uint256 amount) {
        (PositionSet.Position memory position, bool isExist) = getPositionById(positionId);
        if(! isExist) {
            revert();
        }

        Enum.PositionStatus currentStatus = positionStatus[positionId];
        /// must large REQUEST_LIQUIDATION
        if(Enum.PositionStatus.REQUEST_LIQUIDATION <= currentStatus) {
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
