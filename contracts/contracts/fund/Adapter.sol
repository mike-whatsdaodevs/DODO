// // SPDX-License-Identifier: MIT
// pragma solidity >=0.8.14;

// import {IIndex} from "../interfaces/IIndex.sol";
// import {PositionSet} from "../libraries/PositionSet.sol";
// import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
// import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
// import {Pausable} from "../../@openzeppelin/contracts/security/Pausable.sol";
// import {Enum} from "../libraries/Enum.sol";
// import { TransferHelper } from "../libraries/TransferHelper.sol";

// contract Adapter {
//     function _analyseSwapCalls(address account, bytes4 selector, bytes memory params, uint256 value) private view {
//         bool isTokenInETH;
//         bool isTokenOutETH;
//         if (_isMultiCall(selector)) {
//             (bytes4[] memory selectorArr, bytes[] memory paramsArr) = _decodeMultiCall(selector, params);
//             for (uint256 i = 0; i < selectorArr.length; i++) {
//                 (isTokenInETH, isTokenOutETH) = _checkSingleSwapCall(account, selectorArr[i], paramsArr[i], value);
//                 // if swap native ETH, must check multicall
//                 if (isTokenInETH) {
//                     // must call refundETH last
//                     require(selectorArr[selectorArr.length - 1] == 0x12210e8a, "PA3");
//                 }
//                 if (isTokenOutETH) {
//                     // must call unwrapWETH9 last
//                     require(selectorArr[selectorArr.length - 1] == 0x49404b7c, "PA3");
//                 }
//             }
//         } else {
//             (isTokenInETH, isTokenOutETH) = _checkSingleSwapCall(account, selector, params, value);
//             require(!isTokenInETH && !isTokenOutETH, "PA2");
//         }
//     }

//     function _checkSingleSwapCall(
//         address account,
//         bytes4 selector,
//         bytes memory params,
//         uint256 value
//     ) private view returns (bool isTokenInETH, bool isTokenOutETH) {
//         address tokenIn;
//         address tokenOut;
//         address recipient;
//         if (selector == 0x04e45aaf || selector == 0x5023b4df) {
//             // exactInputSingle/exactOutputSingle
//             (tokenIn,tokenOut, ,recipient, , , ) = abi.decode(params, (address,address,uint24,address,uint256,uint256,uint160));
//             isTokenInETH = (tokenIn == weth9 && value > 0 && selector == 0x5023b4df);
//             isTokenOutETH = (tokenOut == weth9 && recipient == address(2));
//             require(recipient == account || isTokenOutETH, "PA5");
//             require(_tokenAllowed(account, tokenIn), "PA4");
//             require(_tokenAllowed(account, tokenOut), "PA4");
//         } else if (selector == 0xb858183f || selector == 0x09b81346) {
//             // exactInput/exactOutput
//             ExactSwapParams memory swap = abi.decode(params, (ExactSwapParams));
//             (tokenIn,tokenOut) = swap.path.decode();
//             isTokenInETH = (tokenIn == weth9 && value > 0 && selector == 0x09b81346);
//             isTokenOutETH = (tokenOut == weth9 && swap.recipient == address(2));
//             require(swap.recipient == account || isTokenOutETH, "PA5");
//             require(_tokenAllowed(account, tokenIn), "PA4");
//             require(_tokenAllowed(account, tokenOut), "PA4");
//         } else if (selector == 0x472b43f3 || selector == 0x42712a67) {
//             // swapExactTokensForTokens/swapTokensForExactTokens
//             (,,address[] memory path,address to) = abi.decode(params, (uint256,uint256,address[],address));
//             require(path.length >= 2, "PA6");
//             tokenIn = path[0];
//             tokenOut = path[path.length - 1];
//             isTokenInETH = (tokenIn == weth9 && value > 0 && selector == 0x42712a67);
//             isTokenOutETH = (tokenOut == weth9 && to == address(2));
//             require(to == account || isTokenOutETH, "PA5");
//             require(_tokenAllowed(account, tokenIn), "PA4");
//             require(_tokenAllowed(account, tokenOut), "PA4");
//         } else if (selector == 0x49404b7c) {
//             // unwrapWETH9
//             ( ,recipient) = abi.decode(params, (uint256,address));
//             require(recipient == account, "PA5");
//         } else if (selector == 0x12210e8a) {
//             // refundETH
//         } else {
//             revert("PA2");
//         }
//     }
// }


