---
title: Create an account SAS with Python
titleSuffix: Azure Storage
description: Learn how to create an account shared access signature (SAS) using the Python client library.
services: storage
author: stevenmatthew

ms.service: azure-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.reviewer: dineshm
ms.subservice: storage-common-concepts
ms.devlang: python
ms.custom: devx-track-python, devguide-python
# Customer intent: As a developer, I want to create an account shared access signature (SAS) using Python, so that I can delegate access to multiple service-level operations within my Azure Storage account.
---

# Create an account SAS with Python


> 
>
> - [.NET](storage-account-sas-create-dotnet.md)
> - [Java](storage-account-sas-create-java.md)
> - [JavaScript](../blobs/storage-blob-account-delegation-sas-create-javascript.md)
> - [Python](storage-account-sas-create-python.md)


A shared access signature (SAS) enables you to grant limited access to containers and blobs in your storage account. When you create a SAS, you specify its constraints, including which Azure Storage resources a client is allowed to access, what permissions they have on those resources, and how long the SAS is valid.

Every SAS is signed with a key. You can sign a SAS in one of two ways:

- With a key created using Microsoft Entra credentials. A SAS that is signed with Microsoft Entra credentials is a *user delegation* SAS. A client that creates a user delegation SAS must be assigned an Azure RBAC role that includes the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action. To learn more, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas#assign-permissions-with-rbac).
- With the storage account key. Both a *service SAS* and an *account SAS* are signed with the storage account key. The client that creates a service SAS must either have direct access to the account key or be assigned the **Microsoft.Storage/storageAccounts/listkeys/action** permission. To learn more, see [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas) or [Create an account SAS](https://learn.microsoft.com/rest/api/storageservices/create-account-sas).

> **Note:**
> A user delegation SAS offers superior security to a SAS that is signed with the storage account key. Microsoft recommends using a user delegation SAS when possible. For more information, see [Grant limited access to data with shared access signatures (SAS)](storage-sas-overview.md).


This article shows how to use the storage account key to create an account SAS with the [Azure Storage client library for Python](https://learn.microsoft.com/python/api/overview/azure/storage).

## About the account SAS

An account SAS is created at the level of the storage account. By creating an account SAS, you can:

- Delegate access to service-level operations that aren't currently available with a service-specific SAS, such as [Get Blob Service Properties](https://learn.microsoft.com/rest/api/storageservices/get-blob-service-properties), [Set Blob Service Properties](https://learn.microsoft.com/rest/api/storageservices/set-blob-service-properties) and [Get Blob Service Stats](https://learn.microsoft.com/rest/api/storageservices/get-blob-service-stats).
- Delegate access to more than one service in a storage account at a time. For example, you can delegate access to resources in both Azure Blob Storage and Azure Files by using an account SAS.

Stored access policies aren't supported for an account SAS.

## Create an account SAS

An account SAS is signed with the account access key. The following code example shows how to call the [generate_account_sas](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob#azure-storage-blob-generate-account-sas) method to get the account SAS token string. 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-sas-create-python.md)

Valid parameters for the [ResourceTypes](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.resourcetypes) constructor are:

- **service**: default is `False`; set to `True` to grant access to service-level APIs.
- **container**: default is `False`; set to `True` to grant access to container-level APIs.
- **object**: default is `False`; set to `True` to grant access to object-level APIs for blobs, queue messages, and files.

For available permissions, see [AccountSasPermissions](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.accountsaspermissions).

## Use an account SAS from a client

To use the account SAS to access service-level APIs for the Blob service, create a [BlobServiceClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobserviceclient) object using the account SAS and the Blob Storage endpoint for your storage account.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-sas-create-python.md)

You can also use an account SAS to authorize and work with a [ContainerClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient) object or [BlobClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient) object, if those resource types are granted access as part of the signature values.

## Resources

To learn more about creating an account SAS using the Azure Blob Storage client library for Python, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/python/api/azure-storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-blob)
- [Package (PyPi)](https://pypi.org/project/azure-storage-blob/)

### See also

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](storage-sas-overview.md)
- [Create an account SAS](https://learn.microsoft.com/rest/api/storageservices/create-account-sas)
