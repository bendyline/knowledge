---
title: Configure Vaulted Backup  for Azure Data Lake Storage using Azure portal, PowerShell, or Azure CLI
description: Learn how to configure vaulted backup for Azure Data Lake Storage using Azure portal, PowerShell, or Azure CLI.
ms.topic: how-to
ms.service: azure-backup
ms.custom:
  - ignite-2025
  - devx-track-azurepowershell-azurecli, devx-track-azurecli, references_regions
zone_pivot_groups: backup-client-portal-powershell-cli
ms.date: 11/18/2025
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As a cloud administrator, I want to configure vaulted backup for Azure Data Lake Storage, so that I can ensure data protection and recovery capabilities are in place for my storage accounts.
---

# Configure vaulted backup for Azure Data Lake Storage

**Applies to: client-portal**


This article describes how to configure vaulted backups for Azure Data Lake Storage using Azure portal.

## Prerequisites

Before you configure vaulted backup for Azure Data Lake Storage, ensure the following prerequisites are met:

- The storage account must be in a [supported region and of the required types](azure-data-lake-storage-backup-support-matrix.md).
- The target account mustn't have containers with the  names same as the containers in a recovery point; otherwise, the restore operation fails.
- Identify or [create a Backup vault](create-manage-backup-vault.md#create-backup-vault) in the same region as the Azure Data Lake Storage account.
- [Create a backup policy for Azure Data Lake Storage](azure-data-lake-storage-backup-create-policy-quickstart.md?pivots=client-portal) that defines the backup schedule and retention range.
- [Grant permissions to the Backup vault on storage accounts](azure-data-lake-storage-backup-tutorial.md#grant-permissions-to-the-backup-vault-on-storage-accounts).

>**Note:**
>- This feature is currently available in specific regions only. See the [supported regions](azure-data-lake-storage-backup-support-matrix.md#supported-regions).
>- Vaulted backup restores are only possible to a different storage account.

For more information about the supported scenarios, limitations, and availability, see the [support matrix](azure-data-lake-storage-backup-support-matrix.md).



## Configure vaulted backup for the Azure Data Lake Storage

You can configure backup on multiple Azure Data Lake Storage.

To configure vaulted backup, follow these steps:

1. In the [Azure portal](https://portal.azure.com/), go to the **Backup vault**, and then select **+ Backup**. 
1. On the **Configure Backup** pane, on the **Basics** tab, review the **Datasource type** is selected as **Azure Data Lake Storage**.
1. On the **Backup policy** tab, under **Backup policy**, select the policy you want to use for data retention, and then select **Next**.
   If you want to create a new backup policy, select **Create new**. learn how to [create a backup policy](azure-data-lake-storage-backup-create-policy-quickstart.md?pivots=client-portal).
 
1. On the **Datasources** tab, Select **Add**. 

   Screenshot shows how to add resources for backup.

1. On the **Select storage account container** pane, provide the **Backup instance name**, and then click **select** under **Storage account**.

   Screenshot shows how to provide the backup instance name.

1. On the **Select hierarchical namespace enabled storage account** pane, select the storage accounts with Azure Data Lake Storage across subscriptions from the list that are in the region same as the vault.

   Screenshot shows the selection of storage accounts.

1. On the **Select storage containers** pane, choose one of the following options:

   - **Backup all present containers**: Protect all containers that currently exist in the storage account.
   - **Browse containers to backup**: Select specific containers to protect.
   - **Backup all present and future containers**: Auto-protect all existing containers and any new containers created after backup configuration, until the protected container count reaches 1000.

   If the storage account has more than 1000 containers, select or exclude containers to reduce the protected container count to 1000 or fewer.

   Screenshot shows the options to back up all present containers, browse containers to back up, or back up all present and future containers.

   > **Important:**
   > Selecting **Backup all present and future containers** is a permanent change. After you select this option, you can't switch back to **Backup all present containers** or **Browse containers to backup**. You can add prefixes to exclude containers whose names start with the specified prefixes from backup.

   Screenshot shows the warning that selecting the option to back up all present and future containers is permanent, and shows the prefix field to exclude matching containers from backup.

   After you add the resources, backup readiness validation starts. If the required roles are assigned, the  validation succeeds with the **Success** message.

   Screenshot shows the success message for role assignments.

   Error messages appear when access permissions are missing. See the [Grant permissions section](azure-data-lake-storage-backup-tutorial.md#grant-permissions-to-the-backup-vault-on-storage-accounts).

   Validation errors appear if the selected storage accounts don't have the **Storage Account Backup Contributor** role. Review the error messages and take necessary actions.

   | Error | Cause | Recommended action |
   | --- | --- | --- |
   | **Role assignment not done** | The **Storage account backup contributor** role and the other required roles for the storage account to the vault aren't assigned. | Select the roles, and then select **Assign missing roles** to automatically assign the required role to the Backup vault and trigger an auto revalidation. <br><br> If the role propagation takes more than **10 minutes**, then the validation might fail. In this scenario, you need to wait for a few minutes and select Revalidate to retry validation. <br><br> You need to assign the following types of permissions for various operations: <br><br> - **Resource-level** permissions: For backing up a single account within a resource group. <br> - **Resource group** or **Subscription-level** permissions: For backing up multiple accounts within a resource group. <br> - **Higher-level** permissions: For reducing the number of role assignments needed. <br><br> The maximum count of role assignments supported at the subscription level is **4,000**. Learn more [about Azure Role-Based Access Control Limits](https://learn.microsoft.com/azure/role-based-access-control/troubleshoot-limits). |
   | **Insufficient permissions for role assignment** | The vault doesn't have the required role to configure backups, and you don't have enough permissions to assign the required role. | Download the role assignment template, and then share with users with permissions to assign roles for storage accounts. |
 
1. Review the configuration details, and then select **Configure Backup**.

You can track the progress of the backup configuration under **Backup instances**. After the configuration of backup is complete, Azure Backup triggers the backup operation as per the backup policy schedule to create the recovery points. Backup might take a minimum of 30–40 minutes, as backups rely on snapshots, which are taken in every 15 minutes and require two snapshots to detect changes before triggering the backup.


Learn how to [monitor backup jobs](azure-data-lake-storage-backup-tutorial.md#monitor-an-azure-data-lake-storage-backup-job).




**Applies to: client-powershell**


This article describes how to configure vaulted backups for Azure Data Lake Storage using PowerShell.

## Prerequisites

Before you configure vaulted backup for Azure Data Lake Storage, ensure that the following prerequisites are met:

- Install Azure PowerShell version Az 14.6.0 or later and Az.DataProtection version 3.0.1 or later. Learn [how to install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-az-ps).
- Identify or [create a Backup vault](backup-blobs-storage-account-ps.md?tabs=operational-backup#create-a-backup-vault) to configure Azure Data Lake Storage backup.
- Review the [supported scenarios](azure-data-lake-storage-backup-support-matrix.md) for Azure Data Lake Storage backup.
- [Create a backup policy for Azure Data Lake Storage](azure-data-lake-storage-backup-create-policy-quickstart.md?pivots=client-powershell) that defines the backup schedule and retention range.

## Configure vaulted backup for the Azure Data Lake Storage using PowerShell

After the vault and backup policy are created, configure vaulted  backup for Azure Data Lake Storage by reviewing the following sections:

1. Fetch the ARM ID of the storage account containing the Data Lake Storage to be protected
1. Grant permissions to the Backup vault
1. Trigger the request for backup configuration

### Fetch the ARM ID of the storage account containing the Data Lake Storage to be protected

The Azure Resource Manager (ARM) ID of the storage account is required to configure vaulted backup for Azure Data Lake Storage. This ID identifies the storage account that contains the Data Lake Storage you want to protect. For example, use the storage account *`PSTestSA`* in the resource group `adlsrg` in a different subscription.

To fetch the ARM ID of the storage account, run the following example cmdlet:

```azurepowershell-interactive
$SAId = "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx/resourcegroups/adlsrg/providers/Microsoft.Storage/storageAccounts/PSTestSA"
```

### Grant permissions to the Backup vault on the storage account

The Backup vault requires permissions on the storage account to enable backups on Data Lake Storage present within the storage account. The system-assigned managed identity of the vault is used for assigning such permissions.

You need to assign the required permissions via Azure role-based access control (RBAC) to the created vault (represented by vault Managed System Identity (MSI)) and the relevant storage account.

[Learn how to grant permissions to the Backup vault using Azure portal for Azure Data Lake Storage](azure-data-lake-storage-backup-tutorial.md#grant-permissions-to-the-backup-vault-on-storage-accounts).

### Trigger the request for vaulted backup configuration

After you set all the relevant permissions, configure Azure Data Lake Storage vaulted backup by running the following cmdlets:

1. Create a new backup configuration object to specify the set of containers you want to back up.

   To back up all present containers, pass the *`-IncludeAllContainer`* parameter. To auto-protect all present and future containers, pass the *`-AutoProtection`* parameter. When you use this parameter, new containers created after backup configuration are automatically protected until the protected container count reaches 1000. Selecting auto-protection for all present and future containers is permanent, and you can't switch back to the earlier container selection options. To exclude containers from auto-protection, pass prefix-based rules to the *`-AutoProtectionExclusionRule`* parameter. For specific containers, pass the list of containers to the *`-VaultedBackupContainer`* parameter.
    ```azurepowershell-interactive
    $adlsRules = @(
        @{ ObjectType = "BlobBackupAutoProtectionRule"; Pattern = "staging-" }
        @{ ObjectType = "BlobBackupAutoProtectionRule"; Pattern = "temporary-" }
    )

    $backupConfig = New-AzDataProtectionBackupConfigurationClientObject `
        -DatasourceType AzureDataLakeStorage `
        -AutoProtection `
        -AutoProtectionExclusionRule $adlsRules
    ```

1. Prepare the request by using the relevant vault, policy, storage account, and the backup configuration object you created using the [`Initialize-AzDataProtectionBackupInstance`](https://learn.microsoft.com/powershell/module/az.dataprotection/initialize-azdataprotectionbackupinstance) cmdlet.

    ```azurepowershell-interactive
    $instance=Initialize-AzDataProtectionBackupInstance -DatasourceType AzureDataLakeStorage -DatasourceLocation $TestBkpVault.Location -PolicyId $adlsBkpPol.Id -DatasourceId $SAId -BackupConfiguration $backupConfig
    ```

1. Submit the request to trigger backup configuration using the [`New-AzDataProtectionBackupInstance`](https://learn.microsoft.com/powershell/module/az.dataprotection/new-azdataprotectionbackupinstance) cmdlet.

    ```azurepowershell-interactive
    New-AzDataProtectionBackupInstance -ResourceGroupName "StorageRG" -VaultName $TestBkpVault.Name -BackupInstance $instance
    ```




**Applies to: client-cli**


This article describes how to configure vaulted backups for Azure Data Lake Storage using Azure CLI.

## Prerequisites

Before you configure vaulted backup for Azure Data Lake Storage, ensure that the following prerequisites are met:

- Identify or [create a Backup vault](backup-blobs-storage-account-cli.md?tabs=operational-backup#create-a-backup-vault) to configure Azure Data Lake Storage backup.
- Review the [supported scenarios](azure-data-lake-storage-backup-support-matrix.md) for Azure Data Lake Storage backup.
- [Create a backup policy for Azure Data Lake Storage](azure-data-lake-storage-backup-create-policy-quickstart.md?pivots=client-cli) that defines the backup schedule and retention range.
- Install the Azure CLI `dataprotection` extension version 1.10.0 or later.

## Configure vaulted backup for the Azure Data Lake Storage using Azure CLI

After the vault and backup policy are created, configure vaulted backup for Azure Data Lake Storage by reviewing the following sections:

1. Fetch the ARM ID of the storage account containing the Data Lake Storage to be protected
1. Grant permissions to the Backup vault
1. Trigger the request for backup configuration

>**Important:**
>After a storage account is configured for Data Lake Storage  backup, a few capabilities, such as **change feed** and **delete lock**, are affected. [Learn more](blob-backup-configure-manage.md?tabs=vaulted-backup#effects-on-backed-up-storage-accounts).

### Fetch the ARM ID of the storage account containing the Data Lake Storage to be protected

The Azure Resource Manager (ARM) ID of the storage account is required to configure vaulted backup for Azure Data Lake Storage. This ID identifies the storage account that contains the Data Lake Storage you want to protect. For example, use the storage account *`CLITestSA`* in the resource group `adlsrg` in a different subscription present in the `Southeast Asia` region.

TO fetch the ARM ID of the storage account, run the following example command:

```azurecli-interactive
"/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx/resourcegroups/adlsrg/providers/Microsoft.Storage/storageAccounts/CLITestSA"
```

### Grant permissions to the Backup vault on the storage account

The Backup vault requires permissions on the storage account to enable backups on Data Lake Storage present within the storage account. The system-assigned managed identity of the vault is used for assigning such permissions.

You need to assign the required permissions via Azure role-based access control (RBAC) to the created vault (represented by vault Managed System Identity (MSI)) and the relevant storage account.

[Learn how to grant permissions to the Backup vault using Azure portal for Azure Data Lake Storage](azure-data-lake-storage-backup-tutorial.md#grant-permissions-to-the-backup-vault-on-storage-accounts).

### Trigger the request for vaulted backup configuration

After you set all the relevant permissions, configure Azure Data Lake Storage vaulted backup by running the following example commands:

1. Initialize the backup configuration with auto-protection enabled. Use `--exclusion-prefixes` to exclude containers whose names start with the specified prefixes.

    ```azurecli-interactive
    az dataprotection backup-instance initialize-backupconfig `
      --datasource-type AzureDataLakeStorage `
      --auto-protection true `
      --exclusion-prefixes "staging-" "temporary-" `
      --output json |
      Set-Content adls-autoprotection.json -Encoding utf8
    ```

1. Prepare the request by using the relevant vault, policy, storage account, and the backup configuration object you created using the [`az dataprotection backup-instance initialize`](https://learn.microsoft.com/cli/azure/dataprotection/backup-instance#az-dataprotection-backup-instance-initialize) command.

    ```azurecli-interactive
    az dataprotection backup-instance initialize `
      --datasource-type AzureDataLakeStorage `
      --datasource-location "southeastasia" `
      --policy-id "/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/testBkpVaultRG/providers/Microsoft.DataProtection/backupVaults/TestBkpVault/backupPolicies/AdlsPolicy1" `
      --datasource-id "/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourcegroups/adlsrg/providers/Microsoft.Storage/storageAccounts/CLITestSA" `
      --backup-config adls-autoprotection.json `
      --output json |
      Set-Content backup_instance.json -Encoding utf8
    ```

1. Submit the request to trigger backup configuration using the [`az dataprotection backup-instance create`](https://learn.microsoft.com/cli/azure/dataprotection/backup-instance#az-dataprotection-backup-instance-create) command.

    ```azurecli-interactive
    az dataprotection backup-instance create `
      --subscription "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e" `
      --resource-group "testBkpVaultRG" `
      --vault-name "TestBkpVault" `
      --backup-instance backup_instance.json
    ```

   The following example JSON configures an Azure Data Lake Storage backup for a specified storage account with a specified policy and explicit container list. Use an explicit container list when you want to protect only selected containers instead of auto-protecting all containers.

    ```JSON
    {
        "properties": {
            "friendlyName": " adlsbackup",
            "dataSourceInfo": {
                "resourceID": "/subscriptions/ xxxxxxx-xxxx-xxxx-xxxx /resourceGroups/adlsrg/providers/Microsoft.Storage/storageAccounts/adlsbackup",
                "resourceUri": "/subscriptions/ xxxxxxx-xxxx-xxxx-xxxx /resourceGroups/adlsrg/providers/Microsoft.Storage/storageAccounts/adlsbackup",
                "datasourceType": "Microsoft.Storage/storageAccounts/adlsBlobServices",
                "resourceName": " adlsbackup",
                "resourceType": "Microsoft.Storage/storageAccounts",
                "resourceLocation": "francesouth",
                "objectType": "Datasource"
            },
            "policyInfo": {
                "policyId": "/subscriptions/ xxxxxxxx-xxxx-xxxx-xxxx/resourceGroups/adlsrg/providers/Microsoft.DataProtection/backupVaults/ TestBkpVault/backupPolicies/AdlsPolicy1",
                "policyParameters": {
                    "backupDatasourceParametersList": [
                        {
                            "containersList": [
                                "container7",
                                "container8"
                            ],
                            "objectType": "AdlsBlobBackupDatasourceParameters"
                        }
                    ]
                }
            },
            "protectionStatus": {
                "status": "ProtectionConfigured"
            },
            "currentProtectionState": "ProtectionConfigured",
            "provisioningState": "Succeeded",
            "objectType": "BackupInstance"
        },
        "id": "/subscriptions/ xxxxxxxx-xxxx-xxxx-xxxx /resourceGroups/adlsrg/providers/Microsoft.DataProtection/backupVaults/ TestBkpVault/backupInstances/adlsbackup",
        "name": " adlsbackup",
        "type": "Microsoft.DataProtection/backupVaults/backupInstances"
    }

    ```




## Next steps

- [Restore Azure Data Lake Storage using Azure portal](azure-data-lake-storage-restore.md).
- [Manage vaulted backup for Azure Data Lake Storage using Azure portal](azure-data-lake-storage-backup-manage.md).
- [Troubleshoot Azure Data Lake Storage backup](azure-data-lake-storage-backup-troubleshoot.md).
