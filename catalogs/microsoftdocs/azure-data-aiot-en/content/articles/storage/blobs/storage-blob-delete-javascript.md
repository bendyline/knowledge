---
title: Delete and restore a blob with JavaScript or TypeScript
titleSuffix: Azure Storage
description: Learn how to delete and restore a blob in your Azure Storage account using the JavaScript client library
services: storage
author: stevenmatthew
ms.author: shaas
ms.date: 10/28/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: javascript
ms.custom: devx-track-js, devguide-js, devx-track-ts, devguide-ts
# Customer intent: "As a developer using JavaScript, I want to delete and restore blobs in Azure Storage, so that I can manage my data more effectively and recover from accidental deletions."
---

# Delete and restore a blob with JavaScript or TypeScript


> 
>
> - [.NET](storage-blob-delete.md)
> - [Java](storage-blob-delete-java.md)
> - [JavaScript](storage-blob-delete-javascript.md)
> - [Python](storage-blob-delete-python.md)
> - [Go](storage-blob-delete-go.md)

This article shows how to delete blobs with the [Azure Storage client library for JavaScript](https://www.npmjs.com/package/@azure/storage-blob), and how to restore [soft-deleted](soft-delete-blob-overview.md) blobs during the retention period.

## Prerequisites

- The examples in this article assume you already have a project set up to work with the Azure Blob Storage client library for JavaScript. To learn about setting up your project, including package installation, importing modules, and creating an authorized client object to work with data resources, see [Get started with Azure Blob Storage and JavaScript](storage-blob-javascript-get-started.md).
- The [authorization mechanism](../common/authorize-data-access.md) must have permissions to delete a blob, or to restore a soft-deleted blob. To learn more, see the authorization guidance for the following REST API operations:
    - [Delete Blob](https://learn.microsoft.com/rest/api/storageservices/delete-blob#authorization)
    - [Undelete Blob](https://learn.microsoft.com/rest/api/storageservices/undelete-blob#authorization)

## Delete a blob


> **Note:**
> When blob soft delete is enabled for a storage account, you can't perform a permanent deletion using client library methods. Using the methods in this article, a soft-deleted blob, blob version, or snapshot remains available until the retention period expires, at which time it's permanently deleted. To learn more about the underlying REST API operation, see [Delete Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/delete-blob).

To delete a blob, call one of the following methods:

- [BlobClient.delete](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-delete)
- [BlobClient.deleteIfExists](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-deleteifexists)

If the blob has any associated snapshots, you must delete all of its snapshots to delete the blob. The following code example shows how to delete a blob and its snapshots:

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/delete-blob.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-delete.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-javascript.md)

---

## Restore a deleted blob

Blob soft delete protects an individual blob and its versions, snapshots, and metadata from accidental deletes or overwrites by maintaining the deleted data in the system for a specified period of time. During the retention period, you can restore the blob to its state at deletion. After the retention period expires, the blob is permanently deleted. For more information about blob soft delete, see [Soft delete for blobs](soft-delete-blob-overview.md).

You can use the Azure Storage client libraries to restore a soft-deleted blob or snapshot. 

#### Restore soft-deleted objects when versioning is disabled

To restore soft-deleted blobs, call the following method:

- [BlobClient.undelete](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-undelete)

This method restores soft-deleted blobs and any deleted snapshots associated with it. Calling this method for a blob that hasn't been deleted has no effect.

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/delete-blob.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-delete.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete-javascript.md)

---

## Resources

To learn more about how to delete blobs and restore deleted blobs using the Azure Blob Storage client library for JavaScript, see the following resources.

### Code samples

- View [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/delete-blob.js) and [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-delete.ts) code samples from this article (GitHub)

### REST API operations

The Azure SDK for JavaScript contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar JavaScript paradigms. The client library methods for deleting blobs and restoring deleted blobs use the following REST API operations:

- [Delete Blob](https://learn.microsoft.com/rest/api/storageservices/delete-blob) (REST API)
- [Undelete Blob](https://learn.microsoft.com/rest/api/storageservices/undelete-blob) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)

### See also

- [Soft delete for blobs](soft-delete-blob-overview.md)
- [Blob versioning](versioning-overview.md)


## Related content

- This article is part of the Blob Storage developer guide for JavaScript/TypeScript. To learn more, see the full list of developer guide articles at [Build your JavaScript/TypeScript app](storage-blob-javascript-get-started.md#build-your-app).
