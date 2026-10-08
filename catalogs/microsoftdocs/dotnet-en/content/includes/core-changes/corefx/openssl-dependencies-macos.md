### OpenSSL versions on macOS

The .NET Core 3.0 and later runtimes on macOS now prefer OpenSSL 1.1.x versions to OpenSSL 1.0.x versions for the [System.Security.Cryptography.AesCcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCcm), [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm), [System.Security.Cryptography.DSAOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSAOpenSsl), [System.Security.Cryptography.ECDiffieHellmanOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanOpenSsl), [System.Security.Cryptography.ECDsaOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaOpenSsl), [System.Security.Cryptography.RSAOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSAOpenSsl), and [System.Security.Cryptography.SafeEvpPKeyHandle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle) types.

The .NET Core 2.1 runtime now supports OpenSSL 1.1.x versions, but still prefers OpenSSL 1.0.x versions.

#### Change description

Previously, the .NET Core runtime used OpenSSL 1.0.x versions on macOS for types that interact with OpenSSL. The most recent OpenSSL 1.0.x version, OpenSSL 1.0.2, is now out of support. To keep types that use OpenSSL on supported versions of OpenSSL, the .NET Core 3.0 and later runtimes now use newer versions of OpenSSL on macOS.

With this change, the behavior for the .NET Core runtimes on macOS is as follows:

- The .NET Core 3.0 and later version runtimes use OpenSSL 1.1.x, if available, and fall back to OpenSSL 1.0.x only if there's no 1.1.x version available.

  For callers that use the OpenSSL interop types with custom P/Invokes, follow the guidance in the [System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion) remarks. Your app may crash if you don't check the [System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion) value.

- The .NET Core 2.1 runtime uses OpenSSL 1.0.x, if available, and falls back to OpenSSL 1.1.x if there's no 1.0.x version available.

  The 2.1 runtime prefers the earlier version of OpenSSL because the [System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion) property does not exist in .NET Core 2.1, so the OpenSSL version cannot be reliably determined at run time.

#### Version introduced

- .NET Core 2.1.16
- .NET Core 3.0.3
- .NET Core 3.1.2

#### Recommended action

- Uninstall OpenSSL version 1.0.2 if it's no longer needed.

- Install OpenSSL 1.1.x if you use the [System.Security.Cryptography.AesCcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCcm), [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm), [System.Security.Cryptography.DSAOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSAOpenSsl), [System.Security.Cryptography.ECDiffieHellmanOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanOpenSsl), [System.Security.Cryptography.ECDsaOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaOpenSsl), [System.Security.Cryptography.RSAOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSAOpenSsl), or [System.Security.Cryptography.SafeEvpPKeyHandle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle) types.

- If you use the OpenSSL interop types with custom P/Invokes, follow the guidance in the [System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion) remarks.

#### Category

Core .NET libraries

#### Affected APIs

- [System.Security.Cryptography.AesCcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCcm)
- [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm)
- [System.Security.Cryptography.DSAOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSAOpenSsl)
- [System.Security.Cryptography.ECDiffieHellmanOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanOpenSsl)
- [System.Security.Cryptography.ECDsaOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaOpenSsl)
- [System.Security.Cryptography.RSAOpenSsl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSAOpenSsl)
- [System.Security.Cryptography.SafeEvpPKeyHandle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle)

<!--

#### Affected APIs

- `T:System.Security.Cryptography.AesCcm`
- `T:System.Security.Cryptography.AesGcm`
- `T:System.Security.Cryptography.DSAOpenSsl`
- `T:System.Security.Cryptography.ECDiffieHellmanOpenSsl`
- `T:System.Security.Cryptography.ECDsaOpenSsl`
- `T:System.Security.Cryptography.RSAOpenSsl`
- `T:System.Security.Cryptography.SafeEvpPKeyHandle`

-->
