// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Path} from "../libraries/Path.sol";
import {IFilter} from "../interfaces/IFilter.sol";
import {Constants} from "../libraries/Constants.sol";

abstract contract Filter is IFilter {

    using EnumerableSet for EnumerableSet.AddressSet;
    /// allowed tokens to buy
    mapping(address => EnumerableSet.AddressSet) indexTokensMap;

    /// allowed lp to approve
    EnumerableSet.AddressSet allowedProtocols;

    /// allowed tokens to sell
    mapping(address => bool) allowedTokens;
    
    constructor() {
        allowedTokens[Constants.USDT] = true;
    }

    function addIndexTokens(address targetIndex, address[] memory tokens) public {
        EnumerableSet.AddressSet storage indexTokens = indexTokensMap[targetIndex];
        
        uint256 length = tokens.length;
        for(uint256 i; i < length; i ++) {
            address token = tokens[i];
            if(indexTokens.contains(token)) {
                continue;
            }
            indexTokens.add(token);
            /// allow to sell
            allowedTokens[token] = true;
        }
    }

    function indexTokensLenth(address targetIndex) public view returns (uint256) {
        EnumerableSet.AddressSet storage indexTokens = indexTokensMap[targetIndex];
        return indexTokens.length();
    }

    function removeIndexTokens(address targetIndex, address[] memory tokens) external {
        EnumerableSet.AddressSet storage indexTokens = indexTokensMap[targetIndex];

        uint256 length = tokens.length;
        for(uint256 i; i < length; i ++) {
            address token = tokens[i];
            if(!indexTokens.contains(token)) {
                continue;
            }
            indexTokens.remove(token);
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
    function getIndexTokens(address targetIndex) external view returns (address[] memory) {
        EnumerableSet.AddressSet storage indexTokens = indexTokensMap[targetIndex];

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
