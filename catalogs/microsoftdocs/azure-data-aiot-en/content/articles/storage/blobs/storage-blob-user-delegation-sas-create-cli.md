---
title: Use Azure CLI to create a user delegation SAS for a container or blob
titleSuffix: Azure Storage
description: Learn how to create a user delegation SAS with Microsoft Entra credentials by using Azure CLI.
services: storage
author: normesta
ms.author: normesta
ms.service: azure-blob-storage
ms.topic: how-to
ms.date: 12/18/2019
ms.reviewer: dineshm
ms.custom: devx-track-azurecli
# Customer intent: "As a cloud administrator, I want to create a user delegation SAS for containers or blobs using the Azure CLI, so that I can securely manage access permissions with Microsoft Entra credentials."
---

# Create a user delegation SAS for a container or blob with the Azure CLI


A shared access signature (SAS) enables you to grant limited access to containers and blobs in your storage account. When you create a SAS, you specify its constraints, including which Azure Storage resources a client is allowed to access, what permissions they have on those resources, and how long the SAS is valid.

Every SAS is signed with a key. You can sign a SAS in one of two ways:

- With a key created using Microsoft Entra credentials. A SAS that is signed with Microsoft Entra credentials is a *user delegation* SAS. A client that creates a user delegation SAS must be assigned an Azure RBAC role that includes the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action. To learn more, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas#assign-permissions-with-rbac).
- With the storage account key. Both a *service SAS* and an *account SAS* are signed with the storage account key. The client that creates a service SAS must either have direct access to the account key or be assigned the **Microsoft.Storage/storageAccounts/listkeys/action** permission. To learn more, see [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas) or [Create an account SAS](https://learn.microsoft.com/rest/api/storageservices/create-account-sas).

> **Note:**
> A user delegation SAS offers superior security to a SAS that is signed with the storage account key. Microsoft recommends using a user delegation SAS when possible. For more information, see [Grant limited access to data with shared access signatures (SAS)](../common/storage-sas-overview.md).


This article shows how to use Microsoft Entra credentials to create a user delegation SAS for a container or blob with the Azure CLI.


## About the user delegation SAS

A SAS token for access to a container or blob may be secured by using either Microsoft Entra credentials or an account key. A SAS secured with Microsoft Entra credentials is called a user delegation SAS, because the OAuth 2.0 token used to sign the SAS is requested on behalf of the user.

Microsoft recommends that you use Microsoft Entra credentials when possible as a security best practice, rather than using the account key, which can be more easily compromised. When your application design requires shared access signatures, use Microsoft Entra credentials to create a user delegation SAS for superior security. For more information about the user delegation SAS, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas).

> **Caution:**
> Any client that possesses a valid SAS can access data in your storage account as permitted by that SAS. It's important to protect a SAS from malicious or unintended use. Use discretion in distributing a SAS and have a plan in place for revoking a compromised SAS. To prevent unintended use, use user-bound user delegated SAS, which ties the SAS token to the intended end user and can't be used by anyone else.

For more information about shared access signatures, see [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md).


## Install the latest version of the Azure CLI

To use the Azure CLI to secure a SAS with Microsoft Entra credentials, first make sure that you have installed the latest version of Azure CLI. For more information about installing the Azure CLI, see [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

To create a user delegation SAS using the Azure CLI, make sure that you have installed version 2.0.78 or later. To check your installed version, use the `az --version` command.

<a name='sign-in-with-azure-ad-credentials'></a>

## Sign in with Microsoft Entra credentials

Sign in to the Azure CLI with your Microsoft Entra credentials. For more information, see [Sign in with the Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli).

## Assign permissions with Azure RBAC

To create a user delegation SAS from Azure PowerShell, the Microsoft Entra account used to sign into Azure CLI must be assigned a role that includes the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action. This permission enables that Microsoft Entra account to request the *user delegation key*. The user delegation key is used to sign the user delegation SAS. The role providing the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action must be assigned at the level of the storage account, the resource group, or the subscription.

If you do not have sufficient permissions to assign Azure roles to a Microsoft Entra security principal, you may need to ask the account owner or administrator to assign the necessary permissions.

The following example assigns the **Storage Blob Data Contributor** role, which includes the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action. The role is scoped at the level of the storage account.

Remember to replace placeholder values in angle brackets with your own values:

```azurecli-interactive
az role assignment create \
    --role "Storage Blob Data Contributor" \
    --assignee <email> \
    --scope "/subscriptions/<subscription>/resourceGroups/<resource-group>/providers/Microsoft.Storage/storageAccounts/<storage-account>"
```

For more information about the built-in roles that include the **Microsoft.Storage/storageAccounts/blobServices/generateUserDelegationKey** action, see [Azure built-in roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md).

<a name='use-azure-ad-credentials-to-secure-a-sas'></a>

## Use Microsoft Entra credentials to secure a SAS

When you create a user delegation SAS with the Azure CLI, the user delegation key that is used to sign the SAS is created for you implicitly. The start time and expiry time that you specify for the SAS are also used as the start time and expiry time for the user delegation key.

Because the maximum interval over which the user delegation key is valid is 7 days from the start date, you should specify an expiry time for the SAS that is within 7 days of the start time. The SAS is invalid after the user delegation key expires, so a SAS with an expiry time of greater than 7 days will still only be valid for 7 days.

When creating a user delegation SAS, the `--auth-mode login` and `--as-user parameters` are required. Specify *login* for the `--auth-mode` parameter so that requests made to Azure Storage are authorized with your Microsoft Entra credentials. Specify the `--as-user` parameter to indicate that the SAS returned should be a user delegation SAS.

### Create a user delegation SAS for a container

To create a user delegation SAS for a container with the Azure CLI, call the [az storage container generate-sas](https://learn.microsoft.com/cli/azure/storage/container#az-storage-container-generate-sas) command.

Supported permissions for a user delegation SAS on a container include Add, Create, Delete, List, Read, and Write. Permissions can be specified singly or combined. For more information about these permissions, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas).

The following example returns a user delegation SAS token for a container. Remember to replace the placeholder values in brackets with your own values:

```azurecli-interactive
az storage container generate-sas \
    --account-name <storage-account> \
    --name <container> \
    --permissions acdlrw \
    --expiry <date-time> \
    --auth-mode login \
    --as-user
```

The user delegation SAS token returned will be similar to:

```
se=2019-07-27&sp=r&sv=2018-11-09&sr=c&skoid=<skoid>&sktid=<sktid>&skt=2019-07-26T18%3A01%3A22Z&ske=2019-07-27T00%3A00%3A00Z&sks=b&skv=2018-11-09&sig=<signature>
```

> **Note:**
> The SAS token returned by Blob Storage does not include the delimiter character ('?') for the URL query string. If you are appending the SAS token to a resource URL, remember to also append the delimiter character.

### Create a user delegation SAS for a blob

To create a user delegation SAS for a blob with the Azure CLI, call the [az storage blob generate-sas](https://learn.microsoft.com/cli/azure/storage/blob#az-storage-blob-generate-sas) command.

Supported permissions for a user delegation SAS on a blob include Add, Create, Delete, Read, and Write. Permissions can be specified singly or combined. For more information about these permissions, see [Create a user delegation SAS](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas).

The following syntax returns a user delegation SAS for a blob. The example specifies the `--full-uri` parameter, which returns the blob URI with the SAS token appended. Remember to replace the placeholder values in brackets with your own values:

```azurecli-interactive
az storage blob generate-sas \
    --account-name <storage-account> \
    --container-name <container> \
    --name <blob> \
    --permissions acdrw \
    --expiry <date-time> \
    --auth-mode login \
    --as-user \
    --full-uri
```

The user delegation SAS URI returned will be similar to:

```
https://storagesamples.blob.core.windows.net/sample-container/blob1.txt?se=2019-08-03&sp=rw&sv=2018-11-09&sr=b&skoid=<skoid>&sktid=<sktid>&skt=2019-08-02T2
2%3A32%3A01Z&ske=2019-08-03T00%3A00%3A00Z&sks=b&skv=2018-11-09&sig=<signature>
```

> **Note:**
> The SAS token returned by Azure CLI does not include the delimiter character ('?') for the URL query string. If you are appending the SAS token to a resource URL, remember to append the delimiter character to the resource URL before appending the SAS token.
>
> A user delegation SAS does not support defining permissions with a stored access policy.

## Revoke a user delegation SAS

To revoke a user delegation SAS from the Azure CLI, call the [az storage account revoke-delegation-keys](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-revoke-delegation-keys) command. This command revokes all of the user delegation keys associated with the specified storage account. Any shared access signatures associated with those keys are invalidated.

Remember to replace placeholder values in angle brackets with your own values:

```azurecli-interactive
az storage account revoke-delegation-keys \
    --name <storage-account> \
    --resource-group <resource-group>
```

> **Important:**
> Both the user delegation key and Azure role assignments are cached by Azure Storage, so there may be a delay between when you initiate the process of revocation and when an existing user delegation SAS becomes invalid.

## Next steps

- [Create a user delegation SAS (REST API)](https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas)
- [Get User Delegation Key operation](https://learn.microsoft.com/rest/api/storageservices/get-user-delegation-key)
