---
title: Copy a blob from a source object URL with .NET
titleSuffix: Azure Storage
description: Learn how to copy a blob from a source object URL in Azure Storage by using the .NET client library.
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: As a .NET developer, I want to copy a blob from a source object URL so that I can efficiently transfer data into my Azure Storage account.
---

# Copy a blob from a source object URL with .NET


> 
>
> - [.NET](storage-blob-copy-url-dotnet.md)
> - [Java](storage-blob-copy-url-java.md)
> - [JavaScript](storage-blob-copy-url-javascript.md)
> - [Python](storage-blob-copy-url-python.md)
> - [Go](storage-blob-copy-url-go.md)

This article shows how to copy a blob from a source object URL using the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage). You can copy a blob from a source within the same storage account, from a source in a different storage account, or from any accessible object retrieved via HTTP GET request on a given URL.

The client library methods covered in this article use the [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) and [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) REST API operations. These methods are preferred for copy scenarios where you want to move data into a storage account and have a URL for the source object. For copy operations where you want asynchronous scheduling, see [Copy a blob with asynchronous scheduling using .NET](storage-blob-copy-async-dotnet.md).


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

The authorization mechanism must have the necessary permissions to perform a copy operation. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Put Blob From URL (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url#authorization) or [Put Block From URL (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url#authorization).


## About copying blobs from a source object URL

The `Put Blob From URL` operation creates a new block blob where the contents of the blob are read from a given URL. The operation completes synchronously.

The source can be any object retrievable via a standard HTTP GET request on the given URL. This includes block blobs, append blobs, page blobs, blob snapshots, blob versions, or any accessible object inside or outside Azure.

When source object is a block blob, all committed blob content is copied. However, the block list isn't preserved, and uncommitted blocks aren't copied. The content of the destination blob is identical to that of the source, but the committed block list isn't preserved.

The destination is always a block blob, either an existing block blob, or a new block blob created by the operation. The contents of an existing blob are overwritten with the contents of the new blob.

The `Put Blob From URL` operation always copies the entire source blob. Copying a range of bytes or set of blocks isn't supported. To perform partial updates to a block blob’s contents by using a source URL, use the [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) API along with [Put Block List](https://learn.microsoft.com/rest/api/storageservices/put-block-list).

To learn more about the `Put Blob From URL` operation, including blob size limitations and billing considerations, see [Put Blob From URL remarks](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url#remarks).

## Copy a blob from a source object URL

This section gives an overview of methods provided by the Azure Storage client library for .NET to perform a copy operation from a source object URL.

The following methods wrap the [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) REST API operation, and create a new block blob where the contents of the blob are read from a given URL:

- [SyncUploadFromUri](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.syncuploadfromuri)
- [SyncUploadFromUriAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.syncuploadfromuriasync)

These methods are preferred for scenarios where you want to move data into a storage account and have a URL for the source object.

For large objects, you may choose to work with individual blocks. The following methods wrap the [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) REST API operation. These methods create a new block to be committed as part of a blob where the contents are read from a source URL:

- [StageBlockFromUri](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.stageblockfromuri)
- [StageBlockFromUriAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.stageblockfromuriasync)

## Copy a blob from a source within Azure

If you're copying a blob from a source within Azure, access to the source blob can be authorized via Microsoft Entra ID, a shared access signature (SAS), or an account key. 

The following example shows a scenario for copying from a source blob within Azure. The [SyncUploadFromUriAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.syncuploadfromuriasync) method can optionally accept a Boolean parameter to indicate whether an existing blob should be overwritten, as shown in the example. The `overwrite` parameter defaults to false.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/PutBlobFromURL.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-dotnet.md)

The [SyncUploadFromUriAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.syncuploadfromuriasync) method can also accept a [BlobSyncUploadFromUriOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobsyncuploadfromurioptions) parameter to specify further options for the operation.

## Copy a blob from a source outside of Azure

You can perform a copy operation on any source object that can be retrieved via HTTP GET request on a given URL, including accessible objects outside of Azure. The following example shows a scenario for copying a blob from an accessible source object URL.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/PutBlobFromURL.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-dotnet.md)

## Resources

To learn more about copying blobs using the Azure Blob Storage client library for .NET, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/dotnet/BlobDevGuideBlobs/PutBlobFromURL.cs)

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods covered in this article use the following REST API operations:

- [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) (REST API)
- [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
