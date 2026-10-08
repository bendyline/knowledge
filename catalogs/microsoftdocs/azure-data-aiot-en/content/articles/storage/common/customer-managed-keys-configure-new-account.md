---
title: Configure customer-managed keys in the same tenant for a new storage account
titleSuffix: Azure Storage
description: Learn how to configure Azure Storage encryption with customer-managed keys for a new storage account by using the Azure portal, PowerShell, or Azure CLI. Customer-managed keys are stored in an Azure Key Vault.
services: storage
author: normesta

ms.service: azure-storage
ms.topic: how-to
ms.date: 03/23/2023
ms.author: normesta
ms.reviewer: ozgun
ms.subservice: storage-common-concepts
ms.custom:
  - devx-track-azurepowershell
  - devx-track-azurecli
  - sfi-image-nochange
# Customer intent: As a cloud administrator, I want to configure customer-managed keys for a new storage account, so that I can maintain control over data encryption and manage key versions using Azure Key Vault.
---

# Configure customer-managed keys in the same tenant for a new storage account

Azure Storage encrypts all data in a storage account at rest. By default, data is encrypted with Microsoft-managed keys. For additional control over encryption keys, you can manage your own keys. Customer-managed keys must be stored in an Azure Key Vault or in an Azure Key Vault Managed Hardware Security Model (HSM).

This article shows how to configure encryption with customer-managed keys at the time that you create a new storage account. The customer-managed keys are stored in a key vault.

To learn how to configure customer-managed keys for an existing storage account, see [Configure customer-managed keys in an Azure Key Vault for an existing storage account](customer-managed-keys-configure-existing-account.md).

> **Note:**
> Azure Key Vault and Azure Key Vault Managed HSM support the same APIs and management interfaces for configuration of customer-managed keys. Any action that is supported for Azure Key Vault is also supported for Azure Key Vault Managed HSM.


## Configure the key vault

You can use a new or existing key vault to store customer-managed keys. The storage account and key vault may be in different regions or subscriptions in the same tenant. To learn more about Azure Key Vault, see [Azure Key Vault Overview](https://learn.microsoft.com/azure/key-vault/general/overview) and [What is Azure Key Vault?](https://learn.microsoft.com/azure/key-vault/general/basic-concepts)

Using customer-managed keys with Azure Storage encryption requires that both soft delete and purge protection be enabled for the key vault. Soft delete is enabled by default when you create a new key vault and cannot be disabled. You can enable purge protection either when you create the key vault or after it is created.

Azure Key Vault supports authorization with Azure RBAC via an Azure RBAC permission model. Microsoft recommends using the Azure RBAC permission model over key vault access policies. For more information, see [Grant permission to applications to access an Azure key vault using Azure RBAC](https://learn.microsoft.com/azure/key-vault/general/rbac-guide).

# [Azure portal](#tab/azure-portal)

To learn how to create a key vault with the Azure portal, see [Quickstart: Create a key vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal). When you create the key vault, select **Enable purge protection**, as shown in the following image.

Screenshot showing how to enable purge protection when creating a key vault.

To enable purge protection on an existing key vault, follow these steps:

1. Navigate to your key vault in the Azure portal.
1. Under **Settings**, choose **Properties**.
1. In the **Purge protection** section, choose **Enable purge protection**.

# [PowerShell](#tab/azure-powershell)

To create a new key vault with PowerShell, install version 2.0.0 or later of the [Az.KeyVault](https://www.powershellgallery.com/packages/Az.KeyVault/2.0.0) PowerShell module. Then call [New-AzKeyVault](https://learn.microsoft.com/powershell/module/az.keyvault/new-azkeyvault) to create a new key vault. With version 2.0.0 and later of the Az.KeyVault module, soft delete is enabled by default when you create a new key vault.

The following example creates a new key vault with soft delete and purge protection enabled. The key vault's permission model is set to use Azure RBAC. Remember to replace the placeholder values in brackets with your own values.

```azurepowershell
$rgName = "<resource_group>"
$location = "<location>"
$kvName = "<key-vault>"

$keyVault = New-AzKeyVault -Name $kvName `
    -ResourceGroupName $rgName `
    -Location $location `
    -EnablePurgeProtection `
    -EnableRbacAuthorization
```

To learn how to enable purge protection on an existing key vault with PowerShell, see [Azure Key Vault recovery overview](https://learn.microsoft.com/azure/key-vault/general/key-vault-recovery?tabs=azure-powershell).

After you have created the key vault, you'll need to assign the **Key Vault Crypto Officer** role to yourself. This role enables you to create a key in the key vault. The following example assigns this role to a user, scoped to the key vault:

```azurepowershell
New-AzRoleAssignment -SignInName "<user-email>" `
    -RoleDefinitionName "Key Vault Crypto Officer" `
    -Scope $keyVault.ResourceId
```

For more information on how to assign an RBAC role with PowerShell, see [Assign Azure roles using Azure PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-powershell.md).

# [Azure CLI](#tab/azure-cli)

To create a new key vault using Azure CLI, call [az keyvault create](https://learn.microsoft.com/cli/azure/keyvault#az-keyvault-create). The following example creates a new key vault with soft delete and purge protection enabled. The key vault's permission model is set to use Azure RBAC. Remember to replace the placeholder values in brackets with your own values.

```azurecli
rgName="<resource_group>"
location="<location>"
kvName="<key-vault>"

az keyvault create \
    --name $kvName \
    --resource-group $rgName \
    --location $location \
    --enable-purge-protection \
    --enable-rbac-authorization
```

To learn how to enable purge protection on an existing key vault with Azure CLI, see [Azure Key Vault recovery overview](https://learn.microsoft.com/azure/key-vault/general/key-vault-recovery?tabs=azure-cli).

After you have created the key vault, you'll need to assign the **Key Vault Crypto Officer** role to yourself. This role enables you to create a key in the key vault. The following example assigns this role to a user, scoped to the key vault:

```azurecli
kvResourceId=$(az keyvault show --resource-group $rgName \
    --name $kvName \
    --query id \
    --output tsv)

az role assignment create --assignee "<user-email>" \
    --role "Key Vault Crypto Officer" \
    --scope $kvResourceId
```

For more information on how to assign an RBAC role with Azure CLI, see [Assign Azure roles using Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-cli.md).

---



## Add a key

Next, add a key to the key vault. Before you add the key, make sure that you have assigned to yourself the **Key Vault Crypto Officer** role.

Azure Storage encryption supports RSA and RSA-HSM keys of sizes 2048, 3072 and 4096. For more information about supported key types, see [About keys](https://learn.microsoft.com/azure/key-vault/keys/about-keys).

# [Azure portal](#tab/azure-portal)

To learn how to add a key with the Azure portal, see [Quickstart: Set and retrieve a key from Azure Key Vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/keys/quick-create-portal).

# [PowerShell](#tab/azure-powershell)

To add a key with PowerShell, call [Add-AzKeyVaultKey](https://learn.microsoft.com/powershell/module/az.keyvault/add-azkeyvaultkey). Remember to replace the placeholder values in brackets with your own values and to use the variables defined in the previous examples.

```azurepowershell
$keyName = "<key-name>"

$key = Add-AzKeyVaultKey -VaultName $keyVault.VaultName `
    -Name $keyName `
    -Destination 'Software'
```

# [Azure CLI](#tab/azure-cli)

To add a key with Azure CLI, call [az keyvault key create](https://learn.microsoft.com/cli/azure/keyvault/key#az-keyvault-key-create). Remember to replace the placeholder values in brackets with your own values.

```azurecli
keyName="<key-name>"

az keyvault key create \
    --name $keyName \
    --vault-name $kvName
```

---


## Use a user-assigned managed identity to authorize access to the key vault


When you enable customer-managed keys for a new storage account, you must specify a user-assigned managed identity. An existing storage account supports using either a user-assigned managed identity or a system-assigned managed identity to configure customer-managed keys.

When you configure customer-managed keys with a user-assigned managed identity, the user-assigned managed identity is used to authorize access to the key vault that contains the key. You must create the user-assigned identity before you configure customer-managed keys.

A user-assigned managed identity is a standalone Azure resource. To learn more about user-assigned managed identities, see [Managed identity types](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md#managed-identity-types). To learn how to create and manage a user-assigned managed identity, see [Manage user-assigned managed identities](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/how-manage-user-assigned-managed-identities.md).

The user-assigned managed identity must have permissions to access the key in the key vault. Assign the **Key Vault Crypto Service Encryption User** role to the user-assigned managed identity with key vault scope to grant these permissions.

### [Azure portal](#tab/azure-portal)

Before you can configure customer-managed keys with a user-assigned managed identity, you must assign the **Key Vault Crypto Service Encryption User** role to the user-assigned managed identity, scoped to the key vault. This role grants the user-assigned managed identity permissions to access the key in the key vault. For more information on assigning Azure RBAC roles with the Azure portal, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

When you configure customer-managed keys with the Azure portal, you can select an existing user-assigned identity through the portal user interface.

### [PowerShell](#tab/azure-powershell)

The following example shows how to retrieve the user-assigned managed identity and assign to it the required RBAC role, scoped to the key vault. Remember to replace the placeholder values in brackets with your own values and to use the variables defined in the previous examples:

```azurepowershell
$userIdentity = Get-AzUserAssignedIdentity -Name <user-assigned-identity> `
    -ResourceGroupName $rgName

$principalId = $userIdentity.PrincipalId

New-AzRoleAssignment -ObjectId $principalId `
    -RoleDefinitionName "Key Vault Crypto Service Encryption User" `
    -Scope $keyVault.ResourceId
```

### [Azure CLI](#tab/azure-cli)

The following example shows how to retrieve the user-assigned managed identity and assign to it the required RBAC role, scoped to the key vault. Remember to replace the placeholder values in brackets with your own values and to use the variables defined in the previous examples:

```azurecli
identityResourceId=$(az identity show --name <user-assigned-identity> \
    --resource-group $rgName \
    --query id \
    --output tsv)

principalId=$(az identity show --name <user-assigned-identity> \
    --resource-group $rgName \
    --query principalId \
    --output tsv)

az role assignment create --assignee-object-id $principalId \
    --role "Key Vault Crypto Service Encryption User" \
    --scope $kvResourceId \
    --assignee-principal-type ServicePrincipal
```

---


## Configure customer-managed keys for a new storage account

When you configure encryption with customer-managed keys for a new storage account, you can choose to automatically update the key version used for Azure Storage encryption whenever a new version is available in the associated key vault. Alternately, you can explicitly specify a key version to be used for encryption until the key version is manually updated.

You must use an existing user-assigned managed identity to authorize access to the key vault when you configure customer-managed keys while creating the storage account. The user-assigned managed identity must have appropriate permissions to access the key vault. For more information, see [Authenticate to Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/authentication).

### Configure encryption for automatic updating of key versions

Azure Storage can automatically update the customer-managed key that is used for encryption to use the latest key version from the key vault. Azure Storage checks the key vault daily for a new version of the key. When a new version becomes available, then Azure Storage automatically begins using the latest version of the key for encryption.

> **Important:**
> Azure Storage checks the key vault for a new key version only once daily. When you rotate a key, be sure to wait 24 hours before disabling the older version.

### [Azure portal](#tab/azure-portal)

To configure customer-managed keys for a new storage account with automatic updating of the key version, follow these steps:

1. In the Azure portal, navigate to the **Storage accounts** page, and select the **Create** button to create a new account.
1. Follow the steps outlined in [Create a storage account](storage-account-create.md) to fill out the fields on the **Basics**, **Advanced**, **Networking**, and **Data Protection** tabs.
1. On the **Encryption** tab, indicate for which services you want to enable support for customer-managed keys in the **Enable support for customer-managed keys** field.
1. In the **Encryption type** field, select **Customer-managed keys (CMK)**.
1. In the **Encryption key** field, choose **Select a key vault and key**, and specify the key vault and key.
1. For the **User-assigned identity** field, select an existing user-assigned managed identity.

    Screenshot showing how to configure customer-managed keys for a new storage account in Azure portal.

1. Select the **Review** button to validate and create the account.

You can also configure customer-managed keys with manual updating of the key version when you create a new storage account. Follow the steps described in [Configure encryption for manual updating of key versions](#configure-encryption-for-manual-updating-of-key-versions).

### [PowerShell](#tab/azure-powershell)

To configure customer-managed keys for a new storage account with automatic updating of the key version, call [New-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/new-azstorageaccount), as shown in the following example. Use the variable you created previously for the resource ID for the user-assigned managed identity. You'll also need the key vault URI and key name:

```azurepowershell
$accountName = "<storage-account>"

New-AzStorageAccount -ResourceGroupName $rgName `
    -Name $accountName `
    -Kind StorageV2 `
    -SkuName Standard_LRS `
    -Location $location `
    -AllowBlobPublicAccess $false `
    -IdentityType SystemAssignedUserAssigned `
    -UserAssignedIdentityId $userIdentity.Id `
    -KeyVaultUri $keyVault.VaultUri `
    -KeyName $key.Name `
    -KeyVaultUserAssignedIdentityId $userIdentity.Id
```

### [Azure CLI](#tab/azure-cli)

To configure customer-managed keys for a new storage account with automatic updating of the key version, call [az storage account create](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-create), as shown in the following example. Use the variable you created previously for the resource ID for the user-assigned managed identity. You'll also need the key vault URI and key name:

```azurecli
accountName="<storage-account>"

az storage account create \
    --name $accountName \
    --resource-group $rgName \
    --location $location \
    --sku Standard_LRS \
    --kind StorageV2 \
    --identity-type SystemAssigned,UserAssigned \
    --user-identity-id $identityResourceId \
    --encryption-key-vault <key-vault-uri> \
    --encryption-key-name $keyName \
    --encryption-key-source Microsoft.Keyvault \
    --key-vault-user-identity-id $identityResourceId
```

---

### Configure encryption for manual updating of key versions

If you prefer to manually update the key version, then explicitly specify the version when you configure encryption with customer-managed keys while creating the storage account. In this case, Azure Storage won't automatically update the key version when a new version is created in the key vault. To use a new key version, you must manually update the version used for Azure Storage encryption.

You must use an existing user-assigned managed identity to authorize access to the key vault when you configure customer-managed keys while creating the storage account. The user-assigned managed identity must have appropriate permissions to access the key vault. For more information, see [Authenticate to Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/authentication).

# [Azure portal](#tab/azure-portal)

To configure customer-managed keys with manual updating of the key version in the Azure portal, specify the key URI, including the version, while creating the storage account. To specify a key as a URI, follow these steps:

1. In the Azure portal, navigate to the **Storage accounts** page, and select the **Create** button to create a new account.
1. Follow the steps outlined in [Create a storage account](storage-account-create.md) to fill out the fields on the **Basics**, **Advanced**, **Networking**, and **Data Protection** tabs.
1. On the **Encryption** tab, indicate for which services you want to enable support for customer-managed keys in the **Enable support for customer-managed keys** field.
1. In the **Encryption type** field, select **Customer-managed keys (CMK)**.
1. To locate the key URI in the Azure portal, navigate to your key vault, and select the **Keys** setting. Select the desired key, then select the key to view its versions. Select a key version to view the settings for that version.
1. Copy the value of the **Key Identifier** field, which provides the URI.

    Screenshot showing key vault key URI in Azure portal.

1. In the **Encryption key** settings for your storage account, choose the **Enter key URI** option.
1. Paste the URI that you copied into the **Key URI** field. Include the key version on the URI to configure manual updating of the key version.
1. Specify a user-assigned managed identity by choosing the **Select an identity** link.

    Screenshot showing how to enter key URI in Azure portal.

1. Select the **Review** button to validate and create the account.

# [PowerShell](#tab/azure-powershell)

To configure customer-managed keys with manual updating of the key version, explicitly provide the key version when you configure encryption while creating the storage account. Call [Set-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/set-azstorageaccount) to update the storage account's encryption settings, as shown in the following example, and include the **-KeyvaultEncryption** option to enable customer-managed keys for the storage account.

Remember to replace the placeholder values in brackets with your own values and to use the variables defined in the previous examples.

```azurepowershell
$accountName = "<storage-account>"

New-AzStorageAccount -ResourceGroupName $rgName `
    -Name $accountName `
    -Kind StorageV2 `
    -SkuName Standard_LRS `
    -Location $location `
    -AllowBlobPublicAccess $false `
    -IdentityType SystemAssignedUserAssigned `
    -UserAssignedIdentityId $userIdentity.Id `
    -KeyVaultUri $keyVault.VaultUri `
    -KeyName $key.Name `
    -KeyVersion $key.Version `
    -KeyVaultUserAssignedIdentityId $userIdentity.Id
```

When you manually update the key version, you'll need to update the storage account's encryption settings to use the new version. First, call [Get-AzKeyVaultKey](https://learn.microsoft.com/powershell/module/az.keyvault/get-azkeyvaultkey) to get the latest version of the key. Then call [Set-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/set-azstorageaccount) to update the storage account's encryption settings to use the new version of the key, as shown in the previous example.

# [Azure CLI](#tab/azure-cli)

To configure customer-managed keys with manual updating of the key version, explicitly provide the key version when you configure encryption while creating the storage account. Call [az storage account update](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-update) to update the storage account's encryption settings, as shown in the following example. Include the `--encryption-key-source` parameter and set it to `Microsoft.Keyvault` to enable customer-managed keys for the account.

Remember to replace the placeholder values in brackets with your own values.

```azurecli
accountName="<storage-account>"

key_vault_uri=$(az keyvault show \
    --name <key-vault> \
    --resource-group <resource_group> \
    --query properties.vaultUri \
    --output tsv)

key_version=$(az keyvault key list-versions \
    --name <key> \
    --vault-name <key-vault> \
    --query [-1].kid \
    --output tsv | cut -d '/' -f 6)

az storage account create \
    --name $accountName \
    --resource-group $rgName \
    --location $location \
    --sku Standard_LRS \
    --kind StorageV2 \
    --allow-blob-public-access false \
    --identity-type SystemAssigned,UserAssigned \
    --user-identity-id $identityResourceId \
    --encryption-key-vault $keyVaultUri \
    --encryption-key-name $keyName \
    --encryption-key-source Microsoft.Keyvault \
    --encryption-key-version $keyVersion \
    --key-vault-user-identity-id $identityResourceId
```

When you manually update the key version, you'll need to update the storage account's encryption settings to use the new version. First, query for the key vault URI by calling [az keyvault show](https://learn.microsoft.com/cli/azure/keyvault#az-keyvault-show), and for the key version by calling [az keyvault key list-versions](https://learn.microsoft.com/cli/azure/keyvault/key#az-keyvault-key-list-versions). Then call [az storage account update](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-update) to update the storage account's encryption settings to use the new version of the key, as shown in the previous example.

---


## Change the key

You can change the key that you are using for Azure Storage encryption at any time.

> **Note:**
> When you change the key or key version, the protection of the root encryption key changes, but the data in your Azure Storage account remains encrypted at all times. There is no additional action required on your part to ensure that your data is protected. Changing the key or rotating the key version doesn't impact performance. There is no downtime associated with changing the key or rotating the key version.

# [Azure portal](#tab/azure-portal)

To change the key with the Azure portal, follow these steps:

1. Navigate to your storage account and display the **Encryption** settings.
1. Select the key vault and choose a new key.
1. Save your changes.

# [PowerShell](#tab/azure-powershell)

To change the key with PowerShell, call [Set-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/set-azstorageaccount) and provide the new key name and version. If the new key is in a different key vault, then you must also update the key vault URI.

# [Azure CLI](#tab/azure-cli)

To change the key with Azure CLI, call [az storage account update](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-update) and provide the new key name and version. If the new key is in a different key vault, then you must also update the key vault URI.

---


If the new key is in a different key vault, you must [grant the managed identity access to the key in the new vault](#use-a-user-assigned-managed-identity-to-authorize-access-to-the-key-vault). If you choose manual updating of the key version, you will also need to [update the key vault URI](#configure-encryption-for-manual-updating-of-key-versions).


## Revoke access to a storage account that uses customer-managed keys

To temporarily revoke access to a storage account that is using customer-managed keys, disable the key currently being used in the key vault. There is no performance impact or downtime associated with disabling and reenabling the key.

After the key has been disabled, clients can't call operations that read from or write to a blob or its metadata. For information about which operations will fail, see [Revoke access to a storage account that uses customer-managed keys](customer-managed-keys-overview.md).

> **Caution:**
> When you disable the key in the key vault, the data in your Azure Storage account remains encrypted, but it becomes inaccessible until you reenable the key.

# [Azure portal](#tab/azure-portal)

To disable a customer-managed key with the Azure portal, follow these steps:

1. Navigate to the key vault that contains the key.
1. Under **Objects**, select **Keys**.
1. Right-click the key and select **Disable**.

    Screenshot showing how to disable a customer-managed key in the key vault.

# [PowerShell](#tab/azure-powershell)

To revoke a customer-managed key with PowerShell, call the [Update-AzKeyVaultKey](https://learn.microsoft.com/powershell/module/az.keyvault/update-azkeyvaultkey) command, as shown in the following example. Remember to replace the placeholder values in brackets with your own values to define the variables, or use the variables defined in the previous examples.

```azurepowershell
$kvName  = "<key-vault-name>"
$keyName = "<key-name>"
$enabled = $false
# $false to disable the key / $true to enable it

# Check the current state of the key (before and after enabling/disabling it)
Get-AzKeyVaultKey -Name $keyName -VaultName $kvName

# Disable (or enable) the key
Update-AzKeyVaultKey -VaultName $kvName -Name $keyName -Enable $enabled
```

# [Azure CLI](#tab/azure-cli)

To revoke a customer-managed key with Azure CLI, call the [az keyvault key set-attributes](https://learn.microsoft.com/cli/azure/keyvault/key#az-keyvault-key-set-attributes) command, as shown in the following example. Remember to replace the placeholder values in brackets with your own values to define the variables, or use the variables defined in the previous examples.

```azurecli
kvName="<key-vault-name>"
keyName="<key-name>"
enabled="false"
# "false" to disable the key / "true" to enable it:

# Check the current state of the key (before and after enabling/disabling it)
az keyvault key show \
    --vault-name $kvName \
    --name $keyName

# Disable (or enable) the key
az keyvault key set-attributes \
    --vault-name $kvName \
    --name $keyName \
    --enabled $enabled
```

---


Disabling the key will cause attempts to access data in the storage account to fail with error code 403 (Forbidden). For a list of storage account operations that will be affected by disabling the key, see [Revoke access to a storage account that uses customer-managed keys](customer-managed-keys-overview.md#revoke-access-to-a-storage-account-that-uses-customer-managed-keys).


## Switch back to Microsoft-managed keys

You can switch from customer-managed keys back to Microsoft-managed keys at any time, using the Azure portal, PowerShell, or the Azure CLI.

# [Azure portal](#tab/azure-portal)

To switch from customer-managed keys back to Microsoft-managed keys in the Azure portal, follow these steps:

1. Navigate to your storage account.
1. Under **Security + networking**, select **Encryption**.
1. Change **Encryption type** to **Microsoft-managed keys**.

    Screenshot showing how to switch to Microsoft-managed keys for a storage account.

# [PowerShell](#tab/azure-powershell)

To switch from customer-managed keys back to Microsoft-managed keys with PowerShell, call [Set-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/set-azstorageaccount) with the `-StorageEncryption` option, as shown in the following example. Remember to replace the placeholder values in brackets with your own values and to use the variables defined in the previous examples.

```azurepowershell
Set-AzStorageAccount -ResourceGroupName $storageAccount.ResourceGroupName `
    -AccountName $storageAccount.StorageAccountName `
    -StorageEncryption  
```

# [Azure CLI](#tab/azure-cli)

To switch from customer-managed keys back to Microsoft-managed keys with Azure CLI, call [az storage account update](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-update) and set the `--encryption-key-source parameter` to `Microsoft.Storage`, as shown in the following example. Remember to replace the placeholder values in brackets with your own values and to use the variables defined in the previous examples.

```azurecli
az storage account update \
    --name <storage-account> \
    --resource-group <resource_group> \
    --encryption-key-source Microsoft.Storage
```

---


## Next steps

- [Azure Storage encryption for data at rest](storage-service-encryption.md)
- [Customer-managed keys for Azure Storage encryption](customer-managed-keys-overview.md)
- [Configure customer-managed keys in an Azure Key Vault for an existing storage account](customer-managed-keys-configure-existing-account.md)
- [Configure encryption with customer-managed keys stored in Azure Key Vault Managed HSM](customer-managed-keys-configure-key-vault-hsm.md)
