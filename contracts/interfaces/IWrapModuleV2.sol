// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ISetToken } from "./ISetToken.sol";
import { IWETH } from "./external/IWETH.sol";

interface IWrapModuleV2 {
    function weth() external view returns(IWETH);

    function initialize(ISetToken _setToken) external;

    function wrap(
        ISetToken _setToken,
        address _underlyingToken,
        address _wrappedToken,
        uint256 _underlyingUnits,
        string calldata _integrationName,
        bytes memory _wrapData
    ) external;

    function wrapWithEther(
        ISetToken _setToken,
        address _wrappedToken,
        uint256 _underlyingUnits,
        string calldata _integrationName,
        bytes memory _wrapData
    ) external;

    function unwrap(
        ISetToken _setToken,
        address _underlyingToken,
        address _wrappedToken,
        uint256 _wrappedUnits,
        string calldata _integrationName,
        bytes memory _unwrapData
    ) external;

    function unwrapWithEther(
        ISetToken _setToken,
        address _wrappedToken,
        uint256 _wrappedUnits,
        string calldata _integrationName,
        bytes memory _unwrapData
    ) external;
}
