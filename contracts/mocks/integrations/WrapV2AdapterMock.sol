// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/**
 * @title WrapV2AdapterMock
 * @author Set Protocol
 *
 * ERC20 contract that doubles as a wrap token. The wrapToken accepts any underlying token and
 * mints/burns the WrapAdapter Token.
 */
contract WrapV2AdapterMock is ERC20 {

    address public constant ETH_TOKEN_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    /* ============ Constructor ============ */
    constructor() public ERC20("WrapV2Adapter", "WRAPV2") {}

    /* ============ External Functions ============ */

    /**
     * Mints tokens to the sender of the underlying quantity
     */
    function deposit(address _underlyingToken, uint256 _underlyingQuantity) payable external {
        // Do a transferFrom of the underlyingToken
        if (_underlyingToken != ETH_TOKEN_ADDRESS) {
            IERC20(_underlyingToken).transferFrom(msg.sender, address(this), _underlyingQuantity);
        }

        _mint(msg.sender, _underlyingQuantity);
    }

    /**
     * Burns tokens from the sender of the wrapped asset and returns the underlying
     */
    function withdraw(address _underlyingToken, uint256 _underlyingQuantity) external {
        // Transfer the underlying to the sender
        if (_underlyingToken == ETH_TOKEN_ADDRESS) {
            payable(msg.sender).transfer(_underlyingQuantity);
        } else {
            IERC20(_underlyingToken).transfer(msg.sender, _underlyingQuantity);
        }

        _burn(msg.sender, _underlyingQuantity);
    }

    /**
     * Generates the calldata to wrap an underlying asset into a wrappedToken.
     *
     * @param _underlyingToken      Address of the component to be wrapped
     * @param _underlyingUnits      Total quantity of underlying units to wrap
     *
     * @return _subject             Target contract address
     * @return _value               Total quantity of underlying units (if underlying is ETH)
     * @return _calldata            Wrap calldata
     */
    function getWrapCallData(
        address _underlyingToken,
        address /* _wrappedToken */,
        uint256 _underlyingUnits,
        address /* _to */,
        bytes memory /* _wrapData */
    ) external view returns (address _subject, uint256 _value, bytes memory _calldata) {
        uint256 value = _underlyingToken == ETH_TOKEN_ADDRESS ? _underlyingUnits : 0;
        bytes memory callData = abi.encodeWithSignature("deposit(address,uint256)", _underlyingToken, _underlyingUnits);
        return (address(this), value, callData);
    }

    /**
     * Generates the calldata to unwrap a wrapped asset into its underlying.
     *
     * @param _underlyingToken      Address of the underlying of the component to be unwrapped
     * @param _wrappedTokenUnits    Total quantity of wrapped token units to unwrap
     *
     * @return _subject             Target contract address
     * @return _value               Total quantity of wrapped token units to unwrap. This will always be 0 for unwrapping
     * @return _calldata            Unwrap calldata
     */
    function getUnwrapCallData(
        address _underlyingToken,
        address /* _wrappedToken */,
        uint256 _wrappedTokenUnits,
        address /* _to */,
        bytes memory /* _wrapData */
    ) external view returns (address _subject, uint256 _value, bytes memory _calldata) {
        bytes memory callData = abi.encodeWithSignature("withdraw(address,uint256)", _underlyingToken, _wrappedTokenUnits);
        return (address(this), 0, callData);
    }

    /**
     * Returns the address to approve source tokens for wrapping.
     *
     * @return address              Address of the contract to approve tokens to
     */
    function getSpenderAddress(
        address /* _underlyingToken */,
        address /* _wrappedToken */
    ) external view returns(address) {
        return address(this);
    }
}