// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TESTToken is ERC20 {
    constructor()  ERC20("TEST", "TEST") {
    }

    function safeMint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
