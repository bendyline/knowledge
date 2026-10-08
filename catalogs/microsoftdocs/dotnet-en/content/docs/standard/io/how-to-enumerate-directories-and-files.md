---
title: "How to: Enumerate directories and files"
description: Learn to enumerate directories and files by using enumerable collections, which can provide better performance than arrays in .NET.
ms.date: "12/27/2018"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "I/O [.NET], enumerating directories and files"
ms.assetid: 86b69a08-3bfa-4e5f-b4e1-3b7cb8478215
---
# How to: Enumerate directories and files

Enumerable collections provide better performance than arrays when you work with large collections of directories and files. To enumerate directories and files, use methods that return an enumerable collection of directory or file names, or their [System.IO.DirectoryInfo](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo), [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo), or [System.IO.FileSystemInfo](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo) objects.

If you want to search and return only the names of directories or files, use the enumeration methods of the [System.IO.Directory](https://learn.microsoft.com/search/?terms=System.IO.Directory) class. If you want to search and return other properties of directories or files, use the [System.IO.DirectoryInfo](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo) and [System.IO.FileSystemInfo](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo) classes.

You can use enumerable collections from these methods as the [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) parameter for constructors of collection classes like [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601).

The following table summarizes the methods that return enumerable collections of files and directories:

|To search and return|Use method|
|------------------|-------------------------------------|-------------------|
|Directory names|[System.IO.Directory.EnumerateDirectories*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateDirectories*)|
|Directory information ([System.IO.DirectoryInfo](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo))|[System.IO.DirectoryInfo.EnumerateDirectories*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateDirectories*)|
|File names|[System.IO.Directory.EnumerateFiles*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateFiles*)|
|File information ([System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo))|[System.IO.DirectoryInfo.EnumerateFiles*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateFiles*)|
|File system entry names|[System.IO.Directory.EnumerateFileSystemEntries*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateFileSystemEntries*)|
|File system entry information ([System.IO.FileSystemInfo](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo))|[System.IO.DirectoryInfo.EnumerateFileSystemInfos*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateFileSystemInfos*)|
|Directory and file names |[System.IO.Directory.EnumerateFileSystemEntries*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateFileSystemEntries*)|

> **Note:**
> Although you can immediately enumerate all the files in the subdirectories of a parent directory by using the [System.IO.SearchOption.AllDirectories](https://learn.microsoft.com/search/?terms=System.IO.SearchOption.AllDirectories) option of the optional [System.IO.SearchOption](https://learn.microsoft.com/search/?terms=System.IO.SearchOption) enumeration, [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException) errors may make the enumeration incomplete. You can catch these exceptions by first enumerating directories and then enumerating files.

## Examples: Use the Directory class

The following example uses the [System.IO.Directory.EnumerateDirectories%28System.String%29](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateDirectories%2528System.String%2529) method to get a list of the top-level directory names in a specified path.

[System.IO.EnumDirs1#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.enumdirs1/cs/program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.enumdirs1/cs/program.cs.md)
[System.IO.EnumDirs1#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.enumdirs1/vb/program.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.enumdirs1/vb/program.vb.md)

The following example uses the [System.IO.Directory.EnumerateFiles%28System.String%2CSystem.String%2CSystem.IO.SearchOption%29](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateFiles%2528System.String%252CSystem.String%252CSystem.IO.SearchOption%2529) method to recursively enumerate all file names in a directory and subdirectories that match a certain pattern. It then reads each line of each file and displays the lines that contain a specified string, with their filenames and paths.

[System.IO.Directory.EnumerateFiles#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.directory.enumeratefiles/cs/program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.directory.enumeratefiles/cs/program.cs.md)
[System.IO.Directory.EnumerateFiles#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.directory.enumeratefiles/vb/program.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.directory.enumeratefiles/vb/program.vb.md)

## Examples: Use the DirectoryInfo class

The following example uses the [System.IO.DirectoryInfo.EnumerateDirectories*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateDirectories*) method to list a collection of top-level directories whose [System.IO.FileSystemInfo.CreationTimeUtc](https://learn.microsoft.com/search/?terms=System.IO.FileSystemInfo.CreationTimeUtc) is earlier than a certain [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value.

[System.IO.DirectoryInfo.EnumDirs#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.directoryinfo.enumdirs/cs/program.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.directoryinfo.enumdirs/cs/program.cs.md)
[System.IO.DirectoryInfo.EnumDirs#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.directoryinfo.enumdirs/vb/module1.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.directoryinfo.enumdirs/vb/module1.vb.md)

The following example uses the [System.IO.DirectoryInfo.EnumerateFiles*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateFiles*) method to list all files whose [System.IO.FileInfo.Length](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.Length) exceeds 10MB. This example first enumerates the top-level directories, to catch possible unauthorized access exceptions, and then enumerates the files.

[System.IO.DirectoryInfo.EnumerateDirectories#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.io.directoryinfo.enumeratedirectories/cs/program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.io.directoryinfo.enumeratedirectories/cs/program.cs.md)
[System.IO.DirectoryInfo.EnumerateDirectories#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.directoryinfo.enumeratedirectories/vb/program.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.io.directoryinfo.enumeratedirectories/vb/program.vb.md)

## See also

- [File and stream I/O](index.md)
