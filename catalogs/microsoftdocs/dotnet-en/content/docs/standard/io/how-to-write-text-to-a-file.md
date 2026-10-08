---
title: "How to: Write text to a file"
description: Learn ways to write or append text to a file for a .NET app. Use methods from the StreamWriter or File classes to write text synchronously or asynchronously.
ms.date: "10/21/2025"
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "writing text to files"
  - "I/O [.NET], writing text to files"
  - "streams, writing text to files"
  - "data streams, writing text to files"
ms.assetid: 060cbe06-2adf-4337-9e7b-961a5c840208
ai-usage: ai-assisted
---
# How to: Write text to a file

This article shows different ways to write text to a file for a .NET app.

The following classes and methods are typically used to write text to a file:

- [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) contains methods to write to a file synchronously ([System.IO.StreamWriter.Write*](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.Write*) and [System.IO.TextWriter.WriteLine*](https://learn.microsoft.com/search/?terms=System.IO.TextWriter.WriteLine*)) or asynchronously ([System.IO.StreamWriter.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.WriteAsync*) and [System.IO.StreamWriter.WriteLineAsync*](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.WriteLineAsync*)).

- [System.IO.File](https://learn.microsoft.com/search/?terms=System.IO.File) provides static methods to write text to a file such as [System.IO.File.WriteAllLines*](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllLines*) and [System.IO.File.WriteAllText*](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllText*), or to append text to a file such as [System.IO.File.AppendAllLines*](https://learn.microsoft.com/search/?terms=System.IO.File.AppendAllLines*), [System.IO.File.AppendAllText*](https://learn.microsoft.com/search/?terms=System.IO.File.AppendAllText*), and [System.IO.File.AppendText*](https://learn.microsoft.com/search/?terms=System.IO.File.AppendText*).

- [System.IO.Path](https://learn.microsoft.com/search/?terms=System.IO.Path) is for strings that have file or directory path information. It contains the [System.IO.Path.Combine*](https://learn.microsoft.com/search/?terms=System.IO.Path.Combine*) method and in .NET Core 2.1 and later, the [System.IO.Path.Join*](https://learn.microsoft.com/search/?terms=System.IO.Path.Join*) and [System.IO.Path.TryJoin*](https://learn.microsoft.com/search/?terms=System.IO.Path.TryJoin*) methods. These methods let you concatenate strings for building a file or directory path.

> **Note:**
> The following examples show only the minimum amount of code needed. A real-world app usually provides more robust error checking and exception handling.

## Example: Synchronously write text with StreamWriter

The following example shows how to use the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class to synchronously write text to a new file one line at a time. Because the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) object is declared and instantiated in a `using` statement, the [System.IO.StreamWriter.Dispose*](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.Dispose*) method is invoked, which automatically flushes and closes the stream.

[Conceptual.BasicIO.TextFiles#WriteLine (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/write.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/write.cs.md)
[Conceptual.BasicIO.TextFiles#WriteLine (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/write.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/write.vb.md)

## Example: Synchronously append text with StreamWriter

The following example shows how to use the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class to synchronously append text to the text file created in the first example:

[Conceptual.BasicIO.TextFiles#WriteLine (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/append.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/append.cs.md)
[Conceptual.BasicIO.TextFiles#WriteLine (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/append.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/append.vb.md)

## Example: Asynchronously write text with StreamWriter

The following example shows how to asynchronously write text to a new file using the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class. To invoke the [System.IO.StreamWriter.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.WriteAsync*) method, the method call must be within an `async` method.

[Conceptual.BasicIO.TextFiles#WriteLine (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/async.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/async.cs.md)
[Conceptual.BasicIO.TextFiles#WriteLine (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/async.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/async.vb.md)

## Example: Write and append text with the File class

The following example shows how to write text to a new file and append new lines of text to the same file using the [System.IO.File](https://learn.microsoft.com/search/?terms=System.IO.File) class. The [System.IO.File.WriteAllText*](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllText*) and [System.IO.File.AppendAllLines*](https://learn.microsoft.com/search/?terms=System.IO.File.AppendAllLines*) methods open and close the file automatically. If the path you provide to the [System.IO.File.WriteAllText*](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllText*) method already exists, the file is overwritten.

[Conceptual.BasicIO.TextFiles#WriteLine (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/file.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/file.cs.md)
[Conceptual.BasicIO.TextFiles#WriteLine (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/file.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/file.vb.md)

## See also

- [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter)
- [System.IO.Path](https://learn.microsoft.com/search/?terms=System.IO.Path)
- [System.IO.File.CreateText*](https://learn.microsoft.com/search/?terms=System.IO.File.CreateText*)
- [How to: Enumerate directories and files](how-to-enumerate-directories-and-files.md)
- [How to: Read and write to a newly created data file](how-to-read-and-write-to-a-newly-created-data-file.md)
- [How to: Open and append to a log file](how-to-open-and-append-to-a-log-file.md)
- [How to: Read text from a file](how-to-read-text-from-a-file.md)
- [File and stream I/O](index.md)
