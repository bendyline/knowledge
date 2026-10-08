### RSACng and DSACng are once again usable in Partial Trust scenarios

#### Details

CngLightup (used in several higher-level crypto apis, such as [System.Security.Cryptography.Xml.EncryptedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml)) and [System.Security.Cryptography.RSACng](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng) in some cases rely on full trust. These include P/Invokes without asserting [System.Security.Permissions.SecurityPermissionFlag.UnmanagedCode](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionFlag.UnmanagedCode) permissions, and code paths where [System.Security.Cryptography.CngKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CngKey) has permission demands for [System.Security.Permissions.SecurityPermissionFlag.UnmanagedCode](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermissionFlag.UnmanagedCode). Starting with the .NET Framework 4.6.2, CngLightup was used to switch to [System.Security.Cryptography.RSACng](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng) wherever possible. As a result, partial trust apps that successfully used [System.Security.Cryptography.Xml.EncryptedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml) began to fail and throw [System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException) exceptions.This change adds the required asserts so that all functions using CngLightup have the required permissions.

#### Suggestion

If this change in the .NET Framework 4.6.2 has negatively impacted your partial trust apps, upgrade to the .NET Framework 4.7.1.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6.2 |
| Type | Runtime |

#### Affected APIs

- [System.Security.Cryptography.DSACng.%23ctor(System.Security.Cryptography.CngKey)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSACng.%2523ctor(System.Security.Cryptography.CngKey))
- [System.Security.Cryptography.DSACng.Key](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSACng.Key)
- [System.Security.Cryptography.DSACng.LegalKeySizes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSACng.LegalKeySizes)
- [System.Security.Cryptography.DSACng.CreateSignature(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSACng.CreateSignature(System.Byte%5B%5D))
- [System.Security.Cryptography.DSACng.VerifySignature(System.Byte\[\],System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSACng.VerifySignature(System.Byte%5B%5D%2CSystem.Byte%5B%5D))
- [System.Security.Cryptography.RSACng.%23ctor(System.Security.Cryptography.CngKey)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng.%2523ctor(System.Security.Cryptography.CngKey))
- [System.Security.Cryptography.RSACng.Key](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng.Key)
- [System.Security.Cryptography.RSACng.Decrypt(System.Byte\[\],System.Security.Cryptography.RSAEncryptionPadding)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng.Decrypt(System.Byte%5B%5D%2CSystem.Security.Cryptography.RSAEncryptionPadding))
- [System.Security.Cryptography.RSACng.SignHash(System.Byte\[\],System.Security.Cryptography.HashAlgorithmName,System.Security.Cryptography.RSASignaturePadding)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng.SignHash(System.Byte%5B%5D%2CSystem.Security.Cryptography.HashAlgorithmName%2CSystem.Security.Cryptography.RSASignaturePadding))

<!--

#### Affected APIs

- `M:System.Security.Cryptography.DSACng.#ctor(System.Security.Cryptography.CngKey)`
- `P:System.Security.Cryptography.DSACng.Key`
- `P:System.Security.Cryptography.DSACng.LegalKeySizes`
- `M:System.Security.Cryptography.DSACng.CreateSignature(System.Byte[])`
- `M:System.Security.Cryptography.DSACng.VerifySignature(System.Byte[],System.Byte[])`
- `M:System.Security.Cryptography.RSACng.#ctor(System.Security.Cryptography.CngKey)`
- `P:System.Security.Cryptography.RSACng.Key`
- `M:System.Security.Cryptography.RSACng.Decrypt(System.Byte[],System.Security.Cryptography.RSAEncryptionPadding)`
- `M:System.Security.Cryptography.RSACng.SignHash(System.Byte[],System.Security.Cryptography.HashAlgorithmName,System.Security.Cryptography.RSASignaturePadding)`

-->
