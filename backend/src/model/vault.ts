
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import User from "./user";

export enum SecretType {
  NOTE = "note",
  DOCUMENT = "document",
  OTHER = "other"
}

export enum VaultRecoveryStatus {
  NONE = "none",
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed"
}

class Vault extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public encryptedSecret!: string;
  public encryptedKeyForUser!: string;
  public secretType!: SecretType;
  public ipfsHash!: string | null;
  public fileName!: string | null;
  public fileSize!: number | null;
  public trusteeEmail!: string | null;
  public threshold!: number;
  public currentApprovals!: number;
  public isActive!: boolean;
  public recoveryStatus!: VaultRecoveryStatus;
  public recoveryToken!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly user?: User;
}

Vault.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    encryptedSecret: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    encryptedKeyForUser: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    secretType: {
      type: DataTypes.ENUM(...Object.values(SecretType)),
      defaultValue: SecretType.NOTE,
    },
    ipfsHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trusteeEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      }
    },
    threshold: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    currentApprovals: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    recoveryStatus: {
      type: DataTypes.ENUM(...Object.values(VaultRecoveryStatus)),
      defaultValue: VaultRecoveryStatus.NONE,
    },
    recoveryToken: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "vaults",
  }
);

Vault.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Vault, { foreignKey: "userId", as: "vaults" });

export default Vault;

