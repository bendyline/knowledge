---
title: Quickstart - Configure vaulted backup for Azure Blobs using Azure PowerShell
description: In this Quickstart, learn how to configure vaulted backup for Azure Blobs using Azure PowerShell.
ms.devlang: azurecli
ms.topic: quickstart
ms.date: 06/17/2025
ms.update-cycle: 1095-days
ms.custom: mvc, devx-track-azurepowershell, mode-api
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As an IT admin, I want to configure vaulted backup for Azure Blobs using PowerShell, so that I can ensure my data is securely backed up and easily recoverable.
---

# Quickstart: Configure vaulted backup for Azure Blobs using Azure Backup via Azure PowerShell

This quickstart describes how to configure vaulted backup for Azure Blobs using Azure PowerShell. You can also [configure backup using REST API](backup-azure-dataprotection-use-rest-api-backup-blobs.md).


[Azure Backup](backup-overview.md) now allows you to configure both [operational](blob-backup-overview.md?tabs=operational-backup) and [vaulted](blob-backup-overview.md?tabs=vaulted-backup) backups to protect block blobs in your storage accounts.

Vaulted backup of blobs is a managed offsite backup solution that stores the backup data in a general v2 storage account, enabling you to protect your backup data against ransomware attacks or source data loss due to malicious or rogue admin. 

With vaulted backup, you can:

- Define the backup schedule to create recovery points and the retention settings that determine how long the backups will be retained in the vault.
- Configure and manage the vaulted and operational backups using a single backup policy.
- Copy and store the backup data in the Backup vault, thus providing an offsite copy of data that can be retained for a maximum of 10 years.

## Prerequisites

Before you configure blob vaulted backup, ensure that:

- Install the Azure PowerShell version **Az 5.9.0**. To configure auto-protection for present and future containers, install Az.DataProtection version 3.0.1 or later.
- You review the [support matrix](blob-backup-support-matrix.md) to learn about the Azure Blob region availability, supported scenarios, and limitations.
- You have a Backup vault to configure Azure Blob backup. If you haven't created the Backup vault, [create one](backup-blobs-storage-account-ps.md#create-a-backup-vault).

## Create a backup policy


To create a backup policy for blob vaulted backup, run the following commands:

1. To retrieve the policy template, use the [Get-AzDataProtectionPolicyTemplate](https://learn.microsoft.com/powershell/module/az.dataprotection/get-azdataprotectionpolicytemplate) command. This command returns a default policy template for a given datasource type. Use this policy template to create a new policy.

   ```azurepowershell
   $defaultPol = Get-AzDataProtectionPolicyTemplate -DatasourceType AzureBlob`
   ```

2. To create a vaulted backup policy, define the schedule and retention for backups. The following commands create a backup policy with backup frequency every week on Friday and Tuesday at 10 AM and retention of three months.

    ```azurepowershell-interactive
    $schDates = @( 

    ( 

        (Get-Date -Year 2023 -Month 08 -Day 18 -Hour 10 -Minute 0 -Second 0) 

    ), 

    ( 

        (Get-Date -Year 2023 -Month 08 -Day 22 -Hour 10 -Minute 0 -Second 0)  

    )) 
    

    $trigger =  New-AzDataProtectionPolicyTriggerScheduleClientObject -ScheduleDays $schDates -IntervalType Weekly -IntervalCount 1 

    Edit-AzDataProtectionPolicyTriggerClientObject -Schedule $trigger -Policy $defaultPol  


    $lifeCycleVault = New-AzDataProtectionRetentionLifeCycleClientObject -SourceDataStore VaultStore -SourceRetentionDurationType Months -SourceRetentionDurationCount 3  

    Edit-AzDataProtectionPolicyRetentionRuleClientObject -Policy $defaultPol -Name Default -LifeCycles $lifeCycleVault -IsDefault $true 

    New-AzDataProtectionBackupPolicy -SubscriptionId "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" -ResourceGroupName "resourceGroupName" -VaultName "vaultName" -Name "MyPolicy" -Policy $defaultPol 
    ```


 

 



## Configure backup


Once the vault and policy are created, there are two critical points that you need to consider to protect all the Azure Blobs within a storage account.

- Key entities
- Permissions

### Key entities

- **Storage account containing the blobs to be protected**: Fetch the Azure Resource Manager ID of the storage account that contains the blobs to be protected. This will serve as the identifier of the storage account. We'll use an example of a storage account named *PSTestSA* under the resource group *blobrg* in a different subscription.

    ```azurepowershell-interactive
    $SAId = "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx/resourcegroups/blobrg/providers/Microsoft.Storage/storageAccounts/PSTestSA"
    ```

- **Backup vault**: The Backup vault requires permissions on the storage account to enable backups on blobs present within the storage account. The system-assigned managed identity of the vault is used for assigning such permissions.

### Assign permissions

You need to assign a few permissions via Azure RBAC to the created vault (represented by vault MSI) and the relevant storage account. These can be performed via Portal or PowerShell. Learn more about all the [related permissions](https://learn.microsoft.com/azure/backup/blob-backup-configure-manage#grant-permissions-to-the-backup-vault-on-storage-accounts).


## Prepare the request to configure blob backup


Once all the relevant permissions are set, configure blob backup by running the following commands:

1. Create a new backup configuration object to specify the set of containers you want to back up. To back up all present containers, pass the `-IncludeAllContainer` parameter. To auto-protect all present and future containers, pass the `-AutoProtection` parameter. When you use this parameter, new containers created after backup configuration are automatically protected until the protected container count reaches 1000. Selecting auto-protection for all present and future containers is permanent, and you can't switch back to the earlier container selection options. To exclude containers from auto-protection, pass prefix-based rules to the `-AutoProtectionExclusionRule` parameter. To back up specific containers, pass the list of containers to the `-VaultedBackupContainer` parameter.

    ```azurepowershell-interactive
    $blobRules = @(
        @{ ObjectType = "BlobBackupAutoProtectionRule"; Pattern = "logs-" }
        @{ ObjectType = "BlobBackupAutoProtectionRule"; Pattern = "temp-" }
    )

    $backupConfig = New-AzDataProtectionBackupConfigurationClientObject `
        -DatasourceType AzureBlob `
        -AutoProtection `
        -AutoProtectionExclusionRule $blobRules
    ```

2. Prepare the relevant request by using the relevant vault, policy, storage account, and the backup configuration object created in the above step using the [Initialize-AzDataProtectionBackupInstance](https://learn.microsoft.com/powershell/module/az.dataprotection/initialize-azdataprotectionbackupinstance) command.  

    ```azurepowershell-interactive
    $instance=Initialize-AzDataProtectionBackupInstance -DatasourceType AzureBlob -DatasourceLocation $TestBkpVault.Location -PolicyId $blobBkpPol.Id -DatasourceId $SAId -BackupConfiguration $backupConfig
    ```

3. Submit the request to protect the blobs within the storage account using the [New-AzDataProtectionBackupInstance](https://learn.microsoft.com/powershell/module/az.dataprotection/new-azdataprotectionbackupinstance) command.

    ```azurepowershell-interactive
    New-AzDataProtectionBackupInstance -ResourceGroupName "StorageRG" -VaultName $TestBkpVault.Name -BackupInstance $instance
    ```

 

## Next step

Restore Azure Blobs by Azure Backup using [Azure portal](blob-restore.md), [Azure PowerShell](restore-blobs-storage-account-ps.md), [Azure CLI](restore-blobs-storage-account-cli.md), [REST API](backup-azure-dataprotection-use-rest-api-restore-blobs.md).
