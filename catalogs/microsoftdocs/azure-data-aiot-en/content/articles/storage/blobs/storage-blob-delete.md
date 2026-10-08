---
title: Delete and restore a blob with .NET
titleSuffix: Azure Storage
description: Learn how to delete and restore a blob in your Azure Storage account using the .NET client library
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 08/12/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: As a .NET developer, I want to delete and restore blobs using the Azure Storage client library, so that I can manage data effectively and recover from accidental deletions.
---

# Delete and restore a blob with .NET


> 
>
> - [.NET](storage-blob-delete.md)
> - [Java](storage-blob-delete-java.md)
> - [JavaScript](storage-blob-delete-javascript.md)
> - [Python](storage-blob-delete-python.md)
> - [Go](storage-blob-delete-go.md)

This article shows how to delete blobs with the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage), and how to restore [soft-deleted](soft-delete-blob-overview.md) blobs during the retention period.


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

The authorization mechanism must have the necessary permissions to delete a blob, or to restore a soft-deleted blob. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Delete Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/delete-blob#authorization) and [Undelete Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/undelete-blob#authorization).

## Delete a blob


> **Note:**
> When blob soft delete is enabled for a storage account, you can't perform a permanent deletion using client library methods. Using the methods in this article, a soft-deleted blob, blob version, or snapshot remains available until the retention period expires, at which time it's permanently deleted. To learn more about the underlying REST API operation, see [Delete Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/delete-blob).

To delete a blob, call any of the following methods:

- [Delete](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.delete)
- [DeleteAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.deleteasync)
- [DeleteIfExists](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.deleteifexists)
- [DeleteIfExistsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.deleteifexistsasync)

The following example deletes a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DeleteBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete.md)

If the blob has any associated snapshots, you must delete all of its snapshots to delete the blob. The following example deletes a blob and its snapshots:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DeleteBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete.md)

To delete *only* the snapshots and not the blob itself, you can pass the parameter `DeleteSnapshotsOption.OnlySnapshots`.

When a container is deleted, you can't create a container with the same name for at least 30 seconds. The container might not be available for more than 30 seconds if the service is still processing the request. While the container is being deleted, attempts to create a container of the same name generate a conflict and fail with status code 409. The service indicates that the container is being deleted. All other operations, including operations on any blobs within the container, fail with status code 404 (Not Found) while the container is being deleted.

## Restore a deleted blob

Blob soft delete protects an individual blob and its versions, snapshots, and metadata from accidental deletes or overwrites by maintaining the deleted data in the system for a specified period of time. During the retention period, you can restore the blob to its state at deletion. After the retention period has expired, the blob is permanently deleted. For more information about blob soft delete, see [Soft delete for blobs](soft-delete-blob-overview.md).

You can use the Azure Storage client libraries to restore a soft-deleted blob or snapshot. 

How you restore a soft-deleted blob depends on whether or not your storage account has blob versioning enabled. For more information on blob versioning, see [Blob versioning](versioning-overview.md). See one of the following sections, depending on your scenario:

- [Blob versioning is not enabled](#restore-soft-deleted-objects-when-versioning-is-disabled)
- [Blob versioning is enabled](#restore-soft-deleted-blobs-when-versioning-is-enabled)

#### Restore soft-deleted objects when versioning is disabled

To restore deleted blobs when versioning is not enabled, call either of the following methods:

- [Undelete](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.undelete)
- [UndeleteAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.undeleteasync)

These methods restore soft-deleted blobs and any deleted snapshots associated with them. Calling either of these methods for a blob that has not been deleted has no effect. The following example restores  all soft-deleted blobs and their snapshots in a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DeleteBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete.md)

To restore a specific soft-deleted snapshot, first call the [Undelete](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.undelete) or [UndeleteAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.undeleteasync) on the base blob, then copy the desired snapshot over the base blob. The following example restores a block blob to the most recently generated snapshot:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DeleteBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete.md)

#### Restore soft-deleted blobs when versioning is enabled

If a storage account is configured to enable blob versioning, deleting a blob causes the current version of the blob to become the previous version. To restore a soft-deleted blob when versioning is enabled, copy a previous version over the base blob. You can use either of the following methods:

- [StartCopyFromUri](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.startcopyfromuri)
- [StartCopyFromUriAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.startcopyfromuriasync)

The following code example shows how to get the latest version of a deleted blob, and restore the latest version by copying it to the base blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/DeleteBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-delete.md)

## Resources

To learn more about how to delete blobs and restore deleted blobs using the Azure Blob Storage client library for .NET, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/dotnet/BlobDevGuideBlobs/DeleteBlob.cs)

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods for deleting blobs and restoring deleted blobs use the following REST API operations:

- [Delete Blob](https://learn.microsoft.com/rest/api/storageservices/delete-blob) (REST API)
- [Undelete Blob](https://learn.microsoft.com/rest/api/storageservices/undelete-blob) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Soft delete for blobs](soft-delete-blob-overview.md)
- [Blob versioning](versioning-overview.md)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
