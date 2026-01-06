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

    event RecoveryInitiated(address indexed owner, address indexed initiator);
    event RecoveryCancelled(address indexed owner);

    error NotOwner();
    error NotTrustee();
    error StillActive();
    error RecoveryAlreadyActive();

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

    /**
     * @dev A trustee can initiate recovery if the owner has been inactive.
     * @param _owner The address of the vault owner.
     */
    function initiateRecovery(address _owner) external {
        if (!isTrustee[_owner][msg.sender]) revert NotTrustee();
        if (vaults[_owner].recoveryActive) revert RecoveryAlreadyActive();
        
        uint256 lastTime = vaults[_owner].lastCheckIn;
        uint256 period = vaults[_owner].inactivityPeriod;
        
        if (block.timestamp <= lastTime + period) revert StillActive();
        
        vaults[_owner].recoveryActive = true;
        emit RecoveryInitiated(_owner, msg.sender);
    }

    /**
     * @dev Check if recovery is active for a given owner.
     */
    function isRecoveryActive(address _owner) external view returns (bool) {
        return vaults[_owner].recoveryActive;
    }
}
