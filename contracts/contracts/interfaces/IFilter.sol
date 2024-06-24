// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

interface IFilter {

    function addIndexTokens(address[] memory addrs) external;
    
    function indexTokensLenth() external view returns (uint256);

    function removeIndexTokens(address[] memory addrs) external;

    function addAllowedProtocols(address[] memory protocols) external;

    function removeAllowedProtocols(address[] memory protocols) external;

    function manageAllowedToken(address token, bool status) external;
    /**
     * @dev index supoorts tokens
     * 
     * @return tokens address
     */
    function getIndexTokens() external view returns (address[] memory);
    /**
     * @dev index supoorts tokens
     * 
     * @return tokens address
     */
    function isAllowedToken(address token) external view returns (bool);
    /**
     * @dev list all allowed lps
     * 
     * @return lps
     */
    function getAllowedProtocols() external view returns (address[] memory);

    /**
     * @dev check if index supports lp
     * 
     * @param lp address
     * 
     * @return bool
     */
    function isAllowedProtocols(address lp) external view returns (bool);
}
