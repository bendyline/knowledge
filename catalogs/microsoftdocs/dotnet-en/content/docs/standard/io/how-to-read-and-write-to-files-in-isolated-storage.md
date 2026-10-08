---
description: "Learn more about: How to: Read and Write to Files in Isolated Storage"
title: "How to: Read and Write to Files in Isolated Storage"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "files, isolated storage"
  - "reading data"
  - "storing data using isolated storage, reading and writing to files"
  - "writing to files within store"
  - "data storage using isolated storage, reading and writing to files"
  - "reading files within store"
  - "isolated storage, reading and writing to files"
  - "data stores, reading and writing to files"
  - "stores, reading and writing to files"
ms.assetid: f977ebdc-1b55-475a-bc3d-3376470b08ae
---
# How to: Read and Write to Files in Isolated Storage

To read from, or write to, a file in an isolated store, use an [System.IO.IsolatedStorage.IsolatedStorageFileStream](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFileStream) object with a stream reader ([System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) object) or stream writer ([System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) object).  
  
## Example  

 The following code example obtains an isolated store and checks whether a file named TestStore.txt exists in the store. If it doesn't exist, it creates the file and writes "Hello Isolated Storage" to the file. If TestStore.txt already exists, the example code reads from the file.  
  
 [Conceptual.IsolatedStorage#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source5.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source5.cs.md)
 [Conceptual.IsolatedStorage#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source5.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source5.vb.md)  
  
## See also

- [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile)
- [System.IO.IsolatedStorage.IsolatedStorageFileStream](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFileStream)
- [System.IO.FileMode](https://learn.microsoft.com/search/?terms=System.IO.FileMode)
- [System.IO.FileAccess](https://learn.microsoft.com/search/?terms=System.IO.FileAccess)
- [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader)
- [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter)
- [File and Stream I/O](index.md)
- [Isolated Storage](isolated-storage.md)
