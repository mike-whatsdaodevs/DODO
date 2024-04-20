// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { IController } from "../interfaces/IController.sol";

contract TokenEnabler is Ownable {

    IController public immutable controller;
    address[] public tokensToEnable;

    /* ============ Constructor ============ */

    constructor(
        IController _controller,
        address[] memory _tokensToEnable
    )
        public
        Ownable()
    {
        controller = _controller;
        tokensToEnable = _tokensToEnable;
    }

    /* ============ External Functions ============ */

    /**
     * ONLY OWNER: Enables tokens on the controller
     */
    function enableTokens() external onlyOwner {
        for (uint256 i = 0; i < tokensToEnable.length; i++) {
            controller.addSet(tokensToEnable[i]);
        }
    }

    /* ============ View Functions ============ */

    function getTokensToEnable() external view returns(address[] memory) {
        return tokensToEnable;
    }
}
