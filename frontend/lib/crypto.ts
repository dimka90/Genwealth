import nacl from "tweetnacl";
import { encodeBase64, decodeBase64, encodeUTF8, decodeUTF8 } from "tweetnacl-util";

export const generateMasterKey = (): string => {
    const key = nacl.randomBytes(nacl.secretbox.keyLength);
    return encodeBase64(key);
};

export const encryptWithKey = (message: string, keyBase64: string): string => {
    const key = decodeBase64(keyBase64);
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    const messageUint8 = encodeUTF8(message);
    const box = nacl.secretbox(messageUint8, nonce, key);

    const fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    return encodeBase64(fullMessage);
};

export const decryptWithKey = (encryptedBase64: string, keyBase64: string): string | null => {
    try {
        const key = decodeBase64(keyBase64);
        const fullMessage = decodeBase64(encryptedBase64);
        const nonce = fullMessage.slice(0, nacl.secretbox.nonceLength);
        const message = fullMessage.slice(nacl.secretbox.nonceLength, fullMessage.length);

        const decrypted = nacl.secretbox.open(message, nonce, key);

        if (!decrypted) {
            return null;
        }

        return decodeUTF8(decrypted);
    } catch (e) {
        console.error("Decryption operation failed", e);
        return null;
    }
};

/**
 * Derives a key from a password using PBKDF2.
 * Returns the derived key as a Base64 string.
 * Uses a fixed salt if not provided (NOT RECOMMENDED for production without random salt storage)
 * For this implementation, we will assume the salt is managed by the caller or included in the protocol.
 */
export const deriveKeyFromPassword = async (password: string, salt: string): Promise<string> => {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );

    const key = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: enc.encode(salt),
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const exported = await window.crypto.subtle.exportKey("raw", key);
    return encodeBase64(new Uint8Array(exported));
};

/**
 * Encrypts the master key with a password-derived key.
 * Generates a random salt, derives key, encrypts master key.
 * Returns format: "salt:ciphertext" (Base64 encoded parts)
 */
export const encryptMasterKeyWithPassword = async (masterKey: string, password: string): Promise<string> => {
    const salt = encodeBase64(nacl.randomBytes(16)); // 16 bytes random salt
    const derivedKey = await deriveKeyFromPassword(password, salt);
    const encryptedMasterKey = encryptWithKey(masterKey, derivedKey);
    return `${salt}:${encryptedMasterKey}`;
};

/**
 * Decrypts the master key using a password.
 * Extracts salt from the blob, derives key, decrypts.
 */
export const decryptMasterKeyWithPassword = async (blob: string, password: string): Promise<string | null> => {
    try {
        const [salt, encryptedMasterKey] = blob.split(':');
        if (!salt || !encryptedMasterKey) return null;

        const derivedKey = await deriveKeyFromPassword(password, salt);
        return decryptWithKey(encryptedMasterKey, derivedKey);
    } catch (e) {
        console.error("Master key decryption failed", e);
        return null;
    }
};
