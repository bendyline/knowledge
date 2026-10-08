---
title: List blobs with Java
titleSuffix: Azure Storage
description: Learn how to list blobs in your storage account using the Azure Storage client library for Java. Code examples show how to list blobs in a flat listing, or how to list blobs hierarchically, as though they were organized into directories or folders.
services: storage
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to implement blob listing functionality using the Azure Storage client library, so that I can efficiently manage and retrieve data stored in my Azure Storage account.
---

# List blobs with Java


> 
>
> - [.NET](storage-blobs-list.md)
> - [Java](storage-blobs-list-java.md)
> - [JavaScript](storage-blobs-list-javascript.md)
> - [Python](storage-blobs-list-python.md)
> - [Go](storage-blobs-list-go.md)

This article shows how to list blobs with the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme).


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobList.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to list a blob. For authorization with Microsoft Entra ID (recommended), you need the Azure RBAC built-in role **Storage Blob Data Reader** or higher. To learn more, see the authorization guidance for [List Blobs (REST API)](https://learn.microsoft.com/rest/api/storageservices/list-blobs#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).



## About blob listing options

When you list blobs from your code, you can specify options to manage how results are returned from Azure Storage. You can specify the number of results to return in each set of results, and then retrieve the subsequent sets. You can specify a prefix to return blobs whose names begin with that character or string. And you can list blobs in a flat listing structure, or hierarchically. A hierarchical listing returns blobs as though they were organized into folders.

To list the blobs in a storage account, call one of these methods:

- [listBlobs](https://learn.microsoft.com/java/api/com.azure.storage.blob.BlobContainerClient)
- [listBlobsByHierarchy](https://learn.microsoft.com/java/api/com.azure.storage.blob.BlobContainerClient)

### Manage how many results are returned

By default, a listing operation returns up to 5000 results at a time, but you can specify the number of results that you want each listing operation to return. The examples presented in this article show you how to return results in pages. To learn more about pagination concepts, see [Pagination with the Azure SDK for Java](https://learn.microsoft.com/azure/developer/java/sdk/pagination).

### Filter results with a prefix

To filter the list of blobs, pass a string as the `prefix` parameter to [ListBlobsOptions.setPrefix(String prefix)](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.listblobsoptions). The prefix string can include one or more characters. Azure Storage then returns only the blobs whose names start with that prefix.

### Flat listing versus hierarchical listing

Blobs in Azure Storage are organized in a flat paradigm, rather than a hierarchical paradigm (like a classic file system). However, you can organize blobs into *virtual directories* in order to mimic a folder structure. A virtual directory forms part of the name of the blob and is indicated by the delimiter character.

To organize blobs into virtual directories, use a delimiter character in the blob name. The default delimiter character is a forward slash (/), but you can specify any character as the delimiter.

If you name your blobs using a delimiter, then you can choose to list blobs hierarchically. For a hierarchical listing operation, Azure Storage returns any virtual directories and blobs beneath the parent object. You can call the listing operation recursively to traverse the hierarchy, similar to how you would traverse a classic file system programmatically.

## Use a flat listing

By default, a listing operation returns blobs in a flat listing. In a flat listing, blobs aren't organized by virtual directory.

The following example lists the blobs in the specified container using a flat listing:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobList.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-java.md)

Sample output is similar to:

```console
List blobs flat:
Name: file4.txt
Name: folderA/file1.txt
Name: folderA/file2.txt
Name: folderA/folderB/file3.txt
```

You can also specify options to filter list results or show more information. The following example lists blobs with a specified prefix, and also lists deleted blobs:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobList.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-java.md)

Sample output is similar to:

```console
List blobs flat:
Page 1
Name: file4.txt, Is deleted? false
Name: file5-deleted.txt, Is deleted? true
Page 2
Name: folderA/file1.txt, Is deleted? false
Name: folderA/file2.txt, Is deleted? false
Page 3
Name: folderA/folderB/file3.txt, Is deleted? false
```

> **Note:**
> The sample output shown assumes that you have a storage account with a flat namespace. If you enable the hierarchical namespace feature for your storage account, directories aren't virtual. Instead, they're concrete, independent objects. As a result, directories appear in the list as zero-length blobs.</br></br>For an alternative listing option when working with a hierarchical namespace, see [List directory contents (Azure Data Lake Storage)](data-lake-storage-directory-file-acl-java.md#list-directory-contents).

## Use a hierarchical listing

When you call a listing operation hierarchically, Azure Storage returns the virtual directories and blobs at the first level of the hierarchy.

To list blobs hierarchically, use the following method:

- [listBlobsByHierarchy](https://learn.microsoft.com/java/api/com.azure.storage.blob.BlobContainerClient)

The following example lists the blobs in the specified container using a hierarchical listing:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobList.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-java.md)

Sample output is similar to:

```console
List blobs hierarchical:
Blob name: file4.txt
Virtual directory prefix: /folderA/
Blob name: folderA/file1.txt
Blob name: folderA/file2.txt
Virtual directory prefix: /folderA/folderB/
Blob name: folderA/folderB/file3.txt
```

> **Note:**
> Blob snapshots can't be listed in a hierarchical listing operation.

## List blobs in Apache Arrow format (preview)

> **Important:**
> Listing blobs in Apache Arrow format is currently in **PREVIEW**. This scenario requires a **beta (preview) version** of the Azure Blob Storage client library for Java (for example, `azure-storage-blob` **12.36.0-beta.1** or later preview release). Preview features are provided without a service-level agreement and aren't recommended for production workloads. Some features might not be supported, or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

This capability is built on the existing `List Blobs` API. Instead of using the default XML, it uses the compact, columnar [Apache Arrow](https://arrow.apache.org/) format as the response format on the wire. You enable it by setting a single option on the container listing call. The Java SDK decodes Apache Arrow behind the scenes and still returns the same `BlobItem` objects. This approach improves listing throughput and reduces client-side CPU when enumerating large containers. It preserves the response contract that applications rely on.

> **Warning:**
> Listing blobs in Apache Arrow format isn't supported on storage accounts that have hierarchical namespace (Azure Data Lake Storage) enabled.

To request Apache Arrow-formatted results, set the response serialization format on [ListBlobsOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.listblobsoptions?view=azure-java-preview\&preserve-view=true) to [StorageResponseSerializationFormat.ARROW](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.storageresponseserializationformat?view=azure-java-preview\&preserve-view=true) by calling `setStorageResponseSerializationFormat`, then pass the options to [BlobContainerClient.listBlobs](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient?view=azure-java-preview\&preserve-view=true). When using Apache Arrow output, you can also call `setStartFrom` and `setEndBefore` to control the range of paths returned.

The following example lists the blobs in a container and requests the results in Apache Arrow format:

```java
ListBlobsOptions options = new ListBlobsOptions()
    .setPrefix("folderA/")
    .setStorageResponseSerializationFormat(StorageResponseSerializationFormat.ARROW);

for (BlobItem blobItem : containerClient.listBlobs(options, null)) {
    System.out.println("Blob name: " + blobItem.getName());
}
```

## Resources

To learn more about how to list blobs by using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobList.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API. By using these libraries, you can interact with REST API operations through familiar Java paradigms. The client library methods for listing blobs use the following REST API operation:

- [List Blobs](https://learn.microsoft.com/rest/api/storageservices/list-blobs) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

### See also

- [Enumerating Blob Resources](https://learn.microsoft.com/rest/api/storageservices/enumerating-blob-resources)
- [Blob versioning](versioning-overview.md)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
