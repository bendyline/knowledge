---
title: Create an account SAS with Java
titleSuffix: Azure Storage
description: Learn how to create an account shared access signature (SAS) using the Java client library.
services: storage
author: stevenmatthew

ms.service: azure-storage
ms.topic: how-to
ms.date: 08/05/2024
ms.author: shaas
ms.reviewer: dineshm
ms.subservice: storage-common-concepts
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: "As a Java developer, I want to create an account shared access signature (SAS) for a storage account, so that I can delegate access to service-level operations and manage resources across multiple services in a secure manner."
---

# Create an account SAS with Java


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


This article shows how to use the storage account key to create an account SAS with the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme).

## About the account SAS

An account SAS is created at the level of the storage account, and is signed with the account access key. By creating an account SAS, you can:

- Delegate access to service-level operations that aren't currently available with a service-specific SAS, such as [Get Blob Service Properties](https://learn.microsoft.com/rest/api/storageservices/get-blob-service-properties), [Set Blob Service Properties](https://learn.microsoft.com/rest/api/storageservices/set-blob-service-properties) and [Get Blob Service Stats](https://learn.microsoft.com/rest/api/storageservices/get-blob-service-stats).
- Delegate access to more than one service in a storage account at a time. For example, you can delegate access to resources in both Azure Blob Storage and Azure Files by using an account SAS.

Stored access policies aren't supported for an account SAS.

## Set up your project

To work with the code examples in this article, add the following import directives:

```java
import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import com.azure.storage.blob.sas.*;
import com.azure.storage.common.sas.AccountSasPermission;
import com.azure.storage.common.sas.AccountSasResourceType;
import com.azure.storage.common.sas.AccountSasService;
import com.azure.storage.common.sas.AccountSasSignatureValues;
```

## Create an account SAS

You can create an account SAS to delegate limited access to storage account resources using the following method:

- [generateAccountSas](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient#method-summary)

To configure the signature values for the account SAS, use the following helper classes:

- [AccountSasPermission](https://learn.microsoft.com/java/api/com.azure.storage.common.sas.accountsaspermission): Represents the permissions allowed by the SAS. In our example, we set the read permission to `true`.
- [AccountSasService](https://learn.microsoft.com/java/api/com.azure.storage.common.sas.accountsasservice): Represents the services accessible by the SAS. In our example, we allow access to the Blob service.
- [AccountSasResourceType](https://learn.microsoft.com/java/api/com.azure.storage.common.sas.accountsasresourcetype): Represents the resource types accessible by the SAS. In our example, we allow access to service-level APIs.

Once the helper classes are configured, you can initialize parameters for the SAS with an [AccountSasSignatureValues](https://learn.microsoft.com/java/api/com.azure.storage.common.sas.accountsassignaturevalues) instance.

The following code example shows how to configure SAS parameters and call the [generateAccountSas](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient#method-summary) method to get the account SAS: 

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-sas-create-java.md)

## Use an account SAS from a client

The following code example shows how to use the account SAS created in the earlier example to authorize a [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient) object. This client object can then be used to access service-level APIs based on the permissions granted by the SAS.

First, create a [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient) object signed with the account access key:

```java
String accountName = "<account-name>";
String accountKey = "<account-key>";
StorageSharedKeyCredential credential = new StorageSharedKeyCredential(accountName, accountKey);
        
BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
        .endpoint(String.format("https://%s.blob.core.windows.net/", accountName))
        .credential(credential)
        .buildClient();
```

Then, generate the account SAS as shown in the earlier example and use the SAS to authorize a [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient) object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-sas-create-java.md)

You can also use an account SAS to authorize and work with a [BlobContainerClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient) object or [BlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient) object, if those resource types are granted access as part of the signature values.

## Resources

To learn more about creating an account SAS using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

### See also

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](storage-sas-overview.md)
- [Create an account SAS](https://learn.microsoft.com/rest/api/storageservices/create-account-sas)
