---
title: SYSLIB0043 warning - ECDiffieHellmanPublicKey.ToByteArray is obsolete
description: Learn about the obsoletion of ECDiffieHellmanPublicKey.ToByteArray() and the associated constructor that generates compile-time warning SYSLIB0043.
ms.date: 04/08/2022
f1_keywords:
  - syslib0043
---
# SYSLIB0043: ECDiffieHellmanPublicKey.ToByteArray is obsolete

The following methods are obsolete, starting in .NET 7. Using them in code generates warning `SYSLIB0043` at compile time.

- [System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray)
- [System.Security.Cryptography.ECDiffieHellmanPublicKey.%23ctor(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.%2523ctor(System.Byte%5B%5D)) (constructor)

The [System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray) method does not have an implied file format. Also, for the built-in implementations, it throws [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) on all non-Windows operating systems. Since [System.Security.Cryptography.ECDiffieHellmanPublicKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey) also has a standard format export (via the [System.Security.Cryptography.ECDiffieHellmanPublicKey.ExportSubjectPublicKeyInfo](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ExportSubjectPublicKeyInfo) method), the older member has been obsoleted.

## Workaround

If you're exporting the public key value, use the [System.Security.Cryptography.ECDiffieHellmanPublicKey.ExportSubjectPublicKeyInfo](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ExportSubjectPublicKeyInfo) method instead.

For new derived types (or existing derived types that don't currently call the [System.Security.Cryptography.ECDiffieHellmanPublicKey.%23ctor(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.%2523ctor(System.Byte%5B%5D)) constructor), don't call the protected [System.Security.Cryptography.ECDiffieHellmanPublicKey.%23ctor(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.%2523ctor(System.Byte%5B%5D)) constructor, and either override [System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.ToByteArray) to throw an exception, or accept the default behavior of returning an empty array.

For existing derived types that already call the protected [System.Security.Cryptography.ECDiffieHellmanPublicKey.%23ctor(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanPublicKey.%2523ctor(System.Byte%5B%5D)) constructor, continue calling the constructor and suppress the `SYSLIB0043` warning.

## Suppress a warning

If you must use the obsolete APIs, you can suppress the warning in code or in your project file.

To suppress only a single violation, add preprocessor directives to your source file to disable and then re-enable the warning.

```csharp
// Disable the warning.
#pragma warning disable SYSLIB0043

// Code that uses obsolete API.
// ...

// Re-enable the warning.
#pragma warning restore SYSLIB0043
```

To suppress all the `SYSLIB0043` warnings in your project, add a `<NoWarn>` property to your project file.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
   ...
   <NoWarn>$(NoWarn);SYSLIB0043</NoWarn>
  </PropertyGroup>
</Project>
```

For more information, see [Suppress warnings](obsoletions-overview.md#suppress-warnings).
