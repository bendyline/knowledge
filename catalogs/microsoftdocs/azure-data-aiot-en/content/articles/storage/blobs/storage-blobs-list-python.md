---
title: List blobs with Python
titleSuffix: Azure Storage
description: Learn how to list blobs in your storage account using the Azure Storage client library for Python. Code examples show how to list blobs in a flat listing, or how to list blobs hierarchically, as though they were organized into directories or folders.
services: storage
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.devlang: python
ms.custom: devx-track-python, devguide-python
# Customer intent: "As a Python developer, I want to list blobs in my Azure Storage account using the client library, so that I can manage and organize my data efficiently."
---

# List blobs with Python


> 
>
> - [.NET](storage-blobs-list.md)
> - [Java](storage-blobs-list-java.md)
> - [JavaScript](storage-blobs-list-javascript.md)
> - [Python](storage-blobs-list-python.md)
> - [Go](storage-blobs-list-go.md)

This article shows how to list blobs by using the [Azure Storage client library for Python](https://learn.microsoft.com/python/api/overview/azure/storage).

To learn about listing blobs by using asynchronous APIs, see [List blobs asynchronously](#list-blobs-asynchronously).


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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_list_blobs.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-python.md)

#### Authorization

The authorization mechanism must have the necessary permissions to list a blob. For authorization with Microsoft Entra ID (recommended), you need the Azure RBAC built-in role **Storage Blob Data Reader** or higher. To learn more, see the authorization guidance for [List Blobs (REST API)](https://learn.microsoft.com/rest/api/storageservices/list-blobs#authorization).


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



## About blob listing options

When you list blobs from your code, you can specify many options to manage how results return from Azure Storage. You can specify the number of results to return in each set of results, and then retrieve the subsequent sets. You can specify a prefix to return blobs whose names begin with that character or string. You can list blobs in a flat listing structure, or hierarchically. A hierarchical listing returns blobs as though they were organized into folders.

To list the blobs in a container by using a flat listing, call one of these methods:

- [ContainerClient.list_blobs](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient#azure-storage-blob-containerclient-list-blobs) (along with the name, optionally include metadata, tags, and other information associated with each blob)
- [ContainerClient.list_blob_names](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient#azure-storage-blob-containerclient-list-blobs) (only returns blob name)

To list the blobs in a container by using a hierarchical listing, call the following method:

- [ContainerClient.walk_blobs](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient#azure-storage-blob-containerclient-walk-blobs) (along with the name, optionally include metadata, tags, and other information associated with each blob)

### Filter results with a prefix

To filter the list of blobs, specify a string for the `name_starts_with` keyword argument. The prefix string can include one or more characters. Azure Storage returns only the blobs whose names start with that prefix.

### Flat listing versus hierarchical listing

Blobs in Azure Storage are organized in a flat paradigm, rather than a hierarchical paradigm (like a classic file system). However, you can organize blobs into *virtual directories* to mimic a folder structure. A virtual directory forms part of the name of the blob and is indicated by the delimiter character.

To organize blobs into virtual directories, use a delimiter character in the blob name. The default delimiter character is a forward slash (/), but you can specify any character as the delimiter.

If you name your blobs by using a delimiter, you can choose to list blobs hierarchically. For a hierarchical listing operation, Azure Storage returns any virtual directories and blobs beneath the parent object. You can call the listing operation recursively to traverse the hierarchy, similar to how you would traverse a classic file system programmatically.

## Use a flat listing

By default, a listing operation returns blobs in a flat listing. In a flat listing, blobs aren't organized by virtual directory.

The following example lists the blobs in the specified container by using a flat listing:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_list_blobs.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-python.md)

Sample output is similar to:

```console
List blobs flat:
Name: file4.txt
Name: folderA/file1.txt
Name: folderA/file2.txt
Name: folderA/folderB/file3.txt
```

You can also specify options to filter list results or show more information. The following example lists blobs and blob tags:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_list_blobs.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-python.md)

Sample output is similar to:

```console
List blobs flat:
Name: file4.txt, Tags: None
Name: folderA/file1.txt, Tags: None
Name: folderA/file2.txt, Tags: None
Name: folderA/folderB/file3.txt, Tags: {'tag1': 'value1', 'tag2': 'value2'}
```

> **Note:**
> The sample output shown assumes that you have a storage account with a flat namespace. If you enable the hierarchical namespace feature for your storage account, directories aren't virtual. Instead, they're concrete, independent objects. As a result, directories appear in the list as zero-length blobs.</br></br>For an alternative listing option when working with a hierarchical namespace, see [List directory contents (Azure Data Lake Storage)](data-lake-storage-directory-file-acl-python.md#list-directory-contents).

## Use a hierarchical listing

When you call a listing operation hierarchically, Azure Storage returns the virtual directories and blobs at the first level of the hierarchy.

To list blobs hierarchically, use the following method:

- [ContainerClient.walk_blobs](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient#azure-storage-blob-containerclient-walk-blobs)

The following example lists the blobs in the specified container using a hierarchical listing:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_list_blobs.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-python.md)

Sample output is similar to:

```console
folderA/
  folderA/folderB/
    folderA/folderB/file3.txt
  folderA/file1.txt
  folderA/file2.txt
file4.txt
```

> **Note:**
> Blob snapshots can't be listed in a hierarchical listing operation.

## List blobs asynchronously

The Azure Blob Storage client library for Python supports listing blobs asynchronously. To learn more about project setup requirements, see [Asynchronous programming](storage-blob-python-get-started.md#asynchronous-programming).

Follow these steps to list blobs by using asynchronous APIs:

1. Add the following import statements:

    ```python
    import asyncio

    from azure.identity.aio import DefaultAzureCredential
    from azure.storage.blob.aio import BlobServiceClient, ContainerClient, BlobPrefix
    ```

1. Add code to run the program by using `asyncio.run`. This function runs the passed coroutine, `main()` in this example, and manages the `asyncio` event loop. Coroutines are declared by using the async/await syntax. In this example, the `main()` coroutine first creates the top level `BlobServiceClient` by using `async with`, then calls the method that lists the blobs. Only the top level client needs to use `async with`, as other clients created from it share the same connection pool.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_list_blobs_async.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-python.md)

1. Add code to list the blobs. The following code example lists blobs by using a flat listing. The code is the same as the synchronous example, except that the method is declared by using the `async` keyword and `async for` is used when calling the `list_blobs` method.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_list_blobs_async.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-list-python.md)

With this basic setup in place, you can implement other examples in this article as coroutines by using async/await syntax.

## List blobs in Apache Arrow format (preview)

> **Important:**
> Listing blobs in Apache Arrow format is currently in **PREVIEW**. This scenario requires a **beta (preview) version** of the Azure Blob Storage client library for Python (for example, `azure-storage-blob` **12.31.0b1** or later preview release). Preview features are provided without a service-level agreement and aren't recommended for production workloads. Some features might not be supported, or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

This capability is built on the existing `List Blobs` API. Instead of using the default XML, it uses the compact, columnar [Apache Arrow](https://arrow.apache.org/) format as the response format on the wire. You enable it by setting a single option on the container listing call. The Python SDK decodes Apache Arrow behind the scenes and still returns the same `BlobProperties` objects. This approach improves listing throughput and reduces client-side CPU when enumerating large containers. It preserves the response contract that applications rely on.

> **Warning:**
> Listing blobs in Apache Arrow format isn't supported on storage accounts that have hierarchical namespace (Azure Data Lake Storage) enabled.

To request Apache Arrow-formatted results, set the `response_format` keyword argument to `"arrow"` when you call [ContainerClient.list_blobs](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient?view=azure-python-preview\&preserve-view=true#azure-storage-blob-containerclient-list-blobs) or [ContainerClient.list_blob_names](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient?view=azure-python-preview\&preserve-view=true#azure-storage-blob-containerclient-list-blob-names). When using Apache Arrow output, you can also set the `start_from` and `end_before` keyword arguments to control the range of paths returned.

> **Note:**
> Using `response_format="arrow"` requires the [nanoarrow](https://pypi.org/project/nanoarrow/) package to be installed.

The following example lists the blobs in a container and requests the results in Apache Arrow format:

```python
# response_format="arrow" requires the nanoarrow package to be installed
blob_list = container_client.list_blobs(
    name_starts_with="folderA/",
    response_format="arrow",
)

for blob in blob_list:
    print("Name: " + blob.name)
```

## Resources

To learn more about how to list blobs by using the Azure Blob Storage client library for Python, see the following resources.

### Code samples

- View [synchronous](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_list_blobs.py) or [asynchronous](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_list_blobs_async.py) code samples from this article (GitHub).

### REST API operations

The Azure SDK for Python contains libraries that build on top of the Azure REST API. By using these libraries, you can interact with REST API operations through familiar Python paradigms. The client library methods for listing blobs use the following REST API operation:

- [List Blobs](https://learn.microsoft.com/rest/api/storageservices/list-blobs) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/python/api/azure-storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-blob)
- [Package (PyPi)](https://pypi.org/project/azure-storage-blob/)

### See also

- [Enumerating Blob Resources](https://learn.microsoft.com/rest/api/storageservices/enumerating-blob-resources)
- [Blob versioning](versioning-overview.md)


## Related content

- This article is part of the Blob Storage developer guide for Python. To learn more, see the full list of developer guide articles at [Build your Python app](storage-blob-python-get-started.md#build-your-app).
