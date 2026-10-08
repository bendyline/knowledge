---
title: ".NET 7 breaking change: Validate CompressionLevel for BrotliStream"
description: Learn about the .NET 7 breaking change in core .NET libraries where the CompressionLevel parameter to BrotliStream constructors is now validated.
ms.date: 01/04/2022
---
# Validate CompressionLevel for BrotliStream

The [System.IO.Compression.CompressionLevel](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel) argument that's passed to [System.IO.Compression.BrotliStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.BrotliStream) constructors is now validated to be one of the defined values of the enumeration.

## Previous behavior

Passing any value between 0 and 11 for the [System.IO.Compression.CompressionLevel](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel) parameter was considered valid. The value would either map to one of the enumeration's defined values or be passed as-is to the underlying Brotli implementation.

## New behavior

The only valid values for the [System.IO.Compression.CompressionLevel](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel) parameter of [System.IO.Compression.BrotliStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.BrotliStream) constructors are:

- [System.IO.Compression.CompressionLevel.Optimal](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel.Optimal)
- [System.IO.Compression.CompressionLevel.Fastest](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel.Fastest)
- [System.IO.Compression.CompressionLevel.NoCompression](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel.NoCompression)
- [System.IO.Compression.CompressionLevel.SmallestSize](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel.SmallestSize)

If you pass any other value, an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is thrown at runtime.

## Version introduced

.NET 7

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

Being able to pass arbitrary values that aren't defined by the [System.IO.Compression.CompressionLevel](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel) enumeration is unexpected and undocumented, and is likely to lead to mistakes.

## Recommended action

If necessary, change your code to pass in one of the valid [System.IO.Compression.CompressionLevel](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel) values.

## Affected APIs

- [System.IO.Compression.BrotliStream.%23ctor(System.IO.Stream,System.IO.Compression.CompressionLevel,System.Boolean)](https://learn.microsoft.com/search/?terms=System.IO.Compression.BrotliStream.%2523ctor(System.IO.Stream%2CSystem.IO.Compression.CompressionLevel%2CSystem.Boolean))
- [System.IO.Compression.BrotliStream.%23ctor(System.IO.Stream,System.IO.Compression.CompressionLevel)](https://learn.microsoft.com/search/?terms=System.IO.Compression.BrotliStream.%2523ctor(System.IO.Stream%2CSystem.IO.Compression.CompressionLevel))
