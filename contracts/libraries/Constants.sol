// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

library Constants {
    /// eth 
    address internal constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address internal constant USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
    address internal constant UNISWAP_ROUTER = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;

    /// optimism 
    // address internal constant WETH9 = 0x4200000000000000000000000000000000000006;
    // address internal constant USDT = 0x94b008aA00579c1307B0EF2c499aD98a8ce58e58;
    // address internal constant UNISWAP_ROUTER = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;
    

    // ACTIONS
    uint256 internal constant EXACT_INPUT = 1;
    uint256 internal constant EXACT_OUTPUT = 2;

    // SIZES
    uint256 internal constant NAME_MIN_SIZE = 3;
    uint256 internal constant NAME_MAX_SIZE = 72;

    uint256 internal constant MAX_UINT256 = type(uint256).max;
    uint128 internal constant MAX_UINT128 = type(uint128).max;

    uint256 internal constant DENOMINATOR = 1e4;
}
