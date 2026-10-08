---
title: Create a user delegation SAS for a container or blob with Python
titleSuffix: Azure Storage
description: Learn how to create a user delegation SAS for a container or blob with Microsoft Entra credentials by using the Python client library for Blob Storage.
services: storage
author: stevenmatthew
ms.author: shaas
ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 09/06/2024
ms.reviewer: dineshm
ms.devlang: python
ms.custom: devx-track-python, devguide-python
# Customer intent: "As a developer, I want to create a user delegation SAS for a container or blob using Python, so that I can securely grant limited access to Azure Storage resources."
---

# Create a user delegation SAS for a container or blob with Python


> 
>
> - [.NET](storage-blob-user-delegation-sas-create-dotnet.md)
> - [Java](storage-blob-user-delegation-sas-create-java.md)
> - [Python](storage-blob-user-delegation-sas-create-python.md)


A shared access signature (SAS) enables you to grant limited access to containers and blobs in your storage account. When you create a SAS, you specify its constraints, including which Azure Storage resources a client is allowed to access, what permissions they have on those resources, and how long the SAS is valid.

Every SAS is signed with a key. You can sign a SAS in one of two ways:

- With a key created using Microsoft Entra credentials. A SAS that is signed with Microsoft Entra credentials is a *user delegation* SAS. A client that creates a user delegation SAS must be assigned an Azure RBAC role that includes the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action. To learn more, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas#assign-permissions-with-rbac).
- With the storage account key. Both a *service SAS* and an *account SAS* are signed with the storage account key. The client that creates a service SAS must either have direct access to the account key or be assigned the **Microsoft.Storage/storageAccounts/listkeys/action** permission. To learn more, see [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas) or [Create an account SAS](https://learn.microsoft.com/rest/api/storageservices/create-account-sas).

> **Note:**
> A user delegation SAS offers superior security to a SAS that is signed with the storage account key. Microsoft recommends using a user delegation SAS when possible. For more information, see [Grant limited access to data with shared access signatures (SAS)](../common/storage-sas-overview.md).


This article shows how to use Microsoft Entra credentials to create a user delegation SAS for a container or blob using the [Azure Storage client library for Python](https://learn.microsoft.com/python/api/overview/azure/storage).


## About the user delegation SAS

A SAS token for access to a container or blob may be secured by using either Microsoft Entra credentials or an account key. A SAS secured with Microsoft Entra credentials is called a user delegation SAS, because the OAuth 2.0 token used to sign the SAS is requested on behalf of the user.

Microsoft recommends that you use Microsoft Entra credentials when possible as a security best practice, rather than using the account key, which can be more easily compromised. When your application design requires shared access signatures, use Microsoft Entra credentials to create a user delegation SAS for superior security. For more information about the user delegation SAS, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas).

> **Caution:**
> Any client that possesses a valid SAS can access data in your storage account as permitted by that SAS. It's important to protect a SAS from malicious or unintended use. Use discretion in distributing a SAS and have a plan in place for revoking a compromised SAS. To prevent unintended use, use user-bound user delegated SAS, which ties the SAS token to the intended end user and can't be used by anyone else.

For more information about shared access signatures, see [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md).


## Assign Azure roles for access to data

When a Microsoft Entra security principal attempts to access data, that security principal must have permissions to the resource. Whether the security principal is a managed identity in Azure or a Microsoft Entra user account running code in the development environment, the security principal must be assigned an Azure role that grants access to data. For information about assigning permissions via Azure RBAC, see [Assign an Azure role for access to blob data](assign-azure-role-data-access.md).


## Set up your project

To work with the code examples in this article, follow these steps to set up your project.

### Install packages

Install the following packages using `pip install`:

```console
pip install azure-storage-blob azure-identity
```

### Set up the app code

Add the following `import` directives:

```python
from azure.identity import DefaultAzureCredential
from azure.storage.blob import (
    BlobServiceClient,
    ContainerClient,
    BlobClient,
    BlobSasPermissions,
    ContainerSasPermissions,
    UserDelegationKey,
    generate_container_sas,
    generate_blob_sas
)
```

## Get an authenticated token credential

To get a token credential that your code can use to authorize requests to Blob Storage, create an instance of the [DefaultAzureCredential](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) class. For more information about using the DefaultAzureCredential class to authorize a managed identity to access Blob Storage, see [Azure Identity client library for Python](https://learn.microsoft.com/python/api/overview/azure/identity-readme).

The following code snippet shows how to get the authenticated token credential and use it to create a service client for Blob storage:

```python
# Construct the blob endpoint from the account name
account_url = "https://<storage-account-name>.blob.core.windows.net"

#Create a BlobServiceClient object using DefaultAzureCredential
blob_service_client = BlobServiceClient(account_url, credential=DefaultAzureCredential())
```

To learn more about authorizing access to Blob Storage from your applications with the Python SDK, see [Authenticate Python apps to Azure services](https://learn.microsoft.com/azure/developer/python/sdk/authentication-overview).

## Get the user delegation key

Every SAS is signed with a key. To create a user delegation SAS, you must first request a user delegation key, which is then used to sign the SAS. The user delegation key is analogous to the account key used to sign a service SAS or an account SAS, except that it relies on your Microsoft Entra credentials. When a client requests a user delegation key using an OAuth 2.0 token, Blob Storage returns the user delegation key on behalf of the user.

Once you have the user delegation key, you can use that key to create any number of user delegation shared access signatures, over the lifetime of the key. The user delegation key is independent of the OAuth 2.0 token used to acquire it, so the token doesn't need to be renewed if the key is still valid. You can specify the length of time that the key remains valid, up to a maximum of seven days.

Use one of the following methods to request the user delegation key:

- [get_user_delegation_key](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobserviceclient#azure-storage-blob-blobserviceclient-get-user-delegation-key)

The following code example shows how to request the user delegation key:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob-devguide-create-sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-python.md)


## Create a user delegation SAS

You can create a user delegation SAS for a container or blob, based on the needs of your app.

### [Container](#tab/container)

Once you've obtained the user delegation key, you can create a user delegation SAS. You can create a user delegation SAS to delegate limited access to a container resource using the following method:

- [generate_container_sas](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob#azure-storage-blob-generate-container-sas)

The user delegation key to sign the SAS is passed to the method as the `user_delegation_key` argument. Allowed permissions are passed to the method as the `permission` argument, and are defined in the [ContainerSasPermissions](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containersaspermissions) class.

The following code example shows how to create a user delegation SAS for a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-python.md)

### [Blob](#tab/blob)

Once you've obtained the user delegation key, you can create a user delegation SAS. You can create a user delegation SAS to delegate limited access to a blob resource using the following method:

- [generate_blob_sas](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob#azure-storage-blob-generate-blob-sas)

The user delegation key to sign the SAS is passed to the method as the `user_delegation_key` argument. Allowed permissions are passed to the method as the `permission` argument, and are defined in the [BlobSasPermissions](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobsaspermissions) class.

The following code example shows how to create a user delegation SAS for a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-python.md)

---

## Use a user delegation SAS to authorize a client object

You can use a user delegation SAS to authorize a client object to perform operations on a container or blob based on the permissions granted by the SAS.

### [Container](#tab/container)

The following code example shows how to use the user delegation SAS created in the earlier example to authorize a [ContainerClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient) object. This client object can be used to perform operations on the container resource based on the permissions granted by the SAS.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-python.md)

### [Blob](#tab/blob)

The following code example shows how to use the user delegation SAS created in the earlier example to authorize a [BlobClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient) object. This client object can be used to perform operations on the blob resource based on the permissions granted by the SAS.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-python.md)

---

## Resources

To learn more about creating a user delegation SAS using the Azure Blob Storage client library for Python, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/python/blob-devguide-py/blob_devguide_create_sas.py)

### REST API operations

The Azure SDK for Python contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Python paradigms. The client library method for getting a user delegation key uses the following REST API operations:

- [Get User Delegation Key](https://learn.microsoft.com/rest/api/storageservices/get-user-delegation-key) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/python/api/azure-storage-blob)
- [Client library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-blob)
- [Package (PyPi)](https://pypi.org/project/azure-storage-blob/)

### See also

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md)
- [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas)


## Related content

- This article is part of the Blob Storage developer guide for Python. To learn more, see the full list of developer guide articles at [Build your Python app](storage-blob-python-get-started.md#build-your-app).
