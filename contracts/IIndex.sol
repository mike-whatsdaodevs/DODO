// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface IIndex {
    
    /// index id
    function id() external view returns (uint256);
    
    /// index name
    function name() external view returns (string memory);

    /**
     * @dev get index fund Operators 
     * 
     * @return Operators
     */
    function fundOperators() external view returns(address[] memory);

    /**
     * @dev fund amount on index
     * 
     * @param token token address
     * @return amount
     */
    function fundAmount(address token) external view returns (uint256);

    /**
     * @dev fee rate of index
     * 
     * @return uint256
     */
    function feeRate() external view returns (uint256);

    /**
     * @dev fee amount of index
     * 
     * @param token: token address
     * 
     * @return uint256
     */
    function feeAmount(address token) external view returns (uint256);

    /**
     * @dev index supoorts tokens
     * 
     * @return tokens address
     */
    function supportTokens() external view returns (address[] memory);

    /**
     * @dev check if index supports token
     * 
     * @param token address
     * 
     * @return bool
     */
    function isSupportToken(address token) external view returns (bool);

    /**
     * @dev list all allowed lps
     * 
     * @return lps
     */
    function allowedLps() external view returns (address[] memory);

    /**
     * @dev check if index supports lp
     * 
     * @param lp address
     * 
     * @return bool
     */
    function isAllowedLps(address lp) external view returns (bool);

    /**
     * @dev get position token amount
     * 
     * @param positionId: position id
     * @param token address
     * 
     * @return uint256
     */
    function getPositionAmount(uint256 positionId, address token) external view returns (uint256);

    /**
     * @dev get position health factor
     * 
     * @param positionId: position id
     * 
     * @return uint256
     */
    function getHealthFactor(uint256 positionId) external view returns (uint256);

    /**
     * @dev get position expiration time
     * 
     * @param positionId: position id
     * 
     * @return uint256
     */
    function getExpirationTime(uint256 positionId) external view returns (uint256);

    /**
     * @dev get position owner
     * 
     * @param positionId: position id
     * 
     * @return address
     */
    function getPositionOwner(uint256 positionId) external view returns (address);

    /**
     * @dev create position
     * 
     * @return uint256: position id
     */
    function createPosition(address initialOwner) external returns (uint256);

    /**
     * @dev buy token 
     * 
     * @param positionId: position id
     * @param token: token address
     * @param data: calldata
     */
    function buy(uint256 positionId, address token, bytes memory data) external;

    /**
     * @dev sell token 
     * 
     * @param positionId: position id
     * @param token: token address
     * @param data: calldata
     */
    function sell(uint256 positionId, address token, bytes memory data) external;

    /**
     * @dev add support token
     * 
     * @param token: token address
     */
    function addSupportToken(address token) external;

    /**
     * @dev add support lp
     * 
     * @param lp: lp address
     */
    function addAllowedLp(address lp) external;

    /**
     * @dev manage fee rate
     */
    function manageFeeRate(uint256 newFee) external;

    /**
     * @dev manage index operator
     * 
     * @param operator: operator address
     */
    function manageOperator(address operator) external;

}
