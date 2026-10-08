---
title: Create a user delegation SAS for a blob with Java
titleSuffix: Azure Storage
description: Learn how to create a user delegation SAS for a container or blob with Microsoft Entra credentials by using the Azure Storage client library for Java.
services: storage
author: stevenmatthew
ms.author: shaas
ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 09/06/2024
ms.reviewer: dineshm
ms.devlang: java
ms.custom: devx-track-java, devguide-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to create a user delegation SAS for Azure Blob Storage, so that I can securely grant limited access to my blob resources using Microsoft Entra credentials.
---

# Create a user delegation SAS for a container or blob with Java


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


This article shows how to use Microsoft Entra credentials to create a user delegation SAS for a container or blob using the [Azure Storage client library for Java](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme).


## About the user delegation SAS

A SAS token for access to a container or blob may be secured by using either Microsoft Entra credentials or an account key. A SAS secured with Microsoft Entra credentials is called a user delegation SAS, because the OAuth 2.0 token used to sign the SAS is requested on behalf of the user.

Microsoft recommends that you use Microsoft Entra credentials when possible as a security best practice, rather than using the account key, which can be more easily compromised. When your application design requires shared access signatures, use Microsoft Entra credentials to create a user delegation SAS for superior security. For more information about the user delegation SAS, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas).

> **Caution:**
> Any client that possesses a valid SAS can access data in your storage account as permitted by that SAS. It's important to protect a SAS from malicious or unintended use. Use discretion in distributing a SAS and have a plan in place for revoking a compromised SAS. To prevent unintended use, use user-bound user delegated SAS, which ties the SAS token to the intended end user and can't be used by anyone else.

For more information about shared access signatures, see [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md).


## Assign Azure roles for access to data

When a Microsoft Entra security principal attempts to access data, that security principal must have permissions to the resource. Whether the security principal is a managed identity in Azure or a Microsoft Entra user account running code in the development environment, the security principal must be assigned an Azure role that grants access to data. For information about assigning permissions via Azure RBAC, see [Assign an Azure role for access to blob data](assign-azure-role-data-access.md).


## Set up your project

To work with the code examples in this article, add the following import directives:

```java
import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import com.azure.storage.blob.sas.*;
```

## Get an authenticated token credential

To get a token credential that your code can use to authorize requests to Blob Storage, create an instance of the [DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential) class. For more information about using the DefaultAzureCredential class to authorize a managed identity to access Blob Storage, see [Azure Identity client library for Java](https://learn.microsoft.com/java/api/overview/azure/identity-readme).

The following code snippet shows how to get the authenticated token credential and use it to create a service client for Blob storage:

```java
BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
        .endpoint("https://<storage-account-name>.blob.core.windows.net/")
        .credential(new DefaultAzureCredentialBuilder().build())
        .buildClient();
```

To learn more about authorizing access to Blob Storage from your applications with the Java SDK, see [Azure authentication with Java and Azure Identity](https://learn.microsoft.com/azure/developer/java/sdk/identity).

## Get the user delegation key

Every SAS is signed with a key. To create a user delegation SAS, you must first request a user delegation key, which is then used to sign the SAS. The user delegation key is analogous to the account key used to sign a service SAS or an account SAS, except that it relies on your Microsoft Entra credentials. When a client requests a user delegation key using an OAuth 2.0 token, Blob Storage returns the user delegation key on behalf of the user.

Once you have the user delegation key, you can use that key to create any number of user delegation shared access signatures, over the lifetime of the key. The user delegation key is independent of the OAuth 2.0 token used to acquire it, so the token doesn't need to be renewed if the key is still valid. You can specify the length of time that the key remains valid, up to a maximum of seven days.

Use one of the following methods to request the user delegation key:

- [getUserDelegationKey](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#method-details)

The following code example shows how to request the user delegation key:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-java.md)


## Create a user delegation SAS

You can create a user delegation SAS for a container or blob, based on the needs of your app.

### [Container](#tab/container)

Once you've obtained the user delegation key, you can create a user delegation SAS. You can create a user delegation SAS to delegate limited access to a container resource using the following method from a [BlobContainerClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient) instance:

- [generateUserDelegationSas](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#method-details)

The user delegation key to sign the SAS is passed to this method along with specified values for [BlobServiceSasSignatureValues](https://learn.microsoft.com/java/api/com.azure.storage.blob.sas.blobservicesassignaturevalues). Permissions are specified as a [BlobContainerSasPermission](https://learn.microsoft.com/java/api/com.azure.storage.blob.sas.blobcontainersaspermission) instance.

The following code example shows how to create a user delegation SAS for a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-java.md)

### [Blob](#tab/blob)

Once you've obtained the user delegation key, you can create a user delegation SAS. You can create a user delegation SAS to delegate limited access to a blob using the following method from a [BlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient) instance:

- [generateUserDelegationSas](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase#method-details)

The user delegation key to sign the SAS is passed to this method along with specified values for [BlobServiceSasSignatureValues](https://learn.microsoft.com/java/api/com.azure.storage.blob.sas.blobservicesassignaturevalues). Permissions are specified as a [BlobSasPermission](https://learn.microsoft.com/java/api/com.azure.storage.blob.sas.blobsaspermission) instance.

The following code example shows how to create a user delegation SAS for a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-java.md)

---

## Use a user delegation SAS to authorize a client object

You can use a user delegation SAS to authorize a client object to perform operations on a container or blob based on the permissions granted by the SAS.

### [Container](#tab/container)

The following code example shows how to use the user delegation SAS created in the earlier example to authorize a [BlobContainerClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient) object. This client object can be used to perform operations on the container resource based on the permissions granted by the SAS.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-java.md)

### [Blob](#tab/blob)

The following code example shows how to use the user delegation SAS created in the earlier example to authorize a [BlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient) object. This client object can be used to perform operations on the blob resource based on the permissions granted by the SAS.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-java.md)

---

## Resources

To learn more about creating a user delegation SAS using the Azure Blob Storage client library for Java, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/Java/blob-devguide/blob-devguide-blobs/src/main/java/com/blobs/devguide/blobs/BlobSAS.java)

### REST API operations

The Azure SDK for Java contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar Java paradigms. The client library method for getting a user delegation key uses the following REST API operation:

- [Get User Delegation Key](https://learn.microsoft.com/rest/api/storageservices/get-user-delegation-key) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme)
- [Client library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob)
- [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob)

### See also

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md)
- [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas)


## Related content

- This article is part of the Blob Storage developer guide for Java. To learn more, see the full list of developer guide articles at [Build your Java app](storage-blob-java-get-started.md#build-your-app).
