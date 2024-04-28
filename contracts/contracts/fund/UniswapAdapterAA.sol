// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {ISwapRouter02} from "../interfaces/fund/ISwapRouter02.sol";

contract UniswapAdapterAA {

    /// eth 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45
    address public immutable uniswapRouter;

    constructor() {
        uniswapRouter = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;
    }


    function _uniswapV2(
        address uniswapRouter,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path
    ) internal returns (uint256 amountOut) {
        amountOut = ISwapRouter02(uniswapRouter).swapExactTokensForTokens {value: msg.value} (
            amountIn,
            amountOutMin,
            path,
            address(this)
        );
    }

    function _uniswapV3Single(
        ISwapRouter02.ExactInputSingleParams calldata params
    ) internal returns (uint256 amountOut) {
        amountOut = ISwapRouter02(uniswapRouter).exactInputSingle {value: msg.value} (
            params
        );
    }

    function _uniswapV3(
        ISwapRouter02.ExactInputParams calldata params
    ) external payable returns (uint256 amountOut) {
        amountOut = ISwapRouter02(uniswapRouter).exactInput {value: msg.value} (
            params
        );
    }
}
