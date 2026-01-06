// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/GenwealthVault.sol";

contract GenwealthVaultTest is Test {
    GenwealthVault public vault;
    address public owner = address(1);
    address public trustee = address(2);
    uint256 public inactivityPeriod = 30 days;

    function setUp() public {
        vault = new GenwealthVault();
    }

    function test_SetupVault() public {
        vm.prank(owner);
        vault.setupVault(inactivityPeriod);
        
        (uint256 lastCheckIn, uint256 period, bool active) = vault.vaults(owner);
        assertEq(lastCheckIn, block.timestamp);
        assertEq(period, inactivityPeriod);
        assertFalse(active);
    }

    function test_CheckIn() public {
        vm.prank(owner);
        vault.setupVault(inactivityPeriod);
        
        uint256 firstCheckIn = block.timestamp;
        vm.warp(block.timestamp + 10 days);
        
        vm.prank(owner);
        vault.checkIn();
        
        (uint256 lastCheckIn, , ) = vault.vaults(owner);
        assertEq(lastCheckIn, block.timestamp);
        assertGt(lastCheckIn, firstCheckIn);
    }

    function test_RecoveryFailsIfActive() public {
        vm.prank(owner);
        vault.setupVault(inactivityPeriod);
        vm.prank(owner);
        vault.addTrustee(trustee);
        
        vm.warp(block.timestamp + 29 days);
        
        vm.prank(trustee);
        vm.expectRevert(GenwealthVault.StillActive.selector);
        vault.initiateRecovery(owner);
    }

    function test_RecoverySucceedsAfterPeriod() public {
        vm.prank(owner);
        vault.setupVault(inactivityPeriod);
        vm.prank(owner);
        vault.addTrustee(trustee);
        
        vm.warp(block.timestamp + 31 days);
        
        vm.prank(trustee);
        vault.initiateRecovery(owner);
        
        assertTrue(vault.isRecoveryActive(owner));
    }

    function test_RecoveryCancelledByCheckIn() public {
        vm.prank(owner);
        vault.setupVault(inactivityPeriod);
        vm.prank(owner);
        vault.addTrustee(trustee);
        
        vm.warp(block.timestamp + 31 days);
        
        vm.prank(trustee);
        vault.initiateRecovery(owner);
        assertTrue(vault.isRecoveryActive(owner));
        
        vm.prank(owner);
        vault.checkIn();
        assertFalse(vault.isRecoveryActive(owner));
    }

    function test_OnlyTrusteeCanRecover() public {
        vm.prank(owner);
        vault.setupVault(inactivityPeriod);
        
        vm.warp(block.timestamp + 31 days);
        
        vm.prank(address(99)); // Not a trustee
        vm.expectRevert(GenwealthVault.NotTrustee.selector);
        vault.initiateRecovery(owner);
    }
}
