---
title: Delete and restore a blob container with JavaScript or TypeScript
titleSuffix: Azure Storage 
description: Learn how to delete and restore a blob container in your Azure Storage account using the JavaScript client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 10/28/2024
ms.devlang: javascript
ms.custom: devx-track-js, devguide-js, devx-track-ts, devguide-ts
# Customer intent: "As a developer using the Azure Blob Storage client library, I want to delete and restore blob containers using JavaScript or TypeScript, so that I can effectively manage the lifecycle of my storage resources while minimizing the risk of data loss."
---

# Delete and restore a blob container with JavaScript or TypeScript


> 
>
> - [.NET](storage-blob-container-delete.md)
> - [Java](storage-blob-container-delete-java.md)
> - [JavaScript](storage-blob-container-delete-javascript.md)
> - [Python](storage-blob-container-delete-python.md)
> - [Go](storage-blob-container-delete-go.md)

This article shows how to delete containers with the [Azure Storage client library for JavaScript](https://www.npmjs.com/package/@azure/storage-blob). If you've enabled [container soft delete](soft-delete-container-overview.md), you can restore deleted containers.

## Prerequisites

- The examples in this article assume you already have a project set up to work with the Azure Blob Storage client library for JavaScript. To learn about setting up your project, including package installation, importing modules, and creating an authorized client object to work with data resources, see [Get started with Azure Blob Storage and JavaScript](storage-blob-javascript-get-started.md).
- The [authorization mechanism](../common/authorize-data-access.md) must have permissions to delete a blob container, or to restore a soft-deleted container. To learn more, see the authorization guidance for the following REST API operations:
    - [Delete Container](https://learn.microsoft.com/rest/api/storageservices/delete-container#authorization)
    - [Restore Container](https://learn.microsoft.com/rest/api/storageservices/restore-container#authorization)

## Delete a container

To delete a container, use the following method from the [BlobServiceClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient) class:

- [BlobServiceClient.deleteContainer](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient#@azure-storage-blob-blobserviceclient-deletecontainer#@azure-storage-blob-blobserviceclient-deletecontainer)

You can also delete a container using the following method from the [ContainerClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient) class:

- [ContainerClient.delete](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient#@azure-storage-blob-blobserviceclient-deletecontainer)
- [ContainerClient.deleteIfExists](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient#@azure-storage-blob-containerclient-deleteifexists)

After you delete a container, you can't create a container with the same name for at *least* 30 seconds. Attempting to create a container with the same name fails with HTTP error code `409 (Conflict)`. Any other operations on the container or the blobs it contains fail with HTTP error code `404 (Not Found)`.

The following example uses a `BlobServiceClient` object to delete the specified container:

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/delete-containers.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/containers-delete.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-javascript.md)

---

The following example shows how to delete all containers that start with a specified prefix:

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/delete-containers.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/containers-delete.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-javascript.md)

---

## Restore a deleted container

When container soft delete is enabled for a storage account, a container and its contents can be recovered after it has been deleted, within a retention period that you specify. You can restore a soft-deleted container using a [BlobServiceClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient) object:

- [BlobServiceClient.undeleteContainer](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient#@azure-storage-blob-blobserviceclient-deletecontainert#@azure-storage-blob-blobserviceclient-undeletecontainer)

The following example finds a deleted container, gets the version ID of that deleted container, and then passes that ID into the `undeleteContainer` method to restore the container.

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/delete-containers.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/containers-delete.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-javascript.md)

---

## Resources

To learn more about deleting a container using the Azure Blob Storage client library for JavaScript, see the following resources.

### Code samples

- View [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/delete-containers.js) and [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/containers-delete.ts) code samples from this article (GitHub)

### REST API operations

The Azure SDK for JavaScript contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar JavaScript paradigms. The client library methods for deleting or restoring a container use the following REST API operations:

- [Delete Container](https://learn.microsoft.com/rest/api/storageservices/delete-container) (REST API)
- [Restore Container](https://learn.microsoft.com/rest/api/storageservices/restore-container) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)

### See also

- [Soft delete for containers](soft-delete-container-overview.md)
- [Enable and manage soft delete for containers](soft-delete-container-enable.md)


## Related content

- This article is part of the Blob Storage developer guide for JavaScript/TypeScript. To learn more, see the full list of developer guide articles at [Build your JavaScript/TypeScript app](storage-blob-javascript-get-started.md#build-your-app).
