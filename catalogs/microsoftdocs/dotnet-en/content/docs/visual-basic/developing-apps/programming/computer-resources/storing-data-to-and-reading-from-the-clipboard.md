---
description: "Learn more about: Storing data to and reading from the Clipboard (Visual Basic)"
title: "Storing data to and reading from the Clipboard"
ms.date: 07/20/2015
helpviewer_keywords:
  - "Clipboard, storing data to (My.Computer.Clipboard)"
  - "Clipboard, reading from (My.Computer.Clipboard)"
  - "Clipboard"
  - "My.Computer.Clipboard object, tasks"
  - "data [Visual Basic], Clipboard"
  - "reading data, from Clipboard"
ms.assetid: f690119a-4378-4f7d-b20e-d9377ef49496
---
# Storing data to and reading from the Clipboard (Visual Basic)

The Clipboard can be used to store data, such as text and images. Because the Clipboard is shared by all active processes, it can be used to transfer data between them. The `My.Computer.Clipboard` object allows you to easily access the Clipboard and to read from and write to it.

## Reading from the Clipboard

 Use the [Microsoft.VisualBasic.MyServices.ClipboardProxy.GetText*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.GetText*) method to read the text in the Clipboard. The following code reads the text and displays it in a message box. There must be text stored on the Clipboard for the example to run correctly.

 [VbVbcnMyClipboard#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb#4)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb.md)

 This code example is also available as an IntelliSense code snippet. In the code snippet picker, it is located in **Windows Forms Applications > Clipboard**. For more information, see [Code Snippets](https://learn.microsoft.com/visualstudio/ide/code-snippets).

 Use the [Microsoft.VisualBasic.MyServices.ClipboardProxy.GetImage*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.GetImage*) method to retrieve an image from the Clipboard. This example checks to see if there is an image on the Clipboard before retrieving it and assigning it to `PictureBox1`.

 [VbResourceTasks#16 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#16)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

 This code example is also available as an IntelliSense code snippet. In the code snippet picker, it is located in **Windows Forms Applications > Clipboard**.For more information, see [Code Snippets](https://learn.microsoft.com/visualstudio/ide/code-snippets).

 Items placed on the Clipboard will persist even after the application is shut down.

## Determining the type of file stored in the Clipboard

 Data on the Clipboard may take a number of different forms, such as text, an audio file, or an image. In order to determine what sort of file is on the Clipboard, you can use methods such as [Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsAudio*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsAudio*), [Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsFileDropList*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsFileDropList*), [Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsImage*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsImage*), and [Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsText*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsText*). The [Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsData*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.ContainsData*) method can be used if you have a custom format that you want to check.

 Use the `ContainsImage` function to determine whether the data contained on the Clipboard is an image. The following code checks to see whether the data is an image and reports accordingly.

 [VbResourceTasks#13 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#13)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

## Clearing the Clipboard

 The [Microsoft.VisualBasic.MyServices.ClipboardProxy.Clear*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.Clear*) method clears the Clipboard. Because the Clipboard is shared by other processes, clearing it may have an impact on those processes.

 The following code shows how to use the `Clear` method.

 [VbVbcnMyClipboard#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb#3)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb.md)

## Writing to the Clipboard

 Use the [Microsoft.VisualBasic.MyServices.ClipboardProxy.SetText*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.SetText*) method to write text to the Clipboard. The following code writes the string "This is a test string" to the Clipboard.

 [VbVbcnMyClipboard#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb.md)

 The `SetText` method can accept a format parameter that contains a type of [System.Windows.Forms.TextDataFormat](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextDataFormat). The following code writes the string "This is a test string" to the Clipboard as RTF text.

 [VbVbcnMyClipboard#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb.md)

 Use the [Microsoft.VisualBasic.MyServices.ClipboardProxy.SetData*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.SetData*) method to write data to the Clipboard. This example writes the `DataObject` `dataChunk` to the Clipboard in the custom format `specialFormat`.

 [VbVbcnMyClipboard#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb#7)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyClipboard/VB/Class1.vb.md)

 Use the [Microsoft.VisualBasic.MyServices.ClipboardProxy.SetAudio*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.SetAudio*) method to write audio data to the Clipboard. This example creates the byte array `musicReader`, reads the file `cool.wav` into it, and then writes it to the Clipboard.

 [VbResourceTasks#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb#5)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbResourceTasks/VB/Class1.vb.md)

> **Important:**
> Because the Clipboard can be accessed by other users, do not use it to store sensitive information, such as passwords or confidential data.

## See also

- [Microsoft.VisualBasic.MyServices.ClipboardProxy](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy)
- [Microsoft.VisualBasic.MyServices.ClipboardProxy.GetAudioStream*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.GetAudioStream*)
- [Microsoft.VisualBasic.MyServices.ClipboardProxy.SetDataObject*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.MyServices.ClipboardProxy.SetDataObject*)
- [How to: Read Object Data from an XML File](../../../programming-guide/concepts/serialization/how-to-read-object-data-from-an-xml-file.md)
- [How to: Write Object Data to an XML File](../../../programming-guide/concepts/serialization/how-to-write-object-data-to-an-xml-file.md)
