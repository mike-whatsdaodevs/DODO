// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Mock ChainlinkAggregator that can be passed to any contract that consumes these.
 * This contract was implemented for the PerpV2 fixture as a substitute for the smock-ed
 * aggregators they use in their own test suite.
 */
contract ChainlinkAggregatorMock {
    int256 public latestAnswer;
    uint80 public latestRoundId;
    uint256 public latestStartedAt;
    uint256 public latestUpdatedAt;
    uint80 public latestAnsweredInRound;
    uint8 public decimals;

    // Perp sets this to `6` in their fixtures...
    constructor(uint8 _decimals) public {
        decimals = _decimals;
    }

    /**
     * Typical usage for setting the BaseToken oracle to 100 is:
     *
     * ```
     *  await mockAggregator.setLatestAnswer(ethers.utils.parseUnits("100", 6));
     * ```
     */
    function setLatestAnswer(int256 _latestAnswer) public {
        latestAnswer = _latestAnswer;
    }

    /**
     * Typical usage for setting the BaseToken oracle to 100 is:
     *
     * ```
     *  await mockAggregator.setRoundData(0, ethers.utils.parseUnits("100", 6),0,0,0);
     * ```
     */
    function setRoundData(
        uint80 _roundId,
        int256 _answer,
        uint256 _startedAt,
        uint256 _updatedAt,
        uint80 _answeredInRound
    )
        public
    {
        latestRoundId = _roundId;
        latestAnswer = _answer;
        latestStartedAt = _startedAt;
        latestUpdatedAt = _updatedAt;
        latestAnsweredInRound = _answeredInRound;
    }

    // Consumed by PerpV2.ChainlinkPriceFeed
    function getRoundData(uint80 /* _roundId */)
        public
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            latestRoundId,
            latestAnswer,
            latestStartedAt,
            latestUpdatedAt,
            latestAnsweredInRound
        );
    }

    // Consumed by PerpV2.ChainlinkPriceFeed
    function latestRoundData()
        public
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            latestRoundId,
            latestAnswer,
            latestStartedAt,
            latestUpdatedAt,
            latestAnsweredInRound
        );
    }
}

