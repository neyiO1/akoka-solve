// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title SocialCredits
 * @dev A conceptual ERC-1155 style contract for Verifiable Impact.
 * For the purpose of the prototype, we implement the core tracking logic.
 */
contract SocialCredits {
    address public treasury;

    // Mapping from student address to task type ID to balance
    mapping(address => mapping(uint256 => uint256)) public creditBalances;

    event CreditMinted(address indexed student, uint256 indexed taskId, uint256 amount);

    modifier onlyTreasury() {
        require(msg.sender == treasury, "Only treasury can call this");
        _;
    }

    constructor() {
        treasury = msg.sender;
    }

    // Called by Backend when a student uploads proof and it is verified by an admin
    function mintCredit(address _student, uint256 _taskId, uint256 _amount) external onlyTreasury {
        creditBalances[_student][_taskId] += _amount;
        emit CreditMinted(_student, _taskId, _amount);
    }

    function getCreditBalance(address _student, uint256 _taskId) external view returns (uint256) {
        return creditBalances[_student][_taskId];
    }
}
