---
description: "Learn more about: How to: Read From Binary Files in Visual Basic"
title: "How to: Read From Binary Files"
ms.date: 07/20/2015
helpviewer_keywords:
  - "binary files [Visual Basic], reading from"
  - "I/O [Visual Basic], reading from binary files"
  - "ReadAllBytes method [Visual Basic], reading from binary files"
  - "My.Computer.FileSystem object, reading from binary files"
ms.assetid: d2b1269e-24b6-42e0-9414-ae708db282d8
---
# How to: Read From Binary Files in Visual Basic

The `My.Computer.FileSystem` object provides the `ReadAllBytes` method for reading from binary files.

### To read from a binary file

- Use the `ReadAllBytes` method, which returns the contents of a file as a byte array. This example reads from the file `C:/Documents and Settings/selfportrait.jpg`.

     [VbVbcnMyFileSystem#78 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#78)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

- For large binary files, you can use the [System.IO.FileStream.Read*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Read*) method of the [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) object to read from the file only a specified amount at a time. You can then limit how much of the file is loaded into memory for each read operation. The following code example copies a file and allows the caller to specify how much of the file is read into memory per read operation.

     [VbVbcnMyFileSystem#91 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#91)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

## Robust Programming

 The following conditions may cause an exception to be thrown:

- The path is not valid for one of the following reasons: it is a zero-length string, it contains only white space, it contains invalid characters, or it is a device path ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The path is not valid because it is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- The file does not exist ([System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException)).

- The file is in use by another process, or an I/O error occurs ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The path exceeds the system-defined maximum length ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).

- A file or directory name in the path contains a colon (:) or is in an invalid format ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).

- There is not enough memory to write the string to buffer ([System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException)).

- The user lacks necessary permissions to view the path ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).

 Do not make decisions about the contents of the file based on the name of the file. For example, the file Form1.vb may not be a Visual Basic source file.

 Verify all inputs before using the data in your application. The contents of the file may not be what is expected, and methods to read from the file may fail.

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem.ReadAllBytes*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.ReadAllBytes*)
- [Microsoft.VisualBasic.FileIO.FileSystem.WriteAllBytes*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.WriteAllBytes*)
- [Reading from Files](reading-from-files.md)
- [How to: Read From Text Files with Multiple Formats](how-to-read-from-text-files-with-multiple-formats.md)
- [Storing Data to and Reading from the Clipboard](../computer-resources/storing-data-to-and-reading-from-the-clipboard.md)
