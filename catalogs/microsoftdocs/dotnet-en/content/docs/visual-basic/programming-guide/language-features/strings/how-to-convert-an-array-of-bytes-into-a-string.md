---
description: "Learn more about: How to: Convert an Array of Bytes into a String in Visual Basic"
title: "How to: Convert an Array of Bytes into a String"
ms.date: 07/20/2015
helpviewer_keywords:
  - "string conversion [Visual Basic], arrays"
  - "byte arrays [Visual Basic], converting to strings"
  - "examples [Visual Basic], strings"
  - "arrays [Visual Basic], converting to strings"
ms.assetid: d0dc8317-9ab3-4324-99f7-3f5788c0e72a
---
# How to: Convert an Array of Bytes into a String in Visual Basic

This topic shows how to convert the bytes from a byte array into a string.

## Example

 This example uses the [System.Text.Encoding.GetString*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetString*) method of the [System.Text.Encoding.Unicode*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.Unicode*) encoding class to convert all the bytes from a byte array into a string.

 [VbVbalrStrings#72 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class2.vb#72)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class2.vb.md)

 You can choose from several encoding options to convert a byte array into a string:

- [System.Text.Encoding.ASCII*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.ASCII*): Gets an encoding for the ASCII (7-bit) character set.

- [System.Text.Encoding.BigEndianUnicode*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.BigEndianUnicode*): Gets an encoding for the UTF-16 format using the big-endian byte order.

- [System.Text.Encoding.Default*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.Default*): Gets an encoding for the system's current ANSI code page.

- [System.Text.Encoding.Unicode*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.Unicode*): Gets an encoding for the UTF-16 format using the little-endian byte order.

- [System.Text.Encoding.UTF32*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.UTF32*): Gets an encoding for the UTF-32 format using the little-endian byte order.

- [System.Text.Encoding.UTF7*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.UTF7*): Gets an encoding for the UTF-7 format.

- [System.Text.Encoding.UTF8*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.UTF8*): Gets an encoding for the UTF-8 format.

## See also

- [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding)
- [System.Text.Encoding.GetString*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetString*)
- [How to: Convert Strings into an Array of Bytes in Visual Basic](how-to-convert-strings-into-an-array-of-bytes.md)
