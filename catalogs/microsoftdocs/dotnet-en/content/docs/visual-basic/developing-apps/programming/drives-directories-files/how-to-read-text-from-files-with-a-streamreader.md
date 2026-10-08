---
description: "Learn more about: How to: Read Text from Files with a StreamReader (Visual Basic)"
title: "How to: Read Text from Files with a StreamReader"
ms.date: 07/20/2015
helpviewer_keywords:
  - "reading files [Visual Basic], text"
  - "text, reading from files"
  - "reading text from files [Visual Basic]"
  - "files [Visual Basic], reading"
ms.assetid: 384033c6-18f9-4d59-9610-36371226558f
---
# How to: Read Text from Files with a StreamReader (Visual Basic)

The `My.Computer.FileSystem` object provides methods to open a [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader) and a [System.IO.TextWriter](https://learn.microsoft.com/search/?terms=System.IO.TextWriter). These methods, `OpenTextFileWriter` and `OpenTextFileReader`, are advanced methods that do not appear in IntelliSense unless you select the **All** tab.

### To read a line from a file with a text reader

- Use the `OpenTextFileReader` method to open the [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader), specifying the file. This example opens the file named `testfile.txt`, reads a line from it, and displays the line in a message box.

     [VbFileIORead#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIORead/VB/Class1.vb.md)

## Robust Programming

 The file that is read must be a text file.

 Do not make decisions about the contents of the file based on the name of the file. For example, the file Form1.vb may not be a Visual Basic source file.

 Verify all inputs before using the data in your application. The contents of the file may not be what is expected, and methods to read from the file may fail.

## .NET Framework Security

 To read from a file, your assembly requires a privilege level granted by the [System.Security.Permissions.FileIOPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermission) class. If you are running in a partial-trust context, the code might throw an exception due to insufficient privileges. For more information, see [Code Access Security Basics](https://learn.microsoft.com/previous-versions/dotnet/framework/code-access-security/code-access-security-basics). The user also needs access to the file. For more information, see [ACL Technology Overview](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms229742\(v=vs.100\)).

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem)
- [System.Windows.Forms.OpenFileDialog](https://learn.microsoft.com/search/?terms=System.Windows.Forms.OpenFileDialog)
- [Microsoft.VisualBasic.FileIO.FileSystem.OpenTextFileWriter*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.OpenTextFileWriter*)
- [Microsoft.VisualBasic.FileIO.FileSystem.OpenTextFileReader*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.OpenTextFileReader*)
- [SaveFileDialog Component](https://learn.microsoft.com/dotnet/desktop/winforms/controls/savefiledialog-component-windows-forms)
- [Reading from Files](reading-from-files.md)
