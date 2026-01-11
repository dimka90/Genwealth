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
        uint8 threshold;
        bool recoveryActive;
    }

    // owner => VaultSettings
    mapping(address => VaultSettings) public vaults;
    
    // owner => trustee => isAuthorized
    mapping(address => mapping(address => bool)) public isTrustee;
    
    // owner => trustee => hasApproved
    mapping(address => mapping(address => bool)) public recoveryApprovals;
    
    // owner => currentApprovalCount
    mapping(address => uint8) public currentApprovals;

    event RecoveryInitiated(address indexed owner, address indexed initiator);
    event RecoveryThresholdMet(address indexed owner);
    event RecoveryApproved(address indexed owner, address indexed trustee);
    event RecoveryCancelled(address indexed owner);
    event CheckedIn(address indexed owner, uint256 timestamp);
    event TrusteeAdded(address indexed owner, address indexed trustee);

    error NotOwner();
    error NotTrustee();
    error StillActive();
    error RecoveryAlreadyActive();
    error AlreadyApproved();
    error InvalidThreshold();

    /**
     * @dev Initialize or update vault settings.
     * @param _inactivityPeriod The time in seconds after which recovery can be initiated.
     * @param _threshold The number of trustees required to approve recovery.
     */
    function setupVault(uint256 _inactivityPeriod, uint8 _threshold) external {
        if (_threshold == 0) revert InvalidThreshold();
        vaults[msg.sender].lastCheckIn = block.timestamp;
        vaults[msg.sender].inactivityPeriod = _inactivityPeriod;
        vaults[msg.sender].threshold = _threshold;
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
        // Reset approvals when owner checks in
        currentApprovals[msg.sender] = 0;
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
     * This starts the multi-trustee approval process.
     * @param _owner The address of the vault owner.
     */
    function initiateRecovery(address _owner) external {
        if (!isTrustee[_owner][msg.sender]) revert NotTrustee();
        if (vaults[_owner].recoveryActive) revert RecoveryAlreadyActive();
        if (recoveryApprovals[_owner][msg.sender]) revert AlreadyApproved();
        
        uint256 lastTime = vaults[_owner].lastCheckIn;
        uint256 period = vaults[_owner].inactivityPeriod;
        
        if (block.timestamp <= lastTime + period) revert StillActive();
        
        _approveRecovery(_owner);
        emit RecoveryInitiated(_owner, msg.sender);
    }

    /**
     * @dev Other trustees can approve an ongoing recovery request.
     * @param _owner The address of the vault owner.
     */
    function approveRecovery(address _owner) external {
        if (!isTrustee[_owner][msg.sender]) revert NotTrustee();
        if (vaults[_owner].recoveryActive) revert RecoveryAlreadyActive();
        if (recoveryApprovals[_owner][msg.sender]) revert AlreadyApproved();
        
        _approveRecovery(_owner);
    }

    function _approveRecovery(address _owner) internal {
        recoveryApprovals[_owner][msg.sender] = true;
        currentApprovals[_owner]++;
        
        emit RecoveryApproved(_owner, msg.sender);

        if (currentApprovals[_owner] >= vaults[_owner].threshold) {
            vaults[_owner].recoveryActive = true;
            emit RecoveryThresholdMet(_owner);
        }
    }

    /**
     * @dev Check if recovery is active for a given owner.
     */
    function isRecoveryActive(address _owner) external view returns (bool) {
        return vaults[_owner].recoveryActive;
    }

    /**
     * @dev Get all vault settings for a given owner.
     */
    function getVaultSettings(address _owner) external view returns (VaultSettings memory) {
        return vaults[_owner];
    }
}
