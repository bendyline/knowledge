---
title: Use blob index tags to manage and find data with Java
titleSuffix: Azure Storage
description: Learn how to categorize, manage, and query for blob objects by using the Java client library.  
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: "As a Java developer, I want to utilize blob index tags for managing and querying blob data, so that I can efficiently categorize and retrieve relevant data in my cloud storage solution."
---

# Use blob index tags to manage and find data with Java


> 
>
> - [.NET](storage-blob-tags.md)
> - [Java](storage-blob-tags-java.md)
> - [JavaScript](storage-blob-tags-javascript.md)
> - [Python](storage-blob-tags-python.md)
> - [Go](storage-blob-tags-go.md)

This article shows how to use blob index tags to manage and find data using the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme). 


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobPropertiesMetadataTags.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to work with blob index tags. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Owner** or higher. To learn more, see the authorization guidance for [Get Blob Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags#authorization), [Set Blob Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags#authorization), or [Find Blobs by Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).




## About blob index tags

Blob index tags categorize data in your storage account using key-value tag attributes. These tags are automatically indexed and exposed as a searchable multi-dimensional index to easily find data. This article shows you how to set, get, and find data using blob index tags.

Blob index tags aren't supported for storage accounts with hierarchical namespace enabled. To learn more about the blob index tag feature along with known issues and limitations, see [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md).

## Set tags


You can set index tags if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/write](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to access the blob's tags (`t` permission)
- Account key

For more information, see [Setting blob index tags](storage-manage-find-blobs.md#setting-blob-index-tags).

You can set tags by using the following method:

- [setTags](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase)

The specified tags in this method will replace existing tags. If old values must be preserved, they must be downloaded and included in the call to this method. The following example shows how to set tags:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobPropertiesMetadataTags.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-java.md)

You can delete all tags by passing an empty `Map` object into the `setTags` method:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobPropertiesMetadataTags.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-java.md)

## Get tags


You can get index tags if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/read](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to access the blob's tags (`t` permission)
- Account key

For more information, see [Getting and listing blob index tags](storage-manage-find-blobs.md#getting-and-listing-blob-index-tags).

You can get tags by using the following method: 

- [getTags](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase)

The following example shows how to retrieve and iterate over the blob's tags:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobPropertiesMetadataTags.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-java.md)

## Filter and find data with blob index tags


You can use index tags to find and filter data if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/filter/action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to filter blobs by tags (`f` permission)
- Account key

For more information, see [Finding data using blob index tags](storage-manage-find-blobs.md#finding-data-using-blob-index-tags).

> **Note:**
> You can't use index tags to retrieve previous versions. Tags for previous versions aren't passed to the blob index engine. For more information, see [Conditions and known issues](storage-manage-find-blobs.md#conditions-and-known-issues).

You can find data by using the following method: 

- [findBlobsByTags](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient)

The following example finds all blobs tagged as an image:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobPropertiesMetadataTags.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-java.md)

## Resources

To learn more about how to use index tags to manage and find data using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobPropertiesMetadataTags.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods for managing and using blob index tags use the following REST API operations:

- [Get Blob Tags](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags) (REST API)
- [Set Blob Tags](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags) (REST API)
- [Find Blobs by Tags](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

### See also

- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
