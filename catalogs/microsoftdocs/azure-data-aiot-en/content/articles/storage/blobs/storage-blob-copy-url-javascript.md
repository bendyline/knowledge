---
title: Copy a blob from a source object URL with JavaScript
titleSuffix: Azure Storage
description: Learn how to copy a blob from a source object URL in Azure Storage by using the JavaScript client library.
author: stevenmatthew

ms.author: shaas
ms.date: 10/28/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: javascript
ms.custom: devx-track-js, devguide-js, devx-track-ts, devguide-ts
# Customer intent: As a developer, I want to copy blobs from a source object URL using JavaScript, so that I can manage and transfer data within my Azure Storage efficiently.
---

# Copy a blob from a source object URL with JavaScript


> 
>
> - [.NET](storage-blob-copy-url-dotnet.md)
> - [Java](storage-blob-copy-url-java.md)
> - [JavaScript](storage-blob-copy-url-javascript.md)
> - [Python](storage-blob-copy-url-python.md)
> - [Go](storage-blob-copy-url-go.md)

This article shows how to copy a blob from a source object URL using the [Azure Storage client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/storage-blob-readme). You can copy a blob from a source within the same storage account, from a source in a different storage account, or from any accessible object retrieved via HTTP GET request on a given URL.

The client library methods covered in this article use the [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) and [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) REST API operations. These methods are preferred for copy scenarios where you want to move data into a storage account and have a URL for the source object. For copy operations where you want asynchronous scheduling, see [Copy a blob with asynchronous scheduling using JavaScript](storage-blob-copy-async-javascript.md).

## Prerequisites

- The examples in this article assume you already have a project set up to work with the Azure Blob Storage client library for JavaScript. To learn about setting up your project, including package installation, importing modules, and creating an authorized client object to work with data resources, see [Get started with Azure Blob Storage and JavaScript](storage-blob-javascript-get-started.md).
- The [authorization mechanism](../common/authorize-data-access.md) must have permissions to perform a copy operation. To learn more, see the authorization guidance for the following REST API operation:
    - [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url#authorization)
    - [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url#authorization)


## About copying blobs from a source object URL

The `Put Blob From URL` operation creates a new block blob where the contents of the blob are read from a given URL. The operation completes synchronously.

The source can be any object retrievable via a standard HTTP GET request on the given URL. This includes block blobs, append blobs, page blobs, blob snapshots, blob versions, or any accessible object inside or outside Azure.

When source object is a block blob, all committed blob content is copied. However, the block list isn't preserved, and uncommitted blocks aren't copied. The content of the destination blob is identical to that of the source, but the committed block list isn't preserved.

The destination is always a block blob, either an existing block blob, or a new block blob created by the operation. The contents of an existing blob are overwritten with the contents of the new blob.

The `Put Blob From URL` operation always copies the entire source blob. Copying a range of bytes or set of blocks isn't supported. To perform partial updates to a block blob’s contents by using a source URL, use the [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) API along with [Put Block List](https://learn.microsoft.com/rest/api/storageservices/put-block-list).

To learn more about the `Put Blob From URL` operation, including blob size limitations and billing considerations, see [Put Blob From URL remarks](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url#remarks).

## Copy a blob from a source object URL

This section gives an overview of methods provided by the Azure Storage client library for JavaScript to perform a copy operation from a source object URL.

The following method wraps the [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) REST API operation, and creates a new block blob where the contents of the blob are read from a given URL:

- [BlockBlobClient.syncUploadFromURL](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-syncuploadfromurl)

These methods are preferred for scenarios where you want to move data into a storage account and have a URL for the source object.

For large objects, you might choose to work with individual blocks. The following method wraps the [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) REST API operation. This method creates a new block to be committed as part of a blob where the contents are read from a source URL:

- [BlockBlobClient.stageBlockFromURL](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-stageblockfromurl)

## Copy a blob from a source within Azure

If you're copying a blob from a source within Azure, access to the source blob can be authorized via Microsoft Entra ID, a shared access signature (SAS), or an account key.

The following example shows a scenario for copying from a source blob within Azure:

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/copy-blob-put-from-url.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/copy-blob-put-from-url.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-javascript.md)

---

The [syncUploadFromURL](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-syncuploadfromurl) method can also accept a [BlockBlobSyncUploadFromURLOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobsyncuploadfromurloptions) parameter to specify further options for the operation.

## Copy a blob from a source outside of Azure

You can perform a copy operation on any source object that can be retrieved via HTTP GET request on a given URL, including accessible objects outside of Azure. The following example shows a scenario for copying a blob from an accessible source object URL.

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/copy-blob-put-from-url.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/copy-blob-put-from-url.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-javascript.md)

---

## Resources

To learn more about copying blobs using the Azure Blob Storage client library for JavaScript, see the following resources.

### Code samples

- View [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/copy-blob-put-from-url.js) and [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/copy-blob-put-from-url.ts) code samples from this article (GitHub)

### REST API operations

The Azure SDK for JavaScript contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar JavaScript paradigms. The client library methods covered in this article use the following REST API operations:

- [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) (REST API)
- [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)


## Related content

- This article is part of the Blob Storage developer guide for JavaScript/TypeScript. To learn more, see the full list of developer guide articles at [Build your JavaScript/TypeScript app](storage-blob-javascript-get-started.md#build-your-app).
