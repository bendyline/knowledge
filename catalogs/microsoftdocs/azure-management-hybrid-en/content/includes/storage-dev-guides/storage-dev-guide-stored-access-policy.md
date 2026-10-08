---
title: "include file"
description: "include file"
services: storage
author: pauljewellmsft
ms.service: azure-blob-storage
ms.topic: include
ms.date: 05/10/2024
ms.author: pauljewell
ms.custom: include file
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

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/storage-dev-guides/storage-dev-guide-stored-access-policy.md)

You can also modify an existing policy. The following code example shows how to modify a single stored access policy to update the policy expiration date:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/storage-dev-guides/storage-dev-guide-stored-access-policy.md)

### Revoke or delete a stored access policy

To revoke a stored access policy, Microsoft recommends deleting the signed identifier and making a new one. Changing the signed identifier breaks the associations between any existing signatures and the stored access policy. Deleting or modifying the stored access policy immediately affects all of the shared access signatures associated with it.

The following code example shows how to revoke a policy by changing the `Id` property for the signed identifier. This approach effectively deletes the signed identifier and makes a new one:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/storage-dev-guides/storage-dev-guide-stored-access-policy.md)

You can also remove all access policies from a container resource by calling [SetAccessPolicyAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.setaccesspolicyasync) with an empty `permissions` parameter. The following example shows how to delete all stored access policies from a specified container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/storage-dev-guides/storage-dev-guide-stored-access-policy.md)
