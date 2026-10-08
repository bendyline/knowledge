---
title: "How to: Read and write to a newly created data file"
description: Learn how to read and write to a newly created data file in .NET using the System.IO.BinaryReader and System.IO.BinaryWriter classes.
ms.date: "01/21/2019"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "streams, reading and writing data"
  - "BinaryReader class, examples"
  - "I/O [.NET], reading data"
  - "I/O [.NET], writing data"
  - "BinaryWriter class, examples"
---
# How to: Read and write to a newly created data file

The [System.IO.BinaryWriter](https://learn.microsoft.com/search/?terms=System.IO.BinaryWriter) and [System.IO.BinaryReader](https://learn.microsoft.com/search/?terms=System.IO.BinaryReader) classes are used for writing and reading data other than character strings. The following example shows how to create an empty file stream, write data to it, and read data from it.

The example creates a data file called *Test.data* in the current directory, creates the associated [System.IO.BinaryWriter](https://learn.microsoft.com/search/?terms=System.IO.BinaryWriter) and [System.IO.BinaryReader](https://learn.microsoft.com/search/?terms=System.IO.BinaryReader) objects, and uses the [System.IO.BinaryWriter](https://learn.microsoft.com/search/?terms=System.IO.BinaryWriter) object to write the integers 0 through 10 to *Test.data*, which leaves the file pointer at the end of the file. The [System.IO.BinaryReader](https://learn.microsoft.com/search/?terms=System.IO.BinaryReader) object then sets the file pointer back to the origin and reads out the specified content.

> **Note:**
> If *Test.data* already exists in the current directory, an [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException) exception is thrown. Use the file mode option [System.IO.FileMode.Create](https://learn.microsoft.com/search/?terms=System.IO.FileMode.Create) rather than [System.IO.FileMode.CreateNew](https://learn.microsoft.com/search/?terms=System.IO.FileMode.CreateNew) to always create a new file without throwing an exception.

## Example

 [System.IO.BinaryReaderWriter#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.IO.BinaryReaderWriter/CS/source6.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.IO.BinaryReaderWriter/CS/source6.cs.md)
 [System.IO.BinaryReaderWriter#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.IO.BinaryReaderWriter/VB/source6.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.IO.BinaryReaderWriter/VB/source6.vb.md)

## See also

- [System.IO.BinaryReader](https://learn.microsoft.com/search/?terms=System.IO.BinaryReader)
- [System.IO.BinaryWriter](https://learn.microsoft.com/search/?terms=System.IO.BinaryWriter)
- [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream)
- [System.IO.FileStream.Seek*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Seek*)
- [System.IO.SeekOrigin](https://learn.microsoft.com/search/?terms=System.IO.SeekOrigin)
- [How to: Enumerate directories and files](how-to-enumerate-directories-and-files.md)
- [How to: Open and append to a log file](how-to-open-and-append-to-a-log-file.md)
- [How to: Read text from a file](how-to-read-text-from-a-file.md)
- [How to: Write text to a file](how-to-write-text-to-a-file.md)
- [How to: Read characters from a string](how-to-read-characters-from-a-string.md)
- [How to: Write characters to a string](how-to-write-characters-to-a-string.md)
- [File and stream I/O](index.md)
