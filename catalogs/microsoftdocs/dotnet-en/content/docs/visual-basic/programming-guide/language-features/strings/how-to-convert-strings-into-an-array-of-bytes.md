---
description: "Learn more about: How to: Convert Strings into an Array of Bytes in Visual Basic"
title: "How to: Convert Strings into an Array of Bytes"
ms.date: 07/20/2015
helpviewer_keywords:
  - "string conversion [Visual Basic], arrays"
  - "arrays [Visual Basic], converting strings to"
  - "byte arrays"
  - "examples [Visual Basic], string conversion"
  - "arrays [Visual Basic], byte arrays"
ms.assetid: f477d35c-a3fc-4a30-b1d4-cd0d353aae1d
---
# How to: Convert Strings into an Array of Bytes in Visual Basic

This topic shows how to convert a string into an array of bytes.

## Example

 This example uses the [System.Text.Encoding.GetBytes*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetBytes*) method of the [System.Text.Encoding.Unicode*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.Unicode*) encoding class to convert a string into an array of bytes.

 [VbVbalrStrings#74 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class2.vb#74)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class2.vb.md)

 You can choose from several encoding options to convert a string into a byte array:

- [System.Text.Encoding.ASCII*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.ASCII*): Gets an encoding for the ASCII (7-bit) character set.

- [System.Text.Encoding.BigEndianUnicode*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.BigEndianUnicode*): Gets an encoding for the UTF-16 format using the big-endian byte order.

- [System.Text.Encoding.Default*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.Default*): Gets an encoding for the system's current ANSI code page.

- [System.Text.Encoding.Unicode*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.Unicode*): Gets an encoding for the UTF-16 format using the little-endian byte order.

- [System.Text.Encoding.UTF32*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.UTF32*): Gets an encoding for the UTF-32 format using the little-endian byte order.

- [System.Text.Encoding.UTF7*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.UTF7*): Gets an encoding for the UTF-7 format.

- [System.Text.Encoding.UTF8*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.UTF8*): Gets an encoding for the UTF-8 format.

## See also

- [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding)
- [System.Text.Encoding.GetBytes*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetBytes*)
- [How to: Convert an Array of Bytes into a String in Visual Basic](how-to-convert-an-array-of-bytes-into-a-string.md)
