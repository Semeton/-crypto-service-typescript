# CryptoService

CryptoService is an encryption and decryption package for Node.js applications written in TypeScript. It uses the Sodium cryptographic library, ported to JavaScript via the tweetnacl library, to provide secure, efficient encryption and decryption functions. The package is designed to be easy to use, with a simple API that integrates seamlessly into any Node.js application. It's perfect for applications that need to handle sensitive data securely

## Installation

Installing CryptoService is a breeze with the package manager [npm install sm-crypto-service](https://www.npmjs.com/). Follow the link to download and install npm if you have not already.

## CryptoService Class Documentation

### Overview

The `CryptoService` class provides encryption and decryption services using the Sodium cryptographic library. It uses a secret key of a 64 bits of random string.

### Methods

#### `encrypt(message: string, secretCode: string): string`

This method encrypts a given message.

- Parameters:
  - `message` (string): The message to be encrypted.
  - `secretCode` (string): A secret code used in the encryption process.
- Returns: The encrypted message as a base64-encoded string.
- Description: This method generates a random nonce and uses it along with the `message` and a hashed combination of `key` and `secretCode` to create an encrypted cipher. The cipher is then base64-encoded for safe transmission or storage. The memory of the `message` and `key` is cleared after encryption for security reasons.

#### `decrypt(encrypted: string, secretCode: string): string`

This method decrypts a given encrypted message.

- Parameters:
  - `encrypted` (string): The message to be decrypted.
  - `secretCode` (string): A secret code used in the decryption process.
- Returns: The decrypted message as a string. If decryption fails, it returns an error message.
- Description: This method decodes the `encrypted` message, extracts the nonce and ciphertext, and attempts to decrypt the ciphertext using the nonce and a hashed combination of `key` and `secretCode`. If decryption is successful and the result is a string, it returns the decrypted message. If decryption fails or the result is not a string, it returns an error message. The memory of the ciphertext and `key` is cleared after decryption for security reasons.
