import * as nacl from "tweetnacl";
import { randomBytes, createHash } from "crypto";

/**
 * CryptoService class provides methods for encryption and decryption.
 * @author Semeton Balogun <balogunsemeton@gmail.com>
 * January 2024
 */
class CryptoService implements ICryptoInterface {
  private key: string;

  /**
   * Constructor for CryptoService class.
   * Initializes the key used for encryption and decryption.
   */
  constructor() {
    this.key =
      "a80070d3253ccc0c5b9b7e235ae6783a5a6474175399582fd51003bab6250139";
  }

  /**
   * Encrypts a message using a secret code.
   * @param {string} message - The message to encrypt.
   * @param {string} secretCode - The secret code to use for encryption.
   * @returns {string} - The encrypted message.
   */
  public encrypt(message: string, secretCode: string): string {
    const nonce = randomBytes(nacl.secretbox.nonceLength);
    const keyHash = createHash("sha256")
      .update(this.key + secretCode)
      .digest();
    const cipher = Buffer.concat([
      nonce,
      nacl.secretbox(Buffer.from(message), nonce, keyHash)
    ]);

    return cipher.toString("base64");
  }

  /**
   * Decrypts an encrypted message using a secret code.
   * @param {string} encrypted - The encrypted message to decrypt.
   * @param {string} secretCode - The secret code to use for decryption.
   * @returns {string | null} - The decrypted message, or null if decryption failed.
   */
  public decrypt(encrypted: string, secretCode: string): string | null {
    const cipher = Buffer.from(encrypted, "base64");
    const nonce = cipher.slice(0, nacl.secretbox.nonceLength);
    const box = cipher.slice(nacl.secretbox.nonceLength);
    const keyHash = createHash("sha256")
      .update(this.key + secretCode)
      .digest();
    const plain = nacl.secretbox.open(box, nonce, keyHash);

    if (!plain) {
      return null;
    }

    return Buffer.from(plain).toString();
  }
}

export default CryptoService;
