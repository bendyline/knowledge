---
title: Set or change a blob's access tier with JavaScript or TypeScript
titleSuffix: Azure Storage 
description: Learn how to set or change a blob's access tier in your Azure Storage account using the JavaScript client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 10/28/2024
ms.devlang: javascript
ms.custom: devx-track-js, devguide-js, devx-track-ts, devguide-ts
# Customer intent: As a developer working with blob storage, I want to set or change a blob's access tier using JavaScript or TypeScript, so that I can efficiently manage data storage costs based on access patterns.
---

# Set or change a block blob's access tier with JavaScript or TypeScript


> 
>
> - [.NET](storage-blob-use-access-tier-dotnet.md)
> - [Java](storage-blob-use-access-tier-java.md)
> - [JavaScript](storage-blob-use-access-tier-javascript.md)
> - [Python](storage-blob-use-access-tier-python.md)

This article shows how to set or change a blob's [access tier](access-tiers-overview.md) for block blobs with the [Azure Storage client library for JavaScript](https://www.npmjs.com/package/@azure/storage-blob). 

## Prerequisites

- The examples in this article assume you already have a project set up to work with the Azure Blob Storage client library for JavaScript. To learn about setting up your project, including package installation, importing modules, and creating an authorized client object to work with data resources, see [Get started with Azure Blob Storage and JavaScript](storage-blob-javascript-get-started.md).
- The [authorization mechanism](../common/authorize-data-access.md) must have permissions to set the blob's access tier. To learn more, see the authorization guidance for the following REST API operation:
    - [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier#authorization)


## About block blob access tiers

To manage costs for storage needs, it can be helpful to organize your data based on how frequently it's accessed and how long it needs to be retained. Azure storage offers different access tiers so that you can store your blob data in the most cost-effective manner based on how it's being used.

#### Access tiers for blob data

Azure Storage access tiers include:

- **Hot tier** - An online tier optimized for storing data that is accessed or modified frequently. The hot tier has the highest storage costs, but the lowest access costs.
- **Cool tier** - An online tier optimized for storing data that is infrequently accessed or modified. Data in the cool tier should be stored for a minimum of 30 days. The cool tier has lower storage costs and higher access costs compared to the hot tier.
- **Cold tier** - An online tier optimized for storing data that is infrequently accessed or modified. Data in the cold tier should be stored for a minimum of 90 days. The cold tier has lower storage costs and higher access costs compared to the cool tier.
- **Archive tier** - An offline tier optimized for storing data that is rarely accessed, and that has flexible latency requirements, on the order of hours. Data in the archive tier should be stored for a minimum of 180 days.

To learn more about access tiers, see [Access tiers for blob data](access-tiers-overview.md).

While a blob is in the Archive access tier, it's considered to be offline, and can't be read or modified. In order to read or modify data in an archived blob, you must first rehydrate the blob to an online tier. To learn more about rehydrating a blob from the Archive tier to an online tier, see [Blob rehydration from the Archive tier](archive-rehydrate-overview.md).

#### Restrictions

Setting the access tier is only allowed on block blobs. To learn more about restrictions on setting a block blob's access tier, see [Set Blob Tier (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier#remarks).

> **Note:**
> To set the access tier to `Cold` using JavaScript, you must use a minimum [client library](https://learn.microsoft.com/javascript/api/preview-docs/@azure/storage-blob/) version of 12.13.0.

## Set a blob's access tier during upload

To [upload](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-upload) a blob into a specific access tier, use the [BlockBlobUploadOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobuploadoptions). The `tier` property choices are: `Hot`, `Cool`, `Cold`, or `Archive`.

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-string-with-access-tier.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-string-with-access-tier.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-javascript.md)

---

## Change a blob's access tier after upload

To change the access tier of a blob after it's uploaded to storage, use [setAccessTier](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-setaccesstier). Along with the tier, you can set the [BlobSetTierOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobsettieroptions) property [rehydration priority](archive-rehydrate-overview.md) to bring the block blob out of an archived state. Possible values are `High` or `Standard`.

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/change-blob-access-tier.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-change-access-tier.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-javascript.md)

---

## Copy a blob into a different access tier

Use the BlobClient.[beginCopyFromURL](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-begincopyfromurl) method to copy a blob. To change the access tier during the copy operation, use the [BlobBeginCopyFromURLOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobbegincopyfromurloptions) `tier` property and specify a different access [tier](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-storage-tiers.md) than the source blob.

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/copy-blob-to-different-access-tier.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-copy-to-different-access-tier.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-javascript.md)

---

## Use a batch to change access tier for many blobs

The batch represents an aggregated set of operations on blobs, such as [delete](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobbatchclient#@azure-storage-blob-blobbatchclient-deleteblobs-1) or [set access tier](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobbatchclient#@azure-storage-blob-blobbatchclient-setblobsaccesstier-1). You need to pass in the correct credential to successfully perform each operation. In this example, the same credential is used for a set of blobs in the same container. 

Create a [BlobBatchClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobbatchclient). Use the client to create a batch with the [createBatch()](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobbatchclient#@azure-storage-blob-blobbatchclient-createbatch) method. When the batch is ready, [submit](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobbatchclient#@azure-storage-blob-blobbatchclient-submitbatch) the batch for processing. Use the returned structure to validate each blob's operation was successful.

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/batch-set-access-tier.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-batch-set-access-tier-for-container.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-javascript.md)

---
 
## Code samples

- Set blob access tier during upload for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/tree/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-string-with-access-tier.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-string-with-access-tier.ts)
- Change blob access tier after upload for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/tree/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/change-blob-access-tier.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/tree/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-change-access-tier.ts)
- Copy blob into different access tier for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/tree/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/copy-blob-to-different-access-tier.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/tree/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-copy-to-different-access-tier.ts)
- Use a batch to change access tier for many blobs for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/tree/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/batch-set-access-tier.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/tree/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-batch-set-access-tier-for-container.ts)

## Next steps

- [Access tiers best practices](access-tiers-best-practices.md)
- [Blob rehydration from the archive tier](archive-rehydrate-overview.md)
