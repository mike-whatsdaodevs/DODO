// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Address } from "@openzeppelin/contracts/utils/Address.sol";


contract ContractCallerMock {
    using Address for address;

    constructor() public {}

    function invoke(
        address _target,
        uint256 _value,
        bytes calldata _data
    )
        external
        returns (bytes memory _returnValue)
    {
        _returnValue = _target.functionCallWithValue(_data, _value);

        return _returnValue;
    }
}