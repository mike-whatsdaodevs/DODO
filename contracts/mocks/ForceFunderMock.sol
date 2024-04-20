// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract ForceFunderMock  {
    /**
     * Convenience method for depositing eth into non-payable contracts
     * which the forked provider tests would like to impersonate
     * as a message sender.
     *
     * @param  destination   destination of eth payment
     */
    function fund(address destination) public payable {
        selfdestruct(payable(address(destination)));
    }
}
