---
title: Upload a blob with JavaScript or TypeScript
titleSuffix: Azure Storage
description: Learn how to upload a blob to your Azure Storage account using the JavaScript client library.
services: storage
author: stevenmatthew
ms.author: shaas
ms.date: 03/25/2025
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: javascript
ms.custom: devx-track-js, devguide-js, devx-track-ts, devguide-ts
# Customer intent: As a developer using JavaScript or TypeScript, I want to upload blobs to Azure Storage so that I can manage data efficiently and utilize various upload methods suited to different data types and requirements.
---

# Upload a blob with JavaScript or TypeScript


> 
>
> - [.NET](storage-blob-upload.md)
> - [Java](storage-blob-upload-java.md)
> - [JavaScript](storage-blob-upload-javascript.md)
> - [Python](storage-blob-upload-python.md)
> - [Go](storage-blob-upload-go.md)

This article shows how to upload a blob using the [Azure Storage client library for JavaScript](https://www.npmjs.com/package/@azure/storage-blob). You can upload data to a block blob from a file path, a stream, a buffer, or a text string. You can also upload blobs with index tags.

## Prerequisites

- The examples in this article assume you already have a project set up to work with the Azure Blob Storage client library for JavaScript. To learn about setting up your project, including package installation, importing modules, and creating an authorized client object to work with data resources, see [Get started with Azure Blob Storage and JavaScript](storage-blob-javascript-get-started.md).
- The [authorization mechanism](../common/authorize-data-access.md) must have permissions to perform an upload operation. To learn more, see the authorization guidance for the following REST API operations:
    - [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob#authorization)
    - [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block#authorization)

## Upload data to a block blob

You can use any of the following methods to upload data to a block blob:

- [upload](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-upload) (non-parallel uploading method)
- [uploadData](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-uploaddata)
- [uploadFile](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-uploadfile) (only available in Node.js runtime)
- [uploadStream](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#@azure-storage-blob-blockblobclient-uploadstream) (only available in Node.js runtime)

Each of these methods can be called using a [BlockBlobClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient) object.

> **Note:**
> The Azure Storage client libraries don't support concurrent writes to the same blob. If your app requires multiple processes writing to the same blob, you should implement a strategy for concurrency control to provide a predictable experience. To learn more about concurrency strategies, see [Manage concurrency in Blob Storage](concurrency-manage.md).

## Upload a block blob from a file path

The following example uploads a block blob from a local file path:

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-local-file-path.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-local-file-path.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

---

## Upload a block blob from a stream

The following example uploads a block blob by creating a readable stream and uploading the stream:

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-stream.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-stream.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

---

## Upload a block blob from a buffer

The following example uploads a block blob from a Node.js buffer:

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-buffer.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-buffer.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

---

## Upload a block blob from a string

The following example uploads a block blob from a string:

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-string.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-string.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

---

## Upload a block blob with configuration options

You can define client library configuration options when uploading a blob. These options can be tuned to improve performance, enhance reliability, and optimize costs. The code examples in this section show how to set configuration options using the [BlockBlobParallelUploadOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobparalleluploadoptions) interface, and how to pass those options as a parameter to an upload method call. 

### Specify data transfer options on upload

You can configure properties in [BlockBlobParallelUploadOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobparalleluploadoptions) to improve performance for data transfer operations. The following table lists the properties you can configure, along with a description:

| Property | Description |
| --- | --- |
| [`blockSize`](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobparalleluploadoptions#@azure-storage-blob-blockblobparalleluploadoptions-blocksize) | The maximum block size to transfer for each request as part of an upload operation. |
| [`concurrency`](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobparalleluploadoptions#@azure-storage-blob-blockblobparalleluploadoptions-concurrency) | The maximum number of parallel requests that are issued at any given time as a part of a single parallel transfer. |
| [`maxSingleShotSize`](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobparalleluploadoptions#@azure-storage-blob-blockblobparalleluploadoptions-maxsingleshotsize) | If the size of the data is less than or equal to this value, it's uploaded in a single put rather than broken up into chunks. If the data is uploaded in a single shot, the block size is ignored. Default value is 256 MiB. |

The following code example shows how to set values for [BlockBlobParallelUploadOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobparalleluploadoptions) and include the options as part of an upload method call. The values provided in the samples aren't intended to be a recommendation. To properly tune these values, you need to consider the specific needs of your app.

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-with-transfer-options.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-with-transfer-options.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

---

To learn more about tuning data transfer options, see [Performance tuning for uploads and downloads with JavaScript](storage-blobs-tune-upload-download-javascript.md).

### Specify data transfer validation on upload


Transfer validation with CRC64-NVME provides client-level data integrity for Azure Blob Storage, allowing you to verify that the data sent by your application is the same data stored and read from Azure. When enabled, the Blob SDK computes and validates CRC64-NVME checksums during upload and download operations, while the service independently computes and validates CRC64-NVME checksums for the data it receives and returns. Validation is performed on each request and across the full data stream, ensuring that the entire blob is verified even when data is transferred in partitions such as block uploads or ranged reads.  See [Structured Body Format](https://learn.microsoft.com/rest/api/storageservices/structured-body-format) for more details.


Transfer validation options can be defined at the client level using [BlobClientConfig](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclientconfig), which applies validation options to all methods called from a [BlobClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient) instance.  Alternatively, you can override transfer validation options at the operation level via options, such as [BlobUploadOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobuploadoptions).

### [JavaScript](#tab/javascript)

```javascript
const blobServiceClient = new BlobServiceClient(
   `https://${account}.blob.core.windows.net`,
   new DefaultAzureCredential(),
   {
     uploadContentChecksumAlgorithm: "StorageCrc64",
     downloadContentChecksumAlgorithm: "StorageCrc64",
   }
);
```

### [TypeScript](#tab/typescript)

```typescript
 const blobServiceClient: BlobServiceClient = new BlobServiceClient(
   `https://${account}.blob.core.windows.net`,
   new DefaultAzureCredential(),
   {
     uploadContentChecksumAlgorithm: "StorageCrc64",
     downloadContentChecksumAlgorithm: "StorageCrc64",
   },
);
```

---

### Upload a block blob with index tags

Blob index tags categorize data in your storage account using key-value tag attributes. These tags are automatically indexed and exposed as a searchable multi-dimensional index to easily find data.

The following example uploads a block blob with index tags set using [BlockBlobParallelUploadOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobparalleluploadoptions):

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-with-index-tags.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-with-index-tags.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

---

### Set a blob's access tier on upload

You can set a blob's access tier on upload by using the [BlockBlobParallelUploadOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobparalleluploadoptions) interface. The following code example shows how to set the access tier when uploading a blob:

### [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-with-access-tier.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

### [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-with-access-tier.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-javascript.md)

---

Setting the access tier is only allowed for block blobs. You can set the access tier for a block blob to `Hot`, `Cool`, `Cold`, or `Archive`. To set the access tier to `Cold`, you must use a minimum [client library](https://learn.microsoft.com/javascript/api/preview-docs/@azure/storage-blob/) version of 12.13.0.

To learn more about access tiers, see [Access tiers overview](access-tiers-overview.md).

## Resources

To learn more about uploading blobs using the Azure Blob Storage client library for JavaScript, see the following resources.

### REST API operations

The Azure SDK for JavaScript contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar JavaScript paradigms. The client library methods for uploading blobs use the following REST API operations:

- [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) (REST API)
- [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) (REST API)

### Code samples

View code samples from this article (GitHub):

- Upload from local file path for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-local-file-path.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-local-file-path.ts)
- Upload from buffer for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-buffer.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-buffer.ts)
- Upload from stream for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-stream.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-stream.ts)
- Upload from string for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-from-string.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-from-string.ts)
- Upload with transfer options for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-with-transfer-options.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-with-transfer-options.ts)
- Upload with index tags for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-with-index-tags.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-with-index-tags.ts)
- Upload with access tier for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/upload-blob-with-access-tier.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-upload-with-access-tier.ts)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)

### See also

- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for JavaScript/TypeScript. To learn more, see the full list of developer guide articles at [Build your JavaScript/TypeScript app](storage-blob-javascript-get-started.md#build-your-app).
