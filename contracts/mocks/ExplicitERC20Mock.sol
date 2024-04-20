// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ExplicitERC20 } from "../lib/ExplicitERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ExplicitERC20Mock {
    
    function transferFrom(
        IERC20 _token,
        address _from,
        address _to,
        uint256 _quantity
    )
        external
    {
        ExplicitERC20.transferFrom(
            _token,
            _from,
            _to,
            _quantity
        );
    }
}
