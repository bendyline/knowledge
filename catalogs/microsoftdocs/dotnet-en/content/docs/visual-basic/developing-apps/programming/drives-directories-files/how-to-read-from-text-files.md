---
description: "Learn more about: How to: Read From Text Files in Visual Basic"
title: "How to: Read From Text Files"
ms.date: 07/20/2015
helpviewer_keywords:
  - "extended characters [Visual Basic], reading"
  - "reading text files [Visual Basic]"
  - "reading data, text files"
  - "examples [Visual Basic], reading text files"
  - "text files [Visual Basic], reading"
ms.assetid: 735fe9d7-0f7a-4185-ba02-f35e580ec4b8
---
# How to: Read From Text Files in Visual Basic

The [Microsoft.VisualBasic.MyServices.FileSystemProxy.ReadAllText*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.FileSystemProxy.ReadAllText*) method of the `My.Computer.FileSystem` object allows you to read from a text file. The file encoding can be specified if the contents of the file use an encoding such as ASCII or UTF-8.

If you are reading from a file with extended characters, you will need to specify the file encoding.

> **Note:**
> To read a file a single line of text at a time, use the [Microsoft.VisualBasic.MyServices.FileSystemProxy.OpenTextFileReader*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.FileSystemProxy.OpenTextFileReader*) method of the `My.Computer.FileSystem` object. The `OpenTextFileReader` method returns a [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) object. You can use the [System.IO.StreamReader.ReadLine*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadLine*) method of the `StreamReader` object to read a file one line at a time. You can test for the end of the file using the [System.IO.StreamReader.EndOfStream*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.EndOfStream*) method of the `StreamReader` object.

## To read from a text file

Use the `ReadAllText` method of the `My.Computer.FileSystem` object to read the contents of a text file into a string, supplying the path. The following example reads the contents of test.txt into a string and then displays it in a message box.

[VbFileIORead#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb.md)

### To read from a text file that is encoded

Use the `ReadAllText` method of the `My.Computer.FileSystem` object to read the contents of a text file into a string, supplying the path and file encoding type. The following example reads the contents of the UTF32 file test.txt into a string and then displays it in a message box.

[VbFileIORead#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb#3)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb.md)

### To read from a text file into a RichTextBox control

To load the contents of a text file directly into a RichTextBox control, read the file contents into a string and assign it to the `Text` property of the RichTextBox. The following example shows how to read a text file and load it into a RichTextBox control.

[VbFileIORead#21 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb#21)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb.md)

For better error handling and file path management, you can use the following approach that constructs a proper file path and handles potential exceptions. This approach avoids hardcoded drive paths that can cause issues on different systems:

[VbFileIORead#22 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb#22)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb.md)

> **Note:**
> When specifying file paths, avoid using hardcoded absolute paths like "C:\temp\file.txt" as these can cause issues on systems where the drive letter or directory structure is different. Instead, use relative paths or construct paths using [System.IO.Path.Combine*](https://learn.microsoft.com/search/?terms=System.IO.Path.Combine*) to ensure your code works across different environments.

## Robust Programming

The following conditions may cause an exception:

- The path is not valid for one of the following reasons: it is a zero-length string, it contains only white space, it contains invalid characters, or it is a device path ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The path is not valid because it is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- The file does not exist ([System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException)).

- The file is in use by another process or an I/O error occurs ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The path exceeds the system-defined maximum length ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).

- A file or directory name in the path contains a colon (:) or is in an invalid format ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).

- There is not enough memory to write the string to buffer ([System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException)).

- The user lacks necessary permissions to view the path ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).

Do not make decisions about the contents of the file based on the name of the file. For example, the file Form1.vb may not be a Visual Basic source file.

Verify all inputs before using the data in your application. The contents of the file may not be what is expected, and methods to read from the file may fail.

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem)
- [Microsoft.VisualBasic.FileIO.FileSystem.ReadAllText*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.ReadAllText*)
- [Reading from Files](reading-from-files.md)
- [How to: Read From Comma-Delimited Text Files](how-to-read-from-comma-delimited-text-files.md)
- [How to: Read From Fixed-width Text Files](how-to-read-from-fixed-width-text-files.md)
- [How to: Read From Text Files with Multiple Formats](how-to-read-from-text-files-with-multiple-formats.md)
- [Troubleshooting: Reading from and Writing to Text Files](troubleshooting-reading-from-and-writing-to-text-files.md)
- [Walkthrough: Manipulating Files and Directories in Visual Basic](walkthrough-manipulating-files-and-directories.md)
- [File Encodings](file-encodings.md)
