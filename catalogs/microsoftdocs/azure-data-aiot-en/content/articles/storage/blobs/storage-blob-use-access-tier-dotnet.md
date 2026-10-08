---
title: Set or change a blob's access tier with .NET
titleSuffix: Azure Storage 
description: Learn how to set or change a blob's access tier in your Azure Storage account using the .NET client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: As a .NET developer, I want to set or change a block blob's access tier in Azure Storage, so that I can manage data storage costs and optimize access based on my application's requirements.
---

# Set or change a block blob's access tier with .NET


> 
>
> - [.NET](storage-blob-use-access-tier-dotnet.md)
> - [Java](storage-blob-use-access-tier-java.md)
> - [JavaScript](storage-blob-use-access-tier-javascript.md)
> - [Python](storage-blob-use-access-tier-python.md)

This article shows how to set or change the access tier for a block blob using the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage). 


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

The authorization mechanism must have the necessary permissions to set a blob's access tier. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier#authorization).


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
> To set the access tier to `Cold` using .NET, you must use a minimum [client library](https://learn.microsoft.com/dotnet/api/azure.storage.blobs) version of 12.15.0.

## Set a blob's access tier during upload

You can set a blob's access tier on upload by using the [BlobUploadOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobuploadoptions) class. The following code example shows how to set the access tier when uploading a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/UploadBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-dotnet.md)

To learn more about uploading a blob with .NET, see [Upload a blob with .NET](storage-blob-upload.md).

## Change the access tier for an existing block blob

You can change the access tier of an existing block blob by using one of the following functions:

- [SetAccessTier](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.setaccesstier)
- [SetAccessTierAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.setaccesstierasync)

The following code example shows how to change the access tier for an existing blob to `Cool`:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/AccessTiers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-dotnet.md)

If you are rehydrating an archived blob, you can optionally set the `rehydratePriority` parameter to `High` or `Standard`.

## Copy a blob to a different access tier

You can change the access tier of an existing block blob by specifying an access tier as part of a copy operation. To change the access tier during a copy operation, use the [BlobCopyFromUriOptions](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobcopyfromurioptions) class and specify the [AccessTier](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobcopyfromurioptions.accesstier#azure-storage-blobs-models-blobcopyfromurioptions-accesstier) property. If you're rehydrating a blob from the archive tier using a copy operation, you can optionally set the [RehydratePriority](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.models.blobcopyfromurioptions.rehydratepriority#azure-storage-blobs-models-blobcopyfromurioptions-rehydratepriority) property to `High` or `Standard`.

The following code example shows how to rehydrate an archived blob to the `Hot` tier using a copy operation:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/AccessTiers.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-dotnet.md)

To learn more about copying a blob with .NET, see [Copy a blob with .NET](storage-blob-copy.md).

## Resources

To learn more about setting access tiers using the Azure Blob Storage client library for .NET, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/dotnet/BlobDevGuideBlobs/AccessTiers.cs)

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods for setting access tiers use the following REST API operation:

- [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Access tiers best practices](access-tiers-best-practices.md)
- [Blob rehydration from the archive tier](archive-rehydrate-overview.md)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
