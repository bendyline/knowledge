---
description: "Learn more about: How to: Create Files and Directories in Isolated Storage"
title: "How to: Create Files and Directories in Isolated Storage"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "directories [.NET], isolated storage"
  - "files [.NET], isolated storage"
  - "isolated storage, creating files and directories"
  - "data stores, creating files and directories"
  - "data storage using isolated storage, creating files and directories"
  - "stores, creating files and directories"
  - "storing data using isolated storage, creating files and directories"
ms.assetid: 2ca4d2a4-809b-4f00-bc08-bf4a64d3a5c3
---
# How to: Create Files and Directories in Isolated Storage

After you've obtained an isolated store, you can create directories and files for storing data. Within a store, file and directory names are specified with respect to the root of the virtual file system.

 To create a directory, use the [System.IO.IsolatedStorage.IsolatedStorageFile.CreateDirectory*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.CreateDirectory*) instance method. If you specify a subdirectory of a directory that doesn't exist, both directories are created. If you specify a directory that already exists, the method returns without creating a directory, and no exception is thrown. However, if you specify a directory name that contains invalid characters, an [System.IO.IsolatedStorage.IsolatedStorageException](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageException) exception is thrown.

 To create a file, use  the [System.IO.IsolatedStorage.IsolatedStorageFile.CreateFile*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.CreateFile*) method.

 In the Windows operating system, isolated storage file and directory names are case-insensitive. That is, if you create a file named `ThisFile.txt`, and then create another file named `THISFILE.TXT`, only one file is created. The file name keeps its original casing for display purposes.

 Isolated storage file creation will throw an [System.IO.IsolatedStorage.IsolatedStorageException](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageException) if the path contains a directory that does not exist.

## Example

 The following code example illustrates how to create files and directories in an isolated store.

 [Conceptual.IsolatedStorage#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source.cs.md)
 [Conceptual.IsolatedStorage#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source.vb.md)

## See also

- [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile)
- [System.IO.IsolatedStorage.IsolatedStorageFileStream](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFileStream)
- [Isolated Storage](isolated-storage.md)
