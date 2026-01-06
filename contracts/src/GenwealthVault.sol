// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title GenwealthVault
 * @dev Implements a Dead Man's Switch for digital legacy management on Base.
 */
contract GenwealthVault {
    struct VaultSettings {
        uint256 lastCheckIn;
        uint256 inactivityPeriod;
        bool recoveryActive;
    }

    // owner => VaultSettings
    mapping(address => VaultSettings) public vaults;
    
    // owner => trustee => isAuthorized
    mapping(address => mapping(address => bool)) public isTrustee;

    event TrusteeAdded(address indexed owner, address indexed trustee);
    event RecoveryCancelled(address indexed owner);

    error NotOwner();

    /**
     * @dev Initialize or update vault settings.
     * @param _inactivityPeriod The time in seconds after which recovery can be initiated.
     */
    function setupVault(uint256 _inactivityPeriod) external {
        vaults[msg.sender].lastCheckIn = block.timestamp;
        vaults[msg.sender].inactivityPeriod = _inactivityPeriod;
        vaults[msg.sender].recoveryActive = false;
        
        emit CheckedIn(msg.sender, block.timestamp);
    }

    /**
     * @dev User checks in to reset the inactivity timer.
     */
    function checkIn() external {
        vaults[msg.sender].lastCheckIn = block.timestamp;
        if (vaults[msg.sender].recoveryActive) {
            vaults[msg.sender].recoveryActive = false;
            emit RecoveryCancelled(msg.sender);
        }
        emit CheckedIn(msg.sender, block.timestamp);
    }

    /**
     * @dev Add a trustee who can initiate recovery.
     */
    function addTrustee(address _trustee) external {
        isTrustee[msg.sender][_trustee] = true;
        emit TrusteeAdded(msg.sender, _trustee);
    }

    /**
     * @dev Remove a trustee.
     */
    function removeTrustee(address _trustee) external {
        isTrustee[msg.sender][_trustee] = false;
    }
}
