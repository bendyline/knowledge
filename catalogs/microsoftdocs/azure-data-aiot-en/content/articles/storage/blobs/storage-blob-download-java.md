---
title: Download a blob with Java
titleSuffix: Azure Storage
description: Learn how to download a blob in Azure Storage by using the Java client library.
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to download blobs from Azure Storage using the Java client library, so that I can manage and retrieve data effectively for my applications.
---

# Download a blob with Java


> 
>
> - [.NET](storage-blob-download.md)
> - [Java](storage-blob-download-java.md)
> - [JavaScript](storage-blob-download-javascript.md)
> - [Python](storage-blob-download-python.md)
> - [Go](storage-blob-download-go.md)

This article shows how to download a blob using the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme). You can download blob data to various destinations, including a local file path, stream, or text string. You can also open a blob stream and read from it.


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobDownload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to perform a download operation. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Reader** or higher. To learn more, see the authorization guidance for [Get Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-blob#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).



## Download a blob

You can use any of the following methods to download a blob:

- [downloadContent](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase)
- [downloadStream](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase)
- [downloadToFile](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase)
 
## Download to a file path

The following example downloads a blob to a local file path:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobDownload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-java.md)

## Download to a stream

The following example downloads a blob to an `OutputStream` object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobDownload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-java.md)

## Download to a string

The following example assumes that the blob is a text file, and downloads the blob to a `String` object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobDownload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-java.md)

## Download from a stream

The following example downloads a blob by opening a `BlobInputStream` and reading from the stream:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobDownload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-java.md)

## Download a block blob with configuration options

You can define client library configuration options when downloading a blob. These options can be tuned to improve performance and enhance reliability. The following code examples show how to use [BlobDownloadToFileOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobdownloadtofileoptions) to define configuration options when calling a download method.

### Specify data transfer options on download

You can configure values in [ParallelTransferOptions](https://learn.microsoft.com/java/api/com.azure.storage.common.paralleltransferoptions) to improve performance for data transfer operations. The following values can be tuned for downloads based on the needs of your app:

- `blockSize`: The maximum block size to transfer for each request. You can set this value by using the [setBlockSizeLong](https://learn.microsoft.com/java/api/com.azure.storage.common.paralleltransferoptions#com-azure-storage-common-paralleltransferoptions-setblocksizelong\(java-lang-long\)) method.
- `maxConcurrency`: The maximum number of parallel requests issued at any given time as a part of a single parallel transfer. You can set this value by using the [setMaxConcurrency](https://learn.microsoft.com/java/api/com.azure.storage.common.paralleltransferoptions#com-azure-storage-common-paralleltransferoptions-setmaxconcurrency\(java-lang-integer\)) method.

Add the following `import` directive to your file to use `ParallelTransferOptions` for a download:

```java
import com.azure.storage.common.*;
```

The following code example shows how to set values for `ParallelTransferOptions` and include the options as part of a `BlobDownloadToFileOptions` instance. The values provided in this sample aren't intended to be a recommendation. To properly tune these values, you need to consider the specific needs of your app.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobDownload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-download-java.md)

To learn more about tuning data transfer options, see [Performance tuning for uploads and downloads with Java](storage-blobs-tune-upload-download-java.md).

## Resources

To learn more about how to download blobs using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobDownload.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods for downloading blobs use the following REST API operation:

- [Get Blob](https://learn.microsoft.com/rest/api/storageservices/get-blob) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
