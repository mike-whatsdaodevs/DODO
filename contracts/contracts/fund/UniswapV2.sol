// SPDX-License-Identifier: MIT
// Decontracts Protocol. @2022
pragma solidity >=0.8.14;

import {PaymentGateway} from "./PaymentGateway.sol";
// import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
// import {ISwapRouter02} from "@uniswap/swap-router-contracts/artifacts/contracts/interfaces/ISwapRouter02.sol";
import {ISwapRouter02} from "../interfaces/fund/ISwapRouter02.sol";

contract UniswapV2 {

    //// swaprouter
    function swap(
        address swapRouter,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to
    ) external payable returns (uint256) {
        return ISwapRouter02(swapRouter).swapExactTokensForTokens {value: msg.value} (
            amountIn,
            amountOutMin,
            path,
            to
        );
    }
}


