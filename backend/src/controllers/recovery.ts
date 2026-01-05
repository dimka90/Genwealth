
import { Request, Response } from "express";
import {
  getVaultById,
  findVaultByRecoveryToken,
  getVaultsRequiringRecovery,
} from "../db/vault";
import { VaultRecoveryStatus } from "../model/vault";
import emailService from "../services/email";

export async function initiateVaultRecoveryController(
  req: Request,
  res: Response
): Promise<Response> {
  const { vaultId } = req.params;

  if (!vaultId) {
    return res.status(400).send({
      success: false,
      message: "Vault ID is required",
    });
  }

  try {
    const vault = await getVaultById(vaultId);

    if (!vault) {
      return res.status(404).send({
        success: false,
        message: "Vault not found",
      });
    }

    if (!vault.trusteeEmail) {
      return res.status(400).send({
        success: false,
        message: "Vault has no assigned trustee",
      });
    }

    if (vault.recoveryStatus === VaultRecoveryStatus.ACTIVE || vault.recoveryStatus === VaultRecoveryStatus.PENDING) {
      return res.status(400).send({
        success: false,
        message: "Recovery is already in progress or completed",
      });
    }

    // Generate recovery token
    const crypto = require("crypto");
    const recoveryToken = crypto.randomBytes(32).toString("hex");

    // Update vault
    vault.recoveryToken = recoveryToken;
    vault.recoveryStatus = VaultRecoveryStatus.PENDING;
    await vault.save();

    const recoveryLink = `${process.env.FRONTEND_URL || "http://localhost:3000"
      }/recovery/${recoveryToken}`;
    if (process.env.NODE_ENV !== "test") {
      await emailService.sendRecoveryNotification({
        trusteeEmail: vault.trusteeEmail!,
        ownerEmail: vault.user?.email || "Unknown",
        ownerName: vault.user?.email || "Unknown User",
        vaultTitle: vault.title,
        recoveryToken,
        recoveryLink,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Recovery initiated successfully",
      data: {
        recoveryToken,
        recoveryLink,
        trusteeEmail: vault.trusteeEmail,
        vaultInfo: {
          title: vault.title,
          description: vault.description,
          secretType: vault.secretType
        },
        emailSent: process.env.NODE_ENV !== "test",
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

// Validate recovery token and show recovery page info
export async function validateRecoveryTokenController(
  req: Request,
  res: Response
): Promise<Response> {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send({
      success: false,
      message: "Recovery token is required",
    });
  }

  try {
    const vault = await findVaultByRecoveryToken(token);

    if (!vault) {
      return res.status(404).send({
        success: false,
        message: "Invalid or expired recovery token",
      });
    }

    if (vault.recoveryStatus !== VaultRecoveryStatus.PENDING && vault.recoveryStatus !== VaultRecoveryStatus.ACTIVE) {
      return res.status(400).send({
        success: false,
        message: "Recovery process is not active for this vault",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Recovery token is valid",
      data: {
        vault: {
          title: vault.title,
          description: vault.description,
          secretType: vault.secretType
        },
        ownerEmail: vault.user?.email,
        ownerName: vault.user?.email?.split("@")[0], // Simple name extraction
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
}

// Attempt to recover vault with recovery password
