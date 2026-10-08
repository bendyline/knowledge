---
title: Use Python to manage data in Azure Data Lake Storage
titleSuffix: Azure Storage
description: Use Python to manage directories and files in a storage account that has hierarchical namespace enabled.
author: stevenmatthew

ms.author: shaas
ms.service: azure-data-lake-storage
ms.date: 06/04/2026
ms.topic: how-to
ms.reviewer: prishet
ms.devlang: python
ms.custom: devx-track-python
# Customer intent: "As a Python developer, I want to manage files and directories in Azure Data Lake Storage using Python, so that I can efficiently organize and manipulate data stored in hierarchical namespaces."
---

# Use Python to manage directories and files in Azure Data Lake Storage

This article shows you how to use Python to create and manage directories and files in storage accounts that have a hierarchical namespace.

To learn about how to get, set, and update the access control lists (ACL) of directories and files, see [Use Python to manage ACLs in Azure Data Lake Storage](data-lake-storage-acl-python.md).

[Package (PyPi)](https://pypi.org/project/azure-storage-file-datalake/) | [Samples](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-file-datalake/samples) | [API reference](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake) | [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-file-datalake/GEN1_GEN2_MAPPING.md) | [Give Feedback](https://github.com/Azure/azure-sdk-for-python/issues)

## Prerequisites

- An Azure subscription. See [Get Azure free trial](https://azure.microsoft.com/pricing/free-trial/).

- A storage account that has [hierarchical namespace](data-lake-storage-namespace.md) enabled. Follow [these](create-data-lake-storage-account.md) instructions to create one.

## Set up your project

This section walks you through preparing a project to work with the Azure Data Lake Storage client library for Python.

From your project directory, install packages for the Azure Data Lake Storage and Azure Identity client libraries using the `pip install` command. The **azure-identity** package is needed for passwordless connections to Azure services.

```console
pip install azure-storage-file-datalake azure-identity
```

Then open your code file and add the necessary import statements. In this example, we add the following to our *.py* file:

```python
import os
from azure.storage.filedatalake import (
    DataLakeServiceClient,
    DataLakeDirectoryClient,
    FileSystemClient
)
from azure.identity import DefaultAzureCredential
```


> **Note:**
> [Multi-protocol access on Data Lake Storage](data-lake-storage-multi-protocol-access.md) enables applications to use both Blob APIs and Data Lake Storage Gen2 APIs to work with data in storage accounts with hierarchical namespace (HNS) enabled. When working with capabilities unique to Data Lake Storage Gen2, such as directory operations and ACLs, use the Data Lake Storage Gen2 APIs, as shown in this article.
>
> When choosing which APIs to use in a given scenario, consider the workload and the needs of your application, along with the [known issues](data-lake-storage-known-issues.md#blob-storage-apis) and [impact of HNS on workloads and applications](upgrade-to-data-lake-storage-gen2.md#impact-on-workloads-and-applications).

## Authorize access and connect to data resources

To work with the code examples in this article, you need to create an authorized [DataLakeServiceClient](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakeserviceclient) instance that represents the storage account. You can authorize a `DataLakeServiceClient` object by using Microsoft Entra ID, an account access key, or a shared access signature (SAS).

<a name='azure-ad'></a>

### [Microsoft Entra ID](#tab/azure-ad)

You can use the [Azure identity client library for Python](https://pypi.org/project/azure-identity/) to authenticate your application with Microsoft Entra ID.

Create an instance of the [DataLakeServiceClient](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakeserviceclient) class and pass in a [DefaultAzureCredential](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) object.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

To learn more about using `DefaultAzureCredential` to authorize access to data, see [Overview: Authenticate Python apps to Azure using the Azure SDK](https://learn.microsoft.com/azure/developer/python/sdk/authentication-overview).

### [SAS token](#tab/sas-token)

To use a shared access signature (SAS) token, provide the token as a string and initialize a [DataLakeServiceClient](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakeserviceclient) object. If your account URL includes the SAS token, omit the credential parameter.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

To learn more about generating and managing SAS tokens, see the following article:

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md?toc=/azure/storage/blobs/toc.json)

### [Account key](#tab/account-key)

You can authorize access to data by using your account access keys (Shared Key). The following code example creates a [DataLakeServiceClient](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakeserviceclient) instance that's authorized by using the account key:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)


> **Caution:**
> Authorization with Shared Key is not recommended as it may be less secure. For optimal security, disable authorization via Shared Key for your storage account, as described in [Prevent Shared Key authorization for an Azure Storage account](../common/shared-key-authorization-prevent.md).
>
> Use of access keys and connection strings should be limited to initial proof of concept apps or development prototypes that don't access production or sensitive data. Otherwise, the token-based authentication classes available in the Azure SDK should always be preferred when authenticating to Azure resources.
>
> Microsoft recommends that clients use either Microsoft Entra ID or a shared access signature (SAS) to authorize access to data in Azure Storage. For more information, see [Authorize operations for data access](../common/authorize-data-access.md?toc=/azure/storage/blobs/toc.json\&bc=/azure/storage/blobs/breadcrumb/toc.json).


---

## Create a container

A container acts as a file system for your files. You can create a container by using the following method:

- [DataLakeServiceClient.create_file_system](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakeserviceclient#azure-storage-filedatalake-datalakeserviceclient-create-file-system)

The following code example creates a container and returns a [FileSystemClient](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.filesystemclient) object for later use:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

## Create a directory

You can create a directory reference in the container by using the following method:

- [FileSystemClient.create_directory](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.filesystemclient#azure-storage-filedatalake-filesystemclient-create-directory)

The following code example adds a directory to a container and returns a [DataLakeDirectoryClient](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakedirectoryclient) object for later use:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

## Rename or move a directory

You can rename or move a directory by using the following method:

- [DataLakeDirectoryClient.rename_directory](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakedirectoryclient#azure-storage-filedatalake-datalakedirectoryclient-rename-directory)

Pass the path with the new directory name in the `new_name` argument. The value must have the following format: {filesystem}/{directory}/{subdirectory}.

The following code example shows how to rename a subdirectory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

## Upload a file to a directory

You can upload content to a new or existing file by using the following method:

- [DataLakeFileClient.upload_data](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient#azure-storage-filedatalake-datalakefileclient-upload-data)

The following code example shows how to upload a file to a directory using the [upload_data](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient#azure-storage-filedatalake-datalakefileclient-upload-data) method:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

You can use this method to create and upload content to a new file, or you can set the `overwrite` argument to `True` to overwrite an existing file.

## Append data to a file

To append data to a file, use the following method:

- [DataLakeFileClient.append_data](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient#azure-storage-filedatalake-datalakefileclient-append-data) method.

The following code example shows how to append data to the end of a file by using these steps:

- Create a [DataLakeFileClient](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient) object to represent the file resource you're working with.
- Upload data to the file by using the [append_data](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient#azure-storage-filedatalake-datalakefileclient-append-data) method.
- Complete the upload by calling the [flush_data](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient#azure-storage-filedatalake-datalakefileclient-flush-data) method to write the previously uploaded data to the file.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

With this method, data can only be appended to a file and the operation is limited to 4000 MiB per request.

## Download from a directory

The following code example shows how to download a file from a directory to a local file by using these steps:

- Create a [DataLakeFileClient](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient) object to represent the file you want to download.
- Open a local file for writing. 
- Call the [DataLakeFileClient.download_file](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient#azure-storage-filedatalake-datalakefileclient-download-file) method to read from the file, and then write the data to the local file.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

## List directory contents

You can list directory contents by using the following method and enumerating the result:

- [FileSystemClient.get_paths](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.filesystemclient#azure-storage-filedatalake-filesystemclient-get-paths)

Enumerating the paths in the result might make multiple requests to the service while fetching the values.

The following code example prints the path of each subdirectory and file that is located in a directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

## Delete a directory

You can delete a directory by using the following method:

- [DataLakeDirectoryClient.delete_directory](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakedirectoryclient#azure-storage-filedatalake-datalakedirectoryclient-delete-directory)

The following code example shows how to delete a directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/python-v12/crud_datalake.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-python.md)

## See also

- [API reference documentation](https://learn.microsoft.com/python/api/azure-storage-file-datalake/azure.storage.filedatalake)
- [Azure File Data Lake Storage Client Library (Python Package Index)](https://pypi.org/project/azure-storage-file-datalake/)
- [Samples](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-file-datalake/samples)
- [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-file-datalake/GEN1_GEN2_MAPPING.md)
- [Known issues](data-lake-storage-known-issues.md#api-scope-data-lake-client-library)
- [Give Feedback](https://github.com/Azure/azure-sdk-for-python/issues)
