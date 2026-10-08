---
title: List blob containers with Java
titleSuffix: Azure Storage
description: Learn how to list blob containers in your Azure Storage account using the Java client library.
services: storage
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to list blob containers in Azure Storage using the client library, so that I can manage and retrieve container information programmatically.
---

# List blob containers with Java


> 
>
> - [.NET](storage-blob-containers-list.md)
> - [Java](storage-blob-containers-list-java.md)
> - [JavaScript](storage-blob-containers-list-javascript.md)
> - [Python](storage-blob-containers-list-python.md)
> - [Go](storage-blob-containers-list-go.md)

When you list the containers in an Azure Storage account from your code, you can specify several options to manage how results are returned from Azure Storage. This article shows how to list containers using the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme).


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerList.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-containers-list-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to list blob containers. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [List Containers (REST API)](https://learn.microsoft.com/rest/api/storageservices/list-containers2#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-containers-list-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).



## About container listing options

When listing containers from your code, you can specify options to manage how results are returned from Azure Storage. You can specify the number of results to return in each set of results, and then retrieve the subsequent sets. You can also filter the results by a prefix, and return container metadata with the results. These options are described in the following sections.

To list containers in a storage account, call the following method:

- [listBlobContainers](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient)

This method returns an iterable of type [BlobContainerItem](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.blobcontaineritem). Containers are ordered lexicographically by name.

### Manage how many results are returned

By default, a listing operation returns up to 5000 results at a time. To return a smaller set of results, provide a nonzero value for the size of the page of results to return. You can set this value using the following method:

- [ListBlobContainersOptions.setMaxResultsPerPage](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.listblobcontainersoptions#com-azure-storage-blob-models-listblobcontainersoptions-setmaxresultsperpage\(java-lang-integer\))

The examples presented in this article show you how to return results in pages. To learn more about pagination concepts, see [Pagination with the Azure SDK for Java](https://learn.microsoft.com/azure/developer/java/sdk/pagination).

### Filter results with a prefix

To filter the list of containers, specify a string for the `prefix` parameter. The prefix string can include one or more characters. Azure Storage then returns only the containers whose names start with that prefix. You can set this value using the following method:

- [ListBlobContainersOptions.setPrefix](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.listblobcontainersoptions#com-azure-storage-blob-models-listblobcontainersoptions-setprefix\(java-lang-string\))

### Include container metadata

To include container metadata with the results, create a `BlobContainerListDetails` instance and pass `true` to the following method:

- [BlobContainerListDetails.setRetrieveMetadata](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.blobcontainerlistdetails#com-azure-storage-blob-models-blobcontainerlistdetails-setretrievemetadata\(boolean\))

Then pass the `BlobContainerListDetails` object to the following method:

- [ListBlobContainersOptions.setDetails](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.listblobcontainersoptions#com-azure-storage-blob-models-listblobcontainersoptions-setdetails\(com-azure-storage-blob-models-blobcontainerlistdetails\))

### Include deleted containers

To include soft-deleted containers with the results, create a `BlobContainerListDetails` instance and pass `true` to the following method:

- [BlobContainerListDetails.setRetrieveDeleted](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.blobcontainerlistdetails#com-azure-storage-blob-models-blobcontainerlistdetails-setretrievedeleted\(boolean\))

Then pass the `BlobContainerListDetails` object to the following method:

- [ListBlobContainersOptions.setDetails](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.listblobcontainersoptions#com-azure-storage-blob-models-listblobcontainersoptions-setdetails\(com-azure-storage-blob-models-blobcontainerlistdetails\))

## Code examples

The following example lists containers and filters the results by a specified prefix:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerList.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-containers-list-java.md)

You can also return a smaller set of results, by specifying the size of the page of results to return:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerList.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-containers-list-java.md)

## Resources

To learn more about listing containers using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerList.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods for listing containers use the following REST API operation:

- [List Containers](https://learn.microsoft.com/rest/api/storageservices/list-containers2) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

## See also

- [Enumerating Blob Resources](https://learn.microsoft.com/rest/api/storageservices/enumerating-blob-resources)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
