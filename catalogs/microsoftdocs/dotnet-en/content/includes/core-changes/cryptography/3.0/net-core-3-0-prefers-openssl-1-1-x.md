### .NET Core 3.0 prefers OpenSSL 1.1.x to OpenSSL 1.0.x

.NET Core for Linux, which works across multiple Linux distributions, can support both OpenSSL 1.0.x and OpenSSL 1.1.x.  .NET Core 2.1 and .NET Core 2.2 look for 1.0.x first, then fall back to 1.1.x; .NET Core 3.0 looks for 1.1.x first. This change was made to add support for new cryptographic standards.

This change may impact libraries or applications that do platform interop with the OpenSSL-specific interop types in .NET Core.

#### Change description

In .NET Core 2.2 and earlier versions, the runtime prefers loading OpenSSL 1.0.x over 1.1.x. This means that the [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) and [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) types for interop with OpenSSL are used with libcrypto.so.1.0.0 / libcrypto.so.1.0 / libcrypto.so.10 by preference.

Starting with .NET Core 3.0, the runtime prefers loading OpenSSL 1.1.x over OpenSSL 1.0.x, so the [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) and [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) types for interop with OpenSSL are used with libcrypto.so.1.1 / libcrypto.so.11 / libcrypto.so.1.1.0 / libcrypto.so.1.1.1 by preference. As a result, libraries and applications that interoperate with OpenSSL directly may have incompatible pointers with the .NET Core-exposed values when upgrading from .NET Core 2.1 or .NET Core 2.2.

#### Version introduced

3.0

#### Recommended action

Libraries and applications that do direct operations with OpenSSL need to be careful to ensure they are using the same version of OpenSSL as the .NET Core runtime.

All libraries or applications that use [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) or [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SafeHandle) values from the .NET Core cryptographic types directly with OpenSSL should compare the version of the library they use with the new [System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle.OpenSslVersion) property to ensure the pointers are compatible.

#### Category

Cryptography

#### Affected APIs

- [System.Security.Cryptography.SafeEvpPKeyHandle.%23ctor%2A](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SafeEvpPKeyHandle.%2523ctor%252A)
- [System.Security.Cryptography.RSAOpenSsl.%23ctor(System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSAOpenSsl.%2523ctor(System.IntPtr))
- [System.Security.Cryptography.RSAOpenSsl.%23ctor(System.Security.Cryptography.SafeEvpPKeyHandle)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSAOpenSsl.%2523ctor(System.Security.Cryptography.SafeEvpPKeyHandle))
- [System.Security.Cryptography.RSAOpenSsl.DuplicateKeyHandle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSAOpenSsl.DuplicateKeyHandle)
- [System.Security.Cryptography.DSAOpenSsl.%23ctor(System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSAOpenSsl.%2523ctor(System.IntPtr))
- [System.Security.Cryptography.DSAOpenSsl.%23ctor(System.Security.Cryptography.SafeEvpPKeyHandle)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSAOpenSsl.%2523ctor(System.Security.Cryptography.SafeEvpPKeyHandle))
- [System.Security.Cryptography.DSAOpenSsl.DuplicateKeyHandle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DSAOpenSsl.DuplicateKeyHandle)
- [System.Security.Cryptography.ECDsaOpenSsl.%23ctor(System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaOpenSsl.%2523ctor(System.IntPtr))
- [System.Security.Cryptography.ECDsaOpenSsl.%23ctor(System.Security.Cryptography.SafeEvpPKeyHandle)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaOpenSsl.%2523ctor(System.Security.Cryptography.SafeEvpPKeyHandle))
- [System.Security.Cryptography.ECDsaOpenSsl.DuplicateKeyHandle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsaOpenSsl.DuplicateKeyHandle)
- [System.Security.Cryptography.ECDiffieHellmanOpenSsl.%23ctor(System.IntPtr)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanOpenSsl.%2523ctor(System.IntPtr))
- [System.Security.Cryptography.ECDiffieHellmanOpenSsl.%23ctor(System.Security.Cryptography.SafeEvpPKeyHandle)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanOpenSsl.%2523ctor(System.Security.Cryptography.SafeEvpPKeyHandle))
- [System.Security.Cryptography.ECDiffieHellmanOpenSsl.DuplicateKeyHandle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanOpenSsl.DuplicateKeyHandle)
- [System.Security.Cryptography.X509Certificates.X509Certificate.Handle](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate.Handle)

<!--

#### Affected APIs

- `Overload:System.Security.Cryptography.SafeEvpPKeyHandle.#ctor`
- `M:System.Security.Cryptography.RSAOpenSsl.#ctor(System.IntPtr)`
- `M:System.Security.Cryptography.RSAOpenSsl.#ctor(System.Security.Cryptography.SafeEvpPKeyHandle)`
- `M:System.Security.Cryptography.RSAOpenSsl.DuplicateKeyHandle`
- `M:System.Security.Cryptography.DSAOpenSsl.#ctor(System.IntPtr)`
- `M:System.Security.Cryptography.DSAOpenSsl.#ctor(System.Security.Cryptography.SafeEvpPKeyHandle)`
- `M:System.Security.Cryptography.DSAOpenSsl.DuplicateKeyHandle`
- `M:System.Security.Cryptography.ECDsaOpenSsl.#ctor(System.IntPtr)`
- `M:System.Security.Cryptography.ECDsaOpenSsl.#ctor(System.Security.CryptographySafeEvpPKeyHandle)`
- `M:System.Security.Cryptography.ECDsaOpenSsl.DuplicateKeyHandle`
- `M:System.Security.Cryptography.ECDiffieHellmanOpenSsl.#ctor(System.IntPtr)`
- `M:System.Security.Cryptography.ECDiffieHellmanOpenSsl.#ctor(System.Security.Cryptography.SafeEvpPKeyHandle)`
- `M:System.Security.Cryptography.ECDiffieHellmanOpenSsl.DuplicateKeyHandle`
- `P:System.Security.Cryptography.X509Certificates.X509Certificate.Handle`

-->
