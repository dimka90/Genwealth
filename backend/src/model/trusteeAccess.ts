
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import Vault from "./vault";
import crypto from "crypto";

class TrusteeAccess extends Model {
  public id!: number;
  public trusteeVaultId!: string;
  public originalVaultId!: number;
  public trusteeEmail!: string;
  public encryptedKeyForTrustee!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly vault?: Vault;

  // Helper to activate recovery 
  public async activateRecovery(): Promise<void> {
    this.isActive = true;
    await this.save();

    // Also update the vault status
    if (this.originalVaultId) {
      const vault = await Vault.findByPk(this.originalVaultId);
      if (vault) {
        // Generate a recovery token for the vault owner to potentially reclaim?
        // Or strictly for the trustee to use?
        // For now, just mark vault as in recovery.
        // Import enum from Vault to avoid circular dep issues in value assignment if possible, 
        // or just use string 'active' if that matches the enum.
        // Using 'active' string to match VaultRecoveryStatus.ACTIVE
        await vault.update({
          recoveryStatus: 'active'
        });
      }
    }
  }

  public static generateVaultId(): string {
    return crypto.randomUUID();
  }
}

TrusteeAccess.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trusteeVaultId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    originalVaultId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Vault,
        key: "id",
      },
    },
    trusteeEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    encryptedKeyForTrustee: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    sequelize,
    tableName: "trustee_access",
  }
);

TrusteeAccess.belongsTo(Vault, { foreignKey: "originalVaultId", as: "vault" });
Vault.hasOne(TrusteeAccess, { foreignKey: "originalVaultId", as: "trusteeAccess" });

export default TrusteeAccess;