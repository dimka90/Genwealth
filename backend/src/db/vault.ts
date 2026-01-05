
import Vault, { SecretType, VaultRecoveryStatus } from "../model/vault";
import { Op } from "sequelize";
import User from "../model/user";

export interface CreateVaultData {
  userId: string;
  title: string;
  description?: string;
  encryptedSecret: string;
  encryptedKeyForUser: string;
  secretType?: SecretType;
  ipfsHash?: string;
  fileName?: string;
  fileSize?: number;
  trusteeEmail?: string;
}

export interface UpdateVaultData {
  title?: string;
  description?: string;
  encryptedSecret?: string;
  secretType?: SecretType;
  ipfsHash?: string;
  fileName?: string;
  fileSize?: number;
  isActive?: boolean;
  trusteeEmail?: string;
  recoveryStatus?: VaultRecoveryStatus;
}

export async function createVault(vaultData: CreateVaultData): Promise<Vault> {
  try {
    const user = await User.findByPk(vaultData.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const vault = await Vault.create(vaultData as any);
    return vault;
  } catch (error: any) {
    throw new Error(`Failed to create vault: ${error.message}`);
  }
}

export async function getVaultById(id: string): Promise<Vault | null> {
  try {
    return await Vault.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'walletAddress', 'lastLogin', 'inactivityMonths']
        }
      ]
    });
  } catch (error: any) {
    throw new Error(`Failed to get vault by ID: ${error.message}`);
  }
}

export async function findVaultByRecoveryToken(token: string): Promise<Vault | null> {
  try {
    return await Vault.findOne({
      where: {
        recoveryToken: token,
        isActive: true
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'walletAddress', 'lastLogin', 'inactivityMonths']
        }
      ]
    });
  } catch (error: any) {
    throw new Error(`Failed to find vault by recovery token: ${error.message}`);
  }
}

export async function getVaultsByUserId(userId: string): Promise<Vault[]> {
  try {
    return await Vault.findAll({
      where: {
        userId,
        isActive: true
      },
      order: [['createdAt', 'DESC']]
    });
  } catch (error: any) {
    throw new Error(`Failed to get vaults by user ID: ${error.message}`);
  }
}

export async function getVaultsByUserWallet(walletAddress: string): Promise<Vault[]> {
  try {
    return await Vault.findAll({
      include: [
        {
          model: User,
          as: 'user',
          where: { walletAddress },
          attributes: ['id', 'email', 'walletAddress']
        }
      ],
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });
  } catch (error: any) {
    throw new Error(`Failed to get vaults by wallet address: ${error.message}`);
  }
}


export async function getVaultsByTrustee(trusteeEmail: string): Promise<Vault[]> {
  try {
    return await Vault.findAll({
      where: {
        trusteeEmail,
        isActive: true
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'walletAddress', 'lastLogin', 'inactivityMonths']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  } catch (error: any) {
    throw new Error(`Failed to get vaults by trustee: ${error.message}`);
  }
}

// NEW: Get vaults that need recovery (inactive users with trustees)
