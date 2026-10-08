---
title: "Asynchronous File I/O"
description: Read about asynchronous file I/O in .NET. Learn async methods to simplify asynchronous operations, such as ReadAsync, WriteAsync, and more.
ms.date: 08/06/2026
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "streams, synchronous streams"
  - "asynchronous I/O"
  - "synchronous I/O"
  - "streams, asynchronous streams"
  - "I/O [.NET], asynchronous I/O"
  - "Stream class, synchronous I/O"
  - "data streams, asynchronous streams"
  - "Stream class, asynchronous I/O"
  - "multiple I/O requests"
  - "data streams, synchronous streams"
ms.assetid: dbdd55e7-d6b9-4f9e-8abb-ab0edd4457f7
---
# Asynchronous File I/O

Asynchronous operations enable you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in a Windows 8.x Store app or desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working.

The I/O types include async methods to simplify asynchronous operations. An async method contains `Async` in its name, such as [System.IO.Stream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.IO.Stream.ReadAsync*), [System.IO.Stream.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.Stream.WriteAsync*), [System.IO.Stream.CopyToAsync*](https://learn.microsoft.com/search/?terms=System.IO.Stream.CopyToAsync*), [System.IO.Stream.FlushAsync*](https://learn.microsoft.com/search/?terms=System.IO.Stream.FlushAsync*), [System.IO.TextReader.ReadLineAsync*](https://learn.microsoft.com/search/?terms=System.IO.TextReader.ReadLineAsync*), and [System.IO.TextReader.ReadToEndAsync*](https://learn.microsoft.com/search/?terms=System.IO.TextReader.ReadToEndAsync*). These async methods are implemented on stream classes, such as [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream), [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream), and [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream), and on classes that are used for reading from or writing to streams, such [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader) and [System.IO.TextWriter](https://learn.microsoft.com/search/?terms=System.IO.TextWriter).

> **Important:**
> In .NET Framework 4 and earlier versions, you have to use methods such as [System.IO.Stream.BeginRead*](https://learn.microsoft.com/search/?terms=System.IO.Stream.BeginRead*) and [System.IO.Stream.EndRead*](https://learn.microsoft.com/search/?terms=System.IO.Stream.EndRead*) to implement asynchronous I/O operations. These methods are still available in current .NET versions to support legacy code; however, the async methods help you implement asynchronous I/O operations more easily.

C# and Visual Basic each have two keywords for asynchronous programming:

- `Async` (Visual Basic) or `async` (C#) modifier, which is used to mark a method that contains an asynchronous operation.

- `Await` (Visual Basic) or `await` (C#) operator, which is applied to the result of an async method.

To implement asynchronous I/O operations, use these keywords in conjunction with the async methods, as shown in the following examples. For more information, see [Asynchronous programming with async and await (C#)](../../csharp/asynchronous-programming/index.md) or [Asynchronous Programming with Async and Await (Visual Basic)](../../visual-basic/programming-guide/concepts/async/index.md).

The following example demonstrates how to use two [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) objects to copy files asynchronously from one directory to another. Notice that the [System.Web.UI.WebControls.Button.Click](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.Button.Click) event handler for the [System.Windows.Controls.Button](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Button) control is marked with the `async` modifier because it calls an asynchronous method.

[Asynchronous_File_IO_async#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Asynchronous_File_IO_async/cs/example.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Asynchronous_File_IO_async/cs/example.cs.md)
[Asynchronous_File_IO_async#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Asynchronous_File_IO_async/vb/example.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Asynchronous_File_IO_async/vb/example.vb.md)

The next example is similar to the previous one but uses [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) and [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) objects to read and write the contents of a text file asynchronously.

[Asynchronous_File_IO_async#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Asynchronous_File_IO_async/cs/example2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Asynchronous_File_IO_async/cs/example2.cs.md)
[Asynchronous_File_IO_async#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Asynchronous_File_IO_async/vb/example2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Asynchronous_File_IO_async/vb/example2.vb.md)

The next example shows the code-behind file and the XAML file that are used to open a file as a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) in a Windows 8.x Store app, and read its contents by using an instance of the [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) class. It uses asynchronous methods to open the file as a stream and to read its contents.

[System.IO.WindowsRuntimeStorageExtensions#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.windowsruntimestorageextensions/cs/blankpage.xaml.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.windowsruntimestorageextensions/cs/blankpage.xaml.cs.md)
[System.IO.WindowsRuntimeStorageExtensions#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.windowsruntimestorageextensions/vb/blankpage.xaml.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.windowsruntimestorageextensions/vb/blankpage.xaml.vb.md)

[System.IO.WindowsRuntimeStorageExtensions#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.windowsruntimestorageextensions/cs/blankpage.xaml#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.windowsruntimestorageextensions/cs/blankpage.xaml.md)

## See also

- [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream)
- [File and Stream I/O](index.md)
- [Asynchronous programming with async and await (C#)](../../csharp/asynchronous-programming/index.md)
- [Asynchronous Programming with Async and Await (Visual Basic)](../../visual-basic/programming-guide/concepts/async/index.md)
