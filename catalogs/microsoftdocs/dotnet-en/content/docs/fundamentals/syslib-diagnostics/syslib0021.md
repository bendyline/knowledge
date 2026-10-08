---
title: SYSLIB0021 warning
description: Learn about the obsoletion of derived cryptographic types that generates compile-time warning SYSLIB0021.
ms.date: 05/18/2021
f1_keywords:
  - syslib0021
---
# SYSLIB0021: Derived cryptographic types are obsolete

The following derived cryptographic types are marked as obsolete, starting in .NET 6. Using them in code generates warning `SYSLIB0021` at compile time.

- [System.Security.Cryptography.AesCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCryptoServiceProvider)
- [System.Security.Cryptography.AesManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesManaged)
- [System.Security.Cryptography.DESCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DESCryptoServiceProvider)
- [System.Security.Cryptography.MD5CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.MD5CryptoServiceProvider)
- [System.Security.Cryptography.RC2CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RC2CryptoServiceProvider)
- [System.Security.Cryptography.SHA1CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA1CryptoServiceProvider)
- [System.Security.Cryptography.SHA1Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA1Managed)
- [System.Security.Cryptography.SHA256Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256Managed)
- [System.Security.Cryptography.SHA256CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256CryptoServiceProvider)
- [System.Security.Cryptography.SHA384Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA384Managed)
- [System.Security.Cryptography.SHA384CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA384CryptoServiceProvider)
- [System.Security.Cryptography.SHA512Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA512Managed)
- [System.Security.Cryptography.SHA512CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA512CryptoServiceProvider)
- [System.Security.Cryptography.TripleDESCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.TripleDESCryptoServiceProvider)

## Workarounds

Use the `Create` method on the base type instead. For example, use [System.Security.Cryptography.TripleDES.Create*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.TripleDES.Create*) instead of [System.Security.Cryptography.TripleDESCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.TripleDESCryptoServiceProvider).

## Suppress a warning

If you must use the obsolete APIs, you can suppress the warning in code or in your project file.

To suppress only a single violation, add preprocessor directives to your source file to disable and then re-enable the warning.

```csharp
// Disable the warning.
#pragma warning disable SYSLIB0021

// Code that uses obsolete API.
// ...

// Re-enable the warning.
#pragma warning restore SYSLIB0021
```

To suppress all the `SYSLIB0021` warnings in your project, add a `<NoWarn>` property to your project file.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   ...
   <NoWarn>$(NoWarn);SYSLIB0021</NoWarn>
  </PropertyGroup>
</Project>
```

For more information, see [Suppress warnings](obsoletions-overview.md#suppress-warnings).
