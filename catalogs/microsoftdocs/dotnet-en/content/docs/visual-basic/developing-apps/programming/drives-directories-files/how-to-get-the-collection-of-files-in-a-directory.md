---
description: "Learn more about: How to: Get the Collection of Files in a Directory in Visual Basic"
title: "How to: Get the Collection of Files in a Directory"
ms.date: 07/20/2015
helpviewer_keywords:
  - "folders, working with"
  - "files [Visual Basic], accessing"
ms.assetid: 6c8ba7e8-dd37-4853-92bf-762b67c98160
---
# How to: Get the Collection of Files in a Directory in Visual Basic

The overloads of the [Microsoft.VisualBasic.FileIO.FileSystem.GetFiles*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.GetFiles*) method return a read-only collection of strings representing the names of the files within a directory:

- Use the [Microsoft.VisualBasic.FileIO.FileSystem.GetFiles%28System.String%29](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.GetFiles%2528System.String%2529) overload for a simple file search in a specified directory, without searching subdirectories.

- Use the [Microsoft.VisualBasic.FileIO.FileSystem.GetFiles(System.String,Microsoft.VisualBasic.FileIO.SearchOption,System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.GetFiles(System.String%2CMicrosoft.VisualBasic.FileIO.SearchOption%2CSystem.String%5B%5D)) overload to specify additional options for your search. You can use the `wildCards` parameter to specify a search pattern. To include subdirectories in the search, set the `searchType` parameter to [Microsoft.VisualBasic.FileIO.SearchOption.SearchAllSubDirectories](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.SearchOption.SearchAllSubDirectories).

 An empty collection is returned if no files matching the specified pattern are found.

### To list files in a directory

- Use one of the [Microsoft.VisualBasic.FileIO.FileSystem.GetFiles*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.GetFiles*) method overloads, supplying the name and path of the directory to search in the `directory` parameter. The following example returns all files in the directory and adds them to `ListBox1`.

     [VbVbcnMyFileSystem#32 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#32)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

## Robust Programming

 The following conditions may cause an exception:

- The path is not valid for one of the following reasons: it is a zero-length string, it contains only white space, it contains invalid characters, or it is a device path (starts with \\\\.\\) ([System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)).

- The path is not valid because it is `Nothing` ([System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException)).

- `directory` does not exist ([System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException)).

- `directory` points to an existing file ([System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException)).

- The path exceeds the system-defined maximum length ([System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException)).

- A file or directory name in the path contains a colon (:) or is in an invalid format ([System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException)).

- The user lacks necessary permissions to view the path ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException)).

- The user lacks necessary permissions ([System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException)).

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem.GetFiles*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.GetFiles*)
- [How to: Find Files with a Specific Pattern](how-to-find-files-with-a-specific-pattern.md)
- [How to: Find Subdirectories with a Specific Pattern](how-to-find-subdirectories-with-a-specific-pattern.md)
