---
title: Use .NET to manage properties and metadata for a blob container
titleSuffix: Azure Storage
description: Learn how to set and retrieve system properties and store custom metadata on blob containers in your Azure Storage account using the .NET client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: As a .NET developer, I want to manage properties and custom metadata for blob containers, so that I can efficiently control additional data attributes and enhance data organization in my Azure Storage account.
---

# Manage container properties and metadata with .NET


> 
>
> - [.NET](storage-blob-container-properties-metadata.md)
> - [Java](storage-blob-container-properties-metadata-java.md)
> - [JavaScript](storage-blob-container-properties-metadata-javascript.md)
> - [Python](storage-blob-container-properties-metadata-python.md)
> - [Go](storage-blob-container-properties-metadata-go.md)

Blob containers support system properties and user-defined metadata, in addition to the data they contain. This article shows how to manage system properties and user-defined metadata with the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage).


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

The authorization mechanism must have the necessary permissions to work with container properties or metadata. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Reader** or higher for the *get* operations, and **Storage Blob Data Contributor** or higher for the *set* operations. To learn more, see the authorization guidance for [Get Container Properties (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-container-properties#authorization), [Set Container Metadata (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-container-metadata#authorization), or [Get Container Metadata (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-container-metadata#authorization).

## About properties and metadata

- **System properties**: System properties exist on each Blob storage resource. Some of them can be read or set, while others are read-only. Under the covers, some system properties correspond to certain standard HTTP headers. The Azure Storage client library for .NET maintains these properties for you.

- **User-defined metadata**: User-defined metadata consists of one or more name-value pairs that you specify for a Blob storage resource. You can use metadata to store additional values with the resource. Metadata values are for your own purposes only, and do not affect how the resource behaves.

    Metadata name/value pairs are valid HTTP headers and should adhere to all restrictions governing HTTP headers. For more information about metadata naming requirements, see [Metadata names](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#metadata-names).

## Retrieve container properties

To retrieve container properties, call one of the following methods:

- [GetProperties](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.getproperties)
- [GetPropertiesAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.getpropertiesasync)

The following code example fetches a container's system properties and writes some property values to a console window:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Metadata.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata.md)

## Set and retrieve metadata

You can specify metadata as one or more name-value pairs on a blob or container resource. To set metadata, add name-value pairs to an [IDictionary](https://learn.microsoft.com/dotnet/api/system.collections.idictionary) object, and then call one of the following methods to write the values:

- [SetMetadata](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.setmetadata)
- [SetMetadataAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.setmetadataasync)

The following code example sets metadata on a container.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Metadata.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata.md)

To retrieve metadata, call one of the following methods:

- [GetProperties](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.getproperties)
- [GetPropertiesAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.getpropertiesasync)

Then, read the values, as shown in the example below.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Metadata.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata.md)

## Resources

To learn more about setting and retrieving container properties and metadata using the Azure Blob Storage client library for .NET, see the following resources.

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods for setting and retrieving properties and metadata use the following REST API operations:

- [Get Container Properties](https://learn.microsoft.com/rest/api/storageservices/get-container-properties) (REST API)
- [Set Container Metadata](https://learn.microsoft.com/rest/api/storageservices/set-container-metadata) (REST API)
- [Get Container Metadata](https://learn.microsoft.com/rest/api/storageservices/get-container-metadata) (REST API)

The `GetProperties` and `GetPropertiesAsync` methods retrieve container properties and metadata by calling both the [Get Blob Properties](https://learn.microsoft.com/rest/api/storageservices/get-blob-properties) operation and the [Get Blob Metadata](https://learn.microsoft.com/rest/api/storageservices/get-blob-metadata) operation.


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
