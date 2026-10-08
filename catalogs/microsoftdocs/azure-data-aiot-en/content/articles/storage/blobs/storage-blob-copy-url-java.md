---
title: Copy a blob from a source object URL with Java
titleSuffix: Azure Storage
description: Learn how to copy a blob from a source object URL in Azure Storage by using the Java client library.
author: stevenmatthew

ms.author: shaas
ms.date: 08/26/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: "As a developer using Java, I want to copy a blob from a source object URL to Azure Blob Storage, so that I can easily manage and transfer data between different storage accounts or accessible external sources."
---

# Copy a blob from a source object URL with Java


> 
>
> - [.NET](storage-blob-copy-url-dotnet.md)
> - [Java](storage-blob-copy-url-java.md)
> - [JavaScript](storage-blob-copy-url-javascript.md)
> - [Python](storage-blob-copy-url-python.md)
> - [Go](storage-blob-copy-url-go.md)

This article shows how to copy a blob from a source object URL using the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme). You can copy a blob from a source within the same storage account, from a source in a different storage account, or from any accessible object retrieved via HTTP GET request on a given URL.

The client library methods covered in this article use the [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) and [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) REST API operations. These methods are preferred for copy scenarios where you want to move data into a storage account and have a URL for the source object. For copy operations where you want asynchronous scheduling, see [Copy a blob with asynchronous scheduling using Java](storage-blob-copy-async-java.md).


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobCopyPutFromURL.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to perform a copy operation. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Put Blob From URL (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url#authorization) or [Put Block From URL (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).




## About copying blobs from a source object URL

The `Put Blob From URL` operation creates a new block blob where the contents of the blob are read from a given URL. The operation completes synchronously.

The source can be any object retrievable via a standard HTTP GET request on the given URL. This includes block blobs, append blobs, page blobs, blob snapshots, blob versions, or any accessible object inside or outside Azure.

When source object is a block blob, all committed blob content is copied. However, the block list isn't preserved, and uncommitted blocks aren't copied. The content of the destination blob is identical to that of the source, but the committed block list isn't preserved.

The destination is always a block blob, either an existing block blob, or a new block blob created by the operation. The contents of an existing blob are overwritten with the contents of the new blob.

The `Put Blob From URL` operation always copies the entire source blob. Copying a range of bytes or set of blocks isn't supported. To perform partial updates to a block blob’s contents by using a source URL, use the [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) API along with [Put Block List](https://learn.microsoft.com/rest/api/storageservices/put-block-list).

To learn more about the `Put Blob From URL` operation, including blob size limitations and billing considerations, see [Put Blob From URL remarks](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url#remarks).

## Copy a blob from a source object URL

This section gives an overview of methods provided by the Azure Storage client library for Java to perform a copy operation from a source object URL.

The following methods wrap the [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) REST API operation, and create a new block blob where the contents of the blob are read from a given URL:

- [uploadFromUrl](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blockblobclient#method-details)
- [uploadFromUrlWithResponse](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blockblobclient#method-details)

These methods are preferred for scenarios where you want to move data into a storage account and have a URL for the source object.

For large objects, you can work with individual blocks. The following method wraps the [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) REST API operation. This method creates a new block to be committed as part of a blob where the contents are read from a source URL:

- [stageBlockFromUrl](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blockblobclient#method-details)

## Copy a blob from a source within Azure

If you're copying a blob from a source within Azure, access to the source blob can be authorized via Microsoft Entra ID, a shared access signature (SAS), or an account key. 

The following example shows a scenario for copying from a source blob within Azure. The [uploadFromUrl](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blockblobclient#method-details) method can optionally accept a Boolean parameter to indicate whether an existing blob should be overwritten, as shown in the example.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobCopyPutFromURL.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-java.md)

The [uploadFromUrlWithResponse](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blockblobclient#method-details) method can also accept a [BlobUploadFromUrlOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobuploadfromurloptions) parameter to specify further options for the operation.

## Copy a blob from an external source

You can perform a copy operation on any source object that can be retrieved via HTTP GET request on a given URL, including accessible objects outside of Azure. The following example shows a scenario for copying a blob from an accessible source object URL.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobCopyPutFromURL.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-copy-url-java.md)

## Resources

To learn more about copying blobs using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobCopyPutFromURL.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods covered in this article use the following REST API operations:

- [Put Blob From URL](https://learn.microsoft.com/rest/api/storageservices/put-blob-from-url) (REST API)
- [Put Block From URL](https://learn.microsoft.com/rest/api/storageservices/put-block-from-url) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
