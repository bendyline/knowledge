---
title: Basic Types
description: Discover the fundamental basic types that are used in F#.
ms.date: 08/15/2020
---
# Basic types

This topic lists the basic types that are defined in F#. These types are the most fundamental in F#, forming the basis of nearly every F# program. They are a superset of .NET primitive types.

| Type | .NET type | Description | Example |
| --- | --- | --- | --- |
| `bool` | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) | Possible values are `true` and `false`. | `true`/`false` |
| `uint8`, `byte` | [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) | Values from 0 to 255. | `1uy` |
| `int8`, `sbyte` | [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) | Values from -128 to 127. | `1y` |
| `int16` | [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) | Values from -32768 to 32767. | `1s` |
| `uint16` | [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) | Values from 0 to 65535. | `1us` |
| `int32`, `int` | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) | Values from -2,147,483,648 to 2,147,483,647. | `1` |
| `uint32`, `uint` | [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | Values from 0 to 4,294,967,295. | `1u` |
| `int64` | [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) | Values from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. | `1L` |
| `uint64` | [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) | Values from 0 to 18,446,744,073,709,551,615. | `1UL` |
| `nativeint` | [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) | A native pointer as a signed integer. | `nativeint 1` |
| `unativeint` | [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) | A native pointer as an unsigned integer. | `unativeint 1` |
| `decimal` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) | A floating point data type that has at least 28 significant digits. | `1.0m` |
| `float`, `double` | [System.Double](https://learn.microsoft.com/search/?terms=System.Double) | A 64-bit floating point type. | `1.0` |
| `float32`, `single` | [System.Single](https://learn.microsoft.com/search/?terms=System.Single) | A 32-bit floating point type. | `1.0f` |
| `char` | [System.Char](https://learn.microsoft.com/search/?terms=System.Char) | Unicode character values. | `'c'` |
| `string` | [System.String](https://learn.microsoft.com/search/?terms=System.String) | Unicode text. | `"str"` |
| `unit` | not applicable | Indicates the absence of an actual value. The type has only one formal value, which is denoted `()`. The unit value, `()`, is often used as a placeholder where a value is needed but no real value is available or makes sense. | `()` |

> **Note:**
> You can perform computations with integers too big for the 64-bit integer type by using the `bigint` type. `bigint` is not considered a basic type; it is an abbreviation for `System.Numerics.BigInteger`.

## See also

- [F# Language Reference](index.md)
