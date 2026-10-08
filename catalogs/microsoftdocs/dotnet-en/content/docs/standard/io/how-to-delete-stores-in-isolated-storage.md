---
description: "Learn more about: How to: Delete Stores in Isolated Storage"
title: "How to: Delete Stores in Isolated Storage"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "stores, deleting"
  - "data stores, deleting"
  - "deleting stores"
  - "removing stores"
  - "isolated storage, deleting stores"
  - "storing data using isolated storage, deleting stores"
  - "data storage using isolated storage, deleting stores"
---
# How to: Delete stores in isolated storage

The [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile) class supplies two methods for deleting isolated storage files:

- The instance method [System.IO.IsolatedStorage.IsolatedStorageFile.Remove](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.Remove) does not take any arguments and deletes the store that calls it. No permissions are required for this operation. Any code that can access the store can delete any or all the data inside it.

- The static method [System.IO.IsolatedStorage.IsolatedStorageFile.Remove%28System.IO.IsolatedStorage.IsolatedStorageScope%29](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.Remove%2528System.IO.IsolatedStorage.IsolatedStorageScope%2529) takes the [System.IO.IsolatedStorage.IsolatedStorageScope.User](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageScope.User) enumeration value, and deletes all the stores for the user who is running the code. This operation requires [System.Security.Permissions.IsolatedStorageFilePermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageFilePermission) permission for the [System.Security.Permissions.IsolatedStorageContainment.AdministerIsolatedStorageByUser](https://learn.microsoft.com/search/?terms=System.Security.Permissions.IsolatedStorageContainment.AdministerIsolatedStorageByUser) value.

## Example

 The following code example demonstrates the use of the static and instance [System.IO.IsolatedStorage.IsolatedStorageFile.Remove*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.Remove*) methods. The class obtains two stores; one is isolated for user and assembly and the other is isolated for user, domain, and assembly. The user, domain, and assembly store is then deleted by calling the [System.IO.IsolatedStorage.IsolatedStorageFile.Remove](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.Remove) method of the isolated storage file  `isoStore1`. Then, all remaining stores for the user are deleted by calling the static method [System.IO.IsolatedStorage.IsolatedStorageFile.Remove%28System.IO.IsolatedStorage.IsolatedStorageScope%29](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.Remove%2528System.IO.IsolatedStorage.IsolatedStorageScope%2529).
 [Conceptual.IsolatedStorage#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source3.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source3.cs.md)
 [Conceptual.IsolatedStorage#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source3.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source3.vb.md)

## See also

- [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile)
- [Isolated Storage](isolated-storage.md)
