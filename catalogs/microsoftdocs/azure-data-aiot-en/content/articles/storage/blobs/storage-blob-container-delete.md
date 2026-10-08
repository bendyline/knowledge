---
title: Delete and restore a blob container with .NET
titleSuffix: Azure Storage 
description: Learn how to delete and restore a blob container in your Azure Storage account using the .NET client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024

ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: "As a .NET developer, I want to delete and restore blob containers in Azure Storage, so that I can efficiently manage my cloud data while ensuring recovery options are available when needed."
---

# Delete and restore a blob container with .NET


> 
>
> - [.NET](storage-blob-container-delete.md)
> - [Java](storage-blob-container-delete-java.md)
> - [JavaScript](storage-blob-container-delete-javascript.md)
> - [Python](storage-blob-container-delete-python.md)
> - [Go](storage-blob-container-delete-go.md)

This article shows how to delete containers with the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage). If you've enabled [container soft delete](soft-delete-container-overview.md), you can restore deleted containers.


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

The authorization mechanism must have the necessary permissions to delete or restore a container. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Delete Container (REST API)](https://learn.microsoft.com/rest/api/storageservices/delete-container#authorization) and [Restore Container (REST API)](https://learn.microsoft.com/rest/api/storageservices/restore-container#authorization).

## Delete a container

To delete a container in .NET, use one of the following methods:

- [Delete](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.delete)
- [DeleteAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.deleteasync)
- [DeleteIfExists](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.deleteifexists)
- [DeleteIfExistsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.deleteifexistsasync)

The **Delete** and **DeleteAsync** methods throw an exception if the container doesn't exist.

The **DeleteIfExists** and **DeleteIfExistsAsync** methods return a Boolean value indicating whether the container was deleted. If the specified container doesn't exist, then these methods return **False** to indicate that the container wasn't deleted.

After you delete a container, you can't create a container with the same name for at *least* 30 seconds. Attempting to create a container with the same name will fail with HTTP error code 409 (Conflict). Any other operations on the container or the blobs it contains will fail with HTTP error code 404 (Not Found).

The following example deletes the specified container, and handles the exception if the container doesn't exist:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Containers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete.md)

The following example shows how to delete all of the containers that start with a specified prefix.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Containers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete.md)

## Restore a deleted container

When container soft delete is enabled for a storage account, a container and its contents may be recovered after it has been deleted, within a retention period that you specify. You can restore a soft-deleted container by calling either of the following methods of the [BlobServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient) class.

- [UndeleteBlobContainer](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient.undeleteblobcontainer)
- [UndeleteBlobContainerAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient.undeleteblobcontainerasync)

The following example finds a deleted container, gets the version ID of that deleted container, and then passes that ID into the [UndeleteBlobContainerAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient.undeleteblobcontainerasync) method to restore the container.

```csharp
public static async Task RestoreContainer(BlobServiceClient client, string containerName)
{
    await foreach (BlobContainerItem item in client.GetBlobContainersAsync
        (BlobContainerTraits.None, BlobContainerStates.Deleted))
    {
        if (item.Name == containerName && (item.IsDeleted == true))
        {
            try 
            { 
                await client.UndeleteBlobContainerAsync(containerName, item.VersionId);
            }
            catch (RequestFailedException e)
            {
                Console.WriteLine("HTTP error code {0}: {1}",
                e.Status, e.ErrorCode);
                Console.WriteLine(e.Message);
            }
        }
    }
}
```

## Resources

To learn more about deleting a container using the Azure Blob Storage client library for .NET, see the following resources.

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods for deleting or restoring a container use the following REST API operations:

- [Delete Container](https://learn.microsoft.com/rest/api/storageservices/delete-container) (REST API)
- [Restore Container](https://learn.microsoft.com/rest/api/storageservices/restore-container) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Soft delete for containers](soft-delete-container-overview.md)
- [Enable and manage soft delete for containers](soft-delete-container-enable.md)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
