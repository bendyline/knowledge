---
title: Set or change a blob's access tier with Java
titleSuffix: Azure Storage 
description: Learn how to set or change a blob's access tier in your Azure Storage account using the Java client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to set or change a blob's access tier using the Azure Storage client library, so that I can manage the storage costs and performance based on my application's requirements.
---

# Set or change a block blob's access tier with Java


> 
>
> - [.NET](storage-blob-use-access-tier-dotnet.md)
> - [Java](storage-blob-use-access-tier-java.md)
> - [JavaScript](storage-blob-use-access-tier-javascript.md)
> - [Python](storage-blob-use-access-tier-python.md)

This article shows how to set or change the access tier for a block blob using the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme). 


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobAccessTier.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-java.md)

#### Authorization

The authorization mechanism must have the necessary permissions to set a blob's access tier. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient).

The following example uses [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder) to build a `BlobServiceClient` object using `DefaultAzureCredential`, and shows how to create container and blob clients, if needed:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-java.md)

To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).




## About block blob access tiers

To manage costs for storage needs, it can be helpful to organize your data based on how frequently it's accessed and how long it needs to be retained. Azure storage offers different access tiers so that you can store your blob data in the most cost-effective manner based on how it's being used.

#### Access tiers for blob data

Azure Storage access tiers include:

- **Hot tier** - An online tier optimized for storing data that is accessed or modified frequently. The hot tier has the highest storage costs, but the lowest access costs.
- **Cool tier** - An online tier optimized for storing data that is infrequently accessed or modified. Data in the cool tier should be stored for a minimum of 30 days. The cool tier has lower storage costs and higher access costs compared to the hot tier.
- **Cold tier** - An online tier optimized for storing data that is infrequently accessed or modified. Data in the cold tier should be stored for a minimum of 90 days. The cold tier has lower storage costs and higher access costs compared to the cool tier.
- **Archive tier** - An offline tier optimized for storing data that is rarely accessed, and that has flexible latency requirements, on the order of hours. Data in the archive tier should be stored for a minimum of 180 days.

To learn more about access tiers, see [Access tiers for blob data](access-tiers-overview.md).

While a blob is in the Archive access tier, it's considered to be offline, and can't be read or modified. In order to read or modify data in an archived blob, you must first rehydrate the blob to an online tier. To learn more about rehydrating a blob from the Archive tier to an online tier, see [Blob rehydration from the Archive tier](archive-rehydrate-overview.md).

#### Restrictions

Setting the access tier is only allowed on block blobs. To learn more about restrictions on setting a block blob's access tier, see [Set Blob Tier (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier#remarks).

> **Note:**
> To set the access tier to `Cold` using Java, you must use a minimum [client library](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme) version of 12.21.0.

## Set a blob's access tier during upload

You can set a blob's access tier on upload by using the [BlobUploadFromFileOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobuploadfromfileoptions) class. The following code example shows how to set the access tier when uploading a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobUpload.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-java.md)

To learn more about uploading a blob with Java, see [Upload a blob with Java](storage-blob-upload-java.md).

## Change the access tier for an existing block blob

You can change the access tier of an existing block blob by using one of the following methods:

- [setAccessTier](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#com-azure-storage-blob-specialized-blobclientbase-setaccesstier\(com-azure-storage-blob-models-accesstier\))
- [setAccessTierWithResponse](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#method-details)

The following code example shows how to change the access tier to Cool for an existing blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobAccessTier.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-java.md)

If you're rehydrating an archived blob, use the [setAccessTierWithResponse](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#method-details) method. Set the `tier` parameter to a valid [AccessTier](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.accesstier) value of `HOT`, `COOL`, `COLD`, or `ARCHIVE`. You can optionally set the `priority` parameter to a valid [RehydratePriority](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.rehydratepriority) value `HIGH` or `STANDARD`.

The following code example shows how to rehydrate an archived blob by changing the access tier to Hot:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobAccessTier.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-java.md)

The [setAccessTierWithResponse](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#method-details) method can also accept a [BlobSetAccessTierOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobsetaccesstieroptions) parameter to specify configuration options.

## Copy a blob to a different access tier

You can change the access tier of an existing block blob by specifying an access tier as part of a copy operation. To change the access tier during a copy operation, use the [BlobBeginCopyOptions](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobbegincopyoptions) class. 

You can use the [setTier](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobbegincopyoptions#com-azure-storage-blob-options-blobbegincopyoptions-settier\(com-azure-storage-blob-models-accesstier\)) method to specify the [AccessTier](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.accesstier) value as `HOT`, `COOL`, `COLD`, or `ARCHIVE`. If you're rehydrating a blob from the archive tier using a copy operation, use the [setRehydratePriority](https://learn.microsoft.com/java/api/com.azure.storage.blob.options.blobbegincopyoptions#com-azure-storage-blob-options-blobbegincopyoptions-setrehydratepriority\(com-azure-storage-blob-models-rehydratepriority\)) method to specify the [RehydratePriority](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.rehydratepriority) value as `HIGH` or `STANDARD`.

The following code example shows how to rehydrate an archived blob to the Hot tier using a copy operation:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobAccessTier.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-java.md)

To learn more about copying a blob with Java, see [Copy a blob with Java](storage-blob-copy-java.md).

## Resources

To learn more about setting access tiers using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobAccessTier.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library methods for setting access tiers use the following REST API operation:

- [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

### See also

- [Access tiers best practices](access-tiers-best-practices.md)
- [Blob rehydration from the archive tier](archive-rehydrate-overview.md)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
