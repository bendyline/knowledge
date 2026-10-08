---
title: "Enumeration format strings"
description: Create enumeration format strings using the Enum.ToString method in .NET. Format numeric, hexadecimal, or string values of enumeration members.
ms.date: 06/19/2023
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "format specifiers, enumeration format strings"
  - "enumeration format strings"
  - "formatting [.NET], enumeration"
ms.assetid: dd1ff672-1052-42cf-8666-4924fb6cd1a1
---

# Enumeration format strings

You can use the [System.Enum.ToString*](https://learn.microsoft.com/search/?terms=System.Enum.ToString*) method to create a new string object that represents the numeric, hexadecimal, or string value of an enumeration member. This method takes one of the enumeration formatting strings to specify the value that you want returned.

The following sections list the enumeration formatting strings and the values they return. These format specifiers aren't case-sensitive.

## G or g

Displays the enumeration entry as a string value, if possible, and otherwise displays the integer value of the current instance. If the enumeration is defined with the [System.FlagsAttribute](https://learn.microsoft.com/search/?terms=System.FlagsAttribute) set, the string values of each valid entry are concatenated together, separated by commas. If the `Flags` attribute isn't set, an invalid value is displayed as a numeric entry. The following example illustrates the `G` format specifier.

[Formatting.Enum#1 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs.md)
[Formatting.Enum#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb.md)

## F or f

Displays the enumeration entry as a string value, if possible. If the value can be displayed as a summation of the entries in the enumeration (even if the `Flags` attribute isn't present), the string values of each valid entry are concatenated together, separated by commas. If the value can't be determined by the enumeration entries, then the value is formatted as the integer value. The following example illustrates the `F` format specifier.

[Formatting.Enum#2 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs.md)
[Formatting.Enum#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb.md)

## D or d

Displays the enumeration entry as an integer value in the shortest representation possible. The following example illustrates the `D` format specifier.

[Formatting.Enum#3 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs.md)
[Formatting.Enum#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb.md)

## X or x

Displays the enumeration entry as a hexadecimal value. The value is represented with leading zeros as necessary, to ensure that the result string has two characters for each byte in the enumeration type's [underlying numeric type](https://learn.microsoft.com/search/?terms=System.Enum.GetUnderlyingType%252A). The following example illustrates the X format specifier. In the example, the underlying types of [System.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DayOfWeek), [System.ConsoleColor](https://learn.microsoft.com/search/?terms=System.ConsoleColor) and [System.IO.FileAttributes](https://learn.microsoft.com/search/?terms=System.IO.FileAttributes) is [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32), or a 32-bit (or 4-byte) integer, which produces an 8-character result string.

[Formatting.Enum#4 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs.md)
[Formatting.Enum#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb.md)

## Example

The following example defines an enumeration called `Colors` that consists of three entries: `Red`, `Blue`, and `Green`.

[Formatting.Enum#5 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs.md)
[Formatting.Enum#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb.md)

After the enumeration is defined, an instance can be declared in the following manner.

[Formatting.Enum#6 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs.md)
[Formatting.Enum#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb.md)

The `Color.ToString(System.String)` method can then be used to display the enumeration value in different ways, depending on the format specifier passed to it.

[Formatting.Enum#7 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.Enum/cs/enum1.cs.md)
[Formatting.Enum#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.Enum/vb/enum1.vb.md)

## See also

- [Formatting types](formatting-types.md)
