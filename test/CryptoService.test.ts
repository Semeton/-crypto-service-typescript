import CryptoService from "../src/CryptoService";

describe("CryptoService", () => {
  let service: CryptoService;

  beforeEach(() => {
    service = new CryptoService();
  });

  it("should encrypt and decrypt correctly", () => {
    const secretCode = "mySecretCode";
    const message = "Hello, World!";

    const encrypted = service.encrypt(message, secretCode);
    const decrypted = service.decrypt(encrypted, secretCode);

    expect(decrypted).toBe(message);
  });

  it("should return null when decryption fails", () => {
    const secretCode = "mySecretCode";
    const wrongSecretCode = "wrongSecretCode";
    const message = "Hello, World!";

    const encrypted = service.encrypt(message, secretCode);
    const decrypted = service.decrypt(encrypted, wrongSecretCode);

    expect(decrypted).toBeNull();
  });

  it("should return a string when encryption is successful", () => {
    const secretCode = "mySecretCode";
    const message = "Hello, World!";

    const encrypted = service.encrypt(message, secretCode);

    expect(typeof encrypted).toBe("string");
  });
});
