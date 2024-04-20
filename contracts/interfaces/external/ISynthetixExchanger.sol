// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

// https://docs.synthetix.io/contracts/source/interfaces/iExchanger
interface ISynthetixExchanger {
    function getAmountsForExchange(
        uint sourceAmount,
        bytes32 sourceCurrencyKey,
        bytes32 destinationCurrencyKey
    )
        external
        view
        returns (
            uint amountReceived,
            uint fee,
            uint exchangeFeeRate
        );

    function exchange(
        address from,
        bytes32 sourceCurrencyKey,
        uint sourceAmount,
        bytes32 destinationCurrencyKey,
        address destinationAddress
    ) external returns (uint amountReceived);
}
