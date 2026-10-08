---
description: "Learn more about: How to: Append to Text Files in Visual Basic"
title: "How to: Append to Text Files"
ms.date: 07/20/2015
helpviewer_keywords:
  - "I/O [Visual Basic], appending to files"
  - "I/O [Visual Basic], My.Computer.FileSystem.WriteAllText method"
  - "I/O [Visual Basic], WriteAllText method"
ms.assetid: bbbd7fb5-f169-41a9-b53f-520ea9613913
---
# How to: Append to Text Files in Visual Basic

The [Microsoft.VisualBasic.FileIO.FileSystem.WriteAllText*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.WriteAllText*) method can be used to append to a text file by specifying that the `append` parameter is set to `True`.

### To append to a text file

- Use the `WriteAllText` method, specifying the target file and string to be appended and setting the `append` parameter to `True`.

     This example writes the string `"This is a test string."` to the file named `Testfile.txt`.

     [VbFileIOWrite#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOWrite/VB/Class1.vb#6)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOWrite/VB/Class1.vb.md)

## Robust Programming

 The following conditions may cause an exception:

- The path is not valid for one of the following reasons: it is a zero-length string, it contains only white space, it contains invalid characters, or it is a device path (starts with \\\\.\\) ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The path is not valid because it is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- `File` points to a path that does not exist ([System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException) or [System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException)).

- The file is in use by another process, or an I/O error occurs ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The path exceeds the system-defined maximum length ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).

- A file or directory name in the path contains a colon (:) or is in an invalid format ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).

- The user lacks necessary permissions to view the path ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem.WriteAllText*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.WriteAllText*)
- [Microsoft.VisualBasic.FileIO.FileSystem](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem)
- [Writing to Files](writing-to-files.md)
