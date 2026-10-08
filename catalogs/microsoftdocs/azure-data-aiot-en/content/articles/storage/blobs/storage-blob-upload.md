---
title: Upload a blob with .NET
titleSuffix: Azure Storage
description: Learn how to upload a blob to your Azure Storage account using the .NET client library.
services: storage
author: stevenmatthew
ms.author: shaas
ms.date: 10/01/2025
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: "As a .NET developer, I want to upload blobs to Azure Storage using the .NET client library, so that I can efficiently manage and store data in the cloud."
---

# Upload a blob with .NET


> 
>
> - [.NET](storage-blob-upload.md)
> - [Java](storage-blob-upload-java.md)
> - [JavaScript](storage-blob-upload-javascript.md)
> - [Python](storage-blob-upload-python.md)
> - [Go](storage-blob-upload-go.md)

This article shows how to upload a blob using the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage). You can upload data to a block blob from a file path, a stream, a binary object, or a text string. You can also open a blob stream and write to it, or upload large blobs in blocks.


## Prerequisites

- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure storage account - [create a storage account](../common/storage-account-create.md)
- Latest [.NET SDK](https://dotnet.microsoft.com/download/dotnet) for your operating system. Be sure to get the SDK and not the runtime.

## Set up your environment


If you don't have an existing project, this section shows you how to set up a project to work with the Azure Blob Storage client library for .NET. The steps include package installation, adding `using` directives, and creating an authorized client object. For details, see [Get started with Azure Blob Storage and .NET](storage-blob-dotnet-get-started.md).

#### Install packages

From your project directory, install packages for the Azure Blob Storage and Azure Identity client libraries using the `dotnet add package` command. The Azure.Identity package is needed for passwordless connections to Azure services.

```dotnetcli
dotnet add package Azure.Storage.Blobs
dotnet add package Azure.Identity
```

#### Add `using` directives

Add these `using` directives to the top of your code file:

```csharp
using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
```

Some code examples in this article might require additional `using` directives.

#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient). The following example shows how to create a client object using `DefaultAzureCredential` for authorization:

```csharp
public BlobServiceClient GetBlobServiceClient(string accountName)
{
    BlobServiceClient client = new(
        new Uri($"https://{accountName}.blob.core.windows.net"),
        new DefaultAzureCredential());

    return client;
}
```

You can register a service client for [dependency injection](https://learn.microsoft.com/dotnet/azure/sdk/dependency-injection) in a .NET app.

You can also create client objects for specific [containers](storage-blob-client-management.md#create-a-blobcontainerclient-object) or [blobs](storage-blob-client-management.md#create-a-blobclient-object). To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).



#### Authorization

The authorization mechanism must have the necessary permissions to upload a blob. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Put Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-blob#authorization) and [Put Block (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-block#authorization).

## Upload data to a block blob

You can use either of the following methods to upload data to a block blob:

- [Upload](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient.upload)
- [UploadAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient.uploadasync)

When using these upload methods, the client library may call either [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) or a series of [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) calls followed by [Put Block List](https://learn.microsoft.com/rest/api/storageservices/put-block-list). This behavior depends on the overall size of the object and how the [data transfer options](#specify-data-transfer-options-on-upload) are set.

To open a stream in Blob Storage and write to that stream, use either of the following methods:

- [OpenWrite](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.openwrite)
- [OpenWriteAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.openwriteasync)

> **Note:**
> The Azure Storage client libraries don't support concurrent writes to the same blob. If your app requires multiple processes writing to the same blob, you should implement a strategy for concurrency control to provide a predictable experience. To learn more about concurrency strategies, see [Manage concurrency in Blob Storage](concurrency-manage.md).

## Upload a block blob from a local file path

The following example uploads a block blob from a local file path:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

## Upload a block blob from a stream

The following example uploads a block blob by creating a [Stream](https://learn.microsoft.com/dotnet/api/system.io.stream) object and uploading the stream.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

## Upload a block blob from a BinaryData object

The following example uploads a block blob from a [BinaryData](https://learn.microsoft.com/dotnet/api/system.binarydata) object.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

## Upload a block blob from a string

The following example uploads a block blob from a string:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

## Upload to a stream in Blob Storage

You can open a stream in Blob Storage and write to it. The following example creates a zip file in Blob Storage and writes files to it. Instead of building a zip file in local memory, only one file at a time is in memory.

> **Warning:**
> This approach can be very expensive if object replication policy is enabled because each write to the stream creates a new version of the zip file, and each version is copied to the destination account. The same is true if Azure Blob vaulted backup is enabled because vaulted backup uses object replication. 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

## Upload a block blob with configuration options

You can define client library configuration options when uploading a blob. These options can be tuned to improve performance, enhance reliability, and optimize costs. The following code examples show how to use [BlobUploadOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobuploadoptions) to define configuration options when calling an upload method.

### Specify data transfer options on upload

You can configure the values in [StorageTransferOptions](https://learn.microsoft.com/dotnet/api/azure.storage.storagetransferoptions) to improve performance for data transfer operations. The following code example shows how to set values for `StorageTransferOptions` and include the options as part of a `BlobUploadOptions` instance. The values provided in this sample aren't intended to be a recommendation. To properly tune these values, you need to consider the specific needs of your app.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

To learn more about tuning data transfer options, see [Performance tuning for uploads and downloads with .NET](storage-blobs-tune-upload-download.md).

### Specify transfer validation options on upload


Transfer validation with CRC64-NVME provides client-level data integrity for Azure Blob Storage, allowing you to verify that the data sent by your application is the same data stored and read from Azure. When enabled, the Blob SDK computes and validates CRC64-NVME checksums during upload and download operations, while the service independently computes and validates CRC64-NVME checksums for the data it receives and returns. Validation is performed on each request and across the full data stream, ensuring that the entire blob is verified even when data is transferred in partitions such as block uploads or ranged reads.  See [Structured Body Format](https://learn.microsoft.com/rest/api/storageservices/structured-body-format) for more details.


Transfer validation with MD5 is available to verify that the data sent by your application matches the data received and returned by the service on each request. When enabled, the Blob SDK computes and validates MD5 hashes during upload and download operations, while the service independently computes and validates MD5 hashes for the data it processes. Validation is performed at the HTTP request and response level, helping detect corruption for each transferred segment of data, such as individual blocks during uploads or ranges during reads.

Transfer validation options can be defined at the client level using [BlobClientOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclientoptions), which applies validation options to all methods called from a [BlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient) instance. Alternatively, you can override transfer validation options at the method level using [BlobUploadOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobuploadoptions). The following code example shows how to create a `BlobUploadOptions` object and specify an algorithm for generating a checksum.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

The following table shows the available options for the checksum algorithm, as defined by [StorageChecksumAlgorithm](https://learn.microsoft.com/dotnet/api/azure.storage.storagechecksumalgorithm):

| Name | Value | Description |
| --- | --- | --- |
| Auto | 0 | Recommended. Allows the library to choose an algorithm. Different library versions may choose different algorithms. Auto chooses StorageCrc64 in [client library](https://learn.microsoft.com/dotnet/api/azure.storage.blobs) versions 12.28.0+ |
| None | 1 | No selected algorithm. Don't calculate or request checksums. |
| MD5 | 2 | Standard MD5 hash algorithm. |
| StorageCrc64 | 3 | Azure Storage custom CRC64-NVME. |

> **Note:**
> If the checksum specified in the request doesn't match the checksum calculated by the service, the upload operation fails. The operation is not retried when using a default retry policy. In .NET, a `RequestFailedException` is thrown with status code 400 and error code `Md5Mismatch` or `Crc64Mismatch`, depending on which algorithm is used.

### Upload with index tags

Blob index tags categorize data in your storage account using key-value tag attributes. These tags are automatically indexed and exposed as a searchable multi-dimensional index to easily find data. You can add tags to a [BlobUploadOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobuploadoptions) instance, and pass that instance into the `UploadAsync` method.

The following example uploads a block blob with index tags:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

### Set a blob's access tier on upload

You can set a blob's access tier on upload by using the [BlobUploadOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobuploadoptions) class. The following code example shows how to set the access tier when uploading a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

Setting the access tier is only allowed for block blobs. You can set the access tier for a block blob to `Hot`, `Cool`, `Cold`, or `Archive`. To set the access tier to `Cold`, you must use a minimum [client library](https://learn.microsoft.com/dotnet/api/azure.storage.blobs) version of 12.15.0.

To learn more about access tiers, see [Access tiers overview](access-tiers-overview.md).

## Upload a block blob by staging blocks and committing

You can have greater control over how to divide uploads into blocks by manually staging individual blocks of data. When all of the blocks that make up a blob are staged, you can commit them to Blob Storage. You can use this approach to enhance performance by uploading blocks in parallel. 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload.md)

## Resources

To learn more about uploading blobs using the Azure Blob Storage client library for .NET, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs)

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods for uploading blobs use the following REST API operations:

- [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) (REST API)
- [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) (REST API)

### See also

- [Performance tuning for uploads and downloads](storage-blobs-tune-upload-download.md).
- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
