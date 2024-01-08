interface ICryptoInterface {
  encrypt: (message: string, secretCode: string) => string;
  decrypt: (encrypted: string, secretCode: string) => string | null;
}
