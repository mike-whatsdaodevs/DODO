// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/**
 * @title WrapAdapterMock
 * @author Set Protocol
 *
 * ERC20 contract that doubles as a wrap token. The wrapToken accepts any underlying token and
 * mints/burns the WrapAdapter Token.
 */
contract WrapAdapterMock is ERC20 {

    address public constant ETH_TOKEN_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    /* ============ Constructor ============ */
    constructor() public ERC20("WrapAdapter", "WRAP") {}

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
     * [x]
     */
    function getWrapCallData(
        address _underlyingToken,
        address /* _wrappedToken */,
        uint256 _underlyingUnits
    ) external view returns (address _subject, uint256 _value, bytes memory _calldata) {
        uint256 value = _underlyingToken == ETH_TOKEN_ADDRESS ? _underlyingUnits : 0;
        bytes memory callData = abi.encodeWithSignature("deposit(address,uint256)", _underlyingToken, _underlyingUnits);
        return (address(this), value, callData);
    }

    function getUnwrapCallData(
        address _underlyingToken,
        address /* _wrappedToken */,
        uint256 _wrappedTokenUnits
    ) external view returns (address _subject, uint256 _value, bytes memory _calldata) {
        bytes memory callData = abi.encodeWithSignature("withdraw(address,uint256)", _underlyingToken, _wrappedTokenUnits);
        return (address(this), 0, callData);
    }

    function getSpenderAddress(
        address /* _underlyingToken */,
        address /* _wrappedToken */
    ) external view returns(address) {
        return address(this);
    }
}