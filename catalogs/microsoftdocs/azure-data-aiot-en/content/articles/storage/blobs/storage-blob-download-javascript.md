---
title: Download a blob with JavaScript or TypeScript
titleSuffix: Azure Storage
description: Learn how to download a blob in Azure Storage by using the JavaScript client library.
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 10/28/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: javascript
ms.custom: devx-track-js, devguide-js, devx-track-ts, devguide-ts
# Customer intent: As a developer using JavaScript or TypeScript, I want to download blobs from Azure Storage, so that I can handle and utilize storage data effectively in my applications.
---

# Download a blob with JavaScript or TypeScript


> 
>
> - [.NET](storage-blob-download.md)
> - [Java](storage-blob-download-java.md)
> - [JavaScript](storage-blob-download-javascript.md)
> - [Python](storage-blob-download-python.md)
> - [Go](storage-blob-download-go.md)

This article shows how to download a blob using the [Azure Storage client library for JavaScript](https://www.npmjs.com/package/@azure/storage-blob). You can download blob data to various destinations, including a local file path, stream, or text string.

## Prerequisites

- The examples in this article assume you already have a project set up to work with the Azure Blob Storage client library for JavaScript. To learn about setting up your project, including package installation, importing modules, and creating an authorized client object to work with data resources, see [Get started with Azure Blob Storage and JavaScript](storage-blob-javascript-get-started.md).
- The [authorization mechanism](../common/authorize-data-access.md) must have permissions to perform a download operation. To learn more, see the authorization guidance for the following REST API operation:
    - [Get Blob](https://learn.microsoft.com/rest/api/storageservices/get-blob#authorization)

## Download a blob

You can use any of the following methods to download a blob: 

- [BlobClient.download](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-download)
- [BlobClient.downloadToBuffer](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-downloadtobuffer-1) (only available in Node.js runtime)
- [BlobClient.downloadToFile](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-downloadtofile) (only available in Node.js runtime)
 
## Download to a file path

The following example downloads a blob by using a file path with the [BlobClient.downloadToFile](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-downloadtofile) method. This method is only available in the Node.js runtime:

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/download-blob-to-file.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-download-to-file.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-javascript.md)

---

## Download as a stream

The following example downloads a blob by creating a Node.js writable stream object and then piping to that stream with the [BlobClient.download](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-download) method.

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/download-blob-to-stream.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-download-to-stream.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-javascript.md)

---

## Download to a string

The following Node.js example downloads a blob to a string with [BlobClient.download](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-download) method. In Node.js, blob data returns in a `readableStreamBody`.

## [JavaScript](#tab/javascript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/dev-guide/download-blob-to-string.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-javascript.md)

## [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-download-to-string.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-javascript.md)

---

If you're working with JavaScript in the browser, blob data returns in a promise [blobBody](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobdownloadresponseparsed#@azure-storage-blob-blobdownloadresponseparsed-blobbody). To learn more, see the example usage for browsers at [BlobClient.download](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient#@azure-storage-blob-blobclient-download).


## Data transfer validation on download


Transfer validation with CRC64-NVME provides client-level data integrity for Azure Blob Storage, allowing you to verify that the data sent by your application is the same data stored and read from Azure. When enabled, the Blob SDK computes and validates CRC64-NVME checksums during upload and download operations, while the service independently computes and validates CRC64-NVME checksums for the data it receives and returns. Validation is performed on each request and across the full data stream, ensuring that the entire blob is verified even when data is transferred in partitions such as block uploads or ranged reads.  See [Structured Body Format](https://learn.microsoft.com/rest/api/storageservices/structured-body-format) for more details.


Transfer validation options can be defined at the client level using [BlobClientConfig](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclientconfig), which applies validation options to all methods called from a [BlobClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient) instance.  Alternatively, you can override transfer validation options at the operation level via options, such as [BlobDownloadOptions](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobdownloadoptions).

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

## Resources

To learn more about how to download blobs using the Azure Blob Storage client library for JavaScript, see the following resources.

### Code samples

View code samples from this article (GitHub):

- Download to file for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/download-blob-to-file.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-download-to-file.ts)

- Download to stream for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/download-blob-to-stream.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-download-to-stream.ts)

- Download to string for [JavaScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/JavaScript/NodeJS-v12/dev-guide/download-blob-to-string.js) or [TypeScript](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/TypeScript/NodeJS-v12/dev-guide/src/blob-download-to-string.ts)

### REST API operations

The Azure SDK for JavaScript contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar JavaScript paradigms. The client library methods for downloading blobs use the following REST API operation:

- [Get Blob](https://learn.microsoft.com/rest/api/storageservices/get-blob) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)


## Related content

- This article is part of the Blob Storage developer guide for JavaScript/TypeScript. To learn more, see the full list of developer guide articles at [Build your JavaScript/TypeScript app](storage-blob-javascript-get-started.md#build-your-app).
