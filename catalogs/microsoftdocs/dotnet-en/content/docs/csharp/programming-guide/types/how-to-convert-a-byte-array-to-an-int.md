---
title: "How to convert a byte array to an int"
description: Learn how to convert a byte array to an int. See code examples and view additional available resources.
ms.date: 07/20/2015
helpviewer_keywords:
  - "conversions [C#], byte array to int"
  - "byte arrays [C#], converting to int"
ms.topic: how-to
ms.assetid: d6ac20e2-448e-4aea-99b9-faf04c6f1e79
---
# How to convert a byte array to an int (C# Programming Guide)

This example shows you how to use the [System.BitConverter](https://learn.microsoft.com/search/?terms=System.BitConverter) class to convert an array of bytes to an [int](../../language-reference/builtin-types/integral-numeric-types.md) and back to an array of bytes. You may have to convert from bytes to a built-in data type after you read bytes off the network, for example. In addition to the [ToInt32(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToInt32\(System.Byte%5B%5D%2CSystem.Int32\)) method in the example, the following table lists methods in the [System.BitConverter](https://learn.microsoft.com/search/?terms=System.BitConverter) class that convert bytes (from an array of bytes) to other built-in types.

| Type returned | Method |
| --- | --- |
| `bool` | [ToBoolean(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToBoolean\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `char` | [ToChar(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToChar\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `double` | [ToDouble(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToDouble\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `short` | [ToInt16(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToInt16\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `int` | [ToInt32(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToInt32\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `long` | [ToInt64(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToInt64\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `float` | [ToSingle(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToSingle\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `ushort` | [ToUInt16(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToUInt16\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `uint` | [ToUInt32(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToUInt32\(System.Byte%5B%5D%2CSystem.Int32\)) |
| `ulong` | [ToUInt64(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToUInt64\(System.Byte%5B%5D%2CSystem.Int32\)) |

## Examples

This example initializes an array of bytes, reverses the array if the computer architecture is little-endian (that is, the least significant byte is stored first), and then calls the [ToInt32(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToInt32\(System.Byte%5B%5D%2CSystem.Int32\)) method to convert four bytes in the array to an `int`. The second argument to [ToInt32(Byte\[\], Int32)](https://learn.microsoft.com/search/?terms=System.BitConverter.ToInt32\(System.Byte%5B%5D%2CSystem.Int32\)) specifies the start index of the array of bytes.

> **Note:**
> The output may differ depending on the endianness of your computer's architecture.

[csProgGuideTypes#22 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#22)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

In this example, the [System.BitConverter.GetBytes%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.BitConverter.GetBytes%2528System.Int32%2529) method of the [System.BitConverter](https://learn.microsoft.com/search/?terms=System.BitConverter) class is called to convert an `int` to an array of bytes.

> **Note:**
> The output may differ depending on the endianness of your computer's architecture.

[csProgGuideTypes#23 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#23)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

## See also

- [System.BitConverter](https://learn.microsoft.com/search/?terms=System.BitConverter)
- [System.BitConverter.IsLittleEndian](https://learn.microsoft.com/search/?terms=System.BitConverter.IsLittleEndian)
- [Types](../../fundamentals/types/index.md)
