---
title: Create and manage blob leases with .NET
titleSuffix: Azure Storage
description: Learn how to manage a lock on a blob in your Azure Storage account using the .NET client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: As a .NET developer, I want to manage blob leases using the Azure Storage client library, so that I can control access to blobs and ensure data consistency during concurrent operations.
---

# Create and manage blob leases with .NET


> 
>
> - [.NET](storage-blob-lease.md)
> - [Java](storage-blob-lease-java.md)
> - [JavaScript](storage-blob-lease-javascript.md)
> - [Python](storage-blob-lease-python.md)

This article shows how to create and manage blob leases using the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage). You can use the client library to acquire, renew, release, and break blob leases.


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

The authorization mechanism must have the necessary permissions to work with a blob lease. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Lease Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/lease-blob#authorization).

## About blob leases


A lease creates and manages a lock on a blob for write and delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. A lease on a blob provides exclusive write and delete access to the blob. To write to a blob with an active lease, a client must include the active lease ID with the write request.

To learn more about lease states and when you can perform a given action on a lease, see [Lease states and actions](#lease-states-and-actions).

All container operations are permitted on a container that includes blobs with an active lease, including [Delete Container](https://learn.microsoft.com/rest/api/storageservices/delete-container). Therefore, a container may be deleted even if blobs within it have active leases. Use the [Lease Container](https://learn.microsoft.com/rest/api/storageservices/lease-container) operation to control rights to delete a container.

Lease operations are handled by the [BlobLeaseClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient) class, which provides a client containing all lease operations for blobs and containers. To learn more about container leases using the client library, see [Create and manage container leases with .NET](storage-blob-container-lease.md).

## Acquire a lease

When you acquire a blob lease, you obtain a lease ID that your code can use to operate on the blob. If the blob already has an active lease, you can only request a new lease by using the active lease ID. However, you can specify a new lease duration. 

To acquire a lease, create an instance of the [BlobLeaseClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient) class, and then use one of the following methods:

- [Acquire](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient.acquire)
- [AcquireAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient.acquireasync)

The following example acquires a 30-second lease for a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/LeaseBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-lease.md)

## Renew a lease

You can renew a blob lease if the lease ID specified on the request matches the lease ID associated with the blob. The lease can be renewed even if it has expired, as long as the blob hasn't been modified or leased again since the expiration of that lease. When you renew a lease, the duration of the lease resets.

To renew a lease, use one of the following methods on a [BlobLeaseClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient) instance:

- [Renew](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient.renew)
- [RenewAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient.renewasync)

The following example renews a lease for a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/LeaseBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-lease.md)

## Release a lease

You can release a blob lease if the lease ID specified on the request matches the lease ID associated with the blob. Releasing a lease allows another client to acquire a lease for the blob immediately after the release is complete.

You can release a lease using one of the following methods on a [BlobLeaseClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient) instance:

- [Release](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient.release)
- [ReleaseAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient.releaseasync)

The following example releases a lease on a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/LeaseBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-lease.md)

## Break a lease

You can break a blob lease if the blob has an active lease. Any authorized request can break the lease; the request isn't required to specify a matching lease ID. A lease can't be renewed after it's broken, and breaking a lease prevents a new lease from being acquired for a period of time until the original lease expires or is released.

You can break a lease using one of the following methods on a [BlobLeaseClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient) instance:

- [Break](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient.break)
- [BreakAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobleaseclient.breakasync)

The following example breaks a lease on a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/LeaseBlob.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-lease.md)


## Lease states and actions

The following diagram shows the five states of a lease, and the commands or events that cause lease state changes.

A diagram showing blob lease states and state change triggers.

The following table lists the five lease states, gives a brief description of each, and lists the lease actions allowed in a given state. These lease actions cause state transitions, as shown in the diagram.
  
| Lease state | Description | Lease actions allowed |
| --- | --- | --- |
| **Available** | The lease is unlocked and can be acquired. | `acquire` |
| **Leased** | The lease is locked. | `acquire` (same lease ID only), `renew`, `change`, `release`, and `break` |
| **Expired** | The lease duration has expired. | `acquire`, `renew`, `release`, and `break` |
| **Breaking** | The lease has been broken, but the lease will continue to be locked until the break period has expired. | `release` and `break` |
| **Broken** | The lease has been broken, and the break period has expired. | `acquire`, `release`, and `break` |

When a lease expires, the lease ID is maintained by the Blob service until the blob is modified or leased again. A client may attempt to renew or release the lease using the expired lease ID. If this operation is successful, the client knows that the blob hasn't been changed since the lease ID was last valid. If the request fails, the client knows that the blob was modified, or the blob was leased again since the lease was last active. The client must then acquire a new lease on the blob.

If a lease expires rather than being explicitly released, a client may need to wait up to one minute before a new lease can be acquired for the blob. However, the client can renew the lease with their lease ID immediately if the blob hasn't been modified.

A lease can't be granted for a blob snapshot, since snapshots are read-only. Requesting a lease against a snapshot results in status code `400 (Bad Request)`.

## Resources

To learn more about managing blob leases using the Azure Blob Storage client library for .NET, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/dotnet/BlobDevGuideBlobs/LeaseBlob.cs)

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library methods for managing blob leases use the following REST API operation:

- [Lease Blob](https://learn.microsoft.com/rest/api/storageservices/lease-blob)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Managing Concurrency in Blob storage](concurrency-manage.md)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
