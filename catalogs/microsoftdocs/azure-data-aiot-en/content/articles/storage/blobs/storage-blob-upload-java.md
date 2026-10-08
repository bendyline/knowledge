---
title: Upload a blob with Java
titleSuffix: Azure Storage
description: Learn how to upload a blob to your Azure Storage account using the Java client library.
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 03/25/2025
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to upload block blobs to Azure Storage using the Java client library, so that I can efficiently manage and store data in my cloud applications.
---

# Upload a block blob with Java


> 
>
> - [.NET](storage-blob-upload.md)
> - [Java](storage-blob-upload-java.md)
> - [JavaScript](storage-blob-upload-javascript.md)
> - [Python](storage-blob-upload-python.md)
> - [Go](storage-blob-upload-go.md)

This article shows how to upload a block blob using the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme). You can upload data to a block blob from a file path, a stream, a binary object, or a text string. You can also upload blobs with index tags.


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to upload a blob. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Put Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-blob#authorization) and [Put Block (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-block#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).



## Upload data to a block blob

To upload a block blob from a stream or a binary object, use the following method:

- [upload](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient)

To upload a block blob from a file path, use the following method:

- [uploadFromFile](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient)

Each of these methods can be called using a [BlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient) object or a [BlockBlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blockblobclient) object.

> **Note:**
> The Azure Storage client libraries don't support concurrent writes to the same blob. If your app requires multiple processes writing to the same blob, you should implement a strategy for concurrency control to provide a predictable experience. To learn more about concurrency strategies, see [Manage concurrency in Blob Storage](concurrency-manage.md).

## Upload a block blob from a local file path

The following example uploads a file to a block blob using a `BlobClient` object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

## Upload a block blob from a stream

The following example uploads a block blob by creating a `ByteArrayInputStream` object, then uploading that stream object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

## Upload a block blob from a BinaryData object

The following example uploads `BinaryData` to a block blob using a `BlobClient` object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

## Upload a block blob with configuration options

You can define client library configuration options when uploading a blob. These options can be tuned to improve performance, enhance reliability, and optimize costs. The following code examples show how to use [BlobUploadFromFileOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobuploadfromfileoptions) to define configuration options when calling an upload method. If you're not uploading from a file, you can set similar options using [BlobParallelUploadOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobparalleluploadoptions) on an upload method.

### Specify data transfer options on upload

You can configure values in [ParallelTransferOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.paralleltransferoptions) to improve performance for data transfer operations. The following values can be tuned for uploads based on the needs of your app:

- `blockSize`: The maximum block size to transfer for each request. You can set this value by using the [setBlockSizeLong](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.paralleltransferoptions#com-azure-storage-blob-models-paralleltransferoptions-setblocksizelong\(java-lang-long\)) method.
- `maxSingleUploadSize`: If the size of the data is less than or equal to this value, it's uploaded in a single put rather than broken up into chunks. If the data is uploaded in a single shot, the block size is ignored. You can set this value by using the [setMaxSingleUploadSizeLong](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.paralleltransferoptions#com-azure-storage-blob-models-paralleltransferoptions-setmaxsingleuploadsizelong\(java-lang-long\)) method.
- `maxConcurrency`: The maximum number of parallel requests issued at any given time as a part of a single parallel transfer. You can set this value by using the [setMaxConcurrency](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.paralleltransferoptions#com-azure-storage-blob-models-paralleltransferoptions-setmaxconcurrency\(java-lang-integer\)) method.

Make sure you have the following `import` directive to use `ParallelTransferOptions` for an upload:

```java
import com.azure.storage.blob.models.*;
```

The following code example shows how to set values for [ParallelTransferOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.paralleltransferoptions) and include the options as part of a [BlobUploadFromFileOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobuploadfromfileoptions) instance. The values provided in this sample aren't intended to be a recommendation. To properly tune these values, you need to consider the specific needs of your app.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

To learn more about tuning data transfer options, see [Performance tuning for uploads and downloads with Java](storage-blobs-tune-upload-download-java.md).

### Upload a block blob with index tags

Blob index tags categorize data in your storage account using key-value tag attributes. These tags are automatically indexed and exposed as a searchable multi-dimensional index to easily find data.

The following example uploads a block blob with index tags set using [BlobUploadFromFileOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobuploadfromfileoptions):

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

### Set a blob's access tier on upload

You can set a blob's access tier on upload by using the [BlobUploadFromFileOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobuploadfromfileoptions) class. The following code example shows how to set the access tier when uploading a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

Setting the access tier is only allowed for block blobs. You can set the access tier for a block blob to `Hot`, `Cool`, `Cold`, or `Archive`. To set the access tier to `Cold`, you must use a minimum [client library](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme) version of 12.21.0.

To learn more about access tiers, see [Access tiers overview](access-tiers-overview.md).

## Upload a block blob by staging blocks and committing

You can have greater control over how to divide uploads into blocks by manually staging individual blocks of data. When all of the blocks that make up a blob are staged, you can commit them to Blob Storage. You can use this approach to enhance performance by uploading blocks in parallel. 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-java.md)

## Resources

To learn more about uploading blobs using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods for uploading blobs use the following REST API operations:

- [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) (REST API)
- [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

### See also

- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
