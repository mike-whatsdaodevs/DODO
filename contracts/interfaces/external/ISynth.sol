// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

// https://docs.synthetix.io/contracts/source/interfaces/isynth
interface ISynth {
    function currencyKey() external view returns (bytes32);
}
