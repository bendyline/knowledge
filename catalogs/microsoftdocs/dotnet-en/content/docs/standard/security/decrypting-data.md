---
title: "Decrypting data"
description: Learn how to decrypt data in .NET, using a symmetric algorithm or an asymmetric algorithm.
ms.date: 11/14/2022
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "data [.NET], decryption"
  - "symmetric decryption"
  - "asymmetric decryption"
  - "decryption"
ms.topic: how-to
---

# Decrypting data

Decryption is the reverse operation of encryption. For secret-key encryption, you must know both the key and IV that were used to encrypt the data. For public-key encryption, you must know either the public key (if the data was encrypted using the private key) or the private key (if the data was encrypted using the public key).

## Symmetric decryption

The decryption of data encrypted with symmetric algorithms is similar to the process used to encrypt data with symmetric algorithms. The [System.Security.Cryptography.CryptoStream](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoStream) class is used with symmetric cryptography classes provided by .NET to decrypt data read from any managed stream object.

The following example illustrates how to create a new instance of the default implementation class for the [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes) algorithm. The instance is used to perform decryption on a [System.Security.Cryptography.CryptoStream](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoStream) object. This example first creates a new instance of the [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes) implementation class. It reads the initialization vector (IV) value from a managed stream variable, `fileStream`. Next it instantiates a [System.Security.Cryptography.CryptoStream](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoStream) object and initializes it to the value of the `fileStream` instance. The [System.Security.Cryptography.SymmetricAlgorithm.CreateDecryptor*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.CreateDecryptor*) method from the [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes) instance is passed the IV value and the same key that was used for encryption.

```vb
Dim aes As Aes = Aes.Create()
Dim cryptStream As New CryptoStream(
    fileStream, aes.CreateDecryptor(key, iv), CryptoStreamMode.Read)
```

```csharp
Aes aes = Aes.Create();
CryptoStream cryptStream = new CryptoStream(
    fileStream, aes.CreateDecryptor(key, iv), CryptoStreamMode.Read);
```

The following example shows the entire process of creating a stream, decrypting the stream, reading from the stream, and closing the streams. A file stream object is created that reads a file named *TestData.txt*. The file stream is then decrypted using the **CryptoStream** class and the **Aes** class. This example specifies key value that is used in the symmetric encryption example for [Encrypting Data](encrypting-data.md). It does not show the code needed to encrypt and transfer these values.

[language="csharp" source="snippets/decrypting-data/csharp/aes-decrypt.cs"::: (complete source file; reference: snippets/decrypting-data/csharp/aes-decrypt.cs)](../../../_code/docs/standard/security/snippets/decrypting-data/csharp/aes-decrypt.cs.md)
[language="vb" source="snippets/decrypting-data/vb/aes-decrypt.vb"::: (complete source file; reference: snippets/decrypting-data/vb/aes-decrypt.vb)](../../../_code/docs/standard/security/snippets/decrypting-data/vb/aes-decrypt.vb.md)

The preceding example uses the same key, and algorithm used in the symmetric encryption example for [Encrypting Data](encrypting-data.md). It decrypts the *TestData.txt* file that is created by that example and displays the original text on the console.

## Asymmetric decryption

Typically, a party (party A) generates both a public and private key and stores the key either in memory or in a cryptographic key container. Party A then sends the public key to another party (party B). Using the public key, party B encrypts data and sends the data back to party A. After receiving the data, party A decrypts it using the private key that corresponds. Decryption will be successful only if party A uses the private key that corresponds to the public key Party B used to encrypt the data.

For information on how to store an asymmetric key in secure cryptographic key container and how to later retrieve the asymmetric key, see [How to: Store Asymmetric Keys in a Key Container](how-to-store-asymmetric-keys-in-a-key-container.md).

The following example illustrates the decryption of two arrays of bytes that represent a symmetric key and IV. For information on how to extract the asymmetric public key from the [System.Security.Cryptography.RSA](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA) object in a format that you can easily send to a third party, see [Encrypting Data](encrypting-data.md#asymmetric-encryption).

```vb
'Create a new instance of the RSA class.
Dim rsa As RSA = RSA.Create()

' Export the public key information and send it to a third party.
' Wait for the third party to encrypt some data and send it back.

'Decrypt the symmetric key and IV.
symmetricKey = rsa.Decrypt(encryptedSymmetricKey, RSAEncryptionPadding.Pkcs1)
symmetricIV = rsa.Decrypt(encryptedSymmetricIV, RSAEncryptionPadding.Pkcs1)
```

```csharp
//Create a new instance of the RSA class.
RSA rsa = RSA.Create();

// Export the public key information and send it to a third party.
// Wait for the third party to encrypt some data and send it back.

//Decrypt the symmetric key and IV.
symmetricKey = rsa.Decrypt(encryptedSymmetricKey, RSAEncryptionPadding.Pkcs1);
symmetricIV = rsa.Decrypt(encryptedSymmetricIV , RSAEncryptionPadding.Pkcs1);
```

## See also

- [Generating keys for encryption and decryption](generating-keys-for-encryption-and-decryption.md)
- [Encrypting data](encrypting-data.md)
- [Cryptographic services](cryptographic-services.md)
- [Cryptography model](cryptography-model.md)
- [Cross-platform cryptography](cross-platform-cryptography.md)
- [Timing vulnerabilities with CBC-mode symmetric decryption using padding](vulnerabilities-cbc-mode.md)
- [ASP.NET Core data protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
