// src/db/vault.ts
import Vault, { SecretType } from "../model/vault";
import { Op } from "sequelize";
import User from "../model/user";

export interface CreateVaultData {
  userId: string;
  title: string;
  description?: string;
  encryptedSecret: string;
  encryptedAESKey: string;
  secretType?: SecretType;
  ipfsHash?: string;
  fileName?: string;
  fileSize?: number;
}

export interface UpdateVaultData {
  title?: string;
  description?: string;
  encryptedSecret?: string;
  encryptedAESKey?: string;
  secretType?: SecretType;
  ipfsHash?: string;
  fileName?: string;
  fileSize?: number;
  isActive?: boolean;
}

export async function createVault(vaultData: CreateVaultData): Promise<Vault> {
  try {
    // Verify user exists
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
          attributes: ['id', 'email', 'walletAddress']
        }
      ]
    });
  } catch (error: any) {
    throw new Error(`Failed to get vault by ID: ${error.message}`);
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

export async function getVaultsByType(userId: string, secretType: SecretType): Promise<Vault[]> {
  try {
    return await Vault.findAll({
      where: { 
        userId,
        secretType,
        isActive: true
      },
      order: [['createdAt', 'DESC']]
    });
  } catch (error: any) {
    throw new Error(`Failed to get vaults by type: ${error.message}`);
  }
}

export async function updateVault(id: string, updateData: UpdateVaultData): Promise<Vault> {
  try {
    const vault = await Vault.findByPk(id);
    if (!vault) {
      throw new Error('Vault not found');
    }

    await vault.update(updateData);
    return vault;
  } catch (error: any) {
    throw new Error(`Failed to update vault: ${error.message}`);
  }
}

export async function deleteVault(id: string, userId: string): Promise<boolean> {
  try {
    const vault = await Vault.findOne({
      where: { id, userId }
    });
    
    if (!vault) {
      throw new Error('Vault not found or unauthorized');
    }

    // Soft delete - set isActive to false
    await vault.update({ isActive: false });
    return true;
  } catch (error: any) {
    throw new Error(`Failed to delete vault: ${error.message}`);
  }
}

export async function hardDeleteVault(id: string, userId: string): Promise<boolean> {
  try {
    const vault = await Vault.findOne({
      where: { id, userId }
    });
    
    if (!vault) {
      throw new Error('Vault not found or unauthorized');
    }

    await vault.destroy();
    return true;
  } catch (error: any) {
    throw new Error(`Failed to permanently delete vault: ${error.message}`);
  }
}

export async function getUserVaultStats(userId: string): Promise<any> {
  try {
    const stats = await Vault.findAll({
      where: { userId, isActive: true },
      attributes: [
        'secretType',
        [Vault.sequelize!.fn('COUNT', Vault.sequelize!.col('id')), 'count']
      ],
      group: ['secretType'],
      raw: true
    });

    const total = await Vault.count({
      where: { userId, isActive: true }
    });

    return {
      total,
      byType: stats
    };
  } catch (error: any) {
    throw new Error(`Failed to get vault stats: ${error.message}`);
  }
}

export async function searchVaults(userId: string, searchTerm: string): Promise<Vault[]> {
  try {
    return await Vault.findAll({
      where: {
        userId,
        isActive: true,
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchTerm}%` } },
          { description: { [Op.iLike]: `%${searchTerm}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
  } catch (error: any) {
    throw new Error(`Failed to search vaults: ${error.message}`);
  }
}   

export async function getFileVaults(userId: string): Promise<Vault[]> {
  try {
    return await Vault.findAll({
      where: {
        userId,
        secretType: SecretType.DOCUMENT,
        ipfsHash: {
          [Op.ne]: null
        },
        isActive: true
      },
      order: [['createdAt', 'DESC']]
    });
  } catch (error: any) {
    throw new Error(`Failed to get file vaults: ${error.message}`);
  }
}
