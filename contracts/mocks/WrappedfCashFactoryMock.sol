// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IWrappedfCashFactory } from "../interfaces/IWrappedFCashFactory.sol";
import { WrappedfCashMock } from "./WrappedfCashMock.sol";


// mock class using BasicToken
contract WrappedfCashFactoryMock is IWrappedfCashFactory {

    mapping(uint16 => mapping(uint40 => address)) paramsToAddress;
    bool private revertComputeAddress;

    function registerWrapper(uint16 _currencyId, uint40 _maturity, address _fCashWrapper) external {
        paramsToAddress[_currencyId][_maturity] = _fCashWrapper;
    }

    function deployWrapper(uint16 _currencyId, uint40 _maturity) external override returns(address) {
        return computeAddress(_currencyId, _maturity);
    }

    function computeAddress(uint16 _currencyId, uint40 _maturity) public view override returns(address) {
        require(!revertComputeAddress, "Test revertion ComputeAddress");
        return paramsToAddress[_currencyId][_maturity];
    }

    function setRevertComputeAddress(bool _revertComputeAddress) external{
        revertComputeAddress = _revertComputeAddress;
    }


}
