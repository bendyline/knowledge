### RSACng now correctly loads RSA keys of non-standard key size

#### Details

In .NET Framework versions prior to 4.6.2, customers with non-standard key sizes for RSA certificates are unable to access those keys via the [System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPublicKey(System.Security.Cryptography.X509Certificates.X509Certificate2)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPublicKey(System.Security.Cryptography.X509Certificates.X509Certificate2)) and [System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)) extension methods.  A [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException) with the message &quot;The requested key size is not supported&quot; is thrown. In .NET Framework 4.6.2 this issue has been fixed. Similarly, [System.Security.Cryptography.RSA.ImportParameters(System.Security.Cryptography.RSAParameters)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.ImportParameters(System.Security.Cryptography.RSAParameters)) and [System.Security.Cryptography.RSACng.ImportParameters(System.Security.Cryptography.RSAParameters)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng.ImportParameters(System.Security.Cryptography.RSAParameters)) now work with non-standard key sizes without throwing a [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException).

#### Suggestion

If there is any exception handling logic that relies on the previous behavior where a [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException) is thrown when non-standard key sizes are used, consider removing the logic.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6.2 |
| Type | Retargeting |

#### Affected APIs

- [System.Security.Cryptography.RSA.ImportParameters(System.Security.Cryptography.RSAParameters)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.ImportParameters(System.Security.Cryptography.RSAParameters))
- [System.Security.Cryptography.RSACng.ImportParameters(System.Security.Cryptography.RSAParameters)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACng.ImportParameters(System.Security.Cryptography.RSAParameters))
- [System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPrivateKey(System.Security.Cryptography.X509Certificates.X509Certificate2))
- [System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPublicKey(System.Security.Cryptography.X509Certificates.X509Certificate2)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.RSACertificateExtensions.GetRSAPublicKey(System.Security.Cryptography.X509Certificates.X509Certificate2))
