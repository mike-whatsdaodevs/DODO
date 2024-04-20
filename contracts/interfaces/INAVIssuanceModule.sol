// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ISetToken } from "./ISetToken.sol";

interface INAVIssuanceModule {
    function issue(
        ISetToken _setToken,
        address _reserveAsset,
        uint256 _reserveAssetQuantity,
        uint256 _minSetTokenReceiveQuantity,
        address _to
    ) 
        external;
    
    function redeem(
        ISetToken _setToken,
        address _reserveAsset,
        uint256 _setTokenQuantity,
        uint256 _minReserveReceiveQuantity,
        address _to
    ) 
        external;
}