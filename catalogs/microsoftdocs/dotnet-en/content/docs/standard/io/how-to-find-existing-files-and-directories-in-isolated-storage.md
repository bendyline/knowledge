---
description: "Learn more about: How to: Find Existing Files and Directories in Isolated Storage"
title: "How to: Find Existing Files and Directories in Isolated Storage"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "stores, finding files and directories"
  - "locating files in isolated storage file"
  - "directories [.NET], isolated storage"
  - "isolated storage, finding files and directories"
  - "data storage using isolated storage, finding files and directories"
  - "files [.NET], isolated storage"
  - "data stores, finding files and directories"
  - "locating directories in isolated storage file"
  - "storing data using isolated storage, finding files and directories"
---
# How to: Find existing files and directories in isolated storage

To search for a directory in isolated storage, use the [System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*) method. This method takes a string that represents a search pattern. You can use both single-character (?) and multi-character (\*) wildcard characters in the search pattern, but the wildcard characters must appear in the final portion of the name. For example, `directory1/*ect*` is a valid search string, but `*ect*/directory2` is not.

 To search for a file, use the [System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*) method. The restriction for wildcard characters in search strings that applies to [System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*) also applies to [System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*).

 Neither of these methods is recursive; the [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile) class does not supply any methods for listing all directories or files in your store. However, recursive methods are shown in the following code example.

## Example

 The following code example illustrates how to create files and directories in an isolated store. First, a store that is isolated for user, domain, and assembly is retrieved and placed in the `isoStore` variable. The [System.IO.IsolatedStorage.IsolatedStorageFile.CreateDirectory*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.CreateDirectory*) method is used to set up a few different directories, and the [System.IO.IsolatedStorage.IsolatedStorageFileStream.%23ctor%28System.String%2CSystem.IO.FileMode%2CSystem.IO.IsolatedStorage.IsolatedStorageFile%29](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFileStream.%2523ctor%2528System.String%252CSystem.IO.FileMode%252CSystem.IO.IsolatedStorage.IsolatedStorageFile%2529) constructor creates some files in these directories. The code then loops through the results of the `GetAllDirectories` method. This method uses [System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*) to find all the directory names in the current directory. These names are stored in an array, and then `GetAllDirectories` calls itself, passing in each directory it has found. As a result, all the directory names are returned in an array. Next, the code calls the `GetAllFiles` method. This method calls `GetAllDirectories` to find out the names of all the directories, and then it checks each directory for files by using the [System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*) method. The result is returned in an array for display.
 [Conceptual.IsolatedStorage#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source8.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source8.cs.md)
 [Conceptual.IsolatedStorage#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source8.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source8.vb.md)

## See also

- [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile)
- [Isolated Storage](isolated-storage.md)
