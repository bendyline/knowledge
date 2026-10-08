---
title: Set or change a blob's access tier with Python
titleSuffix: Azure Storage 
description: Learn how to set or change a blob's access tier in your Azure Storage account using the Python client library.
services: storage
author: stevenmatthew
ms.author: shaas

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.devlang: python
ms.custom: devx-track-python, devguide-python
# Customer intent: As a cloud developer, I want to set or change a blob's access tier using the Python client library, so that I can optimize storage costs and improve data retrieval efficiency based on access needs.
---

# Set or change a block blob's access tier with Python


> 
>
> - [.NET](storage-blob-use-access-tier-dotnet.md)
> - [Java](storage-blob-use-access-tier-java.md)
> - [JavaScript](storage-blob-use-access-tier-javascript.md)
> - [Python](storage-blob-use-access-tier-python.md)

This article shows how to set or change the access tier for a block blob using the [Azure Storage client library for Python](https://learn.microsoft.com/python/api/overview/azure/storage).

To learn about changing a blob's access tier using asynchronous APIs, see [Change a blob's access tier asynchronously](#change-a-blobs-access-tier-asynchronously).


## Prerequisites

- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure storage account - [create a storage account](../common/storage-account-create.md)
- [Python](https://www.python.org/downloads/) 3.8+

## Set up your environment


If you don't have an existing project, this section shows you how to set up a project to work with the Azure Blob Storage client library for Python. For more details, see [Get started with Azure Blob Storage and Python](storage-blob-python-get-started.md).

To work with the code examples in this article, follow these steps to set up your project.

#### Install packages

Install the following packages using `pip install`:

```console
pip install azure-storage-blob azure-identity
```



#### Add import statements

Add the following `import` statements:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_access_tiers.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-python.md)

#### Authorization

The authorization mechanism must have the necessary permissions to set a blob's access tier. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier#authorization).


#### Create a client object

To connect an app to Blob Storage, create an instance of [BlobServiceClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobserviceclient). The following example shows how to create a client object using `DefaultAzureCredential` for authorization:

```python
# TODO: Replace <storage-account-name> with your actual storage account name
account_url = "https://<storage-account-name>.blob.core.windows.net"
credential = DefaultAzureCredential()

# Create the BlobServiceClient object
blob_service_client = BlobServiceClient(account_url, credential=credential)
```

You can also create client objects for specific [containers](storage-blob-client-management.md?tabs=python#create-a-blobcontainerclient-object) or [blobs](storage-blob-client-management.md?tabs=python#create-a-blobclient-object), either directly or from the `BlobServiceClient` object. To learn more about creating and managing client objects, see [Create and manage client objects that interact with data resources](storage-blob-client-management.md).




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
> To set the access tier to `Cold` using Python, you must use a minimum [client library](https://learn.microsoft.com/python/api/azure-storage-blob) version of 12.15.0.

## Set a blob's access tier during upload

You can set a blob's access tier on upload by passing the `standard_blob_tier` keyword argument to [upload_blob](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-upload-blob) or [upload_blob_from_url](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-upload-blob-from-url).

The following code example shows how to set the access tier when uploading a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-python.md)

To learn more about uploading a blob with Python, see [Upload a blob with Python](storage-blob-upload-python.md).

## Change the access tier for an existing block blob

You can change the access tier of an existing block blob by using the following function:

- [set_standard_blob_tier](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-set-standard-blob-tier)

The following code example shows how to change the access tier for an existing blob to `Cool`:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_access_tiers.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-python.md)

If you're rehydrating an archived blob, you can optionally pass the `rehydrate_priority` keyword argument as `HIGH` or `STANDARD`.

## Copy a blob to a different access tier

You can change the access tier of an existing block blob by specifying an access tier as part of a copy operation. To change the access tier during a copy operation, pass the `standard_blob_tier` keyword argument to [start_copy_from_url](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-start-copy-from-url). If you're rehydrating a blob from the archive tier using a copy operation, you can optionally pass the `rehydrate_priority` keyword argument as `HIGH` or `STANDARD`.

The following code example shows how to rehydrate an archived blob to the `Hot` tier using a copy operation:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_access_tiers.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-python.md)

To learn more about copying a blob with Python, see [Copy a blob with Python](storage-blob-copy-python.md).

## Change a blob's access tier asynchronously

The Azure Blob Storage client library for Python supports changing a blob's access tier asynchronously. To learn more about project setup requirements, see [Asynchronous programming](storage-blob-python-get-started.md#asynchronous-programming).

Follow these steps to change a blob's access tier using asynchronous APIs:

1. Add the following import statements:

    ```python
    import asyncio

    from azure.storage.blob import (
    StandardBlobTier
    )
    from azure.identity.aio import DefaultAzureCredential
    from azure.storage.blob.aio import (
    BlobServiceClient,
    BlobClient
    )
    ```

1. Add code to run the program using `asyncio.run`. This function runs the passed coroutine, `main()` in our example, and manages the `asyncio` event loop. Coroutines are declared with the async/await syntax. In this example, the `main()` coroutine first creates the top level `BlobServiceClient` using `async with`, then calls the method that changes the blob's access tier. Note that only the top level client needs to use `async with`, as other clients created from it share the same connection pool.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_access_tiers_async.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-python.md)

1. Add code to change the blob's access tier. The code is the same as the synchronous example, except that the method is declared with the `async` keyword and the `await` keyword is used when calling the `set_standard_blob_tier` method.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_access_tiers_async.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-use-access-tier-python.md)

With this basic setup in place, you can implement other examples in this article as coroutines using async/await syntax.

## Resources

To learn more about setting access tiers using the Azure Blob Storage client library for Python, see the following resources.

### REST API operations

The Azure SDK for Python contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Python paradigms. The client library methods for setting access tiers use the following REST API operation:

- [Set Blob Tier](https://learn.microsoft.com/rest/api/storageservices/set-blob-tier) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/python/api/azure-storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-blob)
- [Package (PyPi)](https://pypi.org/project/azure-storage-blob/)

### Code samples

- View [synchronous](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_access_tiers.py) or [asynchronous](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_access_tiers_async.py) code samples from this article (GitHub)

### See also

- [Access tiers best practices](access-tiers-best-practices.md)
- [Blob rehydration from the archive tier](archive-rehydrate-overview.md)
