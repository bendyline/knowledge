---
title: Quickstart - Configure vaulted backup for Azure Blobs using Azure Backup
description: In this quickstart, learn how to configure vaulted backup for Azure Blobs.
ms.topic: quickstart
ms.date: 03/13/2026
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As a cloud administrator, I want to configure vaulted backup for Azure Blobs, so that I can ensure my data is securely backed up and retained according to my organization's policies.
---

# Quickstart: Configure vaulted backup for Azure Blobs using Azure Backup

This quickstart describes how to create a backup policy and configure vaulted backup for Azure Blobs from the Azure portal. You can also [configure backup using REST API](backup-azure-dataprotection-use-rest-api-backup-blobs.md).


[Azure Backup](backup-overview.md) now allows you to configure both [operational](blob-backup-overview.md?tabs=operational-backup) and [vaulted](blob-backup-overview.md?tabs=vaulted-backup) backups to protect block blobs in your storage accounts.

Vaulted backup of blobs is a managed offsite backup solution that stores the backup data in a general v2 storage account, enabling you to protect your backup data against ransomware attacks or source data loss due to malicious or rogue admin. 

With vaulted backup, you can:

- Define the backup schedule to create recovery points and the retention settings that determine how long the backups will be retained in the vault.
- Configure and manage the vaulted and operational backups using a single backup policy.
- Copy and store the backup data in the Backup vault, thus providing an offsite copy of data that can be retained for a maximum of 10 years.


## Prerequisites

Before you configure blob vaulted backup, ensure that:

- You have a Backup vault to configure Azure Blob backup. If you haven't created the Backup vault, [create one](blob-backup-configure-manage.md?tabs=vaulted-backup#create-a-backup-vault).
- You assign permissions to the Backup vault on the storage account. [Learn more](blob-backup-configure-manage.md?tabs=vaulted-backup#grant-permissions-to-the-backup-vault-on-storage-accounts).
- You create a backup policy for Azure Blobs vaulted backup. [Learn more](blob-backup-configure-manage.md?tabs=vaulted-backup#create-a-backup-policy).

> **Caution:**
> *Azure Backup is not supported for Storage Accounts enabled with network security perimeter. We recommend not associating an account with network security perimeter if you have backups enabled or if you plan to use Azure Backup.*  
> 
## Before you start

Things to remember before you start configuring blob vaulted backup:

- Vaulted backup of blobs is a managed offsite backup solution that transfers data to the backup vault and retains as per the retention configured in the backup policy. You can retain data for a maximum of *10 years*.
- Currently, you can use the vaulted backup solution to restore data to a different storage account only. While performing restores, ensure that the target storage account doesn't contain any *containers* with the same name as those backed up in a recovery point. If any conflicts arise due to the same name of containers, the restore operation fails.

For more information about the supported scenarios, limitations, and availability, see the [support matrix](blob-backup-support-matrix.md).



## Configure backups

You can use a single backup policy to back up one or more storage accounts to the same vault in an Azure region.

To configure backup for storage accounts, follow these steps:

1. Go to **Resiliency** > **Overview**, and then select **+ Configure protection**.

   Screenshot shows how to initiate vaulted blob backup.

2. On the **Configure protection** pane, Under **Resources managed by**, select **Datasource type** as **Azure Blobs (Azure Storage)** for which you want to configure protection, and then select the solution as **Azure Backup** using which you want to configure protection.

   Screenshot shows how to initiate configuring vaulted blob backup.

3. On the **Configure Backup** page, on the **Basics** tab, choose **Azure Blobs (Azure Storage)** as the **Datasource type**, and then select the *Backup vault* that you want to associate with your storage accounts as the **Vault**.

   Review the **Selected backup vault details**, and then select **Next**.

   Screenshot shows how to select datasource type to initiate vaulted blob backup.
 
4. On the **Backup policy** tab, select the *backup policy* you want to use for retention. You can also create a new backup policy, if needed.

   Review the **Selected policy details**, and then select **Next**.

   Screenshot shows how to select policy for vaulted blob backup.

5. On the **Configure Backup** page, on the **Datasources** tab, select the *storage accounts* you want to back up.

   You can select multiple storage accounts in the region to back up using the selected policy. Search or filter the storage accounts, if required.
  
   If you've chosen the vaulted backup policy in step 4, you can also select which containers to protect. Select **Change** under the **Selected containers** column. In the **Select storage containers** pane, choose one of the following options:

   - **Backup all present containers**: Protect all containers that currently exist in the storage account.
   - **Browse containers to backup**: Select specific containers to protect.
   - **Backup all present and future containers**: Auto-protect all existing containers and any new containers created after backup configuration, until the protected container count reaches 1000.

   Screenshot shows the options to back up all present containers, browse containers to back up, or back up all present and future containers.

   > **Important:**
   > Selecting **Backup all present and future containers** is a permanent change. After you select this option, you can't switch back to **Backup all present containers** or **Browse containers to backup**. You can add prefixes to exclude containers whose names start with the specified prefixes from backup.

   Screenshot shows the warning that selecting the option to back up all present and future containers is permanent, and shows the prefix field to exclude matching containers from backup.

   When you select the storage accounts and containers to protect, Azure Backup performs the following validations to ensure all prerequisites are met.
   >**Note:**
   >The **Backup readiness** column shows if the Backup vault has enough permissions to configure backups for each storage account.

   1. The number of containers to be backed up is less than *1000* in case of vaulted backups. You can back up all present containers, browse and select specific containers, or back up all present and future containers. If your storage account has *>1000* containers, you must exclude containers to reduce the count to *1000 or below*.

      >**Note:**
      >In case of vaulted backups, the storage accounts to be backed up must contain at least *1 container*. If the selected storage account doesn't contain any containers or if no containers are selected, you may get an error while configuring backups.

   1. The Backup vault has the required permissions to configure backup; the vault has the **Storage account backup contributor** role on all the selected storage accounts. If validation shows errors, then the selected storage accounts don't have **Storage account backup contributor** role. You can assign the required role, based on your current permissions. The error message helps you understand if you have the required permissions, and take the appropriate action:

      - **Role assignment not done**: Indicates that you (the user) have permissions to assign the **Storage account backup contributor** role and the other required roles for the storage account to the vault.

        Select the roles, and then select **Assign missing roles** on the toolbar to automatically assign the required role to the Backup vault, and trigger an autorevalidation.

        If the role propagation takes more than 10 minutes, then the validation will fail. In this scenario, you need to wait for a few minutes and select **Revalidate** to retry validation.

      - **Insufficient permissions for role assignment**: Indicates that the vault doesn't have the required role to configure backups, and you (the user) don't have enough permissions to assign the required role. To make the role assignment easier, Azure Backup allows you to download the role assignment template, which you can share with users with permissions to assign roles for storage accounts. 

        >**Note:**
        >The template contains details for selected storage accounts only. If there are multiple users that need to assign roles for different storage accounts, you can select and download different templates accordingly.

   1. To configure the backup operation with a storage account in a different subscription (Cross Subscription Backup), choose the alternate subscription from the **Subscription** filter. The storage accounts from the selected subscription appear.

6. To assign the required roles, select the storage accounts, and then select **Download role assignment template** to download the template. Once the role assignments are complete, select **Revalidate** to validate the permissions again, and then configure backup.

   Screenshot shows that the role assignment is successful.

   
7. Once validation succeeds, select the **Review + configure** tab.

8. Review the details on the **Review + configure** tab and select **Next** to initiate the *configure backup* operation.

You'll receive notifications about the status of protection configuration and its completion.



## Next step

Restore Azure Blobs by Azure Backup using [Azure portal](blob-restore.md), [Azure PowerShell](restore-blobs-storage-account-ps.md), [Azure CLI](restore-blobs-storage-account-cli.md), [REST API](backup-azure-dataprotection-use-rest-api-restore-blobs.md).
