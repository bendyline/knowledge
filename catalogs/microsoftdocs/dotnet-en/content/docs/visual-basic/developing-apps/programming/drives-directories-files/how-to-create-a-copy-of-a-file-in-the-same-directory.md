---
description: "Learn more about: How to: Create a Copy of a File in the Same Directory in Visual Basic"
title: "How to: Create a Copy of a File in the Same Directory"
ms.date: 07/20/2015
f1_keywords:
  - "File.Copy"
helpviewer_keywords:
  - "My.Computer.FileSystem.CopyFile method, copying files [Visual Basic]"
  - "files [Visual Basic], copying"
  - "CopyFile method [Visual Basic], copying files in Visual Basic"
  - "I/O [Visual Basic], copying files"
ms.assetid: b2fdda86-e666-42c2-9706-9527e9fa68ff
---
# How to: Create a Copy of a File in the Same Directory in Visual Basic

Use the `My.Computer.FileSystem.CopyFile` method to copy files. The parameters allow you to overwrite existing files, rename the file, show the progress of the operation, and allow the user to cancel the operation.

### To create a copy of a file in the same folder

- Use the `CopyFile` method, supplying the target file and the location. The following example creates a copy of `test.txt` called `test2.txt`.

     [VbVbcnMyFileSystem#51 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#51)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

### To create a copy of a file in the same folder, overwriting existing files

- Use the `CopyFile` method, supplying the target file and location, and setting `overwrite` to `True`. The following example creates a copy of `test.txt` called `test2.txt` and overwrites any existing files by that name.

     [VbVbcnMyFileSystem#52 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#52)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

## Robust Programming

 The following conditions may cause an exception to be thrown:

- The path is not valid for one of the following reasons: it is a zero-length string, it contains only white space, it contains invalid characters, or it is a device path (starts with \\\\.\\) ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The system could not retrieve the absolute path ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The path is not valid because it is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- The source file is not valid or does not exist ([System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException)).

- The combined path points to an existing directory ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The destination file exists and `overwrite` is set to `False` ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The user does not have sufficient permissions to access the file ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- A file in the target folder with the same name is in use ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- A file or folder name in the path contains a colon (:) or is in an invalid format ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).

- `ShowUI` is set to `True`, `onUserCancel` is set to `ThrowException`, and the user has cancelled the operation ([System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException)).

- `ShowUI` is set to `True`, `onUserCancel` is set to `ThrowException`, and an unspecified I/O error occurs ([System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException)).

- The path exceeds the system-defined maximum length ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).

- The user does not have required permission ([System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException)).

- The user lacks necessary permissions to view the path ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem)
- [Microsoft.VisualBasic.FileIO.FileSystem.CopyFile*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.CopyFile*)
- [Microsoft.VisualBasic.FileIO.UICancelOption](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.UICancelOption)
- [How to: Copy Files with a Specific Pattern to a Directory](how-to-copy-files-with-a-specific-pattern-to-a-directory.md)
- [How to: Create a Copy of a File in a Different Directory](how-to-create-a-copy-of-a-file-in-a-different-directory.md)
- [How to: Copy a Directory to Another Directory](how-to-copy-a-directory-to-another-directory.md)
- [How to: Rename a File](how-to-rename-a-file.md)
