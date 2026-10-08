---
title: Configure a connection string
titleSuffix: Azure Storage
description: Configure a connection string for an Azure storage account. A connection string contains the information needed to authorize access to a storage account from your application at runtime using Shared Key authorization.
services: storage
author: khdownie
ms.author: kendownie
ms.service: azure-storage
ms.subservice: storage-common-concepts
ms.topic: how-to
ms.date: 05/10/2024
ms.reviewer: nachakra
# Customer intent: As a software developer, I want to configure a connection string for my Azure storage account, so that my application can securely access data at runtime using Shared Key authorization.
---

# Configure Azure Storage connection strings

A connection string includes the authorization information required for your application to access data in an Azure Storage account at runtime using Shared Key authorization. You can configure connection strings to:

- Connect to the Azurite storage emulator.
- Access a storage account in Azure.
- Access specified resources in Azure via a shared access signature (SAS).

To learn how to view your account access keys and copy a connection string, see [Manage storage account access keys](storage-account-keys-manage.md).


> **Important:**
> For optimal security, Microsoft recommends using Microsoft Entra ID with managed identities to authorize requests against blob, queue, and table data, whenever possible. Authorization with Microsoft Entra ID and managed identities provides superior security and ease of use over Shared Key authorization. To learn more about managed identities, see [What are managed identities for Azure resources](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview). For an example of how to enable and use a managed identity for a .NET application, see [Authenticating Azure-hosted apps to Azure resources with .NET](https://learn.microsoft.com/dotnet/azure/sdk/authentication/azure-hosted-apps).
>
> For resources hosted outside of Azure, such as on-premises applications, you can use managed identities through Azure Arc. For example, apps running on Azure Arc-enabled servers can use managed identities to connect to Azure services. To learn more, see [Authenticate against Azure resources with Azure Arc-enabled servers](https://learn.microsoft.com/azure/azure-arc/servers/managed-identity-authentication).
>
> For scenarios where shared access signatures (SAS) are used, Microsoft recommends using a user delegation SAS. A user delegation SAS is secured with Microsoft Entra credentials instead of the account key. To learn about shared access signatures, see [Grant limited access to data with shared access signatures](storage-sas-overview.md). For an example of how to create and use a user delegation SAS with .NET, see [Create a user delegation SAS for a blob with .NET](https://learn.microsoft.com/azure/storage/blobs/storage-blob-user-delegation-sas-create-dotnet).



## Protect your access keys

Storage account access keys provide full access to the storage account data and the ability to generate SAS tokens. Always be careful to protect your access keys. Use Azure Key Vault to manage and rotate your keys securely. Access to the shared key grants a user full access to a storage account’s data. Access to shared keys should be carefully limited and monitored. Use user delegation SAS tokens with limited scope of access in scenarios where Microsoft Entra ID based authorization can't be used. Avoid hard-coding access keys or saving them anywhere in plain text that is accessible to others. Rotate your keys if you believe they might have been compromised.

> **Important:**
> To prevent users from accessing data in your storage account with Shared Key, you can disallow Shared Key authorization for the storage account. Granular access to data with least privileges necessary is recommended as a security best practice. Microsoft Entra ID based authorization using managed identities should be used for scenarios that support OAuth. Kerberos should be used for Azure Files over SMB. For Azure Files over REST, SAS tokens can be used. Shared key access should be disabled if not required to prevent its inadvertent use. For more information, see [Prevent Shared Key authorization for an Azure Storage account](shared-key-authorization-prevent.md).
>
> To protect an Azure Storage account with Microsoft Entra Conditional Access policies, you must disallow Shared Key authorization for the storage account.
> 
> If you have disabled shared key access and you are seeing Shared Key authorization reported in the diagnostic logs, this indicates that trusted access is being used to access storage. For more details, see [Trusted access for resources registered in your Microsoft Entra tenant](storage-network-security-trusted-azure-services.md#trusted-access-for-resources-registered-in-your-microsoft-entra-tenant).


## Store a connection string

Your application needs to access the connection string at runtime to authorize requests made to Azure Storage. You have several options for storing your account access keys or connection string:

- Microsoft recommends using Microsoft Entra ID to authorize access to Azure Storage instead of account keys. If you must use account keys, store them securely in Azure Key Vault. For more information, see [Authorize access to data in Azure Storage](https://learn.microsoft.com/azure/storage/common/authorize-data-access).
- You can store your connection string in an environment variable.
- An application can store the connection string in an **app.config** or **web.config** file. Add the connection string to the **AppSettings** section in these files.

> **Warning:**
> Storing your account access keys or connection string in clear text presents a security risk and is not recommended. Store your account keys in an encrypted format, or migrate your applications to use Microsoft Entra authorization for access to your storage account.

## Configure a connection string for Azurite


The emulator supports a single fixed account and a well-known authentication key for Shared Key authentication. This account and key are the only Shared Key credentials permitted for use with the emulator. They are:

```
Account name: devstoreaccount1
Account key: Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==
```

> **Note:**
> The authentication key supported by the emulator is intended only for testing the functionality of your client authentication code. It does not serve any security purpose. You cannot use your production storage account and key with the emulator. You should not use the development account with production data.
>
> The emulator supports connection via HTTP only. However, HTTPS is the recommended protocol for accessing resources in a production Azure storage account.
>

#### Connect to the emulator account using the shortcut

The easiest way to connect to the emulator from your application is to configure a connection string in your application's configuration file that references the shortcut `UseDevelopmentStorage=true`. The shortcut is equivalent to the full connection string for the emulator, which specifies the account name, the account key, and the emulator endpoints for each of the Azure Storage services:

```
DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;
AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;
BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;
QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;
TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;
```

The following .NET code snippet shows how you can use the shortcut from a method that takes a connection string. For example, the [BlobContainerClient(String, String)](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.-ctor#Azure_Storage_Blobs_BlobContainerClient__ctor_System_String_System_String_) constructor takes a connection string.

```csharp
BlobContainerClient blobContainerClient = new BlobContainerClient("UseDevelopmentStorage=true", "sample-container");
blobContainerClient.CreateIfNotExists();
```

Make sure that the emulator is running before calling the code in the snippet.


For more information about Azurite, see [Use the Azurite emulator for local Azure Storage development](storage-use-azurite.md).

## Configure a connection string for an Azure storage account

To create a connection string for your Azure storage account, use the following format. Indicate whether you want to connect to the storage account through HTTPS (recommended) or HTTP, replace `myAccountName` with the name of your storage account, and replace `myAccountKey` with your account access key:

`DefaultEndpointsProtocol=[http|https];AccountName=myAccountName;AccountKey=myAccountKey`

For example, your connection string might look similar to:

`DefaultEndpointsProtocol=https;AccountName=storagesample;AccountKey=<account-key>`

Although Azure Storage supports both HTTP and HTTPS in a connection string, *HTTPS is highly recommended*.

> **Tip:**
> You can find your storage account's connection strings in the [Azure portal](https://portal.azure.com). Navigate to **Security + networking** > **Access keys** in your storage account's settings to see connection strings for both primary and secondary access keys.
>

## Create a connection string using a shared access signature

If you possess a shared access signature (SAS) URL that grants you access to resources in a storage account, you can use the SAS in a connection string. Because the SAS contains the information required to authenticate the request, a connection string with a SAS provides the protocol, the service endpoint, and the necessary credentials to access the resource.

To create a connection string that includes a shared access signature, specify the string in the following format:

```
BlobEndpoint=myBlobEndpoint;
QueueEndpoint=myQueueEndpoint;
TableEndpoint=myTableEndpoint;
FileEndpoint=myFileEndpoint;
SharedAccessSignature=sasToken
```

Each service endpoint is optional, although the connection string must contain at least one.

> **Note:**
> Using HTTPS with a SAS is recommended as a best practice.
>
> If you are specifying a SAS in a connection string in a configuration file, you may need to encode special characters in the URL.
>
>

### Service SAS example
Here's an example of a connection string that includes a service SAS for Blob storage:

```
BlobEndpoint=https://storagesample.blob.core.windows.net;
SharedAccessSignature=sv=2015-04-05&sr=b&si=tutorial-policy-635959936145100803&sig=9aCzs76n0E7y5BpEi2GvsSv433BZa22leDOZXX%2BXXIU%3D
```

And here's an example of the same connection string with URL encoding:

```
BlobEndpoint=https://storagesample.blob.core.windows.net;
SharedAccessSignature=sv=2015-04-05&amp;sr=b&amp;si=tutorial-policy-635959936145100803&amp;sig=9aCzs76n0E7y5BpEi2GvsSv433BZa22leDOZXX%2BXXIU%3D
```

### Account SAS example
Here's an example of a connection string that includes an account SAS for Blob and File storage. Note that endpoints for both services are specified:

```
BlobEndpoint=https://storagesample.blob.core.windows.net;
FileEndpoint=https://storagesample.file.core.windows.net;
SharedAccessSignature=sv=2015-07-08&sig=iCvQmdZngZNW%2F4vw43j6%2BVz6fndHF5LI639QJba4r8o%3D&spr=https&st=2016-04-12T03%3A24%3A31Z&se=2016-04-13T03%3A29%3A31Z&srt=s&ss=bf&sp=rwl
```

And here's an example of the same connection string with URL encoding:

```
BlobEndpoint=https://storagesample.blob.core.windows.net;
FileEndpoint=https://storagesample.file.core.windows.net;
SharedAccessSignature=sv=2015-07-08&amp;sig=iCvQmdZngZNW%2F4vw43j6%2BVz6fndHF5LI639QJba4r8o%3D&amp;spr=https&amp;st=2016-04-12T03%3A24%3A31Z&amp;se=2016-04-13T03%3A29%3A31Z&amp;srt=s&amp;ss=bf&amp;sp=rwl
```



## Create a connection string for an explicit storage endpoint

You can specify explicit service endpoints in your connection string instead of using the default endpoints. To create a connection string that specifies an explicit endpoint, specify the complete service endpoint for each service, including the protocol specification (HTTPS (recommended) or HTTP), in the following format:

```
DefaultEndpointsProtocol=[http|https];
BlobEndpoint=myBlobEndpoint;
FileEndpoint=myFileEndpoint;
QueueEndpoint=myQueueEndpoint;
TableEndpoint=myTableEndpoint;
AccountName=myAccountName;
AccountKey=myAccountKey
```

One scenario where you might wish to specify an explicit endpoint is when you've mapped your Blob storage endpoint to a [custom domain](../blobs/storage-custom-domain-name.md). In that case, you can specify your custom endpoint for Blob storage in your connection string. You can optionally specify the default endpoints for the other services if your application uses them.

Here is an example of a connection string that specifies an explicit endpoint for the Blob service:

```
# Blob endpoint only
DefaultEndpointsProtocol=https;
BlobEndpoint=http://www.mydomain.com;
AccountName=storagesample;
AccountKey=<account-key>
```

This example specifies explicit endpoints for all services, including a custom domain for the Blob service:

```
# All service endpoints
DefaultEndpointsProtocol=https;
BlobEndpoint=http://www.mydomain.com;
FileEndpoint=https://myaccount.file.core.windows.net;
QueueEndpoint=https://myaccount.queue.core.windows.net;
TableEndpoint=https://myaccount.table.core.windows.net;
AccountName=storagesample;
AccountKey=<account-key>
```

The endpoint values in a connection string are used to construct the request URIs to the storage services, and dictate the form of any URIs that are returned to your code.

If you've mapped a storage endpoint to a custom domain and omit that endpoint from a connection string, then you will not be able to use that connection string to access data in that service from your code.

For more information about configuring a custom domain for Azure Storage, see [Map a custom domain to an Azure Blob Storage endpoint](../blobs/storage-custom-domain-name.md).

> **Important:**
> Service endpoint values in your connection strings must be well-formed URIs, including `https://` (recommended) or `http://`.

### Create a connection string with an endpoint suffix

To create a connection string for a storage service in regions or instances with different endpoint suffixes, such as for Microsoft Azure operated by 21Vianet or Azure Government, use the following connection string format. Indicate whether you want to connect to the storage account through HTTPS (recommended) or HTTP, replace `myAccountName` with the name of your storage account, replace `myAccountKey` with your account access key, and replace `mySuffix` with the URI suffix:

```
DefaultEndpointsProtocol=[http|https];
AccountName=myAccountName;
AccountKey=myAccountKey;
EndpointSuffix=mySuffix;
```

Here's an example connection string for storage services in Azure operated by 21Vianet:

```
DefaultEndpointsProtocol=https;
AccountName=storagesample;
AccountKey=<account-key>;
EndpointSuffix=core.chinacloudapi.cn;
```

## Authorizing access with Shared Key

To learn how to authorize access to Azure Storage with the account key or with a connection string, see one of the following articles:

- [Authorize access and connect to Blob Storage with .NET](../blobs/storage-blob-dotnet-get-started.md?tabs=account-key#authorize-access-and-connect-to-blob-storage)
- [Authorize access and connect to Blob Storage with Java](../blobs/storage-blob-java-get-started.md?tabs=account-key#authorize-access-and-connect-to-blob-storage)
- [Authorize access and connect to Blob Storage with JavaScript](../blobs/storage-blob-javascript-get-started.md#authorize-access-and-connect-to-blob-storage)
- [Authorize access and connect to Blob Storage with Python](../blobs/storage-blob-python-get-started.md#authorize-access-and-connect-to-blob-storage)

## Next steps

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](storage-sas-overview.md)
- [Use the Azurite emulator for local Azure Storage development](storage-use-azurite.md)
