---
title: Create and manage container leases with Java
titleSuffix: Azure Storage
description: Learn how to manage a lock on a container in your Azure Storage account using the Java client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: "As a Java developer, I want to create and manage container leases using the Azure Storage client library, so that I can control access and modifications to my storage resources effectively."
---

# Create and manage container leases with Java


> 
>
> - [.NET](storage-blob-container-lease.md)
> - [Java](storage-blob-container-lease-java.md)
> - [JavaScript](storage-blob-container-lease-javascript.md)
> - [Python](storage-blob-container-lease-python.md)

This article shows how to create and manage container leases using the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme). You can use the client library to acquire, renew, release, and break container leases.


## Prerequisites

- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure storage account - [create a storage account](../common/storage-account-create.md)
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 8 or later (we recommend version 17 for the best experience)
- [Apache Maven](https://maven.apache.org/download.cgi) is used for project management in this example

## Set up your environment


If you don't have an existing project, this section shows you how to set up a project to work with the Azure Blob Storage client library for Java. For more information, see [Get started with Azure Blob Storage and Java](storage-blob-java-get-started.md).

To work with the code examples in this article, follow these steps to set up your project.

> **Note:**
> This article uses the Maven build tool to build and run the example code. Other build tools, such as Gradle, also work with the Azure SDK for Java.

#### Install packages

Open the `pom.xml` file in your text editor. Install the packages by [including the BOM file](storage-blob-java-get-started.md#include-the-bom-file), or [including a direct dependency](storage-blob-java-get-started.md#include-a-direct-dependency).


#### Add import statements

Add the following `import` statements:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerLease.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-lease-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to work with a container lease. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Lease Container (REST API)](https://learn.microsoft.com/rest/api/storageservices/lease-container#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-lease-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).



## About container leases


A lease establishes and manages a lock on a container for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. A lease on a container provides exclusive delete access to the container. A container lease only controls the ability to delete the container using the [Delete Container](https://learn.microsoft.com/rest/api/storageservices/delete-container) REST API operation. To delete a container with an active lease, a client must include the active lease ID with the delete request. All other container operations succeed on a leased container without the lease ID. If you've enabled [container soft delete](soft-delete-container-overview.md), you can restore deleted containers.

To learn more about lease states and when you can perform a given action on a lease, see [Lease states and actions](#lease-states-and-actions).

Lease operations are handled by the [BlobLeaseClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobleaseclient) class, which provides a client containing all lease operations for blobs and containers. To learn more about blob leases using the client library, see [Create and manage blob leases with Java](storage-blob-lease-java.md).

## Acquire a lease

When you acquire a container lease, you obtain a lease ID that your code can use to operate on the container. If the container already has an active lease, you can only request a new lease by using the active lease ID. However, you can specify a new lease duration.

To acquire a lease, create an instance of the [BlobLeaseClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobleaseclient) class, and then use the following method:

- [acquireLease](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobleaseclient)

The following example acquires a 30-second lease for a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerLease.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-lease-java.md)

## Renew a lease

You can renew a container lease if the lease ID specified on the request matches the lease ID associated with the container. The lease can be renewed even if it has expired, as long as the container hasn't been leased again since the expiration of that lease. When you renew a lease, the duration of the lease resets.

To renew an existing lease, use the following method:

- [renewLease](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobleaseclient)

The following example renews a lease for a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerLease.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-lease-java.md)

## Release a lease

You can release a container lease if the lease ID specified on the request matches the lease ID associated with the container. Releasing a lease allows another client to acquire a lease for the container immediately after the release is complete.

You can release a lease by using the following method:

- [releaseLease](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobleaseclient)

The following example releases the lease on a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerLease.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-lease-java.md)

## Break a lease

You can break a container lease if the container has an active lease. Any authorized request can break the lease; the request isn't required to specify a matching lease ID. A lease can't be renewed after it's broken, and breaking a lease prevents a new lease from being acquired for a period of time until the original lease expires or is released.

You can break a lease by using the following method:

- [breakLease](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobleaseclient)

The following example breaks the lease on a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerLease.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-lease-java.md)


## Lease states and actions

The following diagram shows the five states of a lease, and the commands or events that cause lease state changes.

A diagram showing container lease states and state change triggers.

The following table lists the five lease states, gives a brief description of each, and lists the lease actions allowed in a given state. These lease actions cause state transitions, as shown in the diagram.
  
| Lease state | Description | Lease actions allowed |
| --- | --- | --- |
| **Available** | The lease is unlocked and can be acquired. | `acquire` |
| **Leased** | The lease is locked. | `acquire` (same lease ID only), `renew`, `change`, `release`, and `break` |
| **Expired** | The lease duration has expired. | `acquire`, `renew`, `release`, and `break` |
| **Breaking** | The lease has been broken, but the lease will continue to be locked until the break period has expired. | `release` and `break` |
| **Broken** | The lease has been broken, and the break period has expired. | `acquire`, `release`, and `break` |

When a lease expires, the lease ID is maintained by the Blob service until the container is modified or leased again. A client may attempt to renew or release the lease using the expired lease ID. If the request fails, the client knows that the container was leased again, or the container was deleted since the lease was last active.

If a lease expires rather than being explicitly released, a client may need to wait up to one minute before a new lease can be acquired for the container. However, the client can renew the lease with the expired lease ID immediately.

## Resources

To learn more about leasing a container using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerLease.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods for leasing a container use the following REST API operation:

- [Lease Container](https://learn.microsoft.com/rest/api/storageservices/lease-container) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

## See also

- [Managing Concurrency in Blob storage](concurrency-manage.md)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
