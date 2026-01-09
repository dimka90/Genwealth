// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/GenwealthVault.sol";

contract GenwealthVaultDMSTest is Test {
    GenwealthVault public vault;
    address public owner = address(1);
    address public trustee = address(2);

    function setUp() public {
        vault = new GenwealthVault();
        vm.startPrank(owner);
    }

    function testSetupVault() public {
        vault.setupVault(30 days);
        GenwealthVault.VaultSettings memory settings = vault.getVaultSettings(owner);
        assertEq(settings.inactivityPeriod, 30 days);
    }

    function testCheckIn() public {
        vault.setupVault(30 days);
        
        vm.warp(block.timestamp + 10 days);
        vault.checkIn();
        
        GenwealthVault.VaultSettings memory settings = vault.getVaultSettings(owner);
        assertEq(settings.lastCheckIn, block.timestamp);
    }

    function testTrusteeEvent() public {
        vm.expectEmit(true, true, false, false);
        emit GenwealthVault.TrusteeAdded(owner, trustee);
        vault.addTrustee(trustee);
    }

    function testGetSettings() public {
        vault.setupVault(100);
        GenwealthVault.VaultSettings memory settings = vault.getVaultSettings(owner);
        assertEq(settings.inactivityPeriod, 100);
    }
}
