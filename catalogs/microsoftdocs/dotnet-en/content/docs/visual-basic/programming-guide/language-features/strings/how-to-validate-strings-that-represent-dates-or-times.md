---
description: "Learn more about: How to: Validate Strings That Represent Dates or Times (Visual Basic)"
title: "How to: Validate Strings That Represent Dates or Times"
ms.date: 07/20/2015
helpviewer_keywords:
  - "strings [Visual Basic], validating"
  - "String data type [Visual Basic], validation"
ms.assetid: ae7d4b29-3436-4032-bdbf-4650eb1c8e19
---
# How to: Validate Strings That Represent Dates or Times (Visual Basic)

The following code example sets a `Boolean` value that indicates whether a string represents a valid date or time.

## Example

 [VbVbcnRegEx#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnRegEx/VB/Class1.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnRegEx/VB/Class1.vb.md)

## Compile the code

 Replace `("01/01/03")` and `"9:30 PM"` with the date and time you want to validate. You can replace the string with another hard-coded string, with a `String` variable, or with a method that returns a string, such as `InputBox`.

## Robust Programming

 Use this method to validate the string before trying to convert the `String` to a `DateTime` variable. By checking the date or time first, you can avoid generating an exception at run time.

## See also

- [Microsoft.VisualBasic.Information.IsDate*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Information.IsDate*)
- [Microsoft.VisualBasic.Interaction.InputBox*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Interaction.InputBox*)
- [Validating Strings in Visual Basic](validating-strings.md)
