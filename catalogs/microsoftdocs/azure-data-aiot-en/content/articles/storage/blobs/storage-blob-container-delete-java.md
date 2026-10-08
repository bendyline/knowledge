---
title: Delete and restore a blob container with Java
titleSuffix: Azure Storage
description: Learn how to delete and restore a blob container in your Azure Storage account using the Java client library.
services: storage
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to delete and restore blob containers using the Azure Storage client library, so that I can efficiently manage container lifecycle and recover from accidental deletions.
---

# Delete and restore a blob container with Java


> 
>
> - [.NET](storage-blob-container-delete.md)
> - [Java](storage-blob-container-delete-java.md)
> - [JavaScript](storage-blob-container-delete-javascript.md)
> - [Python](storage-blob-container-delete-python.md)
> - [Go](storage-blob-container-delete-go.md)

This article shows how to delete containers with the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme). If you've enabled [container soft delete](soft-delete-container-overview.md), you can restore deleted containers.


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerDelete.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to delete or restore a container. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Delete Container (REST API)](https://learn.microsoft.com/rest/api/storageservices/delete-container#authorization) and [Restore Container (REST API)](https://learn.microsoft.com/rest/api/storageservices/restore-container#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).



## Delete a container

To delete a container in Java, use one of the following methods from the `BlobServiceClient` class:

- [deleteBlobContainer](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient)
- [deleteBlobContainerIfExists](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient)

You can also delete a container using one of the following methods from the `BlobContainerClient` class:

- [delete](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient)
- [deleteIfExists](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient)

After you delete a container, you can't create a container with the same name for *at least* 30 seconds. Attempting to create a container with the same name will fail with HTTP error code `409 (Conflict)`. Any other operations on the container or the blobs it contains will fail with HTTP error code `404 (Not Found)`.

The following example uses a `BlobServiceClient` object to delete the specified container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerDelete.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-java.md)

The following example shows how to delete all containers that start with a specified prefix:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerDelete.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-java.md)

## Restore a deleted container

When container soft delete is enabled for a storage account, a deleted container and its contents may be recovered within a specified retention period. To learn more about container soft delete, see [Enable and manage soft delete for containers](soft-delete-container-enable.md). You can restore a soft-deleted container by calling the following method of the `BlobServiceClient` class:

- [undeleteBlobContainer](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient)

The following example finds a deleted container, gets the version of that deleted container, and then passes the version into the `undeleteBlobContainer` method to restore the container.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerDelete.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-delete-java.md)

## Resources

To learn more about deleting a container using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerDelete.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods for deleting or restoring a container use the following REST API operations:

- [Delete Container](https://learn.microsoft.com/rest/api/storageservices/delete-container) (REST API)
- [Restore Container](https://learn.microsoft.com/rest/api/storageservices/restore-container) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

### See also

- [Soft delete for containers](soft-delete-container-overview.md)
- [Enable and manage soft delete for containers](soft-delete-container-enable.md)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
