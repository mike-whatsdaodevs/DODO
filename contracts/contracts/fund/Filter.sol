// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import {Path} from "../libraries/Path.sol";

contract Filter {

    using EnumerableSet for EnumerableSet.AddressSet;
    /// allowed tokens to buy
    EnumerableSet.AddressSet indexTokens;

    /// allowed lp to approve
    EnumerableSet.AddressSet allowedProtocols;

    /// allowed tokens to sell
    mapping(address => bool) allowedTokens;

    constructor() {}

    function addIndexTokens(address[] memory addrs) external {
        uint256 length = addrs.length;
        for(uint256 i; i < length; i ++) {
            address indexToken = addrs[i];
            if(indexTokens.contains(indexToken)) {
                continue;
            }
            indexTokens.add(indexToken);
            /// allow to sell
            allowedTokens[indexToken] = true;
        }
    }

    function removeIndexTokens(address[] memory addrs) external {
        uint256 length = addrs.length;
        for(uint256 i; i < length; i ++) {
            address indexToken = addrs[i];
            if(!indexTokens.contains(indexToken)) {
                continue;
            }
            indexTokens.remove(indexToken);
        }
    }

    function addAllowedProtocols(address[] memory protocols) external {
        uint256 length = protocols.length;
        for(uint256 i; i < length; i++) {
            address protocol = protocols[i];
            if(allowedProtocols.contains(protocol)) {
                continue;
            }
            addProtocol(protocol);
        }
    }

    function removeAllowedProtocols(address[] memory protocols) external {
        uint256 length = protocols.length;
        for(uint256 i; i < length; i ++) {
            address protocol = protocols[i];
            if(!allowedProtocols.contains(protocol)) {
                continue;
            }
            allowedProtocols.remove(protocol);
        }
    }

    function addProtocol(address protocol) internal {
        allowedProtocols.add(protocol);
    }

    function manageAllowedToken(address token, bool status) external {
        allowedTokens[token] = status;
    }

    /**
     * @dev index supoorts tokens
     * 
     * @return tokens address
     */
    function getIndexTokens() external view returns (address[] memory) {
        return indexTokens.values();
    }

    /**
     * @dev index supoorts tokens
     * 
     * @return tokens address
     */
    function isAllowedToken(address token) public view returns (bool) {
        return allowedTokens[token];
    }

    /**
     * @dev list all allowed lps
     * 
     * @return lps
     */
    function getAllowedProtocols() external view returns (address[] memory) {
        return allowedProtocols.values();
    }

    /**
     * @dev check if index supports lp
     * 
     * @param lp address
     * 
     * @return bool
     */
    function isAllowedProtocols(address lp) public view returns (bool) {
        return allowedProtocols.contains(lp);
    }
}
