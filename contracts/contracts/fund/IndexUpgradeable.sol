// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {IIndex} from "../interfaces/IIndex.sol";
import {PositionSet} from "../libraries/PositionSet.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Enum} from "../libraries/Enum.sol";
import {Constants} from "../libraries/Constants.sol";
import {TransferHelper } from "../libraries/TransferHelper.sol";
import {UniswapAdapter, ISwapRouter02} from "../libraries/UniswapAdapter.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Path} from "../libraries/Path.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {IFilter} from "../interfaces/IFilter.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract IndexUpgradeable is UUPSUpgradeable {

    /// uups interface
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        view
    { }
}
