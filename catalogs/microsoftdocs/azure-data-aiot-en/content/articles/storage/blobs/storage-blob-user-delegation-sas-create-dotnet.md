---
title: Create a user delegation SAS for Azure Blob, Azure Files, and Azure Queue with .NET
titleSuffix: Azure Storage
description: Learn how to create a user delegation SAS for a container or blob with Microsoft Entra credentials by using the .NET client library for Blob Storage, File Storage, or Queue Storage.
services: storage
author: stevenmatthew
ms.author: shaas
ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 09/06/2024
ms.reviewer: dineshm
ms.devlang: csharp
ms.custom: devx-track-csharp, devguide-csharp, devx-track-dotnet
# Customer intent: As a developer, I want to create a user delegation SAS for blobs and containers, files, or queues using .NET, so that I can securely grant limited access to storage resources based on user permissions.
---

# Create a user delegation SAS for Azure Blob, Azure Files, and Azure Queue with .NET


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


This article shows how to use Microsoft Entra credentials to create a user delegation SAS for a container or blob using the [Azure Storage client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/storage).


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

Install the following packages:

### [.NET CLI](#tab/packages-dotnetcli)

```dotnetcli
dotnet add package Azure.Identity
dotnet add package Azure.Storage.Blobs
```

### [PowerShell](#tab/packages-powershell)

```powershell
Install-Package Azure.Identity
Install-Package Azure.Storage.Blobs
```
---

### Set up the app code

Add the following `using` directives for Blobs:

```csharp
using Azure;
using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
using Azure.Storage.Sas;
```
Add the following `using` directives for Files:

```csharp
using Azure;
using Azure.Identity;
using Azure.Storage.Files;
using Azure.Storage.Files.Models;
using Azure.Storage.Files.Specialized;
using Azure.Storage.Sas;
```
Add the following `using` directives for Queues:

```csharp
using Azure;
using Azure.Identity;
using Azure.Storage.Queues;
using Azure.Storage.Queues.Models;
using Azure.Storage.Queues.Specialized;
using Azure.Storage.Sas;
```


## Get an authenticated token credential

To get a token credential that your code can use to authorize requests to Blob Storage, create an instance of the [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential) class. For more information about using the DefaultAzureCredential class to authorize a managed identity to access Blob Storage, see [Azure Identity client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme?toc=/azure/storage/blobs/toc.json).

The following code snippet shows how to get the authenticated token credential and use it to create a service client for Blob storage:

```csharp
// Construct the blob endpoint from the account name.
string endpoint = $"https://{accountName}.blob.core.windows.net";

// Create a blob service client object using DefaultAzureCredential
BlobServiceClient blobServiceClient = new BlobServiceClient(
    new Uri(endpoint),
    new DefaultAzureCredential());
```

To learn more about authorizing access to Blob Storage from your applications with the .NET SDK, see [How to authenticate .NET applications with Azure services](https://learn.microsoft.com/dotnet/azure/sdk/authentication).

The following code snippet shows how to get the authenticated token credential and use it to create a service client for File storage:

```csharp
// Construct the file endpoint from the account name.
string endpoint = $"https://{accountName}.file.core.windows.net”;

// Create a file service client object using DefaultAzureCredential
FilesServiceClient filesServiceClient = new filesServiceClient(
    new Uri(endpoint),
    new DefaultAzureCredential());
```

The following code snippet shows how to get the authenticated token credential and use it to create a service client for Queue storage:

```csharp
// Construct the queue endpoint from the account name.
string endpoint = $"https://{accountName}.queue.core.windows.net";

// Create a queue service client object using DefaultAzureCredential
QueueServiceClient queueServiceClient = new QueueServiceClient(
    new Uri(endpoint),
    new DefaultAzureCredential());
```

## Get the user delegation key

Every SAS is signed with a key. To create a user delegation SAS, you must first request a user delegation key, which is then used to sign the SAS. The user delegation key is analogous to the account key used to sign a service SAS or an account SAS, except that it relies on your Microsoft Entra credentials. When a client requests a user delegation key using an OAuth 2.0 token, Blob Storage returns the user delegation key on behalf of the user.

Once you have the user delegation key, you can use that key to create any number of user delegation shared access signatures, over the lifetime of the key. The user delegation key is independent of the OAuth 2.0 token used to acquire it, so the token doesn't need to be renewed if the key is still valid. You can specify the length of time that the key remains valid, up to a maximum of seven days.

You can now optionally provide the `delegatedUserId` when you get the user delegation key. By providing this value, you specify the identity of the intended end user of the SAS token. This user delegation key creates a user-bound user delegation SAS token.

Use one of the following methods to request the user delegation key:

- [GetUserDelegationKey](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient.getuserdelegationkey)
- [GetUserDelegationKeyAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient.getuserdelegationkeyasync)

The following code example shows how to request the user delegation for Blobs:

```csharp
public static async Task<UserDelegationKey> RequestUserDelegationKey(
    BlobServiceClient blobServiceClient)
{
    // Get a user delegation key for the Blob service that's valid for 1 day
    UserDelegationKey userDelegationKey =
        await blobServiceClient.GetUserDelegationKeyAsync(
            DateTimeOffset.UtcNow,
            DateTimeOffset.UtcNow.AddDays(1));

    return userDelegationKey;
}
```

The following code example shows how to request the user delegation for Files:

```csharp
public static async Task<UserDelegationKey> RequestUserDelegationKey(
    FileServiceClient fileServiceClient)
{
    // Get a user delegation key for the Azure Files Service that's valid for 1 day
    UserDelegationKey userDelegationKey =
        await fileServiceClient.GetUserDelegationKeyAsync(
            DateTimeOffset.UtcNow,
            DateTimeOffset.UtcNow.AddDays(1));

    return userDelegationKey;
}
```

The following code example shows how to request the user delegation for Queues:

```csharp
public static async Task<UserDelegationKey> RequestUserDelegationKey(
    QueueServiceClient queueServiceClient)
{
    // Get a user delegation key for the Queue service that's valid for 1 day
    UserDelegationKey userDelegationKey =
        await queueServiceClient.GetUserDelegationKeyAsync(
            DateTimeOffset.UtcNow,
            DateTimeOffset.UtcNow.AddDays(1));

    return userDelegationKey;
}
```

The following code sample shows how to request the user-bound user delegation key for blobs:

```csharp

public static async Task<UserDelegationKey> RequestUserDelegationKey(
BlobServiceClient blobServiceClient)
{     
    //Get a user-bound user delegation key for the Blob service that's valid for 1 day 
    BlobGetUserDelegationKeyOptions options =
        new BlobGetUserDelegationKeyOptions(startsOn: DateTimeOffset.UtcNow, endsOn: DateTimeOffset.UtcNow.AddDays(1)){ 
        DelegatedUserTenantId = "delegatedUserTenantId" 
    }; 

    Task<UserDelegationKey> userDelegationKey = await blobServiceClient.GetUserDelegationKeyAsync(options); 
    return userDelegationKey.Value; 

}
```


## Create a user delegation SAS

You can create a user delegation SAS for a blob container, blob, file share, file, or queue, based on the needs of your app.

### [Container](#tab/container)

Once you've obtained the user delegation key, you can create a user delegation SAS to delegate limited access to a container. The following code example shows how to create a user delegation SAS for a container:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-dotnet.md)

### [Blob](#tab/blob)

Once you've obtained the user delegation key, you can create a user delegation SAS to delegate limited access to a blob. The following code example shows how to create a user delegation SAS for a blob:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-dotnet.md)

### [Files](#tab/file)
Once you've obtained the user delegation key, you can create a user delegation SAS to delegate limited access to a file. The following code example shows how to create a user delegation SAS for a file:

```csharp
public static async Task<Uri> CreateUserDelegationSASFile(
    FileClient fileClient,
    UserDelegationKey userDelegationKey)
{
    // Create a SAS token for the container resource that's also valid for 1 day
    FileSasBuilder sasBuilder = new BlobSasBuilder()
    {
        FileContainerName = fileClient.FileContainerName,
        FileName = fileClient.Name,
        Resource = "f",
        StartsOn = DateTimeOffset.UtcNow,
        ExpiresOn = DateTimeOffset.UtcNow.AddDays(1)
    };

    // Specify the necessary permissions
    sasBuilder.SetPermissions(FileSasPermissions.Read | FileSasPermissions.Write);

     // Add the SAS token to the file URI
    ShareUriBuilder uriBuilder = new ShareUriBuilder(shareClient.Uri)
    {
        // Specify the user delegation key
        Sas = sasBuilder.ToSasQueryParameters(
            userDelegationKey,
            fileClient
            .GetParentFileContainerClient()
            .GetParentFileServiceClient().AccountName)
    };
    return uriBuilder.ToUri();
```

### [Queue](#tab/queue)
Once you've obtained the user delegation key, you can create a user delegation SAS to delegate limited access to a queue. The following code example shows how to create a user delegation SAS for a queue:

```csharp
public static async Task<Uri> CreateUserDelegationSASQueue(
    QueueClient queueClient,
    UserDelegationKey userDelegationKey)
{
    // Create a SAS token for the container resource that's also valid for 1 day
    QueueSasBuilder sasBuilder = new QueueSasBuilder()
    {
        QueueContainerName = queueClient.QueueContainerName,
        QueueName = queueClient.Name,
        Resource = "q",
        StartsOn = DateTimeOffset.UtcNow,
        ExpiresOn = DateTimeOffset.UtcNow.AddDays(1)
    };

    // Specify the necessary permissions
    sasBuilder.SetPermissions(QueueSasPermissions.Read | QueueSasPermissions.Write);

     // Add the SAS token to the queue URI
    BlobUriBuilder uriBuilder = new BlobUriBuilder(blobClient.Uri)
    {
        // Specify the user delegation key
        Sas = sasBuilder.ToSasQueryParameters(
            userDelegationKey,
            queueClient
            .GetParentFileContainerClient()
            .GetParentFileServiceClient().AccountName)
    };
    return uriBuilder.ToUri();
}
```
You can also create a user-bound user delegation SAS for a blob container, blob, file share, file, or queue. This example shows how to create a user-bound user delegation SAS for a blob, but the delegatedUserId can be used for any Azure service. 

```csharp
public static async Task<Uri> CreateUserDelegationSasBlob(BlobClient blobClient, UserDelegationKey userDelegationKey){

    //Create a SAS token for the blob resource that's valid for 1 day 
    BlobSasBuilder sasBuilder = new BlobSasBuilder(){ 
        BlobContainerName = blobClient.BlobContainerName, 
        BlobName = blobClient.Name, 
        Resource = "b", 
        StartsOn = DateTimeOffset.UtcNow, 
        ExpiresOn = DateTimeOffset.UtcNow.AddDays(1), 
        DelegatedUserObjectId = "delegatedUserId" 
    };

    //Specify the necessary permissions 
    sasBuilder.SetPermissions(BlobSasPermissions.Read | BlobSasPermissions.Write); 
     
    //Add the SAS token to the blob URI 
    BlobUriBuilder uriBuilder = new BlobUriBuilder(blobClient.Uri){ 
        Sas = sasBuilder.ToSasQueryParameters( 
            userDelegationKey, 
            blobClient.GetParentBlobContainerClient().GetParentBlobServiceClient().AccountName) 
    }; 
    return uriBuilder.ToUri(); 
} 
```

---

## Use a user delegation SAS to authorize a client object

You can use a user delegation SAS to authorize a client object to perform operations on a blob container, blob, file share, file, or queue based on the permissions granted by the SAS.

### [Container](#tab/container)

The following code example shows how to use the user delegation SAS to authorize a [BlobContainerClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient) object. This client object can be used to perform operations on the container resource based on the permissions granted by the SAS.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-dotnet.md)

### [Blob](#tab/blob)

The following code example shows how to use the user delegation SAS to authorize a [BlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient) object. This client object can be used to perform operations on the blob resource based on the permissions granted by the SAS.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blob-user-delegation-sas-create-dotnet.md)

### [Files](#tab/file)

The following code example shows how to use the user delegation SAS to authorize a [FileClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.shares.sharefileclient) object. This client object can be used to perform operations in an Azure file share based on the permissions granted by the SAS.

```csharp
// Create a Uri object with a user delegation SAS appended
FileClient fileClient = filesServiceClient
    .GetFileShareClient("sample-share")
    .GetRootDirectoryClient()
    .GetFileClient("sample-file.txt");
Uri fileSASURI = await CreateUserDelegationSASFile(fileClient, userDelegationKey);

// Create a file client object with SAS authorization
FileClient fileClientSAS = new FileClient(fileSASURI);
```

### [Queue](#tab/queue)

The following code example shows how to use the user delegation SAS to authorize a [QueueClient](https://learn.microsoft.com/dotnet/api/azure.storage.queues.queueclient) object. This client object can be used to perform operations on the queue resource based on the permissions granted by the SAS.

```csharp
// Create a Uri object with a user delegation SAS appended
QueueClient queueClient = queueServiceClient
    .GetQueueClient("sample-queue");
Uri queueSASURI = await CreateUserDelegationSASQueue(queueClient, userDelegationKey);

// Create a queue client object with SAS authorization
QueueClient queueClientSAS = new QueueClient(queueSASURI);
```

---

## Resources

To learn more about creating a user delegation SAS using the Azure Blob Storage client library for .NET, see the following resources.

### Code samples

- [View code samples from this article (GitHub)](https://github.com/Azure-Samples/AzureStorageSnippets/blob/master/blobs/howto/dotnet/BlobDevGuideBlobs/CreateSAS.cs)

### REST API operations

The Azure SDK for .NET contains libraries that build on top of the Azure REST API, allowing you to interact with REST API operations through familiar .NET paradigms. The client library method for getting a user delegation key uses the following REST API operation:

- [Get User Delegation Key](https://learn.microsoft.com/rest/api/storageservices/get-user-delegation-key) (REST API)


### Client library resources

- [Client library reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs)
- [Client library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs)

### See also

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md)
- [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas)


## Related content

- This article is part of the Blob Storage developer guide for .NET. To learn more, see the full list of developer guide articles at [Build your .NET app](storage-blob-dotnet-get-started.md#build-your-app).
