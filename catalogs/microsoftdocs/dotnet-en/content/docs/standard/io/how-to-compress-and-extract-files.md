---
title: "How to: Compress and extract files"
description: Compress & extract files using System.IO.Compression. See examples using ZipFile, ZipArchive, ZipArchiveEntry, DeflateStream, & GZipStream.
ms.date: "08/10/2022"
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "I/O [.NET], compression"
  - "compression"
  - "compress files"
ms.assetid: e9876165-3c60-4c84-a272-513e47acf579
---
# How to: Compress and extract files

The [System.IO.Compression](https://learn.microsoft.com/search/?terms=System.IO.Compression) namespace contains the following classes for compressing and decompressing files and streams. You also can use these types to read and modify the contents of a compressed file:

- [System.IO.Compression.ZipFile](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipFile)
- [System.IO.Compression.ZipArchive](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive)
- [System.IO.Compression.ZipArchiveEntry](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry)
- [System.IO.Compression.DeflateStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.DeflateStream)
- [System.IO.Compression.GZipStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.GZipStream)

The following examples show some of the operations you can perform with compressed files. These examples require the following NuGet packages to be added to your project:

- [System.IO.Compression](https://www.nuget.org/packages/System.IO.Compression)
- [System.IO.Compression.ZipFile](https://www.nuget.org/packages/System.IO.Compression.ZipFile)

If you're using .NET Framework, add references to these two libraries to your project:

- `System.IO.Compression`
- `System.IO.Compression.FileSystem`

## Example 1: Create and extract a .zip file

The following example shows how to create and extract a compressed *.zip* file by using the [System.IO.Compression.ZipFile](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipFile) class. The example compresses the contents of a folder into a new *.zip* file, and then extracts the file to a new folder.

To run the sample, create a *start* folder in your program folder and populate it with files to zip.

[System.IO.Compression.ZipFile#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.compression.zipfile/cs/program1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.compression.zipfile/cs/program1.cs.md)
[System.IO.Compression.ZipFile#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.compression.zipfile/vb/program1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.compression.zipfile/vb/program1.vb.md)

## Example 2: Extract specific file extensions

The following example iterates through the contents of an existing *.zip* file and extracts files with a *.txt* extension. It uses the [System.IO.Compression.ZipArchive](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive) class to access the *.zip* file, and the [System.IO.Compression.ZipArchiveEntry](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry) class to inspect the individual entries. The extension method [System.IO.Compression.ZipFileExtensions.ExtractToFile*](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipFileExtensions.ExtractToFile*) for the [System.IO.Compression.ZipArchiveEntry](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry) object is available in the [System.IO.Compression.ZipFileExtensions](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipFileExtensions) class.

To run the sample, place a *.zip* file called *result.zip* in your program folder. When prompted, provide a folder name to extract to.

> **Important:**
> When unzipping files, you must look for malicious file paths, which can escape from the directory you unzip into. This is known as a path traversal attack. The following example demonstrates how to check for malicious file paths and provides a safe way to unzip.

[System.IO.Compression.ZipArchive#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.compression.ziparchive/cs/program1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.compression.ziparchive/cs/program1.cs.md)
[System.IO.Compression.ZipArchive#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.compression.ziparchive/vb/program1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.compression.ziparchive/vb/program1.vb.md)

## Example 3: Add a file to an existing .zip file

The following example uses the [System.IO.Compression.ZipArchive](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive) class to access an existing *.zip* file, and adds a file to it. The new file gets compressed when you add it to the existing *.zip* file.

[System.IO.Compression.ZipArchiveMode#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.compression.ziparchivemode/cs/program1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.compression.ziparchivemode/cs/program1.cs.md)
[System.IO.Compression.ZipArchiveMode#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.compression.ziparchivemode/vb/program1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.compression.ziparchivemode/vb/program1.vb.md)

## Example 4: Compress and decompress .gz files

You can also use the [System.IO.Compression.GZipStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.GZipStream) and [System.IO.Compression.DeflateStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.DeflateStream) classes to compress and decompress data. They use the same compression algorithm. You can decompress [System.IO.Compression.GZipStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.GZipStream) objects that are written to a *.gz* file by using many common tools. The following example shows how to compress and decompress a directory of files by using the [System.IO.Compression.GZipStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.GZipStream) class:

[IO.Compression.GZip1#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/IO.Compression.GZip1/CS/gziptest.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/IO.Compression.GZip1/CS/gziptest.cs.md)
[IO.Compression.GZip1#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/IO.Compression.GZip1/VB/gziptest.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/IO.Compression.GZip1/VB/gziptest.vb.md)

## See also

- [System.IO.Compression.ZipArchive](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive)
- [System.IO.Compression.ZipFile](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipFile)
- [System.IO.Compression.ZipArchiveEntry](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry)
- [System.IO.Compression.DeflateStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.DeflateStream)
- [System.IO.Compression.GZipStream](https://learn.microsoft.com/search/?terms=System.IO.Compression.GZipStream)
- [File and stream I/O](index.md)
