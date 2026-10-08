---
description: "Learn more about: How to: Write Text to Files in the My Documents Directory in Visual Basic"
title: "How to: Write Text to Files in the My Documents Directory"
ms.date: 07/20/2015
helpviewer_keywords:
  - "files [Visual Basic], writing to"
  - "text, writing to files"
  - "examples [Visual Basic], text files"
  - "writing to files [Visual Basic], in My Documents"
ms.assetid: 1c726124-781d-4976-9baa-ed46814ff3fe
---
# How to: Write Text to Files in the My Documents Directory in Visual Basic

The `My.Computer.FileSystem.SpecialDirectories` object allows you to access special directories, such as the **MyDocuments** directory.

## Procedure

#### To write new text files in the My Documents directory

1. Use the `My.Computer.FileSystem.SpecialDirectories.MyDocuments` property to supply the path.

     [VbFileIOWrite#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOWrite/VB/Class1.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOWrite/VB/Class1.vb.md)

2. Use the `WriteAllText` method to write text to the specified file.

     [VbVbcnMyFileSystem#14 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#14)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

## Example

 [VbFileIOWrite#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOWrite/VB/Class1.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOWrite/VB/Class1.vb.md)

## Compiling the Code

 Replace `test.txt` with the name of the file you want to write to.

## Robust Programming

 This code rethrows all the exceptions that may occur when writing text to the file. You can reduce the likelihood of exceptions by using Windows Forms controls such as the [OpenFileDialog](https://learn.microsoft.com/dotnet/desktop/winforms/controls/openfiledialog-component-windows-forms) and the [SaveFileDialog](https://learn.microsoft.com/dotnet/desktop/winforms/controls/savefiledialog-component-windows-forms) components that limit the user choices to valid file names. Using these controls is not foolproof, however. The file system can change between the time the user selects a file and the time that the code executes. Exception handling is therefore nearly always necessary when with working with files.

## .NET Framework Security

 If you are running in a partial-trust context, the code might throw an exception due to insufficient privileges. For more information, see [Code Access Security Basics](https://learn.microsoft.com/previous-versions/dotnet/framework/code-access-security/code-access-security-basics).

 This example creates a new file. If an application needs to create a file, that application needs Create permission for the folder. Permissions are set using access control lists. If the file already exists, the application needs only Write permission, a lesser privilege. Where possible, it is more secure to create the file during deployment, and only grant Read privileges to a single file, rather than to grant Create privileges for a folder. Also, it is more secure to write data to user folders than to the root folder or the **Program Files** folder. For more information, see [ACL Technology Overview](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms229742\(v=vs.100\)).

## See also

- [System.IO.Path.Combine*](https://learn.microsoft.com/search/?terms=System.IO.Path.Combine*)
- [Microsoft.VisualBasic.Devices.Computer](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Computer)
- [Microsoft.VisualBasic.FileIO.FileSystem](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem)
- [Microsoft.VisualBasic.FileIO.FileSystem.WriteAllText*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.WriteAllText*)
- [Microsoft.VisualBasic.FileIO.SpecialDirectories](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.SpecialDirectories)
