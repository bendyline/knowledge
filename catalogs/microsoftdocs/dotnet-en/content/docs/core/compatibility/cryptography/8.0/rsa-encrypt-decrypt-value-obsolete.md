---
title: "RSA.EncryptValue and RSA.DecryptValue are obsolete"
description: Learn about the .NET 8 breaking change in cryptography where RSA.EncryptValue and RSA.DecryptValue are marked obsolete.
ms.date: 01/24/2023
---
# RSA.EncryptValue and RSA.DecryptValue are obsolete

The following methods are obsolete in .NET 8 (and later versions):

- [System.Security.Cryptography.RSA.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.EncryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSA.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.DecryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte%5B%5D))

All references to these methods will result in a [SYSLIB0048](../../../../fundamentals/syslib-diagnostics/syslib0048.md) warning at compile time.

## Previous behavior

Previously, code could call the [affected methods](#affected-apis) without any compilation warnings. However, they threw a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) at runtime.

## New behavior

Starting in .NET 8, calling the [affected methods](#affected-apis) produces a `SYSLIB0048` compilation warning.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility).

## Reason for change

The affected methods were never implemented and always threw a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException). Since the purpose of these methods is unclear and they shouldn't be called, they were marked as obsolete.

## Recommended action

To encrypt or decrypt with RSA, use [System.Security.Cryptography.RSA.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.Encrypt*) or [System.Security.Cryptography.RSA.Decrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.Decrypt*) instead.

## Affected APIs

- [System.Security.Cryptography.RSA.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.EncryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSA.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSA.DecryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte%5B%5D))
- [System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte%5B%5D))
