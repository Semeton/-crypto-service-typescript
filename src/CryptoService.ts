import * as nacl from "tweetnacl";
import { randomBytes, createHash } from "crypto";

class CryptoService {
  private key: string;

  constructor() {
    this.key =
      "a80070d3253ccc0c5b9b7e235ae6783a5a6474175399582fd51003bab6250139";
  }

  encrypt(message: string, secretCode: string): string {
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

  decrypt(encrypted: string, secretCode: string): string | null {
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
