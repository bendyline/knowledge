---
title: Download a blob with .NET
titleSuffix: Azure Storage
description: Learn how to download a blob in Azure Storage by using the .NET client library.
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: "As a .NET developer, I want to download blobs from Azure Storage, so that I can manage and utilize data efficiently within my applications."
---

# Download a blob with .NET


> 
>
> - [.NET](storage-blob-download.md)
> - [Java](storage-blob-download-java.md)
> - [JavaScript](storage-blob-download-javascript.md)
> - [Python](storage-blob-download-python.md)
> - [Go](storage-blob-download-go.md)

This article shows how to download a blob using the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage). You can download blob data to various destinations, including a local file path, stream, or text string. You can also open a blob stream and read from it.


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

The authorization mechanism must have the necessary permissions to perform a download operation. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Reader** or higher. To learn more, see the authorization guidance for [Get Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-blob#authorization).

## Download a blob

You can use any of the following methods to download a blob:

- [DownloadTo](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.downloadto)
- [DownloadToAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.downloadtoasync)
- [DownloadContent](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.downloadcontent)
- [DownloadContentAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.downloadcontentasync)

You can also open a stream to read from a blob. The stream only downloads the blob as the stream is read from. You can use either of the following methods:

- [OpenRead](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.openread)
- [OpenReadAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.openreadasync)
 
## Download to a file path

The following example downloads a blob to a local file path. If the specified directory doesn't exist, the code throws a [DirectoryNotFoundException](https://learn.microsoft.com/dotnet/api/system.io.directorynotfoundexception). If the file already exists at `localFilePath`, it's overwritten by default during subsequent downloads.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DownloadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download.md)

## Download to a stream

The following example downloads a blob by creating a [Stream](https://learn.microsoft.com/dotnet/api/system.io.stream) object and then downloads to that stream. If the specified directory doesn't exist, the code throws a [DirectoryNotFoundException](https://learn.microsoft.com/dotnet/api/system.io.directorynotfoundexception).

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DownloadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download.md)

## Download to a string

The following example assumes that the blob is a text file, and downloads the blob to a string: 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DownloadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download.md)

## Download from a stream

The following example downloads a blob by reading from a stream:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DownloadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download.md)

## Download a block blob with configuration options

You can define client library configuration options when downloading a blob. These options can be tuned to improve performance and enhance reliability. The following code examples show how to use [BlobDownloadToOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobdownloadtooptions) to define configuration options when calling a download method. Note that the same options are available for [BlobDownloadOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobdownloadoptions).

### Specify data transfer options on download

You can configure the values in [StorageTransferOptions](https://learn.microsoft.com/dotnet/api/azure.storage.storagetransferoptions) to improve performance for data transfer operations. The following code example shows how to set values for `StorageTransferOptions` and include the options as part of a `BlobDownloadToOptions` instance. The values provided in this sample aren't intended to be a recommendation. To properly tune these values, you need to consider the specific needs of your app.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DownloadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download.md)

To learn more about tuning data transfer options, see [Performance tuning for uploads and downloads](storage-blobs-tune-upload-download.md).

### Specify transfer validation options on download


Transfer validation with CRC64-NVME provides client-level data integrity for Azure Blob Storage, allowing you to verify that the data sent by your application is the same data stored and read from Azure. When enabled, the Blob SDK computes and validates CRC64-NVME checksums during upload and download operations, while the service independently computes and validates CRC64-NVME checksums for the data it receives and returns. Validation is performed on each request and across the full data stream, ensuring that the entire blob is verified even when data is transferred in partitions such as block uploads or ranged reads.  See [Structured Body Format](https://learn.microsoft.com/rest/api/storageservices/structured-body-format) for more details.


Transfer validation with MD5 is available to verify that the data sent by your application matches the data received and returned by the service on each request. When enabled, the Blob SDK computes and validates MD5 hashes during upload and download operations, while the service independently computes and validates MD5 hashes for the data it processes. Validation is performed at the HTTP request and response level, helping detect corruption for each transferred segment of data, such as individual blocks during uploads or ranges during reads.

Transfer validation options can be defined at the client level using [BlobClientOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclientoptions), which applies validation options to all methods called from a [BlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient) instance. Alternatively, you can override transfer validation options at the method level using [BlobDownloadToOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobdownloadtooptions). The following code example shows how to create a `BlobDownloadToOptions` object and specify an algorithm for generating a checksum.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DownloadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download.md)

The following table shows the available options for the checksum algorithm, as defined by [StorageChecksumAlgorithm](https://learn.microsoft.com/dotnet/api/azure.storage.storagechecksumalgorithm):

| Name | Value | Description |
| --- | --- | --- |
| Auto | 0 | Recommended. Allows the library to choose an algorithm. Different library versions may choose different algorithms. Auto chooses StorageCrc64 in [client library](https://learn.microsoft.com/dotnet/api/azure.storage.blobs) versions 12.28.0+ |
| None | 1 | No selected algorithm. Don't calculate or request checksums. |
| MD5 | 2 | Standard MD5 hash algorithm. |
| StorageCrc64 | 3 | Azure Storage custom CRC64-NVME. |

## Resources

To learn more about how to download blobs using the Azure Blob Storage client library for .NET, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/dotnet/BlobDevGuideBlobs/DownloadBlob.cs)

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods for downloading blobs use the following REST API operation:

- [Get Blob](https://learn.microsoft.com/rest/api/storageservices/get-blob) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Performance tuning for uploads and downloads](storage-blobs-tune-upload-download.md).


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
