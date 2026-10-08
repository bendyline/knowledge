---
description: "Learn more about: How to: Copy Files with a Specific Pattern to a Directory in Visual Basic"
title: "How to: Copy Files with a Specific Pattern to a Directory"
ms.date: 07/20/2015
helpviewer_keywords:
  - "My.Computer.FileSystem.CopyFile method, copying files [Visual Basic]"
  - "files [Visual Basic], copying"
  - "CopyFile method [Visual Basic], copying files in Visual Basic"
  - "I/O [Visual Basic], copying files"
ms.assetid: f205d2ad-bbe5-4d55-8a40-acda21aa82dd
---
# How to: Copy Files with a Specific Pattern to a Directory in Visual Basic

The [Microsoft.VisualBasic.MyServices.FileSystemProxy.GetFiles*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.FileSystemProxy.GetFiles*) method returns a read-only collection of strings representing the path names for the files. You can use the `wildCards` parameter to specify a specific pattern.

 An empty collection is returned if no matching files are found.

 You can use the [Microsoft.VisualBasic.FileIO.FileSystem.CopyFile*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.CopyFile*) method to copy the files to a directory.

### To copy files with a specific pattern to a directory

1. Use the `GetFiles` method to return the list of files. This example returns all .rtf files in the specified directory.

     [VbFileIOMisc#36 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/Class1.vb#36)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/Class1.vb.md)

2. Use the `CopyFile` method to copy the files. This example copies the files to the directory named `testdirectory`.

     [VbVbcnMyFileSystem#88 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#88)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

3. Close the `For` statement with a `Next` statement.

     [VbVbcnMyFileSystem#89 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#89)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

## Example

 The following example, which presents the above snippets in complete form, copies all .rtf files in the specified directory to the directory named `testdirectory`.

 [VbFileIOMisc#37 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/Class1.vb#37)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/Class1.vb.md)

## .NET Framework Security

 The following conditions may cause an exception:

- The path is not valid for one of the following reasons: it is a zero-length string, it contains only white space, it contains invalid characters, or it is a device path (starts with \\\\.\\) ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The path is not valid because it is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- The directory does not exist ([System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException)).

- The directory points to an existing file ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The path exceeds the system-defined maximum length ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).

- A file or directory name in the path contains a colon (:) or is in an invalid format ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).

- The user lacks necessary permissions to view the path ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)). The user lacks necessary permissions ([System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException)).

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem.CopyFile*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.CopyFile*)
- [Microsoft.VisualBasic.MyServices.FileSystemProxy.GetFiles*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.FileSystemProxy.GetFiles*)
- [How to: Find Subdirectories with a Specific Pattern](how-to-find-subdirectories-with-a-specific-pattern.md)
- [Troubleshooting: Reading from and Writing to Text Files](troubleshooting-reading-from-and-writing-to-text-files.md)
- [How to: Get the Collection of Files in a Directory](how-to-get-the-collection-of-files-in-a-directory.md)
