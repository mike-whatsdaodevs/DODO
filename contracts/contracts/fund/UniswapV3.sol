// SPDX-License-Identifier: MIT
// Decontracts Protocol. @2022
pragma solidity >=0.8.14;

import {ISwapRouter02} from "../interfaces/fund/ISwapRouter02.sol";
import {Path} from "../libraries/Path.sol";

contract UniswapV3 {

    function swap(
        address swapRouter,
        ISwapRouter02.ExactInputSingleParams calldata params
    ) external payable returns (uint256) {
        return ISwapRouter02(swapRouter).exactInputSingle {value: msg.value} (
            params
        );
    }

    function decodePath(bytes calldata path) external view returns (address token0, address token1) {
        (token0, token1) = Path.decode(path);
    }

    function mulswap(
        address swapRouter,
        ISwapRouter02.ExactInputParams calldata params
    ) external payable returns (uint256) {
        return ISwapRouter02(swapRouter).exactInput {value: msg.value} (
            params
        );
    }

}
