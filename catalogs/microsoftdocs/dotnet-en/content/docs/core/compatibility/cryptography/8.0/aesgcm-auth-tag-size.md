---
title: "Breaking change: AesGcm authentication tag size on macOS"
description: Learn about the .NET 8 breaking change in cryptography where AesGcm on macOS only supports 16-byte (128-bit) authentication tags.
ms.date: 01/24/2023
---
# AesGcm authentication tag size on macOS

[System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm) on macOS only supports 16-byte (128-bit) authentication tags when using [System.Security.Cryptography.AesGcm.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.Encrypt*) or [System.Security.Cryptography.AesGcm.Decrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.Decrypt*) in .NET 8 and later versions.

## Previous behavior

On macOS, [System.Security.Cryptography.AesGcm.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.Encrypt*) and [System.Security.Cryptography.AesGcm.Decrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.Decrypt*) supported authentication tag sizes ranging from 12 to 16 bytes, provided OpenSSL was available.

In addition, the [System.Security.Cryptography.AesGcm.TagByteSizes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.TagByteSizes) property reported that it supported sizes ranging from 12 to 16 bytes, inclusive.

## New behavior

On macOS, [System.Security.Cryptography.AesGcm.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.Encrypt*) and [System.Security.Cryptography.AesGcm.Decrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.Decrypt*) support 16-byte authentication tags only. If you use a smaller tag size on macOS, an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is thrown at runtime.

The [System.Security.Cryptography.AesGcm.TagByteSizes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.TagByteSizes) property returns a value of 16 as the supported tag size.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm) class on macOS previously relied on OpenSSL for underlying support. OpenSSL is an external dependency that needed to be installed and configured separately from .NET. [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm) now uses Apple's CryptoKit to provide an implementation of Advanced Encryption Standard with Galois/Counter Mode (AES-GCM) so that OpenSSL is no longer a dependency for using [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm).

The CryptoKit implementation of AES-GCM does not support authentication tag sizes other than 128-bits (16-bytes).

## Recommended action

Use 128-bit authentication tags with [System.Security.Cryptography.AesGcm](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm) for macOS support.

## Affected APIs

- [System.Security.Cryptography.AesGcm.TagByteSizes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.TagByteSizes)
- [System.Security.Cryptography.AesGcm.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.Encrypt*)
- [System.Security.Cryptography.AesGcm.Decrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesGcm.Decrypt*)
