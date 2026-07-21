// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title IEsusuPool
/// @notice Interface for the EsusuPool contract
interface IEsusuPool {
    event MemberJoined(address indexed member);
    event ContributionMade(address indexed member, uint256 amount, bytes32 indexed contributionId);
    event RotationExecuted(address indexed receiver, uint256 amount, uint256 rotationIndex);
    event EmergencyWithdrawal(address indexed member, uint256 amount);

    function joinPool() external;
    function contribute(bytes32 contributionId) external payable;
    function executeRotation() external;
    function withdrawEmergency() external;
}
