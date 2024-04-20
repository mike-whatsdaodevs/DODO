// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IIndexExchangeAdapter {
    function getSpender() external view returns(address);

    /**
     * Returns calldata for executing trade on given adapter's exchange when using the GeneralIndexModule.
     *
     * @param  _sourceToken              Address of source token to be sold
     * @param  _destinationToken         Address of destination token to buy
     * @param  _destinationAddress       Address that assets should be transferred to
     * @param  _isSendTokenFixed         Boolean indicating if the send quantity is fixed, used to determine correct trade interface
     * @param  _sourceQuantity           Fixed/Max amount of source token to sell
     * @param  _destinationQuantity      Min/Fixed amount of destination tokens to receive
     * @param  _data                     Arbitrary bytes that can be used to store exchange specific parameters or logic
     *
     * @return address                   Target contract address
     * @return uint256                   Call value
     * @return bytes                     Trade calldata
     */
    function getTradeCalldata(
        address _sourceToken,
        address _destinationToken,
        address _destinationAddress,
        bool _isSendTokenFixed,
        uint256 _sourceQuantity,
        uint256 _destinationQuantity,
        bytes memory _data
    )
        external
        view
        returns (address, uint256, bytes memory);
}