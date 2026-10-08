---
title: Back Up Azure VMs in a Recovery Services Vault
description: This article describes how to back up Azure VMs in a Recovery Services vault by using Azure Backup.
ms.topic: how-to
ms.date: 03/25/2026
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As a cloud administrator, I want to configure a backup for Azure VMs by using a Recovery Services vault so that I can ensure data protection and recovery options are in place for my virtual machines.
---

# Back up Azure VMs in a Recovery Services vault

This article describes how to back up Azure virtual machines (VMs) in a Recovery Services vault by using [Azure Backup](backup-overview.md).

In this article, you learn how to:

> 
>
> * Prepare Azure VMs.
> * Create a vault.
> * Discover VMs and configure a backup policy.
> * Enable backup for Azure VMs.
> * Run the initial backup.

> **Note:**
> This article describes how to set up a vault and select VMs to back up. It's useful if you want to back up multiple VMs. Alternatively, you can [back up a single Azure VM](backup-azure-vms-first-look-arm.md) directly from the VM settings.

## Before you start

* [Review](backup-architecture.md#architecture-built-in-azure-vm-backup) the Azure VM backup architecture.
* [Learn about](backup-azure-vms-introduction.md) Azure VM backup and the backup extension.
* [Review the support matrix](backup-support-matrix-iaas.md) before you configure backup.

In some circumstances, you might also need to install the VM agent on the VM. Azure Backup backs up Azure VMs by installing an extension to the Azure VM agent that runs on the machine. If your VM was created from an Azure Marketplace image, the agent is installed and running. If you create a custom VM or you migrate an on-premises machine, you might need to [install the agent manually](#install-the-vm-agent).


> **Note:**
> The functionality that the following sections describe can also be accessed via [Backup center](backup-center-overview.md). Backup center is a single unified management experience in Azure. It enables enterprises to govern, monitor, operate, and analyze backups at scale. With this solution, you can perform most of the key operations for backup management without being limited to the scope of an individual vault.



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


### Modify storage replication

By default, vaults use [geo-redundant storage (GRS)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#geo-redundant-storage):

* If the vault is your primary backup mechanism, we recommend that you use GRS.
* [Locally redundant storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#locally-redundant-storage) is a less-expensive option.
* [Zone-redundant storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#zone-redundant-storage) replicates your data in [availability zones](https://learn.microsoft.com/azure/reliability/availability-zones-overview) for data residency and resiliency in the same region.

To modify the storage replication type, follow these steps:

1. In the new vault, under **Settings**, select **Properties**.
1. On the **Properties** pane, under **Backup Configuration**, select **Update**.
1. Select the storage replication type, and then select **Save**.

    Screenshot that shows setting the storage configuration for a new vault.

You can't modify the storage replication type after the vault is set up and contains backup items. If you want to modify the type, you need to re-create the vault.

## Apply a backup policy

To apply a backup policy to your Azure VMs, follow these steps:

1. Go to **Resiliency**, and then select **+ Configure protection**.

   Screenshot that shows the Configure protection option.

1. On the **Configure protection** pane, fill in the following fields:

   - **Resources managed by**: Select **Azure**.
   - **Datasource type**: Select **Azure Virtual machines**.
   - **Solution**: Select **Azure Backup**.

   Then select **Continue**.

   Screenshot that shows the Configure protection pane.

1. On the **Start: Configure Backup** pane, for **Datasource type**, select **Azure Virtual machines**, and select the vault that you created. Then select **Continue**.

   Screenshot that shows the Start: Configure Backup pane.

1. Assign a backup policy.

    - The default policy backs up the VM once a day. The daily backups are retained for 30 days. Instant recovery snapshots are retained for two days.

      Screenshot that shows the default backup policy.

    - If you don't want to use the default policy, select **Create New**, and create a custom policy as described in the next procedure.

1. Under **Virtual Machines**, select **Add**.

      Screenshot that shows adding virtual machines.

1. On the **Select virtual machines** pane, select the VMs that you want to back up by using the policy. Then select **OK**.

   * Only the selected VMs are validated.
   * Only VMs in the same region as the vault are eligible to select.
   * Only a single vault is used for backup for the VMs.

     Screenshot that shows the Select virtual machines pane.

> **Note:**
> * All the VMs in the same region as the vault are available to configure backup. 
> * Azure VM backup also supports protecting a VM in a different subscription than the vault, as long as the VM and vault are in the same tenant. For supported cross-subscription backup scenarios and limitations, see [Support matrix for Azure VM backups](backup-support-matrix-iaas.md#supported-backup-actions). 
> * When you configure backup, you can browse to the VM name and its resource group, even though you don't have the required permission on those VMs. 
> * If your VM is in a soft-deleted state, it doesn't appear in this list. If you need to reprotect the VM, wait for the soft-deleted period to expire. You can also restore the VM from the soft-deleted list. For more information, see [Soft delete for VMs by using the Azure portal](soft-delete-virtual-machines.md#soft-delete-azure-vm-backups).
> * To change the Recovery Services vault of a VM, stop the backup and then assign a new vault to the VM.

1. In **Backup**, select **Enable backup**. This action deploys the policy to the vault and the VMs and installs the backup extension on the VM agent that runs on the Azure VM.

After you enable backup:

* Azure Backup installs the backup extension irrespective of the VM's running state.
* An initial backup runs in accordance with your backup schedule.
* When backups run:
  * A VM that's running has the greatest chance for capturing an application-consistent recovery point.
  * Even if the VM is turned off, it's backed up. Such a VM is called as an offline VM. In this case, the recovery point is crash consistent.
* Explicit outbound connectivity isn't required to allow backup of Azure VMs.

### Create a custom policy

To create a new backup policy, fill in the following policy settings and then select **OK**:

- **Policy name**: Specify a meaningful name.
- **Backup schedule**: Specify the timing for backups. You can take daily or weekly backups for Azure VMs.
- **Instant restore**: Specify how long you want to retain snapshots locally for Instant Restore:
    * When you restore, backed up VM disks are copied from storage across the network to the recovery storage location. With Instant Restore, you can use locally stored snapshots taken during a backup job. You don't have to wait for transfer of backup data to the vault.
    * You can retain snapshots for Instant Restore for one to five days. The default setting is *two days*.
- **Retention range**: Specify how long you want to keep your daily or weekly backup points.
- **Retention of monthly backup point** and **Retention of yearly backup point**: Specify whether you want to keep a monthly or yearly backup of your daily or weekly backups.

    To store the restore point collection, Azure Backup creates a separate resource group. This resource group is different than the resource group of the VM. [Learn more about resource groups for VMs](backup-during-vm-creation.md#azure-backup-resource-group-for-virtual-machines).

    Screenshot that shows the new backup policy.

Azure Backup doesn't support automatic clock adjustment for daylight-saving time changes for Azure VM backups. As time changes occur, modify backup policies manually as required.

If you want hourly backups, configure the Enhanced backup policy. For more information, see [Back up an Azure VM by using the Enhanced policy](backup-azure-vms-enhanced-policy.md#create-an-enhanced-policy-and-configure-the-vm-backup).

## Trigger the initial backup

The initial backup runs based on the schedule, but you can also run it immediately:

1. Go to **Resiliency** > **Protected items**.
1. On the **Protected items** pane, for **Datasource type**, select **Azure Virtual machines**. Then search for the VM that you configured for backup.
1. Right-click the relevant row or select **More** (**…**), and then select **Backup Now**.
1. On **Backup Now**, use the calendar control to select the last day that the recovery point should be retained. Then select **OK**.
1. Monitor the portal notifications.

   To monitor the job progress, go to **Resiliency** > **Jobs** and filter the list for jobs that are in progress. Depending on the size of your VM, creating the initial backup might take a while.

## Verify the backup job status

The backup job details for each VM backup include the following phases:

- **Snapshot**: Azure Backup takes a snapshot of the VM disks. This phase ensures a recovery point is available for Instant Restore for up to 30 days, depending on the configured policy type and snapshot retention.
- **Transfer data to vault**: Data is copied from the VM to the Recovery Services vault to create a recovery point for long-term retention. This phase starts after **Snapshot** finishes.
- **Validate backup**: Azure Backup performs an integrity check to verify transferred data and confirm that the recovery point is usable.

  Screenshot that shows backup job status.

In job details, the subtasks provide visibility into the backup job phases.

  Screenshot that shows backup job status subtasks.

The progress bar tracks only **Transfer data to vault** and shows the proportion of data transferred. **Snapshot** and **Validate backup** durations aren't represented on the progress bar. Use the progress bar as a transfer indicator, not as an estimate of total backup completion time.

> **Important:**
> - Completion of **Transfer data to vault** doesn't confirm a restorable recovery point. The backup is considered restorable only after **Validate backup** succeeds.
> - **Snapshot** and **Validate backup** durations are excluded from the progress bar because they're not predictably time-bound.
> - The progress bar doesn't represent total time remaining or estimated timeline.
> - This progress experience improves visibility only. It doesn't change the underlying backup workflow.

**Transfer data to vault** can take multiple days to finish depending on the size of the disks, the churn per disk, and other factors.

Job status can vary depending on the following scenarios:

| Snapshot | Transfer data to vault | Job status |
| --- | --- | --- |
| Completed | In progress | In progress |
| Completed | Skipped | Completed |
| Completed | Completed | Completed |
| Completed | Failed | Completed with warning |
| Failed | Failed | Failed |

Now with this capability, for the same VM, two backups can run in parallel. In either phase (**Snapshot** or **Transfer data to vault**), only one subtask can run. In scenarios where a backup job in progress might result in a failure of the next day's backup, this decoupling functionality avoids it. Subsequent days' backups can have the snapshot finished, while **Transfer data to vault** is skipped if an earlier day's backup job is in progress.

The incremental recovery point created in the vault captures the churn from the most recent recovery point that was created in the vault. There's no cost impact for users.

## Optional steps

### Install the VM agent

Azure Backup backs up Azure VMs by installing an extension to the Azure VM agent that runs on the machine. If your VM was created from an Azure Marketplace image, the agent is installed and running. If you create a custom VM or you migrate an on-premises machine, you might need to install the agent manually, as summarized in the following table.

| VM | Details |
| --- | --- |
| Windows | 1. [Download and install](https://go.microsoft.com/fwlink/?LinkID=394789&clcid=0x409) the agent MSI file.<br/><br/> 2. Install with admin permissions on the machine.<br/><br/> 3. Verify the installation. In C:\WindowsAzure\Packages on the VM, right-click **WaAppAgent.exe** > **Properties**. On the **Details** tab, **Product Version** should be 2.6.1198.718 or later.<br/><br/> If you update the agent, make sure that no backup operations are running and [reinstall the agent](https://go.microsoft.com/fwlink/?LinkID=394789&clcid=0x409). |
| Linux | Install by using an RPM or a DEB package from your distribution's package repository. This method is preferred for installing and upgrading the Azure Linux agent. All the [endorsed distribution providers](https://learn.microsoft.com/azure/virtual-machines/linux/endorsed-distros) integrate the Azure Linux agent package into their images and repositories. The agent is available on [GitHub](https://github.com/Azure/WALinuxAgent), but we don't recommend installing from there.<br/><br/> If you update the agent, make sure that no backup operations are running and update the binaries. |

## Related content

* Troubleshoot any issues with [Azure VM agents](backup-azure-troubleshoot-vm-backup-fails-snapshot-timeout.md) or [Azure VM backup](backup-azure-vms-troubleshoot.md).
* [Restore](backup-azure-arm-restore-vms.md) Azure VMs.
