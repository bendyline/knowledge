---
description: "Learn more about: How to: Delete a File in Visual Basic"
title: "How to: Delete a File"
ms.date: 07/20/2015
helpviewer_keywords: 
  - "Delete method [Visual Basic]"
  - "files [Visual Basic], deleting"
  - "files [Visual Basic], manipulating"
  - "File object"
ms.assetid: 4b721769-3e45-4be7-b7fe-b08dc4141b44
---
# How to: Delete a File in Visual Basic

The `DeleteFile` method of the `My.Computer.FileSystem` object allows you to delete a file. Among the options it offers are: whether to send the deleted file to the **Recycle Bin**, whether to ask the user to confirm that the file should be deleted, and what to do when the user cancels the operation.  
  
### To delete a text file  
  
- Use the `DeleteFile` method to delete the file. The following code demonstrates how to delete the file named `test.txt`.  
  
     [VbVbcnMyFileSystem#22 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#22)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)  
  
### To delete a text file and ask the user to confirm that the file should be deleted  
  
- Use the `DeleteFile` method to delete the file, setting `showUI` to `AllDialogs`. The following code demonstrates how to delete the file named `test.txt` and allow the user to confirm that the file should be deleted.  
  
     [VbFileIOMisc#9 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/Class1.vb#9)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/Class1.vb.md)  
  
### To delete a text file and send it to the Recycle Bin  
  
- Use the `DeleteFile` method to delete the file, specifying `SendToRecycleBin` for the `recycle` parameter. The following code demonstrates how to delete the file named `test.txt` and send it to the **Recycle Bin**.  
  
     [VbFileIOMisc#10 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/Class1.vb#10)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbFileIOMisc/VB/Class1.vb.md)  
  
## Robust Programming  

 The following conditions may cause an exception:  
  
- The path is not valid for one of the following reasons: it is a zero-length string, it contains only white space, it contains invalid characters, or it is a device path (starts with \\\\.\\) ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).  
  
- The path is not valid because it is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).  
  
- The path exceeds the system-defined maximum length ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).  
  
- A file or folder name in the path contains a colon (:) or is in an invalid format ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).  
  
- The file is in use ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).  
  
- The user lacks necessary permissions to view the path ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).  
  
- The file does not exist ([System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException)).  
  
- The user does not have permission to delete the file, or the file is read-only ([System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException)).  
  
- A partial-trust situation exists in which the user does not have sufficient permissions ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).  
  
- The user cancelled the operation and `onUserCancel` is set to `ThrowException` ([System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException)).  
  
## See also

- [Microsoft.VisualBasic.FileIO.UICancelOption](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.UICancelOption)
- [Microsoft.VisualBasic.FileIO.FileSystem](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem)
- [Microsoft.VisualBasic.FileIO.UIOption](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.UIOption)
- [Microsoft.VisualBasic.FileIO.RecycleOption](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.RecycleOption)
- [How to: Get the Collection of Files in a Directory](how-to-get-the-collection-of-files-in-a-directory.md)
