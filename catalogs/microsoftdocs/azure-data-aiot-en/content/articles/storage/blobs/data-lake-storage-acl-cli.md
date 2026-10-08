---
title: Use Azure CLI to manage ACLs in Azure Data Lake Storage
titleSuffix: Azure Storage
description: Use the Azure CLI to manage access control lists (ACL) in storage accounts that have a hierarchical namespace.
services: storage
author: normesta

ms.service: azure-data-lake-storage
ms.topic: how-to
ms.date: 07/28/2026
ms.author: normesta
ms.reviewer: prishet
ms.devlang: azurecli
ms.custom: devx-track-azurecli

# Customer intent: As a data engineer managing file access, I want to use command-line tools to set and update ACLs in Azure Data Lake Storage, so that I can effectively control access to data across multiple directories and files without manual configuration for each item.
---

# Use Azure CLI to manage ACLs in Azure Data Lake Storage

This article shows you how to use the [Azure CLI](https://learn.microsoft.com/cli/azure/) to get, set, and update the access control lists (ACLs) of directories and files.

New child items automatically inherit ACLs. But you can also add, update, and remove ACLs recursively on existing child items without making these changes individually for each child item.

[Reference](https://learn.microsoft.com/cli/azure/storage/fs/access) | [Samples](https://github.com/Azure/azure-cli/blob/dev/src/azure-cli/azure/cli/command_modules/storage/docs/ADLS%20Gen2.md) | [Give feedback](https://github.com/Azure/azure-cli-extensions/issues)

## Prerequisites

- An Azure subscription. For more information, see [Get Azure free trial](https://azure.microsoft.com/pricing/free-trial/).

- A storage account that has hierarchical namespace enabled. For instructions, see [Create a storage account that has a hierarchical namespace](create-data-lake-storage-account.md).

- Azure CLI version `2.14.0` or higher.

- One of the following security permissions:

  - A provisioned Microsoft Entra ID [security principal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md#security-principal) that's assigned the [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) role, scoped to the target container, storage account, parent resource group, or subscription.

  - Owning user of the target container or directory to which you plan to apply ACL settings. To set ACLs recursively, this user includes all child items in the target container or directory.

## Ensure that you have the correct version of Azure CLI installed

1. Open the [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md), or if you [installed](https://learn.microsoft.com/cli/azure/install-azure-cli) the Azure CLI locally, open a command console application such as Windows PowerShell.

1. Verify that the version of Azure CLI that you have installed is `2.14.0` or higher by using the following command.

   ```azurecli
    az --version
   ```

   If your version of Azure CLI is lower than `2.14.0`, install a later version. For more information, see [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

## Connect to the account

1. If you're using Azure CLI locally, run the login command.

   ```azurecli
   az login
   ```

   If the CLI can open your default browser, it opens the browser and loads an Azure sign-in page.

   Otherwise, open a browser page at [https://aka.ms/devicelogin](https://aka.ms/devicelogin) and enter the authorization code displayed in your terminal. Then, sign in with your account credentials in the browser.

   To learn more about different authentication methods, see [Authorize access to blob or queue data with Azure CLI](authorize-data-operations-cli.md).

1. If your identity is associated with more than one subscription, and you're not prompted to select the subscription, set your active subscription to the subscription of the storage account that you want to operate on. In this example, replace the `<subscription-id>` placeholder value with the ID of your subscription.

   ```azurecli
   az account set --subscription <subscription-id>
   ```

## Get ACLs

Get the ACL of a **directory** by using the [az storage fs access show](https://learn.microsoft.com/cli/azure/storage/fs/access#az-storage-fs-access-show) command.

This example gets the ACL of a directory, and then prints the ACL to the console.

```azurecli
az storage fs access show -p my-directory -f my-container --account-name mystorageaccount --auth-mode login
```

Get the access permissions of a **file** by using the [az storage fs access show](https://learn.microsoft.com/cli/azure/storage/fs/access#az-storage-fs-access-show) command.

This example gets the ACL of a file and then prints the ACL to the console.

```azurecli
az storage fs access show -p my-directory/upload.txt -f my-container --account-name mystorageaccount --auth-mode login
```

The following image shows the output after getting the ACL of a directory.

Screenshot of the console output showing the ACL of a directory in Azure Data Lake Storage.

In this example, the owning user has read, write, and execute permissions. The owning group has only read and execute permissions. For more information about access control lists, see [Access control in Azure Data Lake Storage](data-lake-storage-access-control.md).

## Set ACLs

When you *set* an ACL, you **replace** the entire ACL including all of its entries. If you want to change the permission level of a security principal or add a new security principal to the ACL without affecting other existing entries, you should *update* the ACL instead. To update an ACL instead of replace it, see the [Update ACLs](#update-acls) section of this article.

If you choose to *set* the ACL, you must add an entry for the owning user, an entry for the owning group, and an entry for all other users. To learn more about the owning user, the owning group, and all other users, see [Users and identities](data-lake-storage-access-control.md#users-and-identities).

This section shows you how to:

- Set an ACL
- Set ACLs recursively

### Set an ACL

Use the [az storage fs access set](https://learn.microsoft.com/cli/azure/storage/fs/access#az-storage-fs-access-set) command to set the ACL of a **directory**.

This example sets the ACL on a directory for the owning user, owning group, or other users, and then prints the ACL to the console.

```azurecli
az storage fs access set --acl "user::rw-,group::rw-,other::-wx" -p my-directory -f my-container --account-name mystorageaccount --auth-mode login
```

This example sets the *default* ACL on a directory for the owning user, owning group, or other users, and then prints the ACL to the console.

```azurecli
az storage fs access set --acl "default:user::rw-,group::rw-,other::-wx" -p my-directory -f my-container --account-name mystorageaccount --auth-mode login
```

Use the [az storage fs access set](https://learn.microsoft.com/cli/azure/storage/fs/access#az-storage-fs-access-set) command to set the ACL of a **file**.

This example sets the ACL on a file for the owning user, owning group, or other users, and then prints the ACL to the console.

```azurecli
az storage fs access set --acl "user::rw-,group::rw-,other::-wx" -p my-directory/upload.txt -f my-container --account-name mystorageaccount --auth-mode login
```

> **Note:**
> To set the ACL for a specific group or user, use their respective object IDs. For example, to set the ACL for a **group**, use `group:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. To set the ACL for a **user**, use `user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

The following image shows the output after setting the ACL of a file.

Screenshot of the console output showing the ACL of a file after it was set in Azure Data Lake Storage.

In this example, the owning user and owning group have only read and write permissions. All other users have write and execute permissions. For more information about access control lists, see [Access control in Azure Data Lake Storage](data-lake-storage-access-control.md).

### Set ACLs recursively

Set ACLs recursively by using the [az storage fs access set-recursive](https://learn.microsoft.com/cli/azure/storage/fs/access#az-storage-fs-access-set-recursive) command.

This example sets the ACL of a directory named `my-parent-directory`. These entries give the owning user read, write, and execute permissions, give the owning group only read and execute permissions, and give all others no access. The last ACL entry in this example gives a specific user with the object ID "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" read and execute permissions.

```azurecli
az storage fs access set-recursive --acl "user::rwx,group::r-x,other::---,user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:r-x" -p my-parent-directory/ -f my-container --account-name mystorageaccount --auth-mode login
```

> **Note:**
> To set a **default** ACL entry, add the prefix `default:` to each entry. For example, `default:user::rwx` or `default:user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:r-x`.

## Update ACLs

When you *update* an ACL, you modify the ACL instead of replacing the ACL. For example, you can add a new security principal to the ACL without affecting other security principals listed in the ACL. To replace the ACL instead of update it, see the [Set ACLs](#set-acls) section of this article.

To update an ACL, create a new ACL object with the ACL entry that you want to update, and then use that object in update ACL operation. Don't get the existing ACL, just provide ACL entries to update.

This section shows you how to:

- Update an ACL
- Update ACLs recursively

### Update an ACL

Update the ACL of a file by using the [az storage fs access update-recursive](https://learn.microsoft.com/cli/azure/storage/fs/access#az-storage-fs-access-update-recursive) command. Azure CLI provides only the `update-recursive` command for updates. When you target a single file, the command updates the ACL of that file only.

This example updates an ACL entry with write permission.

```azurecli
az storage fs access update-recursive --acl "user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:rwx" -p my-parent-directory/myfile.txt -f my-container --account-name mystorageaccount --auth-mode login
```

To update the ACL of a specific group or user, use their respective object IDs. For example, `group:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` or `user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

> **Note:**
> Azure CLI doesn't support updating the ACL of a single directory without updating the ACL of child items. To update the ACL of a directory without modifying the ACLs of all child items in that directory, use any of the other supported tools and SDKs. See [How to set ACLs](data-lake-storage-access-control.md#how-to-set-acls).

### Update ACLs recursively

Update ACLs recursively by using the [az storage fs access update-recursive](https://learn.microsoft.com/cli/azure/storage/fs/access#az-storage-fs-access-update-recursive) command.

This example updates an ACL entry with write permission.

```azurecli
az storage fs access update-recursive --acl "user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:rwx" -p my-parent-directory/ -f my-container --account-name mystorageaccount --auth-mode login
```

> **Note:**
> To update a **default** ACL entry, add the prefix `default:` to each entry. For example, `default:user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:r-x`.

## Remove ACL entries recursively

You can remove one or more ACL entries recursively. To remove an ACL entry, create a new ACL object for the ACL entry you want to remove, and then use that object in the remove ACL operation. Don't get the existing ACL, just provide the ACL entries to remove.

Remove ACL entries by using the [az storage fs access remove-recursive](https://learn.microsoft.com/cli/azure/storage/fs/access#az-storage-fs-access-remove-recursive) command.

This example removes an ACL entry from the root directory of the container.

```azurecli
az storage fs access remove-recursive --acl "user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" -p my-parent-directory/ -f my-container --account-name mystorageaccount --auth-mode login
```

> **Note:**
> To remove a **default** ACL entry, add the prefix `default:` to each entry. For example, `default:user:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Recover from failures

You might encounter runtime or permission errors when modifying ACLs recursively. For runtime errors, restart the process from the beginning. Permission errors can occur if the security principal doesn't have sufficient permission to modify the ACL of a directory or file in the directory hierarchy you're modifying. Address the permission issue, and then choose to either resume the process from the point of failure by using a continuation token, or restart the process from beginning. You don't have to use the continuation token if you prefer to restart from the beginning. You can reapply ACL entries without any negative impact.

If a failure occurs, return a continuation token by setting the `--continue-on-failure` parameter to `false`. After you address the errors, you can resume the process from the point of failure by running the command again, and then setting the `--continuation` parameter to the continuation token.

```azurecli
az storage fs access set-recursive --acl "user::rw-,group::r-x,other::---" --continue-on-failure false --continuation xxxxxxx -p my-parent-directory/ -f my-container --account-name mystorageaccount --auth-mode login  
```

To ensure that the process completes uninterrupted, set the `--continue-on-failure` parameter to `true`.

```azurecli
az storage fs access set-recursive --acl "user::rw-,group::r-x,other::---" --continue-on-failure true --continuation xxxxxxx -p my-parent-directory/ -f my-container --account-name mystorageaccount --auth-mode login  
```


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

- [Samples](https://github.com/Azure/azure-cli/blob/dev/src/azure-cli/azure/cli/command_modules/storage/docs/ADLS%20Gen2.md)
- [Give feedback](https://github.com/Azure/azure-cli-extensions/issues)
- [Known issues](data-lake-storage-known-issues.md#api-scope-data-lake-client-library)
- [Access control model in Azure Data Lake Storage](data-lake-storage-access-control-model.md)
- [Access control lists (ACLs) in Azure Data Lake Storage](data-lake-storage-access-control.md)
