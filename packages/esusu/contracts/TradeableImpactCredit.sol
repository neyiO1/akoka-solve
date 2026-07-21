// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC1155URIStorage} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

/// @title TradeableImpactCredit
/// @notice An ERC-1155 token representing impact credits
contract TradeableImpactCredit is ERC1155URIStorage, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    uint256 private _currentTokenId;

    event CreditMinted(address indexed to, uint256 indexed tokenId, uint256 amount);
    event CreditRedeemed(address indexed from, uint256 indexed tokenId, uint256 amount);

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /// @notice Mints new impact credits
    /// @param to The recipient address
    /// @param amount The amount of credits to mint
    /// @param metadataUri The URI for the token metadata
    function mintCredit(address to, uint256 amount, string calldata metadataUri) external onlyRole(MINTER_ROLE) {
        _currentTokenId++;
        uint256 tokenId = _currentTokenId;
        
        _mint(to, tokenId, amount, "");
        _setURI(tokenId, metadataUri);
        
        emit CreditMinted(to, tokenId, amount);
    }

    /// @notice Burns credits to redeem them
    /// @param tokenId The ID of the credit to burn
    /// @param amount The amount to burn
    function burn(uint256 tokenId, uint256 amount) external {
        _burn(msg.sender, tokenId, amount);
        emit CreditRedeemed(msg.sender, tokenId, amount);
    }

    /// @notice Supports interface implementation for AccessControl and ERC1155
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
