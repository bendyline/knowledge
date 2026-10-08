---
title: ".NET cryptography model"
description: Review implementations of usual cryptographic algorithms in .NET. Learn the cryptography model of object inheritance and one-shots.
ms.date: 02/26/2021
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "cryptography [.NET], model"
  - "encryption [.NET], model"
ms.assetid: 12fecad4-fbab-432a-bade-2f05976a2971
---
# .NET cryptography model

.NET provides implementations of many standard cryptographic algorithms.

## Object inheritance

The .NET cryptography system implements an extensible pattern of derived class inheritance. The hierarchy is as follows:

- Algorithm type class, such as [System.Security.Cryptography.SymmetricAlgorithm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm), [System.Security.Cryptography.AsymmetricAlgorithm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsymmetricAlgorithm), or [System.Security.Cryptography.HashAlgorithm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HashAlgorithm). This level is abstract.

- Algorithm class that inherits from an algorithm type class, for example, [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes), [System.Security.Cryptography.RSA](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA), or [System.Security.Cryptography.ECDiffieHellman](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellman). This level is abstract.

- Implementation of an algorithm class that inherits from an algorithm class, for example, [System.Security.Cryptography.AesManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesManaged), [System.Security.Cryptography.RC2CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RC2CryptoServiceProvider), or [System.Security.Cryptography.ECDiffieHellmanCng](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanCng). This level is fully implemented.

This pattern of derived classes lets you add a new algorithm or a new implementation of an existing algorithm. For example, to create a new public-key algorithm, you would inherit from the [System.Security.Cryptography.AsymmetricAlgorithm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AsymmetricAlgorithm) class. To create a new implementation of a specific algorithm, you would create a non-abstract derived class of that algorithm.

Going forward, this model of inheritance is not used for new kinds of primitives like [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm) or [System.Security.Cryptography.Shake128](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Shake128). These algorithms are `sealed`. If you need an extensibility pattern or abstraction over these types, the implementation of the abstraction is the responsibility of the developer.

## One-shot APIs

Starting in .NET 5, simpler APIs were introduced for hashing and HMAC. While slightly less flexible, these *one-shot* APIs:

- Are easier to use (and less prone to misuse)
- Reduce allocations or are allocation-free
- Are thread safe
- Use the best available implementation for the platform

The hashing and HMAC primitives expose a one-shot API through a static `HashData` method on the type, such as [System.Security.Cryptography.SHA256.HashData*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256.HashData*). The static APIs offer no built-in extensibility mechanism. If you're implementing your own algorithms, it's recommended to also offer similar static APIs of the algorithm.

The [System.Security.Cryptography.RandomNumberGenerator](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RandomNumberGenerator) class also offers static methods for creating or filling buffers with cryptographic random data. These methods always use the system's cryptographically secure pseudorandom number generator (CSPRNG).

## How algorithms are implemented in .NET

As an example of the different implementations available for an algorithm, consider symmetric algorithms. The base for all symmetric algorithms is [System.Security.Cryptography.SymmetricAlgorithm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm), which is inherited by [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes), [System.Security.Cryptography.TripleDES](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.TripleDES), and others that are no longer recommended.

[System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes) is inherited by [System.Security.Cryptography.AesCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCryptoServiceProvider), [System.Security.Cryptography.AesCng](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCng), and [System.Security.Cryptography.AesManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesManaged).

In .NET Framework on Windows:

* `*CryptoServiceProvider` algorithm classes, such as [System.Security.Cryptography.AesCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCryptoServiceProvider), are wrappers around the Windows Cryptography API (CAPI) implementation of an algorithm.
* `*Cng` algorithm classes, such as [System.Security.Cryptography.ECDiffieHellmanCng](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellmanCng), are wrappers around the Windows Cryptography Next Generation (CNG) implementation.
* `*Managed` classes, such as [System.Security.Cryptography.AesManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesManaged), are written entirely in managed code. `*Managed` implementations are not certified by the Federal Information Processing Standards (FIPS), and may be slower than the `*CryptoServiceProvider` and `*Cng` wrapper classes.

In .NET Core and .NET 5 and later versions, all implementation classes (`*CryptoServiceProvider`, `*Managed`, and `*Cng`) are wrappers for the operating system (OS) algorithms. If the OS algorithms are FIPS-certified, then .NET uses FIPS-certified algorithms. For more information, see [Cross-Platform Cryptography](cross-platform-cryptography.md).

In most cases, you don't need to directly reference an algorithm implementation class, such as `AesCryptoServiceProvider`. The methods and properties you typically need are on the base algorithm class, such as `Aes`. Create an instance of a default implementation class by using a factory method on the base algorithm class, and refer to the base algorithm class. For example, see the highlighted line of code in the following example:

[language="csharp" source="snippets/encrypting-data/csharp/aes-encrypt.cs" highlight="9"::: (complete source file; reference: snippets/encrypting-data/csharp/aes-encrypt.cs)](../../../_code/docs/standard/security/snippets/encrypting-data/csharp/aes-encrypt.cs.md)
[language="vb" source="snippets/encrypting-data/vb/aes-encrypt.vb" highlight="13"::: (complete source file; reference: snippets/encrypting-data/vb/aes-encrypt.vb)](../../../_code/docs/standard/security/snippets/encrypting-data/vb/aes-encrypt.vb.md)

## Choose an algorithm

You can select an algorithm for different reasons: for example, for data integrity, for data privacy, or to generate a key. Symmetric and hash algorithms are intended for protecting data for either integrity reasons (protect from change) or privacy reasons (protect from viewing). Hash algorithms are used primarily for data integrity.

Here is a list of recommended algorithms by application:

- Data privacy:
  - [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes)
- Data integrity:
  - [System.Security.Cryptography.HMACSHA256](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMACSHA256)
  - [System.Security.Cryptography.HMACSHA512](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.HMACSHA512)
- Digital signature:
  - [System.Security.Cryptography.ECDsa](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDsa)
  - [System.Security.Cryptography.RSA](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA)
- Key exchange:
  - [System.Security.Cryptography.ECDiffieHellman](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.ECDiffieHellman)
  - [System.Security.Cryptography.RSA](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA)
- Random number generation:
  - [System.Security.Cryptography.RandomNumberGenerator.GetBytes*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RandomNumberGenerator.GetBytes*)
  - [System.Security.Cryptography.RandomNumberGenerator.Fill*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RandomNumberGenerator.Fill*)
- Generating a key from a password:
  - [System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*)

## See also

- [Cryptographic Services](cryptographic-services.md)
- [Cross-Platform Cryptography](cross-platform-cryptography.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
