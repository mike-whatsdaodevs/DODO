// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import {Enum} from "../libraries/Enum.sol";

interface IIndex {

    struct SwapAmountInAndOut {
        uint256 amountIn;
        uint256 amountOut;
    }

    struct ExactSwapParams {
        bytes path;
        address recipient;
        uint256 amountIn;
        uint256 amountOutMinimum;
    }

    struct SetBalnaceParams {
        address tokenIn;
        address tokenOut;
        uint256[] positionIds;
        uint256 offset; 
        uint256 size;
    }

    event CreatedIndex(
        uint256 indexed id, 
        address indexed indexAddress,
        uint256 feeRate,
        string name,
        uint256 timestamp
    );

    event CreatePosition(
        uint256 indexed positionId,
        uint256 amount,
        uint128 currentIndex, 
        uint128 healthFactor,
        uint256 expiration,
        uint256 timestamp
    );

    event SetBenchMark(
        address[] tokens, 
        uint256[] prices,
        uint256 timestamp
    );

    event Swap(
        address indexed tokenIn, 
        address indexed tokenOut, 
        uint256 amountIn, 
        uint256 amountOut, 
        uint256 timestamp
    );


    event PositionsSwap(uint256 indexed counter, uint256 positionCount, bytes32 positionHash, uint256 amountOut);

    event Withdraw(uint256 indexed positionId, address indexed owner, uint256 amount, uint256 timestamp);

    event ChangeFeeRate(address indexed indexAddress, uint256 old, uint256 newRate, uint256 timestamp);

    error TokenNotAllow(address token);

    error RecipientNotAllow(address recipient);

    error AmountInError(uint256 amountIn);

    error ProtocolNotAllowed(address protocol);

    function initialize(uint256 indexId, bool isDynamicIndex, string memory indexName, address _filter) external;

    function positionId() external view returns (uint256);

    function feeRate() external view returns (uint256);

    function positionBalance(uint256 positionId, address token) external view returns (uint256);

    function positionStatus(uint256 positionId) external view returns(Enum.PositionStatus); 

    function createPosition(
        address initialOwner, 
        uint256 amount,
        uint128 currentIndex,
        uint128 healthFactor,
        uint256 expiration
    ) external returns (uint256);

    function checkPositionOwner(
        uint256 positionId, 
        address ownerAddress
    ) external view returns (bool);

    function withdraw(uint256 positionId, address recipient) external returns (uint256 amount);

    function changePositionStatus(
        uint256 positionId, 
        Enum.PositionStatus status
    ) external;

    function swapMultiCall(uint256[][] memory positionIdsArray, bytes[] calldata data) external payable;

    function setPositionsSwithBalance(
        address tokenBefore, 
        address tokenAfter, 
        uint256[] calldata positionIds
    ) external;
}
