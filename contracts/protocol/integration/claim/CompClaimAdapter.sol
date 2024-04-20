// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IComptroller } from "../../../interfaces/external/IComptroller.sol";
import { ISetToken } from "../../../interfaces/ISetToken.sol";

/**
 * @title CompClaimAdapter
 * @author bronco.eth
 *
 * Claim adapter that allows managers to claim COMP from assets deposited on Compound.
 */
contract CompClaimAdapter {

    /* ============ State Variables ============ */

    // Compound Comptroller contract has a claimComp function
    // https://compound.finance/docs/comptroller#claim-comp
    IComptroller public immutable comptroller;

    /* ============ Constructor ============ */

    /**
     * Set state variables
     *
     * @param _comptroller    Address of the Compound Comptroller contract with a claimComp function
     */
    constructor(IComptroller _comptroller) public {
        comptroller = _comptroller;
    }

    /* ============ External Getter Functions ============ */

    /**
     * Generates the calldata for claiming all COMP tokens for the SetToken.
     * https://compound.finance/docs/comptroller#claim-comp
     *
     * @param _setToken     Set token address
     *
     * @return address      Comptroller holding claimable COMP (aka RewardPool)
     * @return uint256      Unused, since it claims total claimable balance
     * @return bytes        Claim calldata
     */
    function getClaimCallData(ISetToken _setToken, address /* _rewardPool */) external view returns (address, uint256, bytes memory) {
        bytes memory callData = abi.encodeWithSignature("claimComp(address)", _setToken);

        return (address(comptroller), 0, callData);
    }

    /**
     * Returns balance of COMP for SetToken
     *
     * @return uint256      Claimable COMP balance
     */
    function getRewardsAmount(ISetToken _setToken, address /* _rewardPool */) external view returns(uint256) {
        return comptroller.compAccrued(address(_setToken));
    }

    /**
     * Returns COMP token address
     *
     * @return address      COMP token address
     */
    function getTokenAddress(address /* _rewardPool */) external view returns(address) {
        return comptroller.getCompAddress();
    }
}
