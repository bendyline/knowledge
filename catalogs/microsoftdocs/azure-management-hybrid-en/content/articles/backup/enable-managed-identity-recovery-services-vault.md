---
title: Enable Managed Identity for a Recovery Services vault
description: Enable managed identity on a Recovery Services vault
ms.topic: how-to
ms.service: azure-backup
ms.custom:
  - ignite-2025
  - build-2026
ms.date: 04/23/2026
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Enable managed identities on Recovery Services vault



This article describes how to enable **system‑assigned and user‑assigned managed identities** with a vault so Azure Backup can authenticate to dependent Azure resources without storing credentials. The vault uses a managed identity, which acts as a Microsoft Entra ID service principal, and you grant it Azure role‑based access control (Azure RBAC) permissions on target resources such as protected data sources and Azure Key Vault encryption keys. 

Azure Backup uses this identity to obtain Microsoft Entra tokens at runtime, eliminating credential handling while enabling secure access at no extra cost. The article also explains when to use each identity type and how their lifecycle and assignment differ.


## Supported managed identity types

Azure Backup supports system-assigned and user-assigned [managed identities](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview). You can enable both managed identity types on the same vault at the same time.

| **Managed identity type** | **Consideration** |
| --- | --- |
| **System-assigned** | <ul><li>Created automatically when the vault is provisioned and enabled by default.</li><li>Lifecycle is tied to the vault - deleted when the vault is deleted.</li><li>Exactly one system-assigned identity exists per vault.</li><li>Can be disabled; any operation that depends on it fails until it is re-enabled or replaced by a user-assigned identity with equivalent roles.</li></ul>  <br> Note that the system-assigned identity has the same name as the vault. Use the object ID from the Identity blade for automation. |
| **User-assigned** | <ul><li>An independent Azure resource that you create and manage separately from the vault.</li><li>Can be attached to many vaults; multiple user-assigned identities can be attached to a single vault.</li><li>Lifecycle is decoupled from the vault - deleting the vault does not delete the identity.</li><li>Recommended for fleet-scale deployments, standardized RBAC, and pre-provisioned identities.</li></ul> |

## Key differences between system-assigned and user-assigned managed identities

The following table provides a comparison summary of system-assigned and user-assigned managed identities.

| **Consideration** | **System-assigned** | **User-assigned** |
|-----------|-------------|
| *Lifecycle* | Tied to the vault; deleted with it | Independent; persists across vault changes |
| *Cardinality* | One per vault | Many per vault; sharable across vaults |
| *Typical use case* | Single-vault deployments, simplest setup | Fleet deployments, standardized RBAC, pre-provisioned identities |
| *Enable at vault creation* | Not supported; enable after the vault is created | Supported on Backup vault at creation |

## Prerequisites

Before you enable managed identities for the vault, review the following prerequisites:

- Check that a vault exists, or permission to create one. 
- Verify that your account has the Backup Contributor role (or equivalent) on the vault to manage identity and assign roles. 
- Identify the resource group of each downstream resource (disk, storage account, key vault, and so on) to scope role assignments correctly. 



## Enable managed identity

You can enable managed identities for a Recovery Services vault using the Azure portal, Azure CLI, or PowerShell.

**Choose a client**:

# [Azure portal](#tab/azure-portal)

To enable managed identities for a Recovery Services vault using the Azure portal, follow these steps:

1. Go to your Recovery Services vault and select **Settings** >  **Identity**
2. On the **Identity** pane, for a system-assigned identity, select the **System assigned** tab, set **Status** to **On**, and select **Save**

    Screenshot for assigning system identity to Recovery Services vault.

3. For a user-assigned identity, select the **User assigned** tab, select **+ Add**, choose the subscription and identity, and select **Add**

    Screenshot for assigning user identity to Recovery Services Vault.

# [Azure CLI](#tab/azure-cli)

To update managed identity for a Recovery Services Vault using CLI, run the following command:

```azurecli
az backup vault identity assign --resource-group <rg> --name <vault> --system-assigned
```

```azurecli
az backup vault identity assign --resource-group <rg> --name <vault> --user-assigned <uami-resource-id> 
```

[See more CLI commands](https://learn.microsoft.com/cli/azure/backup/vault/identity?view=azure-cli-latest\&preserve-view=true#az-backup-vault-identity-assign).

# [PowerShell](#tab/powershell)

To update managed identity for a Recovery Services Vault using PowerShell, run the following cmdlet:

```azurepowershell
Update-AzRecoveryServicesVault -ResourceGroupName <rg> -Name <vault> -IdentityType SystemAssigned 
```

```azurepowershell
$vault = Get-AzRecoveryServicesVault -Name "vaultName" -ResourceGroupName "resourceGroupName" 
$identity1 = Get-AzUserAssignedIdentity -ResourceGroupName "resourceGroupName" -Name "UserIdentity1" 
$identity2 = Get-AzUserAssignedIdentity -ResourceGroupName "resourceGroupName" -Name "UserIdentity2" 
$updatedVault = Update-AzRecoveryServicesVault -ResourceGroupName $vault.ResourceGroupName -Name $vault.Name -IdentityType UserAssigned -IdentityId $identity1.Id, $identity2.Id 
$updatedVault.Identity | Format-List
```

[See more PowerShell cmdlets](https://learn.microsoft.com/powershell/module/az.recoveryservices/update-azrecoveryservicesvault?view=azps-15.5.0\&preserve-view=true#examples).

---

## Next steps

- [Manage Recovery Services vault](backup-azure-manage-windows-server.md).
