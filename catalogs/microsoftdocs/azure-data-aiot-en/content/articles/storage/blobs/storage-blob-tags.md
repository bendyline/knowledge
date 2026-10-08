---
title: Use blob index tags to manage and find data with .NET
titleSuffix: Azure Storage
description: Learn how to categorize, manage, and query for blob objects by using the .NET client library.  
services: storage
author: stevenmatthew
ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: "As a .NET developer, I want to implement blob index tags to categorize and query data, so that I can efficiently manage and retrieve information from Azure Blob Storage."
---

# Use blob index tags to manage and find data with .NET


> 
>
> - [.NET](storage-blob-tags.md)
> - [Java](storage-blob-tags-java.md)
> - [JavaScript](storage-blob-tags-javascript.md)
> - [Python](storage-blob-tags-python.md)
> - [Go](storage-blob-tags-go.md)

This article shows how to use blob index tags to manage and find data using the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage).


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

The authorization mechanism must have the necessary permissions to work with blob index tags. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Owner** or higher. To learn more, see the authorization guidance for [Get Blob Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags#authorization), [Set Blob Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags#authorization), or [Find Blobs by Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags#authorization).


## About blob index tags

Blob index tags categorize data in your storage account using key-value tag attributes. These tags are automatically indexed and exposed as a searchable multi-dimensional index to easily find data. This article shows you how to set, get, and find data using blob index tags.

Blob index tags aren't supported for storage accounts with hierarchical namespace enabled. To learn more about the blob index tag feature along with known issues and limitations, see [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md).

## Set tags


You can set index tags if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/write](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to access the blob's tags (`t` permission)
- Account key

For more information, see [Setting blob index tags](storage-manage-find-blobs.md#setting-blob-index-tags).

You can set tags by using either of the following methods:

- [SetTags](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.settags)
- [SetTagsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.settagsasync)

The following example performs this task.

```csharp
public static async Task SetTags(BlobClient blobClient)
{
    Dictionary<string, string> tags = 
        new Dictionary<string, string>
    {
        { "Sealed", "false" },
        { "Content", "image" },
        { "Date", "2020-04-20" }
    };

    await blobClient.SetTagsAsync(tags);
}

```

You can delete all tags by passing an empty [Dictionary] into the [SetTags](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.settags) or [SetTagsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.settagsasync) method as shown in the following example.

```csharp   
Dictionary<string, string> noTags = new Dictionary<string, string>();
await blobClient.SetTagsAsync(noTags);
```

| Related articles |
| --- |
| [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md) |
| [Set Blob Tags](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags) (REST API) |

## Get tags


You can get index tags if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/read](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to access the blob's tags (`t` permission)
- Account key

For more information, see [Getting and listing blob index tags](storage-manage-find-blobs.md#getting-and-listing-blob-index-tags).

You can get tags by using either of the following methods: 

- [GetTags](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.gettags)
- [GetTagsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.gettagsasync)

The following example performs this task.

```csharp
public static async Task GetTags(BlobClient blobClient)
{
    Response<GetBlobTagResult> tagsResponse = await blobClient.GetTagsAsync();

    foreach (KeyValuePair<string, string> tag in tagsResponse.Value.Tags)
    {
        Console.WriteLine($"{tag.Key}={tag.Value}");
    }
}

```

## Filter and find data with blob index tags


You can use index tags to find and filter data if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/filter/action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to filter blobs by tags (`f` permission)
- Account key

For more information, see [Finding data using blob index tags](storage-manage-find-blobs.md#finding-data-using-blob-index-tags).

> **Note:**
> You can't use index tags to retrieve previous versions. Tags for previous versions aren't passed to the blob index engine. For more information, see [Conditions and known issues](storage-manage-find-blobs.md#conditions-and-known-issues).

You can find data by using either of the following methods: 

- [FindBlobsByTags](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient.findblobsbytags)
- [FindBlobsByTagsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient.findblobsbytagsasync)

The following example finds all blobs tagged with a date that falls between a specific range.

```csharp
public static async Task FindBlobsbyTags(BlobServiceClient serviceClient)
{
    string query = @"""Date"" >= '2020-04-20' AND ""Date"" <= '2020-04-30'";

    // Find Blobs given a tags query
    Console.WriteLine("Find Blob by Tags query: " + query + Environment.NewLine);

    List<TaggedBlobItem> blobs = new List<TaggedBlobItem>();
    await foreach (TaggedBlobItem taggedBlobItem in serviceClient.FindBlobsByTagsAsync(query))
    {
        blobs.Add(taggedBlobItem);
    }

    foreach (var filteredBlob in blobs)
    {
        
        Console.WriteLine($"BlobIndex result: ContainerName= {filteredBlob.BlobContainerName}, " +
            $"BlobName= {filteredBlob.BlobName}");
    }

}

```

## Resources

To learn more about how to use index tags to manage and find data using the Azure Blob Storage client library for .NET, see the following resources.

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods for managing and using blob index tags use the following REST API operations:

- [Get Blob Tags](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags) (REST API)
- [Set Blob Tags](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags) (REST API)
- [Find Blobs by Tags](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
