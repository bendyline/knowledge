---
title: SYSLIB0045 warning - obsolete cryptographic factory methods
description: Learn about the obsoletion of some cryptographic factory methods that generates compile-time warning SYSLIB0045.
ms.date: 09/22/2022
f1_keywords:
  - syslib0045
---
# SYSLIB0045: Some cryptographic factory methods are obsolete

The following `System.Security.Cryptography` methods are obsolete, starting in .NET 7. Using them in code generates warning `SYSLIB0045` at compile time. Each of these factory methods accepts a string argument that represents the algorithm name. These methods call into [System.Security.Cryptography.CryptoConfig.CreateFromName*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoConfig.CreateFromName*) and cast the result to the return type.

- [System.Security.Cryptography.Aes.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes.Create(System.String))
- [System.Security.Cryptography.AsymmetricAlgorithm.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsymmetricAlgorithm.Create(System.String))
- [System.Security.Cryptography.DES.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DES.Create(System.String))
- [System.Security.Cryptography.ECDiffieHellman.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellman.Create(System.String))
- [System.Security.Cryptography.ECDsa.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsa.Create(System.String))
- [System.Security.Cryptography.HashAlgorithm.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create(System.String))
- [System.Security.Cryptography.KeyedHashAlgorithm.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.KeyedHashAlgorithm.Create(System.String))
- [System.Security.Cryptography.RandomNumberGenerator.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RandomNumberGenerator.Create(System.String))
- [System.Security.Cryptography.RC2.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RC2.Create(System.String))
- [System.Security.Cryptography.Rijndael.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rijndael.Create(System.String))
- [System.Security.Cryptography.RSA.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.Create(System.String))
- [System.Security.Cryptography.SHA1.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA1.Create(System.String))
- [System.Security.Cryptography.SHA256.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256.Create(System.String))
- [System.Security.Cryptography.SHA384.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA384.Create(System.String))
- [System.Security.Cryptography.SHA512.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA512.Create(System.String))
- [System.Security.Cryptography.SymmetricAlgorithm.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.Create(System.String))
- [System.Security.Cryptography.TripleDES.Create(System.String)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.TripleDES.Create(System.String))

These methods were marked `[Obsolete]` because in trimmed applications, they can return `null` when they wouldn't in non-trimmed applications. Also, in non-trimmed applications, the exception-based behaviors of these methods occasionally surprises callers, and many of the well-known identifiers are associated with types that are themselves marked `[Obsolete]`.

## Workaround

Calls that pass a constant string should be changed to either the parameterless factory method or a strong call to create the appropriate type. For example, a call to `Aes.Create("AES")` can be replaced with either `Aes.Create()` or `new AesCryptoServiceProvider()`. Since the [System.Security.Cryptography.AesCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCryptoServiceProvider) type is also marked `[Obsolete]`, `Aes.Create()` is the preferred replacement.

Calls that pass a non-constant string can either use their own lookup table or be changed to call [System.Security.Cryptography.CryptoConfig.CreateFromName*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoConfig.CreateFromName*) directly.

## Suppress a warning

If you must use the obsolete APIs, you can suppress the warning in code or in your project file.

To suppress only a single violation, add preprocessor directives to your source file to disable and then re-enable the warning.

```csharp
// Disable the warning.
#pragma warning disable SYSLIB0045

// Code that uses obsolete API.
// ...

// Re-enable the warning.
#pragma warning restore SYSLIB0045
```

To suppress all the `SYSLIB0045` warnings in your project, add a `<NoWarn>` property to your project file.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   ...
   <NoWarn>$(NoWarn);SYSLIB0045</NoWarn>
  </PropertyGroup>
</Project>
```

For more information, see [Suppress warnings](obsoletions-overview.md#suppress-warnings).
