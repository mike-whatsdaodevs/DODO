// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Path} from "../libraries/Path.sol";
import {IFilter} from "../interfaces/IFilter.sol";
import {Constants} from "../libraries/Constants.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Filter is IFilter, OwnableUpgradeable, UUPSUpgradeable  {

    using EnumerableSet for EnumerableSet.AddressSet;
    /// allowed tokens to buy
    mapping(address => EnumerableSet.AddressSet) indexTokensMap;

    /// allowed lp to approve
    EnumerableSet.AddressSet allowedProtocols;

    /// allowed tokens to sell
    mapping(address => bool) allowedTokens;

    mapping(address => mapping(address => bool)) public override indexManagers;

    constructor() {
        _disableInitializers();
    }

    function initialize() external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        allowedTokens[Constants.USDT] = true;
        allowedProtocols.add(Constants.UNISWAP_ROUTER);
    }

    modifier onlyManager(address targetIndex) {
        require(indexManagers[targetIndex][msg.sender], "E: caller is not allowed");
        _;
    }

    function addIndexTokens(address targetIndex, address[] memory tokens) public onlyManager(targetIndex) {
        EnumerableSet.AddressSet storage indexTokens = indexTokensMap[targetIndex];
        
        uint256 length = tokens.length;
        for(uint256 i; i < length; i ++) {
            address token = tokens[i];
            if(indexTokens.contains(token)) {
                continue;
            }
            require(allowedTokens[token], "E: token is not allowed");

            indexTokens.add(token);
        }
    }

    function indexTokensLenth(address targetIndex) public view returns (uint256) {
        EnumerableSet.AddressSet storage indexTokens = indexTokensMap[targetIndex];
        return indexTokens.length();
    }

    function removeIndexTokens(address targetIndex, address[] memory tokens) external onlyManager(targetIndex) {
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

    function addAllowedProtocols(address[] memory protocols) external onlyOwner {
        uint256 length = protocols.length;
        for(uint256 i; i < length; i++) {
            address protocol = protocols[i];
            if(allowedProtocols.contains(protocol)) {
                continue;
            }
            allowedProtocols.add(protocol);
        }
    }

    function removeAllowedProtocols(address[] memory protocols) external onlyOwner {
        uint256 length = protocols.length;
        for(uint256 i; i < length; i ++) {
            address protocol = protocols[i];
            if(!allowedProtocols.contains(protocol)) {
                continue;
            }
            allowedProtocols.remove(protocol);
        }
    }

    function manageAllowedToken(address token, bool status) external onlyOwner {
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

    function manageIndexManager(address targetIndex, address manager, bool status) external onlyOwner {
        indexManagers[targetIndex][manager] = status;
    }

     /// uups interface
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        view
        onlyOwner
    { }
}
