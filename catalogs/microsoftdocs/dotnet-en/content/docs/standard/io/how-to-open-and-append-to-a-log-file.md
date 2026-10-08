---
title: "How to: Open and append to a log file"
description: Open and append to a log file using the StreamWriter and StreamReader classes in .NET, which write characters to and read characters from streams.
ms.date: "01/21/2019"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "log files, opening"
  - "streams, opening and appending to log file"
  - "log files, appending to"
  - "I/O [.NET], log files"
ms.assetid: 74423362-1721-49cb-aa0a-e04005f72a06
---
# How to: Open and append to a log file

[System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) and [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) write characters to and read characters from streams. The following code example opens the *log.txt* file for input, or creates it if it doesn't exist, and appends log information to the end of the file. The example then writes the contents of the file to standard output for display.

As an alternative to this example, you could store the information as a single string or string array, and use the [System.IO.File.WriteAllText*](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllText*) or [System.IO.File.WriteAllLines*](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllLines*) method to achieve the same functionality.

> **Note:**
> Visual Basic users may choose to use the methods and properties provided by the [Microsoft.VisualBasic.Logging.Log](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Logging.Log) class or [Microsoft.VisualBasic.FileIO.FileSystem](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem) class for creating or writing to log files.

## Example

 [Conceptual.BasicIO.TextFiles#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/source2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.basicio.textfiles/cs/source2.cs.md)
 [Conceptual.BasicIO.TextFiles#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/source2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.basicio.textfiles/vb/source2.vb.md)

## See also

- [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter)
- [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader)
- [System.IO.File.AppendText*](https://learn.microsoft.com/search/?terms=System.IO.File.AppendText*)
- [System.IO.File.OpenText*](https://learn.microsoft.com/search/?terms=System.IO.File.OpenText*)
- [System.IO.StreamReader.ReadLine*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadLine*)
- [How to: Enumerate directories and files](how-to-enumerate-directories-and-files.md)
- [How to: Read and write to a newly created data file](how-to-read-and-write-to-a-newly-created-data-file.md)
- [How to: Read text from a file](how-to-read-text-from-a-file.md)
- [How to: Write text to a file](how-to-write-text-to-a-file.md)
- [How to: Read characters from a string](how-to-read-characters-from-a-string.md)
- [How to: Write characters to a string](how-to-write-characters-to-a-string.md)
- [File and stream I/O](index.md)
