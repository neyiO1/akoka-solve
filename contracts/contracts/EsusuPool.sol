// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title EsusuPool
 * @dev A smart contract for decentralized savings pools on Polygon Amoy.
 * It holds the rotation queue, round states, and tracks USDC deposits.
 */
contract EsusuPool {
    address public treasury;
    uint256 public constant POOL_CONTRIBUTION_AMOUNT = 6500000; // $6.50 USDC (6 decimals)
    
    struct Participant {
        address wallet;
        bool hasContributed;
        bool hasReceivedPayout;
    }

    Participant[] public rotationQueue;
    uint256 public currentRound;

    event ContributionReceived(address indexed participant, uint256 amount, uint256 round);
    event PayoutExecuted(address indexed participant, uint256 amount, uint256 round);

    modifier onlyTreasury() {
        require(msg.sender == treasury, "Only treasury can call this");
        _;
    }

    constructor() {
        treasury = msg.sender;
        currentRound = 1;
    }

    // Called by the Backend Treasury when Paystack confirms Naira receipt
    function recordContribution(address _participant) external onlyTreasury {
        bool found = false;
        for (uint i = 0; i < rotationQueue.length; i++) {
            if (rotationQueue[i].wallet == _participant) {
                require(!rotationQueue[i].hasContributed, "Already contributed this round");
                rotationQueue[i].hasContributed = true;
                found = true;
                break;
            }
        }

        if (!found) {
            rotationQueue.push(Participant({
                wallet: _participant,
                hasContributed: true,
                hasReceivedPayout: false
            }));
        }

        emit ContributionReceived(_participant, POOL_CONTRIBUTION_AMOUNT, currentRound);
    }

    // Called by Treasury to disburse funds to the next person in rotation
    function executePayout(address _recipient) external onlyTreasury {
        for (uint i = 0; i < rotationQueue.length; i++) {
            if (rotationQueue[i].wallet == _recipient) {
                require(!rotationQueue[i].hasReceivedPayout, "Already received payout");
                rotationQueue[i].hasReceivedPayout = true;
                
                // In a real pool, this transfers ERC20 USDC. 
                // For this prototype logic, we record the state change.
                uint256 totalPayout = POOL_CONTRIBUTION_AMOUNT * rotationQueue.length;
                emit PayoutExecuted(_recipient, totalPayout, currentRound);
                
                currentRound++; // Advance the round
                break;
            }
        }
    }

    function getQueueCount() external view returns (uint256) {
        return rotationQueue.length;
    }
}
