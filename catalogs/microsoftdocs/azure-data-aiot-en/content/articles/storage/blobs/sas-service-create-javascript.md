---
title: Create a service SAS for a container or blob with JavaScript
titleSuffix: Azure Storage
description: Learn how to create a service shared access signature (SAS) for a container or blob using the Azure Blob Storage client library for JavaScript.
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.reviewer: nachakra
ms.devlang: javascript
ms.custom: devx-track-javascript, engagement-fy23, devx-track-js, devguide-js
# Customer intent: As a JavaScript developer, I want to create a service shared access signature for a storage container or blob, so that I can securely grant temporary access to Azure Storage resources.
---

# Create a service SAS for a container or blob with JavaScript


A shared access signature (SAS) enables you to grant limited access to containers and blobs in your storage account. When you create a SAS, you specify its constraints, including which Azure Storage resources a client is allowed to access, what permissions they have on those resources, and how long the SAS is valid.

Every SAS is signed with a key. You can sign a SAS in one of two ways:

- With a key created using Microsoft Entra credentials. A SAS that is signed with Microsoft Entra credentials is a *user delegation* SAS. A client that creates a user delegation SAS must be assigned an Azure RBAC role that includes the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action. To learn more, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas#assign-permissions-with-rbac).
- With the storage account key. Both a *service SAS* and an *account SAS* are signed with the storage account key. The client that creates a service SAS must either have direct access to the account key or be assigned the **Microsoft.Storage/storageAccounts/listkeys/action** permission. To learn more, see [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas) or [Create an account SAS](https://learn.microsoft.com/rest/api/storageservices/create-account-sas).

> **Note:**
> A user delegation SAS offers superior security to a SAS that is signed with the storage account key. Microsoft recommends using a user delegation SAS when possible. For more information, see [Grant limited access to data with shared access signatures (SAS)](../common/storage-sas-overview.md).


This article shows how to use the storage account key to create a service SAS for a container or blob with the Blob Storage client library for JavaScript.

## Create a service SAS for a blob container

The following code example creates a SAS for a container. If the name of an existing stored access policy is provided, that policy is associated with the SAS. If no stored access policy is provided, then the code creates an ad hoc SAS on the container.

A service SAS is signed with the account access key. Use the [StorageSharedKeyCredential](https://learn.microsoft.com/javascript/api/@azure/storage-blob/storagesharedkeycredential) class to create the credential that is used to sign the SAS. Next, call the [generateBlobSASQueryParameters](https://learn.microsoft.com/javascript/api/@azure/storage-blob/#@azure-storage-blob-generateblobsasqueryparameters) function providing the required parameters to get the SAS token string.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/SAS.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-javascript.md)

## Create a service SAS for a blob

The following code example creates a SAS on a blob. If the name of an existing stored access policy is provided, that policy is associated with the SAS. If no stored access policy is provided, then the code creates an ad hoc SAS on the blob.

To create a service SAS for a blob, call the [generateBlobSASQueryParameters](https://learn.microsoft.com/javascript/api/@azure/storage-blob/#@azure-storage-blob-generateblobsasqueryparameters) function providing the required parameters.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/JavaScript/NodeJS-v12/SAS.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-javascript.md)


## Resources for development with JavaScript

The links below provide useful resources for developers using the Azure Storage client library for JavaScript

### Blob storage APIs

- [Azure Storage Blob client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/storage-blob-readme)
- [Library source code](https://github.com/Azure/azure-sdk-for-js/tree/@azure/storage-blob_12.2.1/sdk/storage/storage-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob)

### JavaScript tools

- [Node.js](https://nodejs.org/en/download/package-manager/)
- [Visual Studio Code](https://code.visualstudio.com/)


## Next steps

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md)
- [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas)
