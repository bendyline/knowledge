---
title: "How to: Rename a File"
description: "Learn about how to rename a file with the Visual Basic Runtime Library or the .NET base class library."
ms.date: 01/14/2025
helpviewer_keywords:
- "I/O [Visual Basic], renaming files"
- "files [Visual Basic], renaming"
ms.assetid: 0ea7e0c8-2cb2-4bf5-a00d-7b6e3c08a3bc
---
# How to: Rename a File in Visual Basic

In Visual Basic, there are two ways to rename a file. You can use the Visual Basic run-time object `My.Computer.FileSystem` or the .NET provided `System.IO.File` object to rename a file.

## Rename with .NET

The `System.IO.File` object doesn't contain a method to rename a file, instead, use the `Move` method to "move" the file to the same location but with a different file name. This method can also be used to move the file to a different location with a different name, performing a move and rename together.

The following example renames the file located in the `My Documents` folder from `TextFile.txt` to `NewName.txt`.

[language="vb" source="./snippets/how-to-rename-a-file/Form1.vb" id="BCLRename"::: (complete source file; reference: ./snippets/how-to-rename-a-file/Form1.vb)](../../../../../_code/docs/visual-basic/developing-apps/programming/drives-directories-files/snippets/how-to-rename-a-file/Form1.vb.md)

## Rename with the Visual Basic run-time

Use the `RenameFile` method of the `My.Computer.FileSystem` object to rename a file by supplying the full path to the file and the new file name. This method can't be used to move a file to a different directory. To learn how to move a file, see [How to: Move a File in Visual Basic](how-to-move-a-file.md).

The following example renames the file located in the `My Documents` folder from `TextFile.txt` to `NewName.txt`.

[language="vb" source="./snippets/how-to-rename-a-file/Form1.vb" id="MyRename"::: (complete source file; reference: ./snippets/how-to-rename-a-file/Form1.vb)](../../../../../_code/docs/visual-basic/developing-apps/programming/drives-directories-files/snippets/how-to-rename-a-file/Form1.vb.md)

Visual Studio provides an IntelliSense code snippet that uses `My.Computer.FileSystem.RenameFile`. The snippet is located in **File system - Processing Drives, Folders, and Files**. For more information, see [Code Snippets](https://learn.microsoft.com/visualstudio/ide/code-snippets).

## Robust Programming

The following conditions might cause an exception:

- The path isn't valid for one of the following reasons: it's a zero-length string, it contains only white space, it contains invalid characters, or it's a device path (starts with \\\\.\\) ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).
- `newName` contains path information ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).
- The path isn't valid because it's `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).
- `newName` is `Nothing` or an empty string ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).
- The source file isn't valid or doesn't exist ([System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException)).
- There's an existing file or directory with the name specified in `newName` ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).
- The path exceeds the system-defined maximum length ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).
- A file or directory name in the path contains a colon (:) or is in an invalid format ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).
- The user lacks necessary permissions to view the path ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).
- The user doesn't have the required permission ([System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException)).

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem.RenameFile*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.RenameFile*)
- [System.IO.File.Move*](https://learn.microsoft.com/search/?terms=System.IO.File.Move*)
- [How to: Move a File](how-to-move-a-file.md)
- [Creating, Deleting, and Moving Files and Directories](creating-deleting-and-moving-files-and-directories.md)
- [How to: Create a Copy of a File in the Same Directory](how-to-create-a-copy-of-a-file-in-the-same-directory.md)
- [How to: Create a Copy of a File in a Different Directory](how-to-create-a-copy-of-a-file-in-a-different-directory.md)
