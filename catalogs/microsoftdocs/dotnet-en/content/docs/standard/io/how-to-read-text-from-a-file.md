---
title: "Read text from a file"
description: In this article, see examples of how to read text synchronously or asynchronously from a text file, using the StreamReader class in .NET for desktop apps.
ms.date: 05/09/2024
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "streams, reading text from files"
  - "reading text files"
  - "reading data, text files"
  - "data streams, reading text from files"
  - "I/O [.NET], reading text from files"
ms.assetid: ed180baa-dfc6-4c69-a725-46e87edafb27
#customer intent: As a developer I want to read text from a file
---
# Read text from a file

The following examples show how to read text synchronously and asynchronously from a text file using .NET for desktop apps. In both examples, when you create the instance of the [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) class, you provide the relative or absolute path to the file.

> **Note:**
> These code examples don't apply to Universal Windows (UWP) apps because the Windows runtime provides different stream types for reading and writing to files. For more information, see [UWP work with files](https://learn.microsoft.com/windows/uwp/get-started/fileio-learning-track). For examples that show how to convert between .NET Framework streams and Windows Runtime streams, see [How to: Convert between .NET Framework streams and Windows Runtime streams](how-to-convert-between-dotnet-streams-and-winrt-streams.md).

## Prerequisites

- Create a text file named _TestFile.txt_ in the same folder as the app.

  Add some content to the text file. The examples in this article write the content of the text file to the console.

## Read a file

The following example shows a synchronous read operation within a console app. The file contents are read and stored in a string variable, which is then written to the console.

1. Create a [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) instance.
1. Call the [System.IO.StreamReader.ReadToEnd](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadToEnd) method and assign the result to a string.
1. Write the output to the console.

[language="csharp" source="snippets/how-to-read-text-from-a-file/csharp/Program.cs" id="sync"::: (complete source file; reference: snippets/how-to-read-text-from-a-file/csharp/Program.cs)](../../../_code/docs/standard/io/snippets/how-to-read-text-from-a-file/csharp/Program.cs.md)
[language="vb" source="snippets/how-to-read-text-from-a-file/vb/Program.vb" id="sync"::: (complete source file; reference: snippets/how-to-read-text-from-a-file/vb/Program.vb)](../../../_code/docs/standard/io/snippets/how-to-read-text-from-a-file/vb/Program.vb.md)

## Read a file asynchronously

The following example shows an asynchronous read operation within a console app. The file contents are read and stored in a string variable, which is then written to the console.

1. Create a [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) instance.
1. Await the [System.IO.StreamReader.ReadToEndAsync](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadToEndAsync) method and assign the result to a string.
1. Write the output to the console.

[language="csharp" source="snippets/how-to-read-text-from-a-file/csharp/Program.cs" id="async"::: (complete source file; reference: snippets/how-to-read-text-from-a-file/csharp/Program.cs)](../../../_code/docs/standard/io/snippets/how-to-read-text-from-a-file/csharp/Program.cs.md)
[language="vb" source="snippets/how-to-read-text-from-a-file/vb/Program.vb" id="async"::: (complete source file; reference: snippets/how-to-read-text-from-a-file/vb/Program.vb)](../../../_code/docs/standard/io/snippets/how-to-read-text-from-a-file/vb/Program.vb.md)

## Related content

- [Common I/O Tasks](common-i-o-tasks.md).
- [Asynchronous file I/O](asynchronous-file-i-o.md).
- [How to: Write text to a file](how-to-write-text-to-a-file.md).
- [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader)
- [System.IO.File.OpenText*](https://learn.microsoft.com/search/?terms=System.IO.File.OpenText*)
- [System.IO.StreamReader.ReadLine*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadLine*)
