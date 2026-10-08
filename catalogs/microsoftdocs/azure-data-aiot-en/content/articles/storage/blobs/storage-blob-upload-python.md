---
title: Upload a blob with Python
titleSuffix: Azure Storage
description: Learn how to upload a blob to your Azure Storage account using the Python client library.
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 03/25/2025
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: python
ms.custom: devx-track-python, devguide-python
# Customer intent: As a Python developer, I want to upload blobs to my cloud storage using the Python client library, so that I can efficiently manage and store data for my applications.
---

# Upload a block blob with Python


> 
>
> - [.NET](storage-blob-upload.md)
> - [Java](storage-blob-upload-java.md)
> - [JavaScript](storage-blob-upload-javascript.md)
> - [Python](storage-blob-upload-python.md)
> - [Go](storage-blob-upload-go.md)

This article shows how to upload a blob using the [Azure Storage client library for Python](https://learn.microsoft.com/python/api/overview/azure/storage). You can upload data to a block blob from a file path, a stream, a binary object, or a text string. You can also upload blobs with index tags.

To learn about uploading blobs using asynchronous APIs, see [Upload blobs asynchronously](#upload-blobs-asynchronously).


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

#### Authorization

The authorization mechanism must have the necessary permissions to upload a blob. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Contributor** or higher. To learn more, see the authorization guidance for [Put Blob (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-blob#authorization) and [Put Block (REST API)](https://learn.microsoft.com/rest/api/storageservices/put-block#authorization).


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



## Upload data to a block blob

To upload a blob using a stream or a binary object, use the following method:

- [upload_blob](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-upload-blob)

This method creates a new blob from a data source with automatic chunking, meaning that the data source may be split into smaller chunks and uploaded. To perform the upload, the client library may use either [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) or a series of [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) calls followed by [Put Block List](https://learn.microsoft.com/rest/api/storageservices/put-block-list). This behavior depends on the overall size of the object and how the [data transfer options](#specify-data-transfer-options-for-upload) are set.

> **Note:**
> The Azure Storage client libraries don't support concurrent writes to the same blob. If your app requires multiple processes writing to the same blob, you should implement a strategy for concurrency control to provide a predictable experience. To learn more about concurrency strategies, see [Manage concurrency in Blob Storage](concurrency-manage.md).

## Upload a block blob from a local file path

The following example uploads a file to a block blob using a `BlobClient` object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

## Upload a block blob from a stream

The following example creates random bytes of data and uploads a `BytesIO` object to a block blob using a `BlobClient` object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

## Upload binary data to a block blob

The following example uploads binary data to a block blob using a `BlobClient` object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

## Upload a block blob with index tags

The following example uploads a block blob with index tags:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

## Upload a block blob with configuration options

You can define client library configuration options when uploading a blob. These options can be tuned to improve performance, enhance reliability, and optimize costs. The following code examples show how to define configuration options for an upload both at the method level, and at the client level when instantiating [BlobClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient). These options can also be configured for a [ContainerClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient) instance or a [BlobServiceClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobserviceclient) instance.

### Specify data transfer options for upload

You can set configuration options when instantiating a client to optimize performance for data transfer operations. You can pass the following keyword arguments when constructing a client object in Python:

- `max_block_size` - The maximum chunk size for uploading a block blob in chunks. Defaults to 4 MiB.
- `max_single_put_size` - If the blob size is less than or equal to `max_single_put_size`, the blob is uploaded with a single `Put Blob` request. If the blob size is larger than `max_single_put_size` or unknown, the blob is uploaded in chunks using `Put Block` and committed using `Put Block List`. Defaults to 64 MiB.

For more information on transfer size limits for Blob Storage, see [Scale targets for Blob storage](scalability-targets.md#scale-targets-for-blob-storage).

For upload operations, you can also pass the `max_concurrency` argument when calling [upload_blob](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-upload-blob). This argument defines the maximum number of parallel connections to use when the blob size exceeds 64 MiB.

The following code example shows how to specify data transfer options when creating a `BlobClient` object, and how to upload data using that client object. The values provided in this sample aren't intended to be a recommendation. To properly tune these values, you need to consider the specific needs of your app.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

To learn more about tuning data transfer options, see [Performance tuning for uploads and downloads with Python](storage-blobs-tune-upload-download-python.md).

### Set a blob's access tier on upload

You can set a blob's access tier on upload by passing the `standard_blob_tier` keyword argument to [upload_blob](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-upload-blob). Azure Storage offers different access tiers so that you can store your blob data in the most cost-effective manner based on how it's being used.

The following code example shows how to set the access tier when uploading a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

Setting the access tier is only allowed for block blobs.  You can set the access tier for a block blob to `Hot`, `Cool`, `Cold`, or `Archive`. To set the access tier to `Cold`, you must use a minimum [client library](https://learn.microsoft.com/python/api/azure-storage-blob) version of 12.15.0.

To learn more about access tiers, see [Access tiers overview](access-tiers-overview.md).

## Upload a block blob by staging blocks and committing

You can have greater control over how to divide uploads into blocks by manually staging individual blocks of data. When all of the blocks that make up a blob are staged, you can commit them to Blob Storage.

Use the following method to create a new block to be committed as part of a blob:

- [stage_block](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-stage-block)

Use the following method to write a blob by specifying the list of block IDs that make up the blob:

- [commit_block_list](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-commit-block-list)

The following example reads data from a file and stages blocks to be committed as part of a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

## Upload blobs asynchronously

The Azure Blob Storage client library for Python supports uploading blobs asynchronously. To learn more about project setup requirements, see [Asynchronous programming](storage-blob-python-get-started.md#asynchronous-programming).

Follow these steps to upload a blob using asynchronous APIs:

1. Add the following import statements:

    ```python
    import asyncio

    from azure.identity.aio import DefaultAzureCredential
    from azure.storage.blob.aio import BlobServiceClient, BlobClient, ContainerClient
    ```

1. Add code to run the program using `asyncio.run`. This function runs the passed coroutine, `main()` in our example, and manages the `asyncio` event loop. Coroutines are declared with the async/await syntax. In this example, the `main()` coroutine first creates the top level `BlobServiceClient` using `async with`, then calls the method that uploads the blob. Note that only the top level client needs to use `async with`, as other clients created from it share the same connection pool.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload_async.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

1. Add code to upload the blob. The following example uploads a blob from a local file path using a `ContainerClient` object. The code is the same as the synchronous example, except that the method is declared with the `async` keyword and the `await` keyword is used when calling the `upload_blob` method.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_upload_async.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-upload-python.md)

With this basic setup in place, you can implement other examples in this article as coroutines using async/await syntax.

## Resources

To learn more about uploading blobs using the Azure Blob Storage client library for Python, see the following resources.

### Code samples

- View [synchronous](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_upload.py) or [asynchronous](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_upload_async.py) code samples from this article (GitHub)

### REST API operations

The Azure SDK for Python contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Python paradigms. The client library methods for uploading blobs use the following REST API operations:

- [Put Blob](https://learn.microsoft.com/rest/api/storageservices/put-blob) (REST API)
- [Put Block](https://learn.microsoft.com/rest/api/storageservices/put-block) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/python/api/azure-storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-blob)
- [Package (PyPi)](https://pypi.org/project/azure-storage-blob/)

### See also

- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for Python. To learn more, see the full list of developer guide articles at [Build your Python app](storage-blob-python-get-started.md#build-your-app).
