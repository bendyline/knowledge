---
title: Create a service SAS for a container or blob with Python
titleSuffix: Azure Storage
description: Learn how to create a service shared access signature (SAS) for a container or blob using the Azure Blob Storage client library for Python.
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 09/06/2024
ms.author: shaas
ms.reviewer: nachakra
ms.devlang: python
ms.custom: devx-track-python, devguide-python, engagement-fy23
# Customer intent: As a developer using the Azure Blob Storage client library for Python, I want to create a service shared access signature (SAS) for a container or blob, so that I can delegate controlled access to resources in my application securely.
---

# Create a service SAS for a container or blob with Python


> 
>
> - [.NET](sas-service-create-dotnet.md)
> - [Java](sas-service-create-java.md)
> - [Python](sas-service-create-python.md)


A shared access signature (SAS) enables you to grant limited access to containers and blobs in your storage account. When you create a SAS, you specify its constraints, including which Azure Storage resources a client is allowed to access, what permissions they have on those resources, and how long the SAS is valid.

Every SAS is signed with a key. You can sign a SAS in one of two ways:

- With a key created using Microsoft Entra credentials. A SAS that is signed with Microsoft Entra credentials is a *user delegation* SAS. A client that creates a user delegation SAS must be assigned an Azure RBAC role that includes the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action. To learn more, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas#assign-permissions-with-rbac).
- With the storage account key. Both a *service SAS* and an *account SAS* are signed with the storage account key. The client that creates a service SAS must either have direct access to the account key or be assigned the **Microsoft.Storage/storageAccounts/listkeys/action** permission. To learn more, see [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas) or [Create an account SAS](https://learn.microsoft.com/rest/api/storageservices/create-account-sas).

> **Note:**
> A user delegation SAS offers superior security to a SAS that is signed with the storage account key. Microsoft recommends using a user delegation SAS when possible. For more information, see [Grant limited access to data with shared access signatures (SAS)](../common/storage-sas-overview.md).


This article shows how to use the storage account key to create a service SAS for a container or blob with the Blob Storage client library for Python.

## About the service SAS

A service SAS is signed with the storage account access key. A service SAS delegates access to a resource in a single Azure Storage service, such as Blob Storage.

You can also use a stored access policy to define the permissions and duration of the SAS. If the name of an existing stored access policy is provided, that policy is associated with the SAS. To learn more about stored access policies, see [Define a stored access policy](https://learn.microsoft.com/rest/api/storageservices/define-stored-access-policy). If no stored access policy is provided, the code examples in this article show how to define permissions and duration for the SAS.

## Create a service SAS

You can create a service SAS for a container or blob, based on the needs of your app.

### [Container](#tab/container)

You can create a service SAS to delegate limited access to a container resource using the following method:

- [generate_container_sas](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob#azure-storage-blob-generate-blob-sas)

The storage account access key used to sign the SAS is passed to the method as the `account_key` argument. Allowed permissions are passed to the method as the `permission` argument, and are defined in the [ContainerSasPermissions](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containersaspermissions) class.

The following code example shows how to create a service SAS with read permissions for a container resource:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-python.md)

### [Blob](#tab/blob)

You can create a service SAS to delegate limited access to a blob resource using the following method:

- [generate_blob_sas](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob#azure-storage-blob-generate-blob-sas)

The storage account access key used to sign the SAS is passed to the method as the `account_key` argument. Allowed permissions are passed to the method as the `permission` argument, and are defined in the [BlobSasPermissions](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobsaspermissions) class. 

The following code example shows how to create a service SAS with read permissions for a blob resource:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-python.md)

---

## Use a service SAS to authorize a client object

You can use a service SAS to authorize a client object to perform operations on a container or blob based on the permissions granted by the SAS.

### [Container](#tab/container)

The following code example shows how to use the service SAS created in the earlier example to authorize a [ContainerClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient) object. This client object can be used to perform operations on the container resource based on the permissions granted by the SAS.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-python.md)

### [Blob](#tab/blob)

The following code example shows how to use the service SAS created in the earlier example to authorize a [BlobClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient) object. This client object can be used to perform operations on the blob resource based on the permissions granted by the SAS.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-python.md)

---

## Resources

To learn more about using the Azure Blob Storage client library for Python, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md)
- [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas)
