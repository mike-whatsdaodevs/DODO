// SPDX-License-Identifier: MIT
// Decontracts Protocol. @2022
pragma solidity >=0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {PaymentGateway} from "./PaymentGateway.sol";
// import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
// import {ISwapRouter02} from "@uniswap/swap-router-contracts/artifacts/contracts/interfaces/ISwapRouter02.sol";
import {ISwapRouter02} from "../interfaces/fund/ISwapRouter02.sol";

contract SwapV2 is PaymentGateway {

    address public swapRouter;

    // @dev FundManager constructor
    // @param _masterAccount Address of master account for cloning
    constructor(address _weth, address _swapRouter) PaymentGateway(_weth) {
        swapRouter = _swapRouter;
    }

    function tokenApprove(address _token, address _spender) external {
        try 
            IERC20(_token).approve(_spender, type(uint256).max) returns (bool b) {
            
        } catch {
            revert("error");
        }
    }

    // function swapExactTokensForTokens(
    //     uint256 amountIn,
    //     uint256 amountOutMin,
    //     address[] calldata path,
    //     address to
    // ) external payable override returns (uint256 amountOut) 
    function swap(
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

    function _refundETH() private {
        if (address(this).balance > 0) payable(msg.sender).transfer(address(this).balance);
    }

}
