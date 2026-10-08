---
title: Create a service SAS for a container or blob with Java
titleSuffix: Azure Storage
description: Learn how to create a service shared access signature (SAS) for a container or blob using the Azure Blob Storage client library for Java.
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 09/06/2024
ms.author: shaas
ms.reviewer: nachakra
ms.devlang: java
ms.custom: devx-track-java, devguide-java, engagement-fy23, devx-track-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to create a service shared access signature (SAS) for a container or blob, so that I can securely delegate limited access to Azure Blob Storage resources in my applications.
---

# Create a service SAS for a container or blob with Java


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


This article shows how to use the storage account key to create a service SAS for a container or blob with the Blob Storage client library for Java.

## About the service SAS

A service SAS is signed with the account access key. You can use the [StorageSharedKeyCredential](https://learn.microsoft.com/java/api/com.azure.storage.common.storagesharedkeycredential) class to create the credential that is used to sign the service SAS.

You can also use a stored access policy to define the permissions and duration of the SAS. If the name of an existing stored access policy is provided, that policy is associated with the SAS. To learn more about stored access policies, see [Define a stored access policy](https://learn.microsoft.com/rest/api/storageservices/define-stored-access-policy). If no stored access policy is provided, the code examples in this article show how to define permissions and duration for the SAS.

## Create a service SAS

You can create a service SAS for a container or blob, based on the needs of your app.

### [Container](#tab/container)

You can create a service SAS to delegate limited access to a container resource using the following method:

- [generateSas](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#method-details)

SAS signature values, such as expiry time and signed permissions, are passed to the method as part of a [BlobServiceSasSignatureValues](https://learn.microsoft.com/java/api/com.azure.storage.blob.sas.blobservicesassignaturevalues) instance. Permissions are specified as a [BlobContainerSasPermission](https://learn.microsoft.com/java/api/com.azure.storage.blob.sas.blobcontainersaspermission) instance.

The following code example shows how to create a service SAS with read permissions for a container resource:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-java.md)

### [Blob](#tab/blob)

You can create a service SAS to delegate limited access to a blob resource using the following method:

- [generateSas](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#method-details)

SAS signature values, such as expiry time and signed permissions, are passed to the method as part of a [BlobServiceSasSignatureValues](https://learn.microsoft.com/java/api/com.azure.storage.blob.sas.blobservicesassignaturevalues) instance. Permissions are specified as a [BlobSasPermission](https://learn.microsoft.com/java/api/com.azure.storage.blob.sas.blobsaspermission) instance.

The following code example shows how to create a service SAS with read permissions for a blob resource:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-java.md)

---

## Use a service SAS to authorize a client object

You can use a service SAS to authorize a client object to perform operations on a container or blob based on the permissions granted by the SAS.

### [Container](#tab/container)

The following code examples show how to use the service SAS to authorize a [BlobContainerClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient) object. This client object can be used to perform operations on the container resource based on the permissions granted by the SAS.

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

Then, generate the service SAS as shown in the earlier example and use the SAS to authorize a [BlobContainerClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient) object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-java.md)

### [Blob](#tab/blob)

The following code example shows how to use the service SAS created in the earlier example to authorize a [BlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient) object. This client object can be used to perform operations on the blob resource based on the permissions granted by the SAS.

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

Then, generate the service SAS as shown in the earlier example and use the SAS to authorize a [BlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient) object:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/sas-service-create-java.md)

---

## Resources

To learn more about using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

### See also

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md)
- [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas)
