---
description: "Learn more about: How to: create strings using a StringBuilder in Visual Basic"
title: "How to: create strings using a StringBuilder"
ms.date: 07/20/2015
helpviewer_keywords:
  - "StringBuilder class"
  - "strings [Visual Basic], using StringBuilder"
ms.assetid: 9c042880-aa16-432e-9ccb-cd00abda9ae3
---
# How to: create strings using a StringBuilder in Visual Basic

This example constructs a long string from many smaller strings using the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class. The [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class is more efficient than the `&=` operator for concatenating many strings.

## Example

The following example creates an instance of the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class, appends 1,000 strings to that instance, and then returns its string representation:

 [VbVbalrStrings#70 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class2.vb#70)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class2.vb.md)

## See also

- [Using the StringBuilder Class](../../../../standard/base-types/stringbuilder.md)
- [&= Operator](../../../language-reference/operators/and-assignment-operator.md)
- [Strings](index.md)
- [Creating New Strings](../../../../standard/base-types/creating-new.md)
- [Manipulating Strings](../../../../standard/base-types/best-practices-strings.md)
