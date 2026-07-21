// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IEsusuPool} from "./interfaces/IEsusuPool.sol";

/// @title EsusuPool
/// @notice A decentralized rotating savings pool
/// @dev Implements a basic Esusu rotation mechanism with idempotency checks
contract EsusuPool is IEsusuPool, Ownable, ReentrancyGuard {
    uint256 public immutable contributionAmount;
    uint256 public immutable maxMembers;
    
    address[] public members;
    mapping(address => bool) public isMember;
    mapping(bytes32 => bool) public processedContributions;
    
    uint256 public currentRotationIndex;
    
    /// @notice Constructor to initialize the pool
    /// @param _contributionAmount The fixed amount each member must contribute per round
    /// @param _maxMembers The maximum number of members in the pool
    constructor(uint256 _contributionAmount, uint256 _maxMembers) Ownable(msg.sender) {
        require(_contributionAmount > 0, "Contribution must be > 0");
        require(_maxMembers > 0, "Max members must be > 0");
        contributionAmount = _contributionAmount;
        maxMembers = _maxMembers;
    }

    /// @notice Allows a user to join the pool
    function joinPool() external {
        require(members.length < maxMembers, "Pool is full");
        require(!isMember[msg.sender], "Already a member");

        members.push(msg.sender);
        isMember[msg.sender] = true;

        emit MemberJoined(msg.sender);
    }

    /// @notice Contributes funds to the pool
    /// @param contributionId A unique ID to prevent double contributions
    function contribute(bytes32 contributionId) external payable nonReentrant {
        require(isMember[msg.sender], "Not a member");
        require(msg.value == contributionAmount, "Incorrect contribution amount");
        require(!processedContributions[contributionId], "Contribution already processed");

        processedContributions[contributionId] = true;

        emit ContributionMade(msg.sender, msg.value, contributionId);
    }

    /// @notice Executes the rotation, sending pooled funds to the next member
    /// @dev Can be called by anyone, usually an automated keeper or the owner
    function executeRotation() external nonReentrant {
        require(members.length > 0, "No members in pool");
        require(address(this).balance > 0, "No funds to rotate");
        
        uint256 poolBalance = address(this).balance;
        address receiver = members[currentRotationIndex % members.length];
        
        currentRotationIndex++;
        
        (bool success, ) = receiver.call{value: poolBalance}("");
        require(success, "Transfer failed");

        emit RotationExecuted(receiver, poolBalance, currentRotationIndex - 1);
    }

    /// @notice Emergency withdrawal for owner (e.g. if rotation gets stuck)
    function withdrawEmergency() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed");
        
        emit EmergencyWithdrawal(owner(), balance);
    }
}
