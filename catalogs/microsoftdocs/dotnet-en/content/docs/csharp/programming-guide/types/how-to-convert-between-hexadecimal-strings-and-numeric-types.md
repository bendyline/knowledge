---
title: "How to convert between hexadecimal strings and numeric types"
description: Learn how to convert between hexadecimal strings and numeric types. See code examples and view additional available resources.
ms.date: 07/20/2015
helpviewer_keywords:
  - "hexadecimal strings [C#], converting to numeric type"
  - "conversions [C#], hexadecimal strings"
  - "strings [C#], converting hexadecimal strings"
  - "hexadecimal strings [C#]"
ms.topic: how-to
ms.assetid: 7115c49f-7d1d-40c3-8bd9-aae0cc1d46b6
---
# How to convert between hexadecimal strings and numeric types (C# Programming Guide)

These examples show you how to perform the following tasks:

- Obtain the hexadecimal value of each character in a [string](../../language-reference/builtin-types/reference-types.md).

- Obtain the [char](../../language-reference/builtin-types/char.md) that corresponds to each value in a hexadecimal string.

- Convert a hexadecimal `string` to an [int](../../language-reference/builtin-types/integral-numeric-types.md).

- Convert a hexadecimal `string` to a [float](../../language-reference/builtin-types/floating-point-numeric-types.md).

- Convert a [byte](../../language-reference/builtin-types/integral-numeric-types.md) array to a hexadecimal `string`.

## Examples

 This example outputs the hexadecimal value of each character in a `string`. First it parses the `string` to an array of characters. Then it calls [System.Convert.ToInt32%28System.Char%29](https://learn.microsoft.com/search/?terms=System.Convert.ToInt32%2528System.Char%2529) on each character to obtain its numeric value. Finally, it formats the number as its hexadecimal representation in a `string`.

 [csProgGuideTypes#30 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#30)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

 This example parses a `string` of hexadecimal values and outputs the character corresponding to each hexadecimal value. First it calls the [Split(Char\[\])](https://learn.microsoft.com/search/?terms=System.String.Split\(System.Char%5B%5D\)) method to obtain each hexadecimal value as an individual `string` in an array. Then it calls [System.Convert.ToInt32%28System.String%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Convert.ToInt32%2528System.String%252CSystem.Int32%2529) to convert the hexadecimal value to a decimal value represented as an [int](../../language-reference/builtin-types/integral-numeric-types.md). It shows two different ways to obtain the character corresponding to that character code. The first technique uses [System.Char.ConvertFromUtf32%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.Char.ConvertFromUtf32%2528System.Int32%2529), which returns the character corresponding to the integer argument as a `string`. The second technique explicitly casts the `int` to a [char](../../language-reference/builtin-types/char.md).

 [csProgGuideTypes#31 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#31)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

 This example shows another way to convert a hexadecimal `string` to an integer, by calling the [System.Int32.Parse%28System.String%2CSystem.Globalization.NumberStyles%29](https://learn.microsoft.com/search/?terms=System.Int32.Parse%2528System.String%252CSystem.Globalization.NumberStyles%2529) method.

 [csProgGuideTypes#32 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#32)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

 The following example shows how to convert a hexadecimal `string` to a [float](../../language-reference/builtin-types/floating-point-numeric-types.md) by using the [System.BitConverter](https://learn.microsoft.com/search/?terms=System.BitConverter) class and the [System.UInt32.Parse*](https://learn.microsoft.com/search/?terms=System.UInt32.Parse*) method.

 [csProgGuideTypes#39 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#39)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

 The following example shows how to convert a [byte](../../language-reference/builtin-types/integral-numeric-types.md) array to a hexadecimal string by using the [System.BitConverter](https://learn.microsoft.com/search/?terms=System.BitConverter) class.

 [csProgGuideTypes#38 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#38)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

 The following example shows how to convert a [byte](../../language-reference/builtin-types/integral-numeric-types.md) array to a hexadecimal string by calling the [System.Convert.ToHexString*](https://learn.microsoft.com/search/?terms=System.Convert.ToHexString*) method introduced in .NET 5.0.

 [csProgGuideTypes#48 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs#48)](../../../../_code/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs.md)

## See also

- [Standard Numeric Format Strings](../../../standard/base-types/standard-numeric-format-strings.md)
- [Types](../../fundamentals/types/index.md)
- [How to determine whether a string represents a numeric value](../strings/how-to-determine-whether-a-string-represents-a-numeric-value.md)
