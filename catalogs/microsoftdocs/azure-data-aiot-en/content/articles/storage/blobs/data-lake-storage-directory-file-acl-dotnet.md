---
title: Use .NET to manage data in Azure Data Lake Storage
titleSuffix: Azure Storage
description: Learn how to use the Azure Storage client library for .NET to manage directories and files in Data Lake Storage.
author: stevenmatthew

ms.author: shaas
ms.service: azure-data-lake-storage
ms.date: 07/23/2026
ms.topic: how-to
ms.reviewer: prishet
ms.devlang: csharp
ms.custom: devx-track-csharp, devx-track-dotnet
# Customer intent: As a .NET developer, I want to manage directories and files in Azure Data Lake Storage using the client library, so that I can efficiently organize and access large amounts of data in my applications.
---

# Use .NET to manage directories and files in Azure Data Lake Storage

This article shows you how to use .NET to create and manage directories and files in storage accounts that have a hierarchical namespace (Azure Data Lake Storage Gen2).

To learn about how to get, set, and update the access control lists (ACL) of directories and files, see [Use .NET to manage ACLs in Azure Data Lake Storage](data-lake-storage-acl-dotnet.md).

[Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Files.DataLake) | [Samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Files.DataLake) | [API reference](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake) | [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Files.DataLake/GEN1_GEN2_MAPPING.md) | [Give Feedback](https://github.com/Azure/azure-sdk-for-net/issues)

## Prerequisites

- An Azure subscription. See [Get Azure free trial](https://azure.microsoft.com/pricing/free-trial/).

- A storage account that has hierarchical namespace enabled. Follow [these instructions](create-data-lake-storage-account.md) to create one.

## Set up your project

To get started, install the [Azure.Storage.Files.DataLake](https://www.nuget.org/packages/Azure.Storage.Files.DataLake/) NuGet package.

For more information about how to install NuGet packages, see [Install and manage packages in Visual Studio using the NuGet Package Manager](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-visual-studio).

Then, add these `using` statements to the top of your code file.

```csharp
using Azure;
using Azure.Storage.Files.DataLake;
using Azure.Storage.Files.DataLake.Models;
using Azure.Storage;
using System.IO;
```


> **Note:**
> [Multi-protocol access on Data Lake Storage](data-lake-storage-multi-protocol-access.md) enables applications to use both Blob APIs and Data Lake Storage Gen2 APIs to work with data in storage accounts with hierarchical namespace (HNS) enabled. When working with capabilities unique to Data Lake Storage Gen2, such as directory operations and ACLs, use the Data Lake Storage Gen2 APIs, as shown in this article.
>
> When choosing which APIs to use in a given scenario, consider the workload and the needs of your application, along with the [known issues](data-lake-storage-known-issues.md#blob-storage-apis) and [impact of HNS on workloads and applications](upgrade-to-data-lake-storage-gen2.md#impact-on-workloads-and-applications).

## Authorize access and connect to data resources

To work with the code examples in this article, you need to create an authorized [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) instance that represents the storage account. You can authorize a `DataLakeServiceClient` object by using Microsoft Entra ID, an account access key, or a shared access signature (SAS).

<a name='azure-ad'></a>

### [Microsoft Entra ID](#tab/azure-ad)

Use the [Azure identity client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme) to authenticate your application by using Microsoft Entra ID.

Create a [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) instance and pass in a new instance of the [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential) class.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Authorize_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

To learn more about using `DefaultAzureCredential` to authorize access to data, see [How to authenticate .NET applications with Azure services](https://learn.microsoft.com/dotnet/azure/sdk/authentication#defaultazurecredential).

### [SAS token](#tab/sas-token)

To use a shared access signature (SAS) token, provide the token as a string and initialize a [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) object. If your account URL includes the SAS token, omit the credential parameter.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Authorize_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

To learn more about generating and managing SAS tokens, see the following article:

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md?toc=/azure/storage/blobs/toc.json)

### [Account key](#tab/account-key)

You can authorize access to data by using your account access keys (Shared Key). This example creates a [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) instance that's authorized by using the account key.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Authorize_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)


> **Caution:**
> Authorization with Shared Key is not recommended as it may be less secure. For optimal security, disable authorization via Shared Key for your storage account, as described in [Prevent Shared Key authorization for an Azure Storage account](../common/shared-key-authorization-prevent.md).
>
> Use of access keys and connection strings should be limited to initial proof of concept apps or development prototypes that don't access production or sensitive data. Otherwise, the token-based authentication classes available in the Azure SDK should always be preferred when authenticating to Azure resources.
>
> Microsoft recommends that clients use either Microsoft Entra ID or a shared access signature (SAS) to authorize access to data in Azure Storage. For more information, see [Authorize operations for data access](../common/authorize-data-access.md?toc=/azure/storage/blobs/toc.json\&bc=/azure/storage/blobs/breadcrumb/toc.json).


---

## Create a container

A container acts as a file system for your files. You can create a container by using the following method:

- [DataLakeServiceClient.CreateFileSystem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient.createfilesystemasync)

The following code example creates a container and returns a [DataLakeFileSystemClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefilesystemclient) object for later use:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

After the operation completes, the container is available as a file system in the storage account.

## Create a directory

You can create a directory reference in the container by using the following method:

- [DataLakeFileSystemClient.CreateDirectoryAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefilesystemclient.createdirectoryasync)

The following code example adds a directory to a container, then adds a subdirectory, and returns a [DataLakeDirectoryClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient) object for later use:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

## Rename or move a directory

You can rename or move a directory by using the following method:

- [DataLakeDirectoryClient.RenameAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.renameasync)

Using a `DataLakeDirectoryClient` you created earlier, pass the path of the directory as a parameter. The following code example shows how to rename a subdirectory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

The following code example shows how to move a subdirectory from one directory to a different directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

## Upload a file to a directory

You can upload content to a new or existing file by using the following method:

- [DataLakeFileClient.UploadAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient.uploadasync)

The following code example uses a `DataLakeDirectoryClient` created earlier to upload a local file to a directory by using the `UploadAsync` method:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

After the upload completes, the file appears in the target directory with the specified name.

## Append data to a file

To append data to a file, use the following method:

- [DataLakeFileClient.AppendAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient.appendasync)

The following code example shows how to append data to the end of a file by using these steps:

- Create a [DataLakeFileClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient) object to represent the file resource you're working with.
- Upload data to the file by using the [DataLakeFileClient.AppendAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient.appendasync) method.
- Complete the upload by calling the [DataLakeFileClient.FlushAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient.flushasync) method to write the previously uploaded data to the file.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

## Download from a directory

The following code example shows how to download a file from a directory to a local file by using these steps:

- Create a [DataLakeFileClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient) instance to represent the file that you want to download.
- Use the [DataLakeFileClient.ReadStreamingAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient.readstreamingasync) method, then parse the return value to obtain a [Stream](https://learn.microsoft.com/dotnet/api/system.io.stream) object. Use any .NET file processing API to save bytes from the stream to a file.

This example uses a [BinaryReader](https://learn.microsoft.com/dotnet/api/system.io.binaryreader) and a [FileStream](https://learn.microsoft.com/dotnet/api/system.io.filestream) to save bytes to a file.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

## List directory contents

You can list directory contents by using the following method and enumerating the result:

- [FileSystemClient.GetPathsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefilesystemclient.getpathsasync)

Enumerating the paths in the result might make multiple requests to the service while fetching the values.

The following code example prints the names of each file that's located in a directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

## Delete a directory

You can delete a directory by using the following method:

- [DataLakeDirectoryClient.Delete](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.delete)

The following code example shows how to delete a directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

## Restore a soft-deleted directory

You can use the Azure Storage client libraries to restore a soft-deleted directory. Use the following method to list deleted paths for a [DataLakeFileSystemClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefilesystemclient) instance:

- [GetDeletedPathsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefilesystemclient.getdeletedpathsasync)

Use the following method to restore a soft-deleted directory:

- [UndeletePathAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefilesystemclient.undeletepathasync)

The following code example shows how to list deleted paths and restore a soft-deleted directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/CRUD_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

After the operation completes, the restored directory and its paths return to their original location.

If you rename the directory that contains the soft-deleted items, those items become disconnected from the directory. If you want to restore those items, you need to revert the name of the directory back to its original name or create a separate directory that uses the original directory name. Otherwise, you receive an error when you attempt to restore those soft-deleted items.

## Create a user delegation SAS for a directory

To work with the code examples in this section, add the following `using` directive:

```csharp
using Azure.Storage.Sas;
```

The following code example shows how to generate a user delegation SAS for a directory when a hierarchical namespace is enabled for the storage account:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Sas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

The following example tests the user delegation SAS created in the previous example from a simulated client application. If the SAS is valid, the client application can list file paths for this directory. If the SAS is invalid (for example, the SAS is expired), the Storage service returns error code 403 (Forbidden).

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Sas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

To learn more about creating a user delegation SAS, see [Create a user delegation SAS with .NET](storage-blob-user-delegation-sas-create-dotnet.md).

## Create a service SAS for a directory

In a storage account with a hierarchical namespace enabled, you can create a service SAS for a directory. To create the service SAS, ensure that you install version 12.5.0 or later of the [Azure.Storage.Files.DataLake](https://www.nuget.org/packages/Azure.Storage.Files.DataLake/) package.

The following example shows how to create a service SAS for a directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Sas.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-dotnet.md)

To learn more about creating a service SAS, see [Create a service SAS with .NET](sas-service-create-dotnet.md).

## See also

- [API reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Files.DataLake)
- [Samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Files.DataLake)
- [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Files.DataLake/GEN1_GEN2_MAPPING.md)
- [Known issues](data-lake-storage-known-issues.md#api-scope-data-lake-client-library)
- [Give Feedback](https://github.com/Azure/azure-sdk-for-net/issues)
