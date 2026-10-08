---
description: "Learn more about: How to: Create a Directory in Visual Basic"
title: "How to: Create a Directory"
ms.date: 07/20/2015
helpviewer_keywords:
  - "directories [Visual Basic], creating"
  - "folders [Visual Basic], creating"
ms.assetid: 0351a2ca-24d8-43b5-bb39-9b99e6401cff
---
# How to: Create a Directory in Visual Basic

Use the `CreateDirectory` method of the `My.Computer.FileSystem` object to create directories.

 If the directory already exists, no exception is thrown.

### To create a directory

- Use the `CreateDirectory` method by specifying the full path of the location where the directory should be created. This example creates the directory `NewDirectory` in `C:\Documents and Settings\All Users\Documents`.

     [VbVbcnMyFileSystem#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

## Robust Programming

 The following conditions may cause an exception:

- The directory name is malformed. For example, it contains illegal characters or is only white space ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The parent directory of the directory to be created is read-only ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The directory name is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- The directory name is too long ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).

- The directory name is a colon ":" ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).

- The user does not have permission to create the directory ([System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException)).

- The user lacks permissions in a partial-trust situation ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem.CreateDirectory*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.CreateDirectory*)
- [Creating, Deleting, and Moving Files and Directories](creating-deleting-and-moving-files-and-directories.md)
