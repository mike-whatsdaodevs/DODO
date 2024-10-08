// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Contains 512-bit math functions
/// @notice Facilitates multiplication and division that can have overflow of an intermediate value without any loss of precision
/// @dev Handles "phantom overflow" i.e., allows multiplication and division where an intermediate value overflows 256 bits
library ContractAddress {

	address constant factory = 0x1F98431c8aD98523631AE4a59f267346ea31F984;
	address constant quoter = 0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6;
	address constant router = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
	address constant weth9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

}