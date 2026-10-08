### RSACng.VerifyHash now returns False for any verification failure

#### Details

Starting with the .NET Framework 4.6.2, this method returns **False** if the signature itself is badly formatted. It now returns false for any verification failure.In the .NET Framework 4.6 and 4.6.1, the method throws a [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException) if the signature itself is badly formatted.

#### Suggestion

Any code whose execution depends on handling the [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException) should instead execute if validation fails and the method returns **False**.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.2 |
| Type | Runtime |

#### Affected APIs

- [System.Security.Cryptography.RSACng.VerifyHash(System.Byte\[\],System.Byte\[\],System.Security.Cryptography.HashAlgorithmName,System.Security.Cryptography.RSASignaturePadding)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng.VerifyHash(System.Byte%5B%5D%2CSystem.Byte%5B%5D%2CSystem.Security.Cryptography.HashAlgorithmName%2CSystem.Security.Cryptography.RSASignaturePadding))

<!--

#### Affected APIs

- `M:System.Security.Cryptography.RSACng.VerifyHash(System.Byte[],System.Byte[],System.Security.Cryptography.HashAlgorithmName,System.Security.Cryptography.RSASignaturePadding)`

-->
