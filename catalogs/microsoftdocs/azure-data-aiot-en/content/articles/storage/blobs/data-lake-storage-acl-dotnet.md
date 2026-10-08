---
title: Use .NET to manage ACLs in Azure Data Lake Storage
titleSuffix: Azure Storage
description: Use .NET to manage access control lists (ACL) in storage accounts that has hierarchical namespace (HNS) enabled.
author: pauljewellmsft

ms.service: azure-data-lake-storage
ms.date: 09/06/2024
ms.author: pauljewell
ms.topic: how-to
ms.reviewer: prishet
ms.devlang: csharp
ms.custom: devx-track-csharp, devx-track-dotnet
# Customer intent: As a .NET developer, I want to manage access control lists in Azure Data Lake Storage, so that I can efficiently set, update, and remove permissions for files and directories programmatically.
---

# Use .NET to manage ACLs in Azure Data Lake Storage

This article shows you how to use .NET to get, set, and update the access control lists of directories and files.

ACL inheritance is already available for new child items that are created under a parent directory. But you can also add, update, and remove ACLs recursively on the existing child items of a parent directory without having to make these changes individually for each child item.

[Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Files.DataLake) | [Samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Files.DataLake) | [API reference](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake) | [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Files.DataLake/GEN1_GEN2_MAPPING.md) | [Give Feedback](https://github.com/Azure/azure-sdk-for-net/issues)

## Prerequisites

- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure storage account that has hierarchical namespace (HNS) enabled. Follow [these instructions](create-data-lake-storage-account.md) to create one.
- Azure CLI version `2.6.0` or higher.
- One of the following security permissions:
  - A provisioned Microsoft Entra ID [security principal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md#security-principal) that has been assigned the [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) role, scoped to the target container, storage account, parent resource group, or subscription.
  - Owning user of the target container or directory to which you plan to apply ACL settings. To set ACLs recursively, this includes all child items in the target container or directory.
  - Storage account key.

## Set up your project

This section shows you how to set up a project to work with the Azure Storage Data Lake client library.

### Install packages

From your project directory, install packages for the Azure Storage Data Lake and Azure Identity client libraries using the `dotnet add package` command. The Azure.Identity package is needed for passwordless connections to Azure services.

```dotnetcli
dotnet add package Azure.Storage.Files.DataLake
dotnet add package Azure.Identity
```

### Add `using` directives

Add these `using` directives to the top of your code file:

```csharp
using Azure;
using Azure.Core;
using Azure.Storage;
using Azure.Storage.Files.DataLake;
using Azure.Storage.Files.DataLake.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
```

## Connect to the account

To run the code examples in this article, you need to create a [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) instance that represents the storage account. You can authorize the client object with Microsoft Entra ID credentials or with an account key.

### [Microsoft Entra ID (recommended)](#tab/entra-id)

You can use the [Azure identity client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme) to authenticate your application with Microsoft Entra ID.

> **Note:**
> If you're using Microsoft Entra ID to authorize access, then make sure that your security principal has been assigned the [Storage Blob Data Owner role](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner). To learn more about how ACL permissions are applied and the effects of changing them, see  [Access control model in Azure Data Lake Storage](data-lake-storage-access-control-model.md).

First, assign one of the following [Azure role-based access control (Azure RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md) roles to your security principal:

| Role | ACL setting capability |
| --- | --- |
| [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) | All directories and files in the account. |
| [Storage Blob Data Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-contributor) | Only directories and files owned by the security principal. |

Next, create a [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) instance and pass in a new instance of the [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential) class.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Authorize_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

To learn more about using **DefaultAzureCredential** to authorize access to data, see [How to authenticate .NET applications with Azure services](https://learn.microsoft.com/dotnet/azure/sdk/authentication#defaultazurecredential).

### [Account key](#tab/account-key)

You can authorize access to data using your account access keys (Shared Key). This example creates a [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) instance that is authorized with the account key.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/Authorize_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)


> **Caution:**
> Authorization with Shared Key is not recommended as it may be less secure. For optimal security, disable authorization via Shared Key for your storage account, as described in [Prevent Shared Key authorization for an Azure Storage account](../common/shared-key-authorization-prevent.md).
>
> Use of access keys and connection strings should be limited to initial proof of concept apps or development prototypes that don't access production or sensitive data. Otherwise, the token-based authentication classes available in the Azure SDK should always be preferred when authenticating to Azure resources.
>
> Microsoft recommends that clients use either Microsoft Entra ID or a shared access signature (SAS) to authorize access to data in Azure Storage. For more information, see [Authorize operations for data access](../common/authorize-data-access.md?toc=/azure/storage/blobs/toc.json\&bc=/azure/storage/blobs/breadcrumb/toc.json).


---

## Set ACLs

When you *set* an ACL, you **replace** the entire ACL including all of its entries. If you want to change the permission level of a security principal or add a new security principal to the ACL without affecting other existing entries, you should *update* the ACL instead. To update an ACL instead of replace it, see the [Update ACLs](#update-acls) section of this article.

If you choose to *set* the ACL, you must add an entry for the owning user, an entry for the owning group, and an entry for all other users. To learn more about the owning user, the owning group, and all other users, see [Users and identities](data-lake-storage-access-control.md#users-and-identities).

This section shows you how to:

- Set the ACL of a directory
- Set the ACL of a file
- Set ACLs recursively

### Set the ACL of a directory

Get the access control list (ACL) of a directory by calling the [DataLakeDirectoryClient.GetAccessControlAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.getaccesscontrolasync) method and set the ACL by calling the [DataLakeDirectoryClient.SetAccessControlList](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.setaccesscontrollist) method.

This example gets and sets the ACL of a directory named `my-directory`. The string `user::rwx,group::r-x,other::rw-` gives the owning user read, write, and execute permissions, gives the owning group only read and execute permissions, and gives all others read and write permission.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

You can also get and set the ACL of the root directory of a container. To get the root directory, pass an empty string (`""`) into the [DataLakeFileSystemClient.GetDirectoryClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefilesystemclient.getdirectoryclient) method.

### Set the ACL of a file

Get the access control list (ACL) of a file by calling the [DataLakeFileClient.GetAccessControlAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient.getaccesscontrolasync) method and set the ACL by calling the [DataLakeFileClient.SetAccessControlList](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakefileclient.setaccesscontrollist) method.

This example gets and sets the ACL of a file named `my-file.txt`. The string `user::rwx,group::r-x,other::rw-` gives the owning user read, write, and execute permissions, gives the owning group only read and execute permissions, and gives all others read and write permission.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

### Set ACLs recursively

Set ACLs recursively by calling the **DataLakeDirectoryClient.SetAccessControlRecursiveAsync** method. Pass this method a [List](https://learn.microsoft.com/dotnet/api/system.collections.generic.list-1) of [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem). Each [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem) defines an ACL entry.

If you want to set a **default** ACL entry, then you can set the [PathAccessControlItem.DefaultScope](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem.defaultscope#Azure_Storage_Files_DataLake_Models_PathAccessControlItem_DefaultScope) property of the [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem) to **true**.

This example sets the ACL of a directory named `my-parent-directory`. This method accepts a boolean parameter named `isDefaultScope` that specifies whether to set the default ACL. That parameter is used in the constructor of the [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem). The entries of the ACL give the owning user read, write, and execute permissions, gives the owning group only read and execute permissions, and gives all others no access. The last ACL entry in this example gives a specific user with the object ID `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` read and execute permissions.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

## Update ACLs

When you *update* an ACL, you modify the ACL instead of replacing the ACL. For example, you can add a new security principal to the ACL without affecting other security principals listed in the ACL.  To replace the ACL instead of update it, see the [Set ACLs](#set-acls) section of this article.

This section shows you how to:

- Update an ACL
- Update ACLs recursively

### Update an ACL

First, get the ACL of a directory by calling the [DataLakeDirectoryClient.GetAccessControlAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.getaccesscontrolasync) method. Copy the list of ACL entries to a new [List](https://learn.microsoft.com/dotnet/api/system.collections.generic.list-1) of [PathAccessControl](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrol) objects. Then locate the entry that you want to update and replace it in the list. Set the ACL by calling the [DataLakeDirectoryClient.SetAccessControlList](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.setaccesscontrollist) method.

This example updates the root ACL of a container by replacing the ACL entry for all other users.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

### Update ACLs recursively

To update an ACL recursively, create a new ACL object with the ACL entry that you want to update, and then use that object in update ACL operation. Don't get the existing ACL, just provide ACL entries to be updated.

Update an ACL recursively by calling the **DataLakeDirectoryClient.UpdateAccessControlRecursiveAsync** method.  Pass this method a [List](https://learn.microsoft.com/dotnet/api/system.collections.generic.list-1) of [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem). Each [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem) defines an ACL entry.

If you want to update a **default** ACL entry, then you can set the [PathAccessControlItem.DefaultScope](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem.defaultscope#Azure_Storage_Files_DataLake_Models_PathAccessControlItem_DefaultScope) property of the [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem) to **true**.

This example updates an ACL entry with write permission. This method accepts a boolean parameter named `isDefaultScope` that specifies whether to update the default ACL. That parameter is used in the constructor of the [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem).

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

## Remove ACL entries

You can remove one or more ACL entries. This section shows you how to:

- Remove an ACL entry
- Remove ACL entries recursively

### Remove an ACL entry

First, get the ACL of a directory by calling the [DataLakeDirectoryClient.GetAccessControlAsync](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.getaccesscontrolasync) method. Copy the list of ACL entries to a new [List](https://learn.microsoft.com/dotnet/api/system.collections.generic.list-1) of [PathAccessControl](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrol) objects. Then locate the entry that you want to remove and call the [Remove](https://learn.microsoft.com/dotnet/api/system.collections.ilist.remove) method of the collection. Set the updated ACL by calling the [DataLakeDirectoryClient.SetAccessControlList](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.setaccesscontrollist) method.

This example updates the root ACL of a container by replacing the ACL entry for all other users.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

### Remove ACL entries recursively

To remove ACL entries recursively, create a new ACL object for ACL entry to be removed, and then use that object in remove ACL operation. Don't get the existing ACL, just provide the ACL entries to be removed.

Remove ACL entries by calling the **DataLakeDirectoryClient.RemoveAccessControlRecursiveAsync** method. Pass this method a [List](https://learn.microsoft.com/dotnet/api/system.collections.generic.list-1) of [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem). Each [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem) defines an ACL entry.

If you want to remove a **default** ACL entry, then you can set the [PathAccessControlItem.DefaultScope](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem.defaultscope#Azure_Storage_Files_DataLake_Models_PathAccessControlItem_DefaultScope) property of the [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem) to **true**.

This example removes an ACL entry from the ACL of the directory named `my-parent-directory`. This method accepts a boolean parameter named `isDefaultScope` that specifies whether to remove the entry from the default ACL. That parameter is used in the constructor of the [PathAccessControlItem](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.models.pathaccesscontrolitem).

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

## Recover from failures

You might encounter runtime or permission errors when modifying ACLs recursively. For runtime errors, restart the process from the beginning. Permission errors can occur if the security principal doesn't have sufficient permission to modify the ACL of a directory or file that is in the directory hierarchy being modified. Address the permission issue, and then choose to either resume the process from the point of failure by using a continuation token, or restart the process from beginning. You don't have to use the continuation token if you prefer to restart from the beginning. You can reapply ACL entries without any negative impact.

This example returns a continuation token in the event of a failure. The application can call this example method again after the error has been addressed, and pass in the continuation token. If this example method is called for the first time, the application can pass in a value of `null` for the continuation token parameter.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)

If you want the process to complete uninterrupted by permission errors, you can specify that.

To ensure that the process completes uninterrupted, pass in an **AccessControlChangedOptions** object and set the **ContinueOnFailure** property of that object to ``true``.

This example sets ACL entries recursively. If this code encounters a permission error, it records that failure and continues execution. This example prints the number of failures to the console.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/dotnet/dotnet-v12/ACL_DataLake.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-dotnet.md)


## Best practices

This section provides you some best practice guidelines for setting ACLs recursively. 

#### Handling runtime errors

A runtime error can occur for many reasons (For example: an outage or a client connectivity issue). If you encounter a runtime error, restart the recursive ACL process. ACLs can be reapplied to items without causing a negative impact. 

#### Handling permission errors (403)

If you encounter an access control exception while running a recursive ACL process, your AD [security principal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md#security-principal) might not have sufficient permission to apply an ACL to one or more of the child items in the directory hierarchy. When a permission error occurs, the process stops and a continuation token is provided. Fix the permission issue, and then use the continuation token to process the remaining dataset. The directories and files that have already been successfully processed won't have to be processed again. You can also choose to restart the recursive ACL process. ACLs can be reapplied to items without causing a negative impact. 

#### Credentials 

We recommend that you provision a Microsoft Entra security principal that has been assigned the [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) role in the scope of the target storage account or container. 

#### Performance 

To reduce latency, we recommend that you run the recursive ACL process in an Azure Virtual Machine (VM) that is located in the same region as your storage account. 

#### ACL limits

The maximum number of ACLs that you can apply to a directory or file is 32 access ACLs and 32 default ACLs. For more information, see [Access control in Azure Data Lake Storage Gen2](data-lake-storage-access-control.md).


## See also

- [API reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake)
- [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Files.DataLake)
- [Samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Files.DataLake)
- [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Files.DataLake/GEN1_GEN2_MAPPING.md)
- [Known issues](data-lake-storage-known-issues.md#api-scope-data-lake-client-library)
- [Give Feedback](https://github.com/Azure/azure-sdk-for-net/issues)
- [Access control model in Azure Data Lake Storage](data-lake-storage-access-control.md)
- [Access control lists (ACLs) in Azure Data Lake Storage](data-lake-storage-access-control.md)
