---
title: Use blob index tags to manage and find data with Python
titleSuffix: Azure Storage
description: Learn how to categorize, manage, and query for blob objects by using the Python client library.  
services: storage
author: stevenmatthew

ms.author: shaas
ms.date: 08/05/2024
ms.service: azure-blob-storage
ms.topic: how-to
ms.devlang: python
ms.custom: devx-track-python, devguide-python
# Customer intent: As a Python developer, I want to use blob index tags in Azure Blob Storage so that I can efficiently manage and query my data objects for improved organization and retrieval.
---

# Use blob index tags to manage and find data with Python


> 
>
> - [.NET](storage-blob-tags.md)
> - [Java](storage-blob-tags-java.md)
> - [JavaScript](storage-blob-tags-javascript.md)
> - [Python](storage-blob-tags-python.md)
> - [Go](storage-blob-tags-go.md)

This article shows how to use blob index tags to manage and find data using the [Azure Storage client library for Python](https://learn.microsoft.com/python/api/overview/azure/storage).

To learn about setting blob index tags using asynchronous APIs, see [Set blob index tags asynchronously](#set-blob-index-tags-asynchronously).


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_blobs_properties_metadata_tags.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-python.md)

#### Authorization

The authorization mechanism must have the necessary permissions to work with blob index tags. For authorization with Microsoft Entra ID (recommended), you need Azure RBAC built-in role **Storage Blob Data Owner** or higher. To learn more, see the authorization guidance for [Get Blob Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags#authorization), [Set Blob Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags#authorization), or [Find Blobs by Tags (REST API)](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags#authorization).


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

- [BlobClient.set_blob_tags](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-set-blob-tags)

The specified tags in this method will replace existing tags. If old values must be preserved, they must be downloaded and included in the call to this method. The following example shows how to set tags:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_blobs_properties_metadata_tags.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-python.md)

You can delete all tags by passing an empty `dict` object into the `set_blob_tags` method:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_blobs_properties_metadata_tags.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-python.md)

## Get tags


You can get index tags if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags/read](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to access the blob's tags (`t` permission)
- Account key

For more information, see [Getting and listing blob index tags](storage-manage-find-blobs.md#getting-and-listing-blob-index-tags).

You can get tags by using the following method: 

- [BlobClient.get_blob_tags](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-get-blob-tags)

The following example shows how to retrieve and iterate over the blob's tags:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_blobs_properties_metadata_tags.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-python.md)

## Filter and find data with blob index tags


You can use index tags to find and filter data if your code has authorized access to blob data through one of the following mechanisms:
- Security principal that is assigned an Azure RBAC role with the [Microsoft.Storage/storageAccounts/blobServices/containers/blobs/filter/action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage) action. The [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) is a built-in role that includes this action.
- Shared Access Signature (SAS) with permission to filter blobs by tags (`f` permission)
- Account key

For more information, see [Finding data using blob index tags](storage-manage-find-blobs.md#finding-data-using-blob-index-tags).

> **Note:**
> You can't use index tags to retrieve previous versions. Tags for previous versions aren't passed to the blob index engine. For more information, see [Conditions and known issues](storage-manage-find-blobs.md#conditions-and-known-issues).

You can find data by using the following method: 

- [ContainerClient.find_blobs_by_tag](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient#azure-storage-blob-containerclient-find-blobs-by-tags)

The following example finds and lists all blobs tagged as an image:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_blobs_properties_metadata_tags.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-python.md)

## Set blob index tags asynchronously

The Azure Blob Storage client library for Python supports working with blob index tags asynchronously. To learn more about project setup requirements, see [Asynchronous programming](storage-blob-python-get-started.md#asynchronous-programming).

Follow these steps to set blob index tags using asynchronous APIs:

1. Add the following import statements:

    ```python
    import asyncio

    from azure.identity.aio import DefaultAzureCredential
    from azure.storage.blob.aio import BlobServiceClient
    ```

1. Add code to run the program using `asyncio.run`. This function runs the passed coroutine, `main()` in our example, and manages the `asyncio` event loop. Coroutines are declared with the async/await syntax. In this example, the `main()` coroutine first creates the top level `BlobServiceClient` using `async with`, then calls the method that sets the blob index tags. Note that only the top level client needs to use `async with`, as other clients created from it share the same connection pool.

    ```python
    async def main():
        sample = BlobSamples()

        # TODO: Replace <storage-account-name> with your actual storage account name
        account_url = "https://<storage-account-name>.blob.core.windows.net"
        credential = DefaultAzureCredential()

        async with BlobServiceClient(account_url, credential=credential) as blob_service_client:
            await sample.set_blob_tags(blob_service_client, "sample-container")

    if __name__ == '__main__':
        asyncio.run(main())
    ```

1. Add code to set the blob index tags. The code is the same as the synchronous example, except that the method is declared with the `async` keyword and the `await` keyword is used when calling the `get_blob_tags` and `set_blob_tags` methods.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_blobs_properties_metadata_tags_async.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-tags-python.md)

With this basic setup in place, you can implement other examples in this article as coroutines using async/await syntax.

## Resources

To learn more about how to use index tags to manage and find data using the Azure Blob Storage client library for Python, see the following resources.

### Code samples

- View [synchronous](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_blobs_properties_metadata_tags.py) or [asynchronous](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_blobs_properties_metadata_tags_async.py) code samples from this article (GitHub)

### REST API operations

The Azure SDK for Python contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Python paradigms. The client library methods for managing and using blob index tags use the following REST API operations:

- [Get Blob Tags](https://learn.microsoft.com/rest/api/storageservices/get-blob-tags) (REST API)
- [Set Blob Tags](https://learn.microsoft.com/rest/api/storageservices/set-blob-tags) (REST API)
- [Find Blobs by Tags](https://learn.microsoft.com/rest/api/storageservices/find-blobs-by-tags) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/python/api/azure-storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-blob)
- [Package (PyPi)](https://pypi.org/project/azure-storage-blob/)

### See also

- [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md)
- [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md)


## Related content

- This article is part of the Blob Storage developer guide for Python. To learn more, see the full list of developer guide articles at [Build your Python app](storage-blob-python-get-started.md#build-your-app).
