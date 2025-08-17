// src/services/emailService.ts
import nodemailer from 'nodemailer';

interface RecoveryEmailData {
  trusteeEmail: string;
  ownerName?: string;
  ownerEmail: string;
  vaultTitle: string;
  recoveryToken: string;
  recoveryLink: string;
}

interface WarningEmailData {
  ownerEmail: string;
  ownerName?: string;
  daysSinceLastLogin: number;
  warningThreshold: number;
  trusteesCount: number;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendRecoveryNotification(data: RecoveryEmailData): Promise<void> {
    const { trusteeEmail, ownerName, ownerEmail, vaultTitle, recoveryToken, recoveryLink } = data;

    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Digital Inheritance Recovery Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px 0; }
        .recovery-box { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .recovery-link { display: inline-block; background: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .warning { background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Digital Inheritance Recovery Request</h1>
        </div>
        
        <div class="content">
            <h2>Hello,</h2>
            
            <p>You have been designated as a trusted recovery contact for <strong>${ownerName || ownerEmail}</strong>'s digital inheritance vault.</p>
            
            <p>The vault owner has been inactive and has requested that their digital assets be made accessible through the recovery process.</p>
            
            <div class="recovery-box">
                <h3>Recovery Details:</h3>
                <ul>
                    <li><strong>Vault:</strong> ${vaultTitle}</li>
                    <li><strong>Owner:</strong> ${ownerEmail}</li>
                </ul>
            </div>
            
            <h3>What you need to do:</h3>
            <ol>
                <li>Click the recovery link below</li>
                <li>Enter the recovery password that <strong>${ownerName || 'the owner'}</strong> shared with you offline</li>
                <li>Access the protected information</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${recoveryLink}" class="recovery-link">Start Recovery Process</a>
            </div>
            <p>If you have any questions or concerns, please contact our support team.</p>
        </div>
        
        <div class="footer">
            <p>This email was sent by Digital Inheritance System. This is an automated message regarding recovery access for digital assets.</p>
        </div>
    </div>
</body>
</html>`;

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
      to: trusteeEmail,
      subject: ` Recovery Access Needed - ${vaultTitle}`,
      html: emailTemplate,
      text: `Digital Inheritance Recovery Request
      
You have been designated as a recovery contact for ${ownerEmail}'s vault: "${vaultTitle}".

Recovery Token: ${recoveryToken}
Recovery Link: ${recoveryLink}

You will need the recovery password that was shared with you offline to access the protected information.

If you did not expect this email, please contact support.`
    });
  }

  async sendInactivityWarning(data: WarningEmailData): Promise<void> {
    const { ownerEmail, ownerName, daysSinceLastLogin, warningThreshold, trusteesCount } = data;

    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Digital Inheritance - Account Activity Warning</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #fff3cd; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px 0; }
        .warning-box { background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545; }
        .action-button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Account Activity Warning</h1>
        </div>
        
        <div class="content">
            <h2>Hello ${ownerName || 'there'},</h2>
            
            <p>We noticed that you haven't logged into your Digital Inheritance account for <strong>${daysSinceLastLogin} days</strong>.</p>
            
            <div class="warning-box">
                <h3>Important Notice:</h3>
                <p>If you remain inactive for <strong>${warningThreshold} more days</strong>, the recovery process will be initiated for your protected vaults.</p>
                <p>Your ${trusteesCount} designated trustee(s) will be notified and given access to your digital inheritance.</p>
            </div>
            
            <h3>What this means:</h3>
            <ul>
                <li>Your digital assets remain secure</li>
                <li>Trustees cannot access your vaults yet</li>
                <li>You can prevent recovery by logging in</li>
                <li>This is working as designed for your protection</li>
            </ul>
            
            <h3> To prevent recovery initiation:</h3>
            <p>Simply log into your account to reset the inactivity timer.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL}/login" class="action-button"> Log Into My Account</a>
            </div>
            
            <p><strong>Was this intentional?</strong> If you're planning to be away, you can adjust your inactivity settings in your account preferences.</p>
            
            <p>If you have any questions, please contact our support team.</p>
        </div>
        
        <div class="footer">
            <p>This email was sent by Digital Inheritance System as part of your account security monitoring.</p>
        </div>
    </div>
</body>
</html>`;

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@digitalinheritance.com',
      to: ownerEmail,
      subject: ` Account Activity Warning - ${daysSinceLastLogin} days inactive`,
      html: emailTemplate,
      text: `Digital Inheritance - Account Activity Warning

Hello ${ownerName || 'there'},

You haven't logged in for ${daysSinceLastLogin} days. If you remain inactive for ${warningThreshold} more days, recovery will be initiated for your vaults.

Log in to prevent this: ${process.env.FRONTEND_URL}/login

This is working as designed for your digital inheritance protection.`
    });
  }

  async sendRecoveryCompleteNotification(ownerEmail: string, vaultTitle: string, trusteeEmail: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'Secure Vault <securevault@gmail.com>',
      to: ownerEmail,
      subject: `✅ Recovery Completed - ${vaultTitle}`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2> Digital Inheritance Recovery Completed</h2>
    <p>This is to notify you that recovery has been completed for your vault: <strong>"${vaultTitle}"</strong></p>
    <p>Recovery was successfully completed by: ${trusteeEmail}</p>
    <p>If this was unexpected, please contact support immediately.</p>
    <hr>
    <small>This is an automated notification from Digital Inheritance System.</small>
</div>`,
      text: `Digital Inheritance Recovery Completed

Your vault "${vaultTitle}" has been successfully recovered by ${trusteeEmail}.

If this was unexpected, please contact support immediately.`
    });
  }
}

export default new EmailService();