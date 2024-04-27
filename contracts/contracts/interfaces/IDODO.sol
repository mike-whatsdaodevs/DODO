// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface IDODO {
    
    /**
     * @dev fund amount on index
     * 
     * @param indexId: index id
     * @param token: token address
     * 
     * @return amount
     */
    function indexAmount(uint256 indexId, address token) external view returns (uint256);

    /**
     * @dev get base owner
     * 
     * @return address
     */
    function owner() external view returns (address);

    /**
     * @dev create index
     * 
     * @return uint256: index id
     */
    function createIndex(string memory name) external returns (uint256);

    /**
     * @dev collect fee
     * 
     * @param indexId: index id
     */
    function collect(uint256 indexId) external;

     /**
     * @dev withdraw fund
     * 
     * @param indexId: index id
     * @param positionId: position id
     */
    function whitdrawFund(uint256 indexId, uint256 positionId) external;

}
