---
description: "Learn more about: How to: Anticipate Out-of-Space Conditions with Isolated Storage"
title: "How to: Anticipate Out-of-Space Conditions with Isolated Storage"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "data stores, quotas"
  - "isolated storage, quotas"
  - "quantity of isolated storage used"
  - "limit on isolated storage used"
  - "stores, quotas"
  - "stores, out of space conditions"
  - "data storage using isolated storage, quotas"
  - "storing data using isolated storage, quotas"
  - "space remaining in isolated storage"
  - "data stores, out of space conditions"
  - "storing data using isolated storage, out of space conditions"
  - "quotas for isolated storage"
  - "isolated storage, out of space conditions"
  - "data storage using isolated storage, out of space conditions"
---

# How to: Anticipate Out-of-Space Conditions with Isolated Storage

Code that uses isolated storage is constrained by a [quota](isolated-storage.md#quotas) that specifies the maximum size for the data compartment in which isolated storage files and directories exist. The quota is defined by security policy and is configurable by administrators. If the maximum allowed size is exceeded when you try to write data, an [System.IO.IsolatedStorage.IsolatedStorageException](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageException) exception is thrown and the operation fails. This helps prevent malicious denial-of-service attacks that could cause the application to refuse requests because data storage is filled.

To help you determine whether a given write attempt is likely to fail for this reason, the [System.IO.IsolatedStorage.IsolatedStorage](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorage) class provides three read-only properties: [System.IO.IsolatedStorage.IsolatedStorage.AvailableFreeSpace*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorage.AvailableFreeSpace*), [System.IO.IsolatedStorage.IsolatedStorage.UsedSize](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorage.UsedSize), and [System.IO.IsolatedStorage.IsolatedStorage.Quota*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorage.Quota*). You can use these properties to determine whether writing to the store will cause the maximum allowed size of the store to be exceeded. Keep in mind that isolated storage can be accessed concurrently; therefore, when you compute the amount of remaining storage, the storage space could be consumed by the time you try to write to the store. However, you can use the maximum size of the store to help determine whether the upper limit on available storage is about to be reached.

The [System.IO.IsolatedStorage.IsolatedStorage.Quota](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorage.Quota) property depends on evidence from the assembly to work properly. For this reason, you should retrieve this property only on [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile) objects that were created by using the [System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForAssembly*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForAssembly*), [System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForDomain*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForDomain*), or [System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*) method. [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile) objects that were created in any other way (for example, objects that were returned from the [System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*) method) will not return an accurate maximum size.

## Example

The following code example obtains an isolated store, creates a few files, and retrieves the [System.IO.IsolatedStorage.IsolatedStorage.AvailableFreeSpace](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorage.AvailableFreeSpace) property. The remaining space is reported in bytes.
[Conceptual.IsolatedStorage#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source7.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.isolatedstorage/cs/source7.cs.md)
[Conceptual.IsolatedStorage#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source7.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.isolatedstorage/vb/source7.vb.md)

## See also

- [System.IO.IsolatedStorage.IsolatedStorageFile](https://learn.microsoft.com/search/?terms=System.IO.IsolatedStorage.IsolatedStorageFile)
- [Isolated Storage](isolated-storage.md)
- [How to: Obtain Stores for Isolated Storage](how-to-obtain-stores-for-isolated-storage.md)
