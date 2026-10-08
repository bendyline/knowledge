---
description: "Learn more about: Zero-based vs. One-based String Access in Visual Basic"
title: "Zero-based vs. One-based String Access"
ms.date: 07/20/2015
helpviewer_keywords:
  - "strings [Visual Basic], indexing"
ms.assetid: 0ed39f35-d68e-421d-ae14-460a5c0373b8
---
# Zero-based vs. One-based String Access in Visual Basic

This topic compares how Visual Basic and the .NET Framework provide access to the characters in a string. The .NET Framework always provides zero-based access to the characters in a string, whereas Visual Basic provides zero-based and one-based access, depending on the function.

## One-Based

 For an example of a one-based Visual Basic function, consider the `Mid` function. It takes an argument that indicates the character position at which the substring will start, starting with position 1. The .NET Framework [System.String.Substring*](https://learn.microsoft.com/search/?terms=System.String.Substring*) method takes an index of the character in the string at which the substring is to start, starting with position 0. Thus, if you have a string "ABCDE", the individual characters are numbered 1,2,3,4,5 for use with the `Mid` function, but 0,1,2,3,4 for use with the [System.String.Substring*](https://learn.microsoft.com/search/?terms=System.String.Substring*) method.

## Zero-Based

 For an example of a zero-based Visual Basic function, consider the `Split` function. It splits a string and returns an array containing the substrings. The .NET Framework [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) method also splits a string and returns an array containing the substrings. Because the `Split` function and [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) method return .NET Framework arrays, they must be zero-based.

## See also

- [Microsoft.VisualBasic.Strings.Mid*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.Mid*)
- [Microsoft.VisualBasic.Strings.Split*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Strings.Split*)
- [System.String.Substring*](https://learn.microsoft.com/search/?terms=System.String.Substring*)
- [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*)
- [Introduction to Strings in Visual Basic](introduction-to-strings.md)
