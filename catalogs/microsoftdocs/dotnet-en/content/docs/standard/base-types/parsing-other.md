---
description: "Learn more about: Parsing Other Strings in .NET"
title: "Parsing Other Strings in .NET"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Char data type, parsing strings"
  - "enumerations [.NET], parsing strings"
  - "base types, parsing strings"
  - "parsing strings, other strings"
  - "Boolean data type, parsing strings"
---
# Parse other strings in .NET

In addition to numeric and [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) strings, you can also parse strings that represent the types [System.Char](https://learn.microsoft.com/search/?terms=System.Char), [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean), and [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) into data types.

## Char

 The static parse method associated with the **Char** data type is useful for converting a string that contains a single character into its Unicode value. The following code example parses a string into a Unicode character.

 [Conceptual.String.Parse#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.parse/cs/parse.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.parse/cs/parse.cs.md)
 [Conceptual.String.Parse#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.parse/vb/parse.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.parse/vb/parse.vb.md)

## Boolean

 The **Boolean** data type contains a **Parse** method that you can use to convert a string that represents a Boolean value into an actual **Boolean** type. This method is not case-sensitive and can successfully parse a string containing "True" or "False." The **Parse** method associated with the **Boolean** type can also parse strings that are surrounded by white spaces. If any other string is passed, a [System.FormatException](https://learn.microsoft.com/search/?terms=System.FormatException) is thrown.

 The following code example uses the **Parse** method to convert a string into a Boolean value.

 [Conceptual.String.Parse#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.parse/cs/parse.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.parse/cs/parse.cs.md)
 [Conceptual.String.Parse#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.parse/vb/parse.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.parse/vb/parse.vb.md)

## Enumeration

 You can use the static **Parse** method to initialize an enumeration type to the value of a string. This method accepts the enumeration type you are parsing, the string to parse, and an optional Boolean flag indicating whether or not the parse is case-sensitive. The string you are parsing can contain several values separated by commas, which can be preceded or followed by one or more empty spaces (also called white spaces). When the string contains multiple values, the value of the returned object is the value of all specified values combined with a bitwise OR operation.

 The following example uses the **Parse** method to convert a string representation into an enumeration value. The [System.DayOfWeek](https://learn.microsoft.com/search/?terms=System.DayOfWeek) enumeration is initialized to **Thursday** from a string.

 [Conceptual.String.Parse#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.parse/cs/parse.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.parse/cs/parse.cs.md)
 [Conceptual.String.Parse#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.parse/vb/parse.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.parse/vb/parse.vb.md)

## See also

- [Parsing Strings](parsing-strings.md)
- [Formatting Types](formatting-types.md)
- [Type Conversion in .NET](type-conversion.md)
