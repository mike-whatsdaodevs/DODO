// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title UniswapV2TradeAdapter
 * @author Yam Finance
 *
 * Exchange adapter for Uniswap V2 Router02 that encodes trade data
 */
contract UniswapV2ExchangeAdapter {

    /* ============ State Variables ============ */

    // Address of Uniswap V2 Router02 contract
    address public immutable router;

    /* ============ Constructor ============ */

    /**
     * Set state variables
     *
     * @param _router       Address of Uniswap V2 Router02 contract
     */
    constructor(address _router) public {
        router = _router;
    }

    /* ============ External Getter Functions ============ */

    /**
     * Return calldata for Uniswap V2 Router02
     *
     * @param  _sourceToken              Address of source token to be sold
     * @param  _destinationToken         Address of destination token to buy
     * @param  _destinationAddress       Address that assets should be transferred to
     * @param  _sourceQuantity           Amount of source token to sell
     * @param  _minDestinationQuantity   Min amount of destination token to buy
     * @param  _data                     Arbitrary bytes containing trade call data
     *
     * @return address                   Target contract address
     * @return uint256                   Call value
     * @return bytes                     Trade calldata
     */
    function getTradeCalldata(
        address _sourceToken,
        address _destinationToken,
        address _destinationAddress,
        uint256 _sourceQuantity,
        uint256 _minDestinationQuantity,
        bytes memory _data
    )
        external
        view
        returns (address, uint256, bytes memory)
    {   
        address[] memory path;

        if(_data.length == 0){
            path = new address[](2);
            path[0] = _sourceToken;
            path[1] = _destinationToken;
        } else {
            path = abi.decode(_data, (address[]));
        }

        bytes memory callData = abi.encodeWithSignature(
            "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
            _sourceQuantity,
            _minDestinationQuantity,
            path,
            _destinationAddress,
            block.timestamp
        );
        return (router, 0, callData);
    }

    /**
     * Returns the address to approve source tokens to for trading. This is the Uniswap router address
     *
     * @return address             Address of the contract to approve tokens to
     */
    function getSpender()
        external
        view
        returns (address)
    {
        return router;
    }
} 