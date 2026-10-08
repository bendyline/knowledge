---
description: "Learn more about: How to: Create a File in Visual Basic"
title: "How to: Create a File"
ms.date: 07/20/2015
helpviewer_keywords:
  - "text files [Visual Basic], creating"
  - "files [Visual Basic], creating"
ms.assetid: 0253bb6d-5519-4a50-b882-b93ef5cca0d9
---
# How to: Create a File in Visual Basic

This example creates an empty text file at the specified path using the [System.IO.File.Create*](https://learn.microsoft.com/search/?terms=System.IO.File.Create*) method in the [System.IO.File](https://learn.microsoft.com/search/?terms=System.IO.File) class.

## Example

 [VbFileIOMisc#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/class2.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/class2.vb.md)

## Compiling the Code

 Use the `file` variable to write to the file.

## Robust Programming

 If the file already exists, it is replaced.

 The following conditions may cause an exception:

- The path name is malformed. For example, it contains illegal characters or is only white space ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The path is read-only ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The path name is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- The path name is too long ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).

- The path is invalid ([System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException)).

- The path is only a colon ":" ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).

## .NET Framework Security

 A [System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException) may be thrown in partial-trust environments.

 The call to the [System.IO.File.Create*](https://learn.microsoft.com/search/?terms=System.IO.File.Create*) method requires [System.Security.Permissions.FileIOPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermission).

 An [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException) is thrown if the user does not have permission to create the file.

## See also

- [System.IO](https://learn.microsoft.com/search/?terms=System.IO)
- [System.IO.File.Create*](https://learn.microsoft.com/search/?terms=System.IO.File.Create*)
