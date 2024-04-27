// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

contract Enum {
    
    enum PositionStatus {
        UN_CREATED,
        CREATED,
        SPOT,
        FINISH,
        REQUEST_LIQUIDATION,
        LIQUIDATION
    }
}
