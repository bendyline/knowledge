---
description: "Learn more about: How to: Upload a File in Visual Basic"
title: "How to: Upload a File"
ms.date: 07/20/2015
helpviewer_keywords:
  - "networks, uploading files"
  - "files [Visual Basic], uploading"
  - "uploading files [Visual Basic]"
  - "UploadFile method [Visual Basic]"
  - "My.Computer.Network.UploadFile method"
ms.assetid: a8b37924-c523-4fd3-b5ca-cb0074df29cd
---
# How to: Upload a File in Visual Basic

The [Microsoft.VisualBasic.Devices.Network.UploadFile*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Network.UploadFile*) method can be used to upload a file and store it to a remote location. If the `ShowUI` parameter is set to `True`, a dialog box is displayed that shows the progress of the upload and allows users to cancel the operation.

### To upload a file

- Use the `UploadFile` method to upload a file, specifying the source file's location and the target directory location as a string or URI (Uniform Resource Identifier).This example uploads the file `Order.txt` to `http://www.cohowinery.com/uploads.aspx`.

     [VbResourceTasks#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#6)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

### To upload a file and show the progress of the operation

- Use the `UploadFile` method to upload a file, specifying the source file's location and the target directory location as a string or URI. This example uploads the file `Order.txt` to `http://www.cohowinery.com/uploads.aspx` without supplying a user name or password, shows the progress of the upload, and has a time-out interval of 500 milliseconds.

     [VbResourceTasks#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#7)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

### To upload a file, supplying a user name and password

- Use the `UploadFile` method to upload a file, specifying the source file's location and the target directory location as a string or URI, and specifying the user name and the password. This example uploads the file `Order.txt` to `http://www.cohowinery.com/uploads.aspx`, supplying the user name `anonymous` and a blank password.

     [VbResourceTasks#8 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#8)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

## Robust Programming

 The following conditions may throw an exception:

- The local file path is not valid ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- Authentication failed ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).

- The connection timed out ([System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException)).

## See also

- [Microsoft.VisualBasic.Devices.Network](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Network)
- [Microsoft.VisualBasic.Devices.Network.UploadFile*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Network.UploadFile*)
- [How to: Download a File](how-to-download-a-file.md)
- [How to: Parse File Paths](../drives-directories-files/how-to-parse-file-paths.md)
