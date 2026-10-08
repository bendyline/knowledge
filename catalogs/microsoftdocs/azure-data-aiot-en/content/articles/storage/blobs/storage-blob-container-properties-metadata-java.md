---
title: Use Java to manage properties and metadata for a blob container
titleSuffix: Azure Storage
description: Learn how to set and retrieve system properties and store custom metadata on blob containers in your Azure Storage account using the Java client library.
services: storage
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to manage properties and metadata for blob containers, so that I can customize my storage resources and retrieve relevant information for my applications.
---

# Manage container properties and metadata with Java


> 
>
> - [.NET](storage-blob-container-properties-metadata.md)
> - [Java](storage-blob-container-properties-metadata-java.md)
> - [JavaScript](storage-blob-container-properties-metadata-javascript.md)
> - [Python](storage-blob-container-properties-metadata-python.md)
> - [Go](storage-blob-container-properties-metadata-go.md)

Blob containers support system properties and user-defined metadata, in addition to the data they contain. This article shows how to manage system properties and user-defined metadata with the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme).


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerPropertiesMetadata.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to work with container properties or metadata. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Reader** or higher for the *get* operations, and **Storage Blob Data Contributor** or higher for the *set* operations. To learn more, see the authorization guidance for [Get Container Properties (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-container-properties#authorization), [Set Container Metadata (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-container-metadata#authorization), or [Get Container Metadata (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-container-metadata#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).



## About properties and metadata

- **System properties**: System properties exist on each Blob Storage resource. Some of them can be read or set, while others are read-only. Behind the scenes, some system properties correspond to certain standard HTTP headers. The Azure Storage client library for Java maintains these properties for you.

- **User-defined metadata**: User-defined metadata consists of one or more name-value pairs that you specify for a Blob storage resource. You can use metadata to store additional values with the resource. Metadata values are for your own purposes only, and don't affect how the resource behaves.

    Metadata name/value pairs are valid HTTP headers and should adhere to all restrictions governing HTTP headers. For more information about metadata naming requirements, see [Metadata names](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#metadata-names).

## Retrieve container properties

To retrieve container properties, use the following method:

- [getProperties](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient)

The following code example fetches a container's system properties and writes the property values to a console window:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerPropertiesMetadata.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-java.md)

## Set and retrieve metadata

You can specify metadata as one or more name-value pairs on a blob or container resource. To set metadata, use the following method:

- [setMetadata](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient)

Setting container metadata overwrites all existing metadata associated with the container. It's not possible to modify an individual name-value pair.

The following code example sets metadata on a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerPropertiesMetadata.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-java.md)

To retrieve metadata, call the following method:

- [getProperties](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient)

The following example reads in metadata values: 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerPropertiesMetadata.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-container-properties-metadata-java.md)

## Resources

To learn more about setting and retrieving container properties and metadata using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-containers/src/main/java/com/blobs/devguide/containers/ContainerPropertiesMetadata.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods for setting and retrieving properties and metadata use the following REST API operations:

- [Get Container Properties](https://learn.microsoft.com/rest/api/storageservices/get-container-properties) (REST API)
- [Set Container Metadata](https://learn.microsoft.com/rest/api/storageservices/set-container-metadata) (REST API)
- [Get Container Metadata](https://learn.microsoft.com/rest/api/storageservices/get-container-metadata) (REST API)

The `getProperties` method retrieves container properties and metadata by calling both the [Get Blob Properties](https://learn.microsoft.com/rest/api/storageservices/get-blob-properties) operation and the [Get Blob Metadata](https://learn.microsoft.com/rest/api/storageservices/get-blob-metadata) operation.


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
