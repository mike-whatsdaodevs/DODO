// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ISetToken } from "./ISetToken.sol";

interface INAVIssuanceHook {
    function invokePreIssueHook(
        ISetToken _setToken,
        address _reserveAsset,
        uint256 _reserveAssetQuantity,
        address _sender,
        address _to
    )
        external;

    function invokePreRedeemHook(
        ISetToken _setToken,
        uint256 _redeemQuantity,
        address _sender,
        address _to
    )
        external;
}