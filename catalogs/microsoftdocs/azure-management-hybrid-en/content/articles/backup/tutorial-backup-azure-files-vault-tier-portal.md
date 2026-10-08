---
title: Tutorial - Back up Azure Files using Azure portal
description: Learn how to back up Azure Files using  Azure portal. 
ms.devlang: azurecli
ms.custom:
  - ignite-2024
ms.topic: tutorial
ms.date: 01/29/2026
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As an IT administrator, I want to back up Azure Files using the portal so that I can ensure data protection against accidental or malicious deletions without maintaining on-premises infrastructure.
---

#  Tutorial: Back up Azure Files using Azure portal

This tutorial describes how to back up Azure Files using  Azure portal. 

Azure Files backup is a native cloud solution that protects your data and eliminates on-premises maintenance overheads. Azure Backup seamlessly integrates with Azure File Sync, centralizing your file share data and backups. The simple, reliable, and secure solution allows you to protect your enterprise file shares using [snapshot](azure-file-share-backup-overview.md?tabs=snapshot) and [vaulted](azure-file-share-backup-overview.md?tabs=vault-standard) backups, ensuring data recovery for accidental or malicious deletion.


## Prerequisites

Before you back up Azure Files, ensure that the following prerequisites are met:

-  Check that the File Share is present in one of the supported storage account types. Review the [support matrix](azure-file-share-support-matrix.md).
- Identify or [create a Recovery Services vault](backup-create-recovery-services-vault.md#create-a-recovery-services-vault) in the same region and subscription as the storage account that hosts the File Share.
- If the storage account access has restrictions, check the firewall settings of the account to ensure the exception **Allow Azure services on the trusted services list to access this storage account** is in grant state. You can refer to [this](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md?tabs=azure-portal#manage-exceptions) link for the steps to grant an exception.
- [Create a backup policy for protection of Azure Files](quick-backup-azure-files-vault-tier-portal.md).



## Create a Recovery Services vault

A Recovery Services vault is a management entity that stores recovery points that are created over time. It provides an interface to perform backup-related operations. These operations include taking on-demand backups, performing restores, and creating backup policies.

To create a Recovery Services vault:

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. Search for **Resiliency**, and then go to the **Resiliency** dashboard.

    Screenshot that shows where to search for and select Resiliency.

1. On the **Vault** pane, select **+ Vault**.

    Screenshot that shows how to start creating a Recovery Services vault.

1. Select **Recovery Services vault** > **Continue**.

    Screenshot that shows where to select Recovery Services as the vault type.

1. On the **Create Recovery Services vault** pane, enter the following values:

   - **Subscription**: Select the subscription to use. If you're a member of only one subscription, you see that name. If you're not sure which subscription to use, use the default subscription. Multiple choices appear only if your work or school account is associated with more than one Azure subscription.
   - **Resource group**: Use an existing resource group or create a new one. To view a list of available resource groups in your subscription, select **Use existing**. Then select a resource in the dropdown list. To create a new resource group, select **Create new**, and then enter the name. For more information about resource groups, see [Azure Resource Manager overview](../azure-resource-manager/management/overview.md).
   - **Vault name**: Enter a friendly name to identify the vault. The name must be unique to the Azure subscription. Specify a name that has at least 2 but not more than 50 characters. The name must start with a letter and consist only of letters, numbers, and hyphens.
   - **Region**: Select the geographic region for the vault. For you to create a vault to help protect any data source, the vault *must* be in the same region as the data source.

      > **Important:**
      > If you're not sure of the location of your data source, close the window. Go to the list of your resources in the portal. If you have data sources in multiple regions, create a Recovery Services vault for each region. Create the vault in the first location before you create a vault in another location. You don't need to specify storage accounts to store the backup data. The Recovery Services vault and Azure Backup handle that step automatically.

    Screenshot that shows fields for configuring a Recovery Services vault.

1. After you provide the values, select **Review + create**.

1. To finish creating the Recovery Services vault, select **Create**.

   It can take a while to create the Recovery Services vault. Monitor the status notifications in the **Notifications** area at the upper right. After the vault is created, it appears in the list of Recovery Services vaults. If the vault doesn't appear, select **Refresh**.

    Screenshot that shows the button for refreshing the list of backup vaults.

Azure Backup now supports immutable vaults that help you ensure that after recovery points are created, they can't be deleted before their expiry according to the backup policy. You can make the immutability irreversible to help protect your backup data from various threats, including ransomware attacks and malicious actors. [Learn more about Azure Backup immutable vaults](https://learn.microsoft.com/azure/backup/backup-azure-immutable-vault-concept).




## Configure backup

Azure Backup allows you to use a single backup policy to back up one or more Azure Files to the same vault in an Azure region.

To configure backup for Azure Files, follow these steps:

1. Go to **Resiliency** > **Overview**, and then select **+ Configure protection**.

   Screenshot shows how to start protecting Azure Files.

2. On the **Configure protection** pane, select **Resources managed by** as **Azure**, **Datasource type** as **Azure Files (Azure Storage)**, select **Solution** as **Azure Backup**, and then select **Continue**.
 
   Screenshot shows the selection of datasource for protection.

3. On the **Start: Configure Backup** pane, click **Select vault** under **Vault**.

   If a Recovery Services vault doesn't exist, [create a new one](backup-create-recovery-services-vault.md#create-a-recovery-services-vault).

4. On the **Select a Vault** pane, select a **Recovery Services vault** from the list to associate with your storage accounts, and then select **Next**. 
 
   Screenshot shows the selection of a Recovery Services vault.

5. On the **Configure Backup** pane, click **Select** under **Storage Account**.

6. On the **Select storage account** pane, select a storage account from the list that contains the file shares for backup.

   Screenshot shows the selection of a storage account.

The **Select storage account** pane lists a set of discovered supported storage accounts. By default, the list shows the storage accounts from the current subscription, or from a different subscription if you select an alternate one from the **Subscription** filter. They're either associated with this vault or present in the same region as the vault, but not yet associated with any Recovery Services vault.
 
   Select an account from the list, and then select **OK** to register the storage account with Recovery Services vault.

7. On the **Configure Backup** pane, under the **File Shares to Backup** section, select **Add** to choose the File Shares you want to back up.

8. On the Select file shares blade, from the file shares list, select one or more file shares you want to back up, and then select **Next**.

   >**Note:**
   >Azure searches the storage account for file shares to back up. Recently added file shares might take some time to appear.

   Screenshot shows the selection of File Shares.

9. On the **Configure Backup** pane, under **Policy Details**, select an existing backup policy from the list for your file share protection

   If a policy doesn't exist, [create a new one](quick-backup-azure-files-vault-tier-portal.md).

10. To start protecting the file share, select **Enable Backup**.
 
    Screenshot shows how to enable protection.


>**Note:**
>You can also configure snapshot backup and vaulted backup (preview) for Azure Files from the [Recovery Services vault](backup-azure-files.md?tabs=recovery-services-vault#configure-the-backup) or [File Share](backup-azure-files.md?tabs=file-share-pane#configure-the-backup) panes.






## Run an on-demand backup job

Occasionally, you might want to generate a backup snapshot, or recovery point, outside of the times scheduled in the backup policy. A common reason to generate an on-demand backup is right after you configure the backup policy. Based on the schedule in the backup policy, it might be hours or days until a snapshot is taken. To protect your data until the backup policy engages, initiate an on-demand backup. Creating an on-demand backup is often required before you make planned changes to your file shares.

**Choose an entry point**

# [Recovery Services vault](#tab/recovery-services-vault)

To run an on-demand backup, follow these steps:

1. Go to the **Recovery Services vault** and select **Backup items** from the menu.

1. On the **Backup items** pane, select the **Backup Management Type** as **Azure Storage (Azure Files)**.

1. Select the item for which you want to run an on-demand backup job.

1. In the **Backup Item** menu, select **Backup now**. Because this backup job is on demand, there's no retention policy associated with the recovery point.

   Screenshot showing to select Backup now.

1. The **Backup Now** pane opens. Specify the last day you want to retain the recovery point. You can have a maximum retention of 10 years for an on-demand backup.

   Screenshot showing to choose retention date.

1. Select **OK** to confirm the on-demand backup job that runs.

1. Monitor the portal notifications to keep track of backup job run completion.

   To monitor the job progress in the **Recovery Services vault** dashboard, go to **Recovery Services vault** > **Backup Jobs** > **In progress**.

# [File share pane](#tab/file-share-pane)

To run an on-demand backup, follow these steps:

1. Open the file share’s **Overview** pane for which you want to take an on-demand backup.

1. Under the **Operation** section, select **Backup**. 

   The context pane appears that lists **Vault Essentials**. Select **Backup Now** to take an on-demand backup.

   Screenshot shows how to select Backup Now.

1. The **Backup Now** pane opens. Specify the retention for the recovery point. You can have a maximum retention of 10 years for an on-demand backup.

   Screenshot shows the option how to retain backup date.

1. Select **OK** to confirm.

>**Note:**
>Azure Backup locks the storage account when you configure protection for any file share in the corresponding account. This feature provides protection against accidental deletion of a storage account with backed up file shares.

---

## Best practices

* Don't delete snapshots created by Azure Backup. Deleting snapshots can result in loss of recovery points and/or restore failures.

* Don't remove the lock taken on the storage account by Azure Backup. Deletion of the lock can make your storage account prone to accidental deletion. Learn more [about protect your resources with lock](https://learn.microsoft.com/azure/azure-resource-manager/management/lock-resources).



## Next steps

- [Restore Azure Files using Azure portal](restore-afs.md?tabs=full-share-recovery).
- Restore Azure Files using [Azure PowerShell](restore-afs-powershell.md), [Azure CLI](restore-afs-cli.md), [REST API](restore-azure-file-share-rest-api.md).
- Manage Azure Files backups using [Azure portal](manage-afs-backup.md), [Azure PowerShell](manage-afs-powershell.md), [Azure CLI](manage-afs-backup-cli.md), [REST API](manage-azure-file-share-rest-api.md).
