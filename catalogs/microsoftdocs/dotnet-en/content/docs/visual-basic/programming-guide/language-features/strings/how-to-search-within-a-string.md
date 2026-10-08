---
description: "Learn more about: How to: search within a string (Visual Basic)"
title: "How to: search within a string"
ms.date: 07/20/2015
helpviewer_keywords:
  - "strings [Visual Basic], finding"
  - "strings [Visual Basic], searching"
  - "examples [Visual Basic], strings"
ms.assetid: ae4c79e0-08ea-489f-bdb2-5eb6d355f284
---
# How to: search within a string (Visual Basic)

This article shows an example of how to search within a string in Visual Basic.

## Example

This example calls the [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) method on a [System.String](https://learn.microsoft.com/search/?terms=System.String) object to report the index of the first occurrence of a substring:

 [VbVbalrStrings#71 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class2.vb#71)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class2.vb.md)

## Robust programming

The [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) method returns the location of the first character of the first occurrence of the substring. The index is 0-based, which means the first character of a string has an index of 0.

If [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) does not find the substring, it returns -1.

The [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*) method is case-sensitive and uses the current culture.

For optimal error control, you might want to enclose the string search in the `Try` block of a [Try...Catch...Finally Statement](../../../language-reference/statements/try-catch-finally-statement.md) construction.

## See also

- [System.String.IndexOf*](https://learn.microsoft.com/search/?terms=System.String.IndexOf*)
- [Try...Catch...Finally Statement](../../../language-reference/statements/try-catch-finally-statement.md)
- [Introduction to Strings in Visual Basic](introduction-to-strings.md)
- [Strings](index.md)
