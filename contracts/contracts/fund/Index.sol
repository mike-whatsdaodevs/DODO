// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {IIndex} from "../interfaces/IIndex.sol";
import {PositionSet} from "../libraries/PositionSet.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "../../@openzeppelin/contracts/security/Pausable.sol";
import {Enum} from "../libraries/Enum.sol";
import {TransferHelper } from "../libraries/TransferHelper.sol";

import {UniswapV2} from "./UniswapV2.sol";
import {UniswapV3} from "./UniswapV3.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Path} from "../libraries/Path.sol";
import {ISwapRouter02} from "../interfaces/fund/ISwapRouter02.sol";

struct ExactSwapParams {
    bytes path;
    address recipient;
    uint256 amountIn;
    uint256 amountOutMinimum;
}
contract Index is IIndex, Ownable {

    using TransferHelper for address;
    using Address for address;
    using Path for bytes; 

    address public immutable weth9;
    address public immutable uniswapRouter;

    using PositionSet for PositionSet.Set;
    using EnumerableSet for EnumerableSet.AddressSet;

    //// positons
    PositionSet.Set positionSet;

    /// allowed tokens to buy
    EnumerableSet.AddressSet indexTokens;


    /// allowed lp to approve
    EnumerableSet.AddressSet allowedProtocols;

    /// allowed tokens to sell
    mapping(address => bool) public allowedTokens;

    /// benchmark price 
    mapping(address => uint256) public benchmark;

    /// index id
    uint256 public id;

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

    mapping(uint256 => mapping(address => uint256)) public positionBalance;

    mapping(address => uint256) public vaultBalance;

    address public underlyingToken;

    constructor(uint indexId, string memory indexName) {
        operators[msg.sender] = true;
        id = indexId;
        name = indexName;
        feeRate = 10;
        uniswapRouter = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;
        weth9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    }

    receive() external payable {}

    function addIndexTokens(address[] memory addrs) external onlyOwner {
        uint256 length = addrs.length;
        for(uint256 i; i < length; ) {
            address indexToken = addrs[i];
            if(indexTokens.contains(indexToken)) {
                continue;
            }
            indexTokens.add(indexToken);
            /// allow to sell
            allowedTokens[indexToken] = true;
            
            unchecked {
                ++i;
            }
        }
    }

    function removeIndexTokens(address[] memory addrs) external onlyOwner {
        uint256 length = addrs.length;
        for(uint256 i; i < length; ) {
            address indexToken = addrs[i];
            if(!indexTokens.contains(indexToken)) {
                continue;
            }
            indexTokens.remove(indexToken);
            unchecked {
                ++i;
            }
        }
    }

    function addAllowedProtocols(address[] memory protocols) external onlyOwner {
        uint256 length = protocols.length;
        for(uint256 i; i < length; ) {
            address protocol = protocols[i];
            if(allowedProtocols.contains(protocol)) {
                continue;
            }
            allowedProtocols.add(protocol);
            unchecked {
                ++i;
            }
        }
    }

    function removeAllowedProtocols(address[] memory protocols) external onlyOwner {
        uint256 length = protocols.length;
        for(uint256 i; i < length; ) {
            address protocol = protocols[i];
            if(!allowedProtocols.contains(protocol)) {
                continue;
            }
            allowedProtocols.remove(protocol);
            unchecked {
                ++i;
            }
        }
    }

    function manageAllowedToken(address token, bool status) external onlyOwner {
        allowedTokens[token] = status;
    }

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

    /**
     * @dev index supoorts tokens
     * 
     * @return tokens address
     */
    function getIndexTokens() external view returns (address[] memory) {
        return indexTokens.values();
    }

    /**
     * @dev index supoorts tokens
     * 
     * @return tokens address
     */
    function isAllowedToken(address token) external view returns (bool) {
        return allowedTokens[token];
    }

    /**
     * @dev list all allowed lps
     * 
     * @return lps
     */
    function getAllowedProtocols() external view returns (address[] memory) {
        return allowedProtocols.values();
    }

    /**
     * @dev check if index supports lp
     * 
     * @param lp address
     * 
     * @return bool
     */
    function isAllowedProtocols(address lp) public view returns (bool) {
        return allowedProtocols.contains(lp);
    }

    function safeApprove(address token, address protocol) external onlyOwner {
        if(!allowedProtocols.contains(protocol)) {
            revert();
        }

        if(! allowedTokens[token]) {
            revert();
        }
        token.safeApprove(protocol, type(uint256).max);
    }

    /**
     * @dev get position token amount
     * 
     * @param positionId: position id
     * @param token address
     * 
     * @return uint256
     */
    function getPositionAmount(uint256 positionId, address token) external view returns (uint256) {
        return positionBalance[positionId][token];

    }

    function getPositionById(uint256 positionId) external view returns (PositionSet.Position memory position) {
        uint256 index = positionSet.getIndex(positionId);
        if(index == 0) {
            return position;
        }

        PositionSet.Position memory position = positionSet.at(index);
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
        uint128 healthFactor
    ) external onlyOwner returns (uint256) {
        uint256 currentPositionId = positionId;
        PositionSet.Position memory position = PositionSet.Position(
            currentPositionId, 
            initialOwner,
            amount,
            currentIndex,
            healthFactor,
            Enum.PositionStatus.CREATED
        );
        positionSet.add(position);
        idIncrease();

        uint256 underlyingTokenAmount = IERC20(underlyingToken).balanceOf(address(this));

        vaultBalance[underlyingToken] += amount;

        if(vaultBalance[underlyingToken] != underlyingTokenAmount) {
            revert();
        }

        positionBalance[currentPositionId][underlyingToken] = amount;

        return currentPositionId;
    }

    /**
     * @dev buy token 
     * 
     * @param positionId: position id
     * @param token: token address
     * @param data: calldata
     */
    function convertToIndexTokens(uint256 positionId, address token, bytes memory data) external {

    }

    /**
     * @dev sell token 
     * 
     * @param positionId: position id
     * @param token: token address
     * @param data: calldata
     */
    function convertToUnderlyingToken(uint256 positionId, address token, bytes memory data) external {

    }

    function _convertAllAssetsToUnderlying(
        uint256 positionId,
        bytes[] calldata paths
    ) private {
        // address[] memory indexTokens = allowedTokensSell.values();
        // address indexToken;

        // for (uint256 i = 0; i < indexTokens.length; i++) {
        //     indexToken = indexTokens[i];
        //     if (indexToken == underlyingToken) continue;
        //     if (indexToken == weth9) {
        //         /// fundAccount.wrapWETH9();
        //     }
        //     uint256 balance = positionBalance[positionId][indexToken];
        //     if (balance == 0) continue;

        //     bytes memory matchPath;
        //     for (uint256 j = 0; j < paths.length; j++) {
        //         (address tokenIn, address tokenOut) = paths[j].decode();
        //         if (tokenIn == allowedToken && tokenOut == underlyingToken) {
        //             matchPath = paths[j];
        //             break;
        //         }
        //     }
        //     require(matchPath.length > 0, "E: path error");

        //     /// fundAccount.approveToken(allowedToken, swapRouter, balance);
            
        // }

        // if (underlyingToken == weth9) {
        //     fundAccount.unwrapWETH9();
        // }
    }

    function uniswapV2(
        uint256 positionId,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path
    ) public payable returns (uint256) {
        require(path.length >= 2, "PA6");
        address tokenIn = path[0];
        address tokenOut = path[path.length - 1];

        require(allowedTokens[tokenIn], "E: token error");
        require(allowedTokens[tokenOut], "E: token error");

        if(amountIn > positionBalance[positionId][tokenIn]) {
            revert();
        }

        return ISwapRouter02(uniswapRouter).swapExactTokensForTokens {value: msg.value} (
            amountIn,
            amountOutMin,
            path,
            address(this)
        );
    }

    // struct ExactInputSingleParams {
    //     address tokenIn;
    //     address tokenOut;
    //     uint24 fee;
    //     address recipient;
    //     uint256 amountIn;
    //     uint256 amountOutMinimum;
    //     uint160 sqrtPriceLimitX96;
    // }

    function uniswapV3ExactInputSingle(
        uint256 positionId,
        ISwapRouter02.ExactInputSingleParams calldata params
    ) external payable returns (uint256) {
        require(allowedTokens[params.tokenIn], "E: token error");
        require(allowedTokens[params.tokenOut], "E: token error");

        if(params.amountIn > positionBalance[positionId][params.tokenIn]) {
            revert();
        }

        require(params.recipient == address(this), "E: recipient error");

        return ISwapRouter02(uniswapRouter).exactInputSingle {value: msg.value} (
            params
        );
    }

    function uniswapV3ExactInput(
        uint256 positionId,
        ISwapRouter02.ExactInputParams calldata params
    ) external payable returns (uint256) {
        (address tokenIn, address tokenOut) = params.path.decode();

        require(allowedTokens[tokenIn], "E: token error");
        require(allowedTokens[tokenOut], "E: token error");
        require(params.recipient == address(this), "E: recipient error");

        if(params.amountIn > positionBalance[positionId][tokenIn]) {
            revert();
        }

        return ISwapRouter02(uniswapRouter).exactInput {value: msg.value} (
            params
        );
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
        if(allowedProtocols.contains(protocol)) {
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
            require(allowedTokens[tokenIn], "E: token error");
        }

        if(tokenOut != address(0)) {
            require(allowedTokens[tokenOut], "E: token error");
        }
        require(recipient == address(this), "E: recipient error");
    }

    function _refundETH() private {
        if (address(this).balance > 0) payable(msg.sender).transfer(address(this).balance);
    }

    /**
     * @dev manage fee rate
     */
    function manageFeeRate(uint256 newFeeRate) external onlyOwner {
        feeRate = newFeeRate;
    }

    function setBenchmark(address[] memory tokens, uint256[] memory prices) external onlyOwner {
        uint256 length = tokens.length;
        for(uint256 i; i < length; ) {
            benchmark[tokens[i]] = prices[i];

            unchecked {
                ++i;
            }
        }
    }

    /**
     * @dev manage index operator
     * 
     * @param operator: operator address
     */
    function manageOperator(address operator, bool status) external onlyOwner {
        operators[operator] = status;
    }
}
