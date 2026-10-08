---
title: Create a service SAS for a container or blob with .NET
titleSuffix: Azure Storage
description: Learn how to create a service shared access signature (SAS) for a container or blob using the Azure Blob Storage client library for .NET.
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 09/06/2024
ms.author: shaas
ms.reviewer: nachakra
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, engagement-fy23, devx-track-dotnet
# Customer intent: As a .NET developer, I want to create a service shared access signature (SAS) for a blob or container, so that I can manage access permissions and operations for storage resources securely and efficiently.
---

# Create a service SAS for a container or blob with .NET


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


This article shows how to use the storage account key to create a service SAS for a container or blob with the Azure Blob Storage client library for .NET.

## About the service SAS

A service SAS is signed with the account access key. You can use the [StorageSharedKeyCredential](https://learn.microsoft.com/dotnet/api/azure.storage.storagesharedkeycredential) class to create the credential that is used to sign the service SAS.

You can also use a stored access policy to define the permissions and duration of the SAS. If the name of an existing stored access policy is provided, that policy is associated with the SAS. To learn more about stored access policies, see [Define a stored access policy](#define-a-stored-access-policy). If no stored access policy is provided, the code examples in this article show how to define permissions and duration for the SAS.

## Create a service SAS

You can create a service SAS for a container or blob, based on the needs of your app.

### [Container](#tab/container)

The following code example shows how to create a service SAS for a container resource. First, the code verifies that the [BlobContainerClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient) object is authorized with a shared key credential by checking the [CanGenerateSasUri](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.cangeneratesasuri) property. Then, it generates the service SAS via the [BlobSasBuilder](https://learn.microsoft.com/dotnet/api/azure.storage.sas.blobsasbuilder) class, and calls [GenerateSasUri](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.generatesasuri) to create a service SAS URI based on the client and builder objects. 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

### [Blob](#tab/blob)

The following code example shows how to create a service SAS for a blob resource. First, the code verifies that the [BlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient) object is authorized with a shared key credential by checking the [CanGenerateSasUri](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.cangeneratesasuri#azure-storage-blobs-specialized-blobbaseclient-cangeneratesasuri) property. Then, it generates the service SAS via the [BlobSasBuilder](https://learn.microsoft.com/dotnet/api/azure.storage.sas.blobsasbuilder) class, and calls [GenerateSasUri](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.generatesasuri#azure-storage-blobs-specialized-blobbaseclient-generatesasuri\(azure-storage-sas-blobsasbuilder\)) to create a service SAS URI based on the client and builder objects. 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

---

## Use a service SAS to authorize a client object

You can use a service SAS to authorize a client object to perform operations on a container or blob based on the permissions granted by the SAS.

### [Container](#tab/container)

The following code examples show how to use the service SAS to authorize a [BlobContainerClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient) object. This client object can be used to perform operations on the container resource based on the permissions granted by the SAS.

First, create a [BlobServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient) object signed with the account access key:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

Then, generate the service SAS as shown in the earlier example and use the SAS to authorize a [BlobContainerClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient) object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

### [Blob](#tab/blob)

The following code example shows how to use the service SAS to authorize a [BlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient) object. This client object can be used to perform operations on the blob resource based on the permissions granted by the SAS.

First, create a [BlobServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient) object signed with the account access key:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

Then, generate the service SAS as shown in the earlier example and use the SAS to authorize a [BlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient) object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

---


## Define a stored access policy

A stored access policy provides an additional level of control over a service-level shared access signature (SAS) on the server side. Establishing a stored access policy serves to group shared access signatures and to provide additional restrictions for signatures that are bound by the policy.

You can use a stored access policy to change the start time, expiry time, or permissions for a signature. You can also use a stored access policy to revoke a signature after it has been issued. This section focuses on blob containers, but stored access policies are also supported for file shares, queues, and tables.

To manage stored access policies on a container resource, call one of the following methods from a [BlobContainerClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient) object:

- [SetAccessPolicy](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.setaccesspolicy)
- [SetAccessPolicyAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.setaccesspolicyasync)

### Create or modify a stored access policy

You can set a maximum of five access policies on a resource at a time. Each `SignedIdentifier` field, with its unique `Id` field, corresponds to one access policy. Trying to set more than five access policies at one time causes the service to return status code `400 (Bad Request)`.

The following code example shows how to create two stored access policies on a container resource:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

You can also modify an existing policy. The following code example shows how to modify a single stored access policy to update the policy expiration date:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

### Revoke or delete a stored access policy

To revoke a stored access policy, Microsoft recommends deleting the signed identifier and making a new one. Changing the signed identifier breaks the associations between any existing signatures and the stored access policy. Deleting or modifying the stored access policy immediately affects all of the shared access signatures associated with it.

The following code example shows how to revoke a policy by changing the `Id` property for the signed identifier. This approach effectively deletes the signed identifier and makes a new one:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)

You can also remove all access policies from a container resource by calling [SetAccessPolicyAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.setaccesspolicyasync) with an empty `permissions` parameter. The following example shows how to delete all stored access policies from a specified container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-dotnet.md)


## Resources

To learn more about creating a service SAS using the Azure Blob Storage client library for .NET, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSAS.cs)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md)
- [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas)
