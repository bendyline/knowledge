---
description: "Learn more about: How to: Delete Files and Directories in Isolated Storage"
title: "How to: Delete Files and Directories in Isolated Storage"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "data storage using isolated storage, deleting files and directories"
  - "directories [.NET], isolated storage"
  - "files [.NET], isolated storage"
  - "isolated storage, deleting files and directories"
  - "data stores, deleting files and directories"
  - "stores, creating files and directories"
  - "deleting files within isolated stage file"
  - "storing data using isolated storage, deleting files and directories"
  - "deleting directories within isolated stage file"
---
# How to: Delete Files and Directories in Isolated Storage

You can delete directories and files within an isolated storage file. Within a store, file and directory names are operating-system dependent and are specified as relative to the root of the virtual file system. They are not case-sensitive on Windows operating systems.

 The [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile) class supplies two methods for deleting directories and files: [System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*) and [System.IO.IsolatedStorage.IsolatedStorageFile.DeleteFile*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.DeleteFile*). An [System.IO.IsolatedStorage.IsolatedStorageException](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageException) exception is thrown if you try to delete a file or directory that does not exist. If you include a wildcard character in the name, [System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*) throws an [System.IO.IsolatedStorage.IsolatedStorageException](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageException) exception, and [System.IO.IsolatedStorage.IsolatedStorageFile.DeleteFile*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.DeleteFile*) throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) exception.

 The [System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*) method fails if the directory contains any files or subdirectories. You can use the [System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*) and [System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*) methods to retrieve the existing files and directories. For more information about searching the virtual file system of a store, see [How to: Find Existing Files and Directories in Isolated Storage](how-to-find-existing-files-and-directories-in-isolated-storage.md).

## Example

 The following code example creates and then deletes several directories and files.
 [Conceptual.IsolatedStorage#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source4.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source4.cs.md)
 [Conceptual.IsolatedStorage#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source4.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source4.vb.md)

## See also

- [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile)
- [Isolated Storage](isolated-storage.md)
