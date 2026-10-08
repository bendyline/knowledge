---
title: "Padding Strings in .NET"
description: Learn how to pad strings in .NET. Use the String.PadLeft and String.PadRight methods to add leading or trailing characters to achieve a specified total length.
ms.date: "03/15/2018"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "strings [.NET], padding"
  - "white space"
  - "PadRight method"
  - "PadLeft method"
  - "padding strings"
---
# Pad strings in .NET

Use one of the following [System.String](https://learn.microsoft.com/search/?terms=System.String) methods to create a new string that consists of an original string that is padded with leading or trailing characters to a specified total length. The padding character can be a space or a specified character. The resulting string appears to be either right-aligned or left-aligned. If the original string's length is already equal to or greater than the desired total length, the padding methods return the original string unchanged; for more information, see the **Returns** sections of the two overloads of the [System.String.PadLeft*](https://learn.microsoft.com/search/?terms=System.String.PadLeft*) and [System.String.PadRight*](https://learn.microsoft.com/search/?terms=System.String.PadRight*) methods.

| Method name | Use |
| --- | --- |
| [System.String.PadLeft*](https://learn.microsoft.com/search/?terms=System.String.PadLeft*) | Pads a string with leading characters to a specified total length. |
| [System.String.PadRight*](https://learn.microsoft.com/search/?terms=System.String.PadRight*) | Pads a string with trailing characters to a specified total length. |

## PadLeft

 The [System.String.PadLeft*](https://learn.microsoft.com/search/?terms=System.String.PadLeft*) method creates a new string by concatenating enough leading pad characters to an original string to achieve a specified total length. The [System.String.PadLeft%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.String.PadLeft%2528System.Int32%2529) method uses white space as the padding character and the [System.String.PadLeft%28System.Int32%2CSystem.Char%29](https://learn.microsoft.com/search/?terms=System.String.PadLeft%2528System.Int32%252CSystem.Char%2529) method enables you to specify your own padding character.

 The following code example uses the [System.String.PadLeft*](https://learn.microsoft.com/search/?terms=System.String.PadLeft*) method to create a new string that is twenty characters long. The example displays "`--------Hello World!`" to the console.

 [Conceptual.String.BasicOps#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/padding.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/padding.cs.md)
 [Conceptual.String.BasicOps#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/padding.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/padding.vb.md)

## PadRight

 The [System.String.PadRight*](https://learn.microsoft.com/search/?terms=System.String.PadRight*) method creates a new string by concatenating enough trailing pad characters to an original string to achieve a specified total length. The [System.String.PadRight%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.String.PadRight%2528System.Int32%2529) method uses white space as the padding character and the [System.String.PadRight%28System.Int32%2CSystem.Char%29](https://learn.microsoft.com/search/?terms=System.String.PadRight%2528System.Int32%252CSystem.Char%2529) method enables you to specify your own padding character.

 The following code example uses the [System.String.PadRight*](https://learn.microsoft.com/search/?terms=System.String.PadRight*) method to create a new string that is twenty characters long. The example displays "`Hello World!--------`" to the console.

 [Conceptual.String.BasicOps#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/padding.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.string.basicops/cs/padding.cs.md)
 [Conceptual.String.BasicOps#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/padding.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.string.basicops/vb/padding.vb.md)
