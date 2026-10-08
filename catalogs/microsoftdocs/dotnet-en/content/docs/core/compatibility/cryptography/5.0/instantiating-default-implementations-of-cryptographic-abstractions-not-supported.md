---
title: "Breaking change: Instantiating default implementations of cryptographic abstractions is not supported"
description: Learn about the breaking change in .NET 5 where the parameterless Create() overloads on cryptographic abstractions are obsolete.
ms.date: 10/16/2020
---
# Instantiating default implementations of cryptographic abstractions is not supported

The parameterless `Create()` overloads on cryptographic abstractions are obsolete as warning as of .NET 5.0.

## Change description

In .NET Framework 2.0 - 4.8, abstract cryptographic primitive factories such as [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create) can be configured to return different algorithms. For example, on a default install of .NET Framework 4.8, the parameterless, static method [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create) returns an instance of the SHA1 algorithm, as shown in the following snippet.

**.NET Framework only**

```csharp
// Return an instance of the default hash algorithm (SHA1).
HashAlgorithm alg = HashAlgorithm.Create();
// Prints 'System.Security.Cryptography.SHA1CryptoServiceProvider'.
Console.WriteLine(alg.GetType());

// Change the default algorithm to be SHA256, not SHA1.
CryptoConfig.AddAlgorithm(typeof(SHA256CryptoServiceProvider), typeof(HashAlgorithm).FullName);
alg = HashAlgorithm.Create();
// Prints 'System.Security.Cryptography.SHA256CryptoServiceProvider'.
Console.WriteLine(alg.GetType());
```

You can also use [machine-wide configuration](../../../../framework/configure-apps/map-algorithm-names-to-cryptography-classes.md) to change the default algorithm without needing to call into `CryptoConfig` programmatically.

In .NET Core 2.0 - 3.1, abstract cryptographic primitive factories such as [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create) always throw a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException).

```csharp
// Throws PlatformNotSupportedException on .NET Core.
HashAlgorithm alg = HashAlgorithm.Create();
```

In .NET 5 and later versions, abstract cryptographic primitive factories such as [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create) are marked obsolete and produce a compile-time warning with ID `SYSLIB0007`. At runtime, these methods continue to throw a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException).

```csharp
// Throws PlatformNotSupportedException.
// Also produces compile-time warning SYSLIB0007 on .NET 5+.
HashAlgorithm alg = HashAlgorithm.Create();
```

This is a compile-time only change. There is no runtime change from previous versions of .NET Core.

> **Note:**
>
> - Only the parameterless overloads of the `Create()` methods are obsolete. Parameterized overloads are not obsolete and still function as expected.
>
>   ```csharp
>   // Call Create(string), providing an explicit algorithm family name.
>   // Works in .NET Framework, .NET Core, and .NET 5+.
>   HashAlgorithm hashAlg = HashAlgorithm.Create("SHA256");
>   ```
>
> - Parameterless overloads of *specific* algorithm families (not abstractions) are not obsolete, and will continue to function as expected.
>
>   ```csharp
>   // Call a specific algorithm family's parameterless Create() ctor.
>   // Works in .NET Framework, .NET Core, and .NET 5+.
>   Aes aesAlg = Aes.Create();
>   ```

## Reason for change

The cryptographic configuration system present in .NET Framework is no longer present in .NET Core and .NET 5+, since that legacy system doesn't allow for proper cryptographic agility. .NET's backward-compatibility requirements also prohibit the framework from updating certain cryptographic APIs to keep up with advances in cryptography. For example, the [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create) method was introduced in .NET Framework 1.0, when the SHA-1 hash algorithm was state-of-the-art. Twenty years have passed, and now SHA-1 is considered broken, but we cannot change [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create) to return a different algorithm. Doing so would introduce an unacceptable breaking change in consuming applications.

Best practice dictates that libraries that consume cryptographic primitives (such as AES, SHA-*, and RSA) should be in full control over how they consume these primitives. Applications that require future-proofing should utilize higher-level libraries that wrap these primitives and add key management and cryptographic agility capabilities. These libraries are often provided by the hosting environment. One example is [ASP.NET's Data Protection library](https://learn.microsoft.com/aspnet/core/security/data-protection/), which handles these concerns on behalf of the calling application.

## Version introduced

5.0

## Recommended action

- The recommended course of action is to replace calls to the now-obsolete APIs with calls to factory methods for specific algorithms, for example, [System.Security.Cryptography.Aes.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes.Create). This gives you full control over which algorithms are instantiated.

- If you need to maintain compatibility with existing payloads generated by .NET Framework apps that use the now-obsolete APIs, use the replacements suggested in the following table. The table provides a mapping from .NET Framework default algorithms to their .NET 5+ equivalents.

  | .NET Framework | .NET Core / .NET 5+ compatible replacement | Remarks |
  | --- | --- | --- |
  | [System.Security.Cryptography.AsymmetricAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsymmetricAlgorithm.Create) | [System.Security.Cryptography.RSA.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.Create) |  |
  | [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create) | [System.Security.Cryptography.SHA1.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA1.Create) | The SHA-1 algorithm is considered broken. Consider using a stronger algorithm if possible. Consult your security advisor for further guidance. |
  | [System.Security.Cryptography.HMAC.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMAC.Create) | [System.Security.Cryptography.HMACSHA1.%23ctor](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMACSHA1.%2523ctor) | The HMACSHA1 algorithm is discouraged for most modern applications. Consider using a stronger algorithm if possible. Consult your security advisor for further guidance. |
  | [System.Security.Cryptography.KeyedHashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.KeyedHashAlgorithm.Create) | [System.Security.Cryptography.HMACSHA1.%23ctor](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMACSHA1.%2523ctor) | The HMACSHA1 algorithm is discouraged for most modern applications. Consider using a stronger algorithm if possible. Consult your security advisor for further guidance. |
  | [System.Security.Cryptography.SymmetricAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.Create) | [System.Security.Cryptography.Aes.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes.Create) |  |

- If you must continue to call the obsolete parameterless `Create()` overloads, you can suppress the `SYSLIB0007` warning in code.

  ```csharp
  #pragma warning disable SYSLIB0007 // Disable the warning.
  HashAlgorithm alg = HashAlgorithm.Create(); // Still throws PNSE.
  #pragma warning restore SYSLIB0007 // Re-enable the warning.
  ```

  You can also suppress the warning in your project file. Doing so disables the warning for all source files within the project.

  ```xml
  <Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
     <TargetFramework>net5.0</TargetFramework>
     <!-- NoWarn below suppresses SYSLIB0007 project-wide -->
     <NoWarn>$(NoWarn);SYSLIB0007</NoWarn>
    </PropertyGroup>
  </Project>
  ```

  > **Note:**
  > Suppressing `SYSLIB0007` disables only the obsoletion warnings for the cryptography APIs listed here. It does not disable any other warnings. Additionally, even if you suppress the warning, these obsoleted APIs will still throw a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) at runtime.

## Affected APIs

- [System.Security.Cryptography.AsymmetricAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsymmetricAlgorithm.Create)
- [System.Security.Cryptography.HashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm.Create)
- [System.Security.Cryptography.HMAC.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMAC.Create)
- [System.Security.Cryptography.KeyedHashAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.KeyedHashAlgorithm.Create)
- [System.Security.Cryptography.SymmetricAlgorithm.Create](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.Create)

<!--

### Affected APIs

- `M:System.Security.Cryptography.AsymmetricAlgorithm.Create`
- `M:System.Security.Cryptography.HashAlgorithm.Create`
- `M:System.Security.Cryptography.HMAC.Create`
- `M:System.Security.Cryptography.KeyedHashAlgorithm.Create`
- `M:System.Security.Cryptography.SymmetricAlgorithm.Create`

### Category

- Cryptography

-->
