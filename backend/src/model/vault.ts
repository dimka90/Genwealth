import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import User from "./user";

export enum SecretType {
  SEED_PHRASE = 'seed_phrase',
  PASSWORD = 'password',
  DOCUMENT = 'document',
  NOTE = 'note',
  PRIVATE_KEY = 'private_key',
  BANK_DETAILS = 'bank_details'
}

class Vault extends Model {
  public id!: string;
  public userId!: string;
  public title!: string;
  public description!: string | null;
  public encryptedSecret!: string;
  public encryptedAESKey!: string;
  public secretType!: SecretType;
  public ipfsHash!: string | null;
  public fileName!: string | null;
  public fileSize!: number | null;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Virtual field to check if it's a file
  public get isFile(): boolean {
    return this.secretType === SecretType.DOCUMENT && !!this.ipfsHash;
  }

  // Method to get display info
  public getDisplayInfo() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      secretType: this.secretType,
      isFile: this.isFile,
      fileName: this.fileName,
      fileSize: this.fileSize,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

Vault.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    encryptedSecret: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'encrypted_secret'
    },
    encryptedAESKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'encrypted_aes_key'
    },
    secretType: {
      type: DataTypes.ENUM(...Object.values(SecretType)),
      allowNull: false,
      defaultValue: SecretType.NOTE,
      field: 'secret_type'
    },
    ipfsHash: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ipfs_hash'
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'file_name'
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'file_size'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    }
  },
  {
    sequelize,
    tableName: "vaults",
    modelName: "Vault",
    timestamps: true,
    underscored: true
  }
);

Vault.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Vault, { foreignKey: 'userId', as: 'vaults' });

export default Vault;