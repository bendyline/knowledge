---
title: "How to convert a string to a number"
description: Learn how to convert a string to a number in C# by calling the Parse, TryParse, or Convert class methods.
ms.date: 10/31/2024
helpviewer_keywords:
  - "conversions [C#]"
  - "conversions [C#], string to int"
  - "converting strings to int [C#]"
  - "strings [C#], converting to int"
ms.topic: how-to
ms.custom: copilot-scenario-highlight
ms.assetid: 467b9979-86ee-4afd-b734-30299cda91e3
adobe-target: true
---
# How to convert a string to a number (C# Programming Guide)

You convert a `string` to a number by calling the `Parse` or `TryParse` method found on numeric types (`int`, `long`, `double`, and so on), or by using methods in the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class.

It's slightly more efficient and straightforward to call a `TryParse` method (for example, [`int.TryParse("11", out number)`](https://learn.microsoft.com/search/?terms=System.Int32.TryParse%252A)) or `Parse` method (for example, [`var number = int.Parse("11")`](https://learn.microsoft.com/search/?terms=System.Int32.Parse%252A)). Using a [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) method is more useful for general objects that implement [System.IConvertible](https://learn.microsoft.com/search/?terms=System.IConvertible).

You use `Parse` or `TryParse` methods on the numeric type you expect the string contains, such as the [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) type. The [System.Convert.ToInt32*](https://learn.microsoft.com/search/?terms=System.Convert.ToInt32*) method uses [System.Int32.Parse*](https://learn.microsoft.com/search/?terms=System.Int32.Parse*) internally. The `Parse` method returns the converted number; the `TryParse` method returns a boolean value that indicates whether the conversion succeeded, and returns the converted number in an `out` parameter. If the string isn't in a valid format, `Parse` throws an exception, but `TryParse` returns `false`. When calling a `Parse` method, you should always use exception handling to catch a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) when the parse operation fails.

> **Tip:**
> You can use AI assistance to [convert a string to a number](#use-ai-to-convert-a-string-to-a-number).

## Call Parse or TryParse methods

The `Parse` and `TryParse` methods ignore white space at the beginning and at the end of the string, but all other characters must be characters that form the appropriate numeric type (`int`, `long`, `ulong`, `float`, `decimal`, and so on). Any white space within the string that forms the number causes an error. For example, you can use `decimal.TryParse` to parse "10", "10.3", or "  10  ", but you can't use this method to parse 10 from "10X", "1 0" (note the embedded space), "10 .3" (note the embedded space), "10e1" (`float.TryParse` works here), and so on. A string whose value is `null` or [System.String.Empty](https://learn.microsoft.com/search/?terms=System.String.Empty) fails to parse successfully. You can check for a null or empty string before attempting to parse it by calling the [System.String.IsNullOrEmpty*](https://learn.microsoft.com/search/?terms=System.String.IsNullOrEmpty*) method.

The following example demonstrates both successful and unsuccessful calls to `Parse` and `TryParse`.

[Parse and TryParse (complete source file; reference: \~/samples/snippets/csharp/programming-guide/string-to-number/parse-tryparse/program.cs)](../../../../_code/samples/snippets/csharp/programming-guide/string-to-number/parse-tryparse/Program.cs.md)

The following example illustrates one approach to parsing a string expected to include leading numeric characters (including hexadecimal characters) and trailing non-numeric characters. It assigns valid characters from the beginning of a string to a new string before calling the [System.Int32.TryParse*](https://learn.microsoft.com/search/?terms=System.Int32.TryParse*) method. Because the strings to be parsed contain a few characters, the example calls the [System.String.Concat*](https://learn.microsoft.com/search/?terms=System.String.Concat*) method to assign valid characters to a new string. For a larger string, the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class can be used instead.

[Removing invalid characters (complete source file; reference: \~/samples/snippets/csharp/programming-guide/string-to-number/parse-tryparse2/program.cs)](../../../../_code/samples/snippets/csharp/programming-guide/string-to-number/parse-tryparse2/Program.cs.md)

## Call Convert methods

The following table lists some of the methods from the [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) class that you can use to convert a string to a number.

| Numeric type | Method |
| --- | --- |
| `decimal` | [System.Convert.ToDecimal%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToDecimal%2528System.String%2529) |
| `float` | [System.Convert.ToSingle%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToSingle%2528System.String%2529) |
| `double` | [System.Convert.ToDouble%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToDouble%2528System.String%2529) |
| `short` | [System.Convert.ToInt16%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToInt16%2528System.String%2529) |
| `int` | [System.Convert.ToInt32%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToInt32%2528System.String%2529) |
| `long` | [System.Convert.ToInt64%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToInt64%2528System.String%2529) |
| `ushort` | [System.Convert.ToUInt16%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToUInt16%2528System.String%2529) |
| `uint` | [System.Convert.ToUInt32%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToUInt32%2528System.String%2529) |
| `ulong` | [System.Convert.ToUInt64%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToUInt64%2528System.String%2529) |

The following example calls the [System.Convert.ToInt32%28System.String%29](https://learn.microsoft.com/search/?terms=System.Convert.ToInt32%2528System.String%2529) method to convert an input string to an [int](../../language-reference/builtin-types/integral-numeric-types.md). The example catches the two most common exceptions thrown by this method: [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) and [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException). If the resulting number can be incremented without exceeding [System.Int32.MaxValue](https://learn.microsoft.com/search/?terms=System.Int32.MaxValue), the example adds 1 to the result and displays the output.

[Parsing with Convert methods (complete source file; reference: \~/samples/snippets/csharp/programming-guide/string-to-number/convert/program.cs)](../../../../_code/samples/snippets/csharp/programming-guide/string-to-number/convert/Program.cs.md)

## Use AI to convert a string to a number

You can use AI tools, such as GitHub Copilot, to generate C# code to convert a string to a number. You can customize the prompt to use a string per your requirements.

Here's an example Copilot Chat prompt:

```copilot-prompt
Show me how to parse a string as a number, but don't throw an exception if the input string doesn't represent a number.
```

Review Copilot's suggestions before applying them.

For more information, see [Copilot FAQs](https://aka.ms/copilot-general-use-faqs).

## See also

- [GitHub Copilot in Visual Studio](https://learn.microsoft.com/visualstudio/ide/visual-studio-github-copilot-install-and-states)
- [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview)
