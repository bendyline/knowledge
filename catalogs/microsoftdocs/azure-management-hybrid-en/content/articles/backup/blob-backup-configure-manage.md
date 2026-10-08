---
title: Configure and manage backup for Azure Blobs using Azure Backup
description: Learn how to configure and manage operational and vaulted backups for Azure Blobs.
ms.topic: how-to
ms.date: 01/30/2026
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: "As a cloud administrator, I want to configure and manage backup for Azure Blobs across multiple storage accounts, so that I can ensure data protection and recovery options are available in case of accidental deletion or data loss."
---

# Configure and manage backup for Azure Blobs using Azure Backup

Azure Backup allows you to configure operational and vaulted backups to protect block blobs in your storage accounts. This article describes how to configure and manage backups on one or more storage accounts using the Azure portal. You can also [configure backup using REST API](backup-azure-dataprotection-use-rest-api-backup-blobs.md).

For more information on the general availability of vaulted backups for Azure Blob Storage and how they enhance data protection with ransomware resilience and long-term retention, see the [Microsoft Community Hub blog](https://techcommunity.microsoft.com/blog/azuregovernanceandmanagementblog/general-availability-vaulted-backups-for-azure-blob-storage/4207474).

## Before you start

# [Operational backup](#tab/operational-backup)

- Operational backup of blobs is a local backup solution that maintains data for a specified duration in the source storage account itself. This solution doesn't maintain an additional copy of data in the vault. This solution allows you to retain your data for restore for up to 360 days. Long retention durations can, however, lead to longer time taken during the restore operation.
- The solution can be used to perform restores to the source storage account only and can result in data being overwritten.
- If you delete a container from the storage account by calling the *Delete Container operation*, that container can't be restored with a restore operation. Rather than deleting an entire container, delete individual blobs if you want to restore them later. Also, Microsoft recommends enabling soft delete for containers, in addition to operational backup, to protect against accidental deletion of containers.
- Ensure that the **Microsoft.DataProtection** provider is registered for your subscription.

For more information about the supported scenarios, limitations, and availability, see the [support matrix](blob-backup-support-matrix.md).

# [Vaulted backup](#tab/vaulted-backup)

- Vaulted backup of blobs is a managed offsite backup solution that transfers data to the backup vault and retains as per the retention configured in the backup policy. You can retain data for a maximum of *10 years*.
- Currently, you can use the vaulted backup solution to restore data to a different storage account only. While performing restores, ensure that the target storage account doesn't contain any *containers* with the same name as those backed up in a recovery point. If any conflicts arise due to the same name of containers, the restore operation fails.

For more information about the supported scenarios, limitations, and availability, see the [support matrix](blob-backup-support-matrix.md).

---

## Create a Backup vault

A [Backup vault](backup-vault-overview.md) is a management entity that stores recovery points created over time and provides an interface to perform backup related operations. These include taking on-demand backups, performing restores, and creating backup policies. Though operational backup of blobs is a local backup and doesn't "store" data in the vault, the vault is required for various management operations.

>**Note:**
>The Backup vault is a new resource that is used for backing up new supported workloads and is different from the already existing Recovery Services vault.

For instructions on how to create a Backup vault, see the [Backup vault documentation](create-manage-backup-vault.md#create-a-backup-vault).

## Grant permissions to the Backup vault on storage accounts

Operational backup also protects the storage account (that contains the blobs to be protected) from any accidental deletions by applying a Backup-owned Delete Lock. This requires the Backup vault to have certain permissions on the storage accounts that need to be protected. For convenience of use, these minimum permissions have been consolidated under the **Storage Account Backup Contributor** role. 

We recommend you to assign this role to the Backup vault before you configure backup. However, you can also perform the role assignment while configuring backup.  

To assign the required role for storage accounts that you need to protect, follow these steps:

>**Note:**
>You can also assign the roles to the vault at the Subscription or Resource Group levels according to your convenience.

1. In the storage account that needs to be protected, go to the **Access Control (IAM)** tab on the left navigation blade.
1. Select **Add role assignments** to assign the required role.

    Add role assignments

1. In the Add role assignment blade:

    1. Under **Role**, choose **Storage Account Backup Contributor**.
    1. Under **Assign access to**, choose **User, group or service principal**.
    1. Search for the Backup vault you want to use for backing up blobs in this storage account, and then select it from the search results.
    1. Select **Save**.

        Role assignment options

        >**Note:**
        >The role assignment might take up to 30 minutes to take effect.



## Create a backup policy

A backup policy defines the schedule and frequency of the recovery points creation, and its retention duration in the Backup vault. You can use the same backup policy to configure backup for multiple storage accounts to a vault.

To create a backup policy, follow these steps:

1. Go to **Resiliency** > **Protection policies**, and then select **+ Create Policy** > **Create Backup Policy**.

   Screenshot shows how to initiate adding backup policy for vaulted blob backup.

2. On the **Start: Create Policy** page, select the **Datasource type** as **Azure Blobs (Azure Storage)**, and then select **Continue**.

   Screenshot shows how to select datasource type for vaulted blob backup.

3. On the **Create Backup Policy** page, on the **Basics** tab, enter a **Policy name**, and then from **Select vault**, choose a vault you want this policy to be associated.

   Screenshot shows how to add vaulted blob backup policy name.

   Review the details of the selected vault in this tab, and then select **Next**.
 
4. On the **Schedule + retention** tab, enter the *backup details* of the data store, schedule, and retention for these data stores, as applicable.

   1. To use the backup policy for vaulted backups, operational backups, or both, select the corresponding checkboxes.
   1. For each data store you selected, add or edit the schedule and retention settings:
      - **Vaulted backups**: Choose the frequency of backups between *daily* and *weekly*, specify the schedule when the backup recovery points need to be created, and then edit the default retention rule (selecting **Edit**) or add new rules to specify the retention of recovery points using a *grandparent-parent-child* notation.
      - **Operational backups**: These are continuous and don't require a schedule. Edit the default rule for operational backups to specify the required retention.

   Screenshot shows how to configure vaulted blob backup schedule and retention.

5. Select **Review + create**.
6. Once the review is successful, select **Create**.




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


### Using Data protection settings of the storage account to configure backup

You can configure backup for blobs in a storage account directly from the ‘Data Protection’ settings of the storage account. 

1. Go to the storage account for which you want to configure backup for blobs, and then go to **Data Protection** in left blade (under **Data management**).

1. In the available data protection options, the first one allows you to enable operational backup using Azure Backup.

    Operational backup using Azure Backup

1. Select the checkbox corresponding to **Enable operational backup with Azure Backup**. Then select the Backup vault and the Backup policy you want to associate.
   You can select the existing vault and policy, or create new ones, as required.

    >**Important:**
    >You should have assigned the **Storage account backup contributor** role to the selected vault. Learn more about [Grant permissions to the Backup vault on storage accounts](#grant-permissions-to-the-backup-vault-on-storage-accounts).
    
    - If you've already assigned the required role, select **Save** to finish configuring backup. Follow the portal notifications to track the progress of configuring backup.
    - If you haven’t assigned it yet, select **Manage identity**  and Follow the steps below to assign the roles. 

        Enable operational backup with Azure Backup


        1. On selecting **Manage identity**, brings you to the Identity blade of the storage account. 
        
        1. Select **Add role assignment** to initiate the role assignment.

            Add role assignment to initiate the role assignment


        1. Choose the scope, the subscription, the resource group, or the storage account you want to assign to the role.<br><br>We recommend  you to assign the role at resource group level if you want to configure operational backup for blobs for multiple storage accounts.

        1. From the **Role** drop-down, select the **Storage account backup contributor** role.

            Select Storage account backup contributor role


        1. Select **Save** to finish role assignment.
        
           You'll receive notification through the portal once this completes successfully. You can also see the new role added to the list of existing ones for the selected vault.

            Finish role assignment

        1. Select the cancel icon (**x**) on the top right corner to return to the **Data protection** blade of the storage account.<br><br>Once back, continue configuring backup.

## Effects on backed-up storage accounts

# [Vaulted backup](#tab/vaulted-backup)

- In storage accounts (for which you've configured vaulted backups), the object replication rules get created under the **Object replication** item in the left blade.
- Object replication requires versioning and change-feed capabilities. So, Azure Backup service enables these features on the source storage account.

# [Operational backup](#tab/operational-backup)

Once backup is configured, changes taking place on block blobs in the storage accounts are tracked and data is retained according to the backup policy. You'll notice the following changes in the storage accounts for which backup is configured:

- The following capabilities are enabled on the storage account. These can be viewed in the **Data Protection** tab of the storage account.
  - Point in time restore for containers: With retention as specified in the backup policy
  - Soft delete for blobs: With retention as specified in the backup policy +5 days
  - Versioning for blobs
  - Blob change feed

  If the storage account configured for backup already had  **Point in time restore for containers** or **Soft delete for blobs** enabled (before backup was configured), Backup ensures that the retention is at least as defined in the backup policy. Therefore, for each property:

  - If the retention in the backup policy is greater than the retention originally present in the storage account: The retention on the storage account is modified according to the backup policy
  - If the retention in the backup policy is less than the retention originally present in the storage account: The retention on the storage account is left unchanged at the originally set duration.

  Data protection tab

- A **Delete Lock** is applied by Backup on the protected Storage Account. The lock is intended to safeguard against cases of accidental deletion of the storage account. This can be viewed under **Storage Account** > **Locks**.

    Delete locks

---

## Manage backups

You can use [Resiliency](../resiliency/resiliency-overview.md) as your single blade of glass for managing all your backups. Regarding backup for Azure Blobs, you can use Resiliency to do the following operations:

- As we've seen above, you can use it for creating Backup vaults and policies. You can also view all vaults and policies under the selected subscriptions.
- Resiliency gives you an easy way to [monitor the state of protection](../resiliency/tutorial-monitor-protection-summary.md) of protected storage accounts as well as storage accounts for which [backup isn't currently configured](../resiliency/quick-understand-protection-estate.md#identify-unprotected-resources).
- You can configure backup for any storage accounts using the **+Configure protection** button.
- You can initiate restores using the **Restore** button and track restores using **Jobs**. For more information on performing restores, see [Restore Azure Blobs](blob-restore.md?tabs=vaulted-backup).
- Analyze your backup usage using Backup reports.

    Screenshot shows the Resiliency console to manage the Azure Blob backups.

For more information, see [Overview of Resiliency](../resiliency/resiliency-overview.md).

## Stop protection

You can stop operational backup for your storage account according to your requirement.

>**Note:**
>When you remove backups, Azure Backup automatically deletes the **object replication policy** from the source. If custom locks exist, remove the policy manually. If you stop protection, it disconnects only the storage account from the Backup vault and tools (such as Resiliency). This action doesn't disable blob point-in-time restore, versioning, or change feed settings.

To stop backup for a storage account, follow these steps:

1. Go to the backup instance for the storage account being backed up.

   You can go to the backup instance from the storage account via **Storage account** > **Data protection** > **Manage backup settings**, or directly from the Resiliency  via **Resiliency** > **Protected Items** , and then select **Azure Backup** as a **Solution** in the filter. 

   Screenshot shows the Storage account location.
   
1. Select **stop backup** from the menu.
 
   Screenshot shows how to stop operational backup.

After stopping backup, you can disable other storage data protection capabilities (enabled for configuring backups) from the data protection blade of the storage account.

## Update the backup instance

After you configure the backup, you can change the associated policy with a backup instance. For vaulted backups, you can also change the containers selected for backup or choose to auto-protect containers up to the supported limit. Selecting auto-protection for all present and future containers is permanent, and you can't switch back to the earlier container selection options.
To update the backup instance, follow these steps:
 
1. Go to the **Backup vault** dashboard.
1. On the **Backup Items** tile, select **Azure Blobs (Azure Storage)** as the datasource type.
1. On the **Backup instance** blade, select the backup instance for which you want to change the Backup policy, and then select **Edit backup instance**.
 
   Screenshot shows  how to edit a backup instance.

1. Select the new policy that you want to apply to the storage account blobs.
 
   Screenshot shows  how to change a backup policy.

1. Select **Save**.



## Next steps

[Restore Azure Blobs using Azure portal](blob-restore.md).

## Related content

Restore Azure Blobs by Azure Backup using [Azure PowerShell](restore-blobs-storage-account-ps.md), [Azure CLI](restore-blobs-storage-account-cli.md), [REST API](backup-azure-dataprotection-use-rest-api-restore-blobs.md).
