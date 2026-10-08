---
description: "Learn more about: How to: Enumerate Stores for Isolated Storage"
title: "How to: Enumerate Stores for Isolated Storage"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "enumerating stores"
  - "data storage using isolated storage, enumerating stores"
  - "storing data using isolated storage, enumerating stores"
  - "stores, enumerating"
  - "isolated storage, enumerating stores"
  - "data stores, enumerating"
ms.assetid: 0fcf279a-f241-48f0-8034-2e3d331f1fcb
---
# How to: Enumerate Stores for Isolated Storage

You can enumerate all isolated stores for the current user by using the  [System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*) static method. This  method takes an [System.IO.IsolatedStorage.IsolatedStorageScope](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageScope) value and returns an [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile) enumerator. To enumerate stores, you must have the [System.Security.Permissions.IsolatedStorageFilePermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageFilePermission) permission that specifies the [System.Security.Permissions.IsolatedStorageContainment.AdministerIsolatedStorageByUser](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageContainment.AdministerIsolatedStorageByUser) value. If you call the [System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*) method with the [System.IO.IsolatedStorage.IsolatedStorageScope.User](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageScope.User) value, it returns an array of [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile) objects that are defined for the current user.

## Example

 The following code example obtains a store that is isolated by user and assembly, creates a few files, and retrieves those files by using the [System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*) method.

 [Conceptual.IsolatedStorage#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source2.cs.md)
 [Conceptual.IsolatedStorage#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source2.vb.md)

## See also

- [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile)
- [Isolated Storage](isolated-storage.md)
