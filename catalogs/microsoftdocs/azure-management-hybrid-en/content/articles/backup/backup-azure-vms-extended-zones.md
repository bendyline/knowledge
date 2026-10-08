---
title: Back Up an Azure Virtual Machine with Azure Extended Zones Portal
description: In this article, learn how to back up an Azure virtual machine (VM) with the Azure Backup Extended Zones service.
ms.topic: how-to
ms.date: 01/21/2026
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: "As an IT administrator, I want to back up Azure virtual machines using the Azure portal, so that I can protect data and ensure high availability through enhanced resiliency in Azure Extended Zones."
---

# Back up an Azure virtual machine in Azure Extended Zones

This article describes how to back up an existing Azure VM by using the Azure portal.

You can create Azure backups through the Azure portal. You can use the browser-based interface to create and configure backups and related resources to protect your data by taking regular backups. [Azure Backup](backup-overview.md) creates and stores recovery points in geo-redundant recovery vaults.

[Azure Extended Zones](../extended-zones/overview.md) provide enhanced resiliency by distributing resources across multiple physical locations within an Azure region. This approach minimizes the impact of potential failures for critical infrastructure. With Extended Zones, your organization can achieve higher availability and fault tolerance for its applications.

## Before you start

Before you back up a VM in Extended Zones, review the [supported scenario](backup-support-matrix-iaas.md).


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


## Apply a backup policy

To apply a backup policy to your Azure VMs, follow these steps:

1. Go to **Resiliency** and select **+ Configure protection**.

   Screenshot that shows how to start configuring the system backup.

1. On the **Configure protection** pane, fill in the following fields:
     - **Resources managed by**: Select **Azure**.
     - **Datasource type**: Select **Azure Virtual machines**.
     - **Solution**: Select **Azure Backup**.
   
    Then select **Continue**.

   Screenshot that shows how to set the system backup.

1. On the **Start: Configure Backup** pane, for **Datasource type**, select **Azure Virtual machines**. Select the vault that you created, and then select **Continue**.

   Screenshot that shows the Configure backup pane.

1. Select the [Enhanced backup policy](backup-azure-vms-enhanced-policy.md) because that policy is compatible with Extended Zones.

   > **Note:**
   > To enable Azure Backup on Azure VMs in Extended Zones, you can only use the Enhanced policy. This policy allows multiple daily backups and enables hourly backups. [Learn more about the Enhanced policy](backup-azure-vms-enhanced-policy.md).
1. Assign the backup policy.

   Screenshot that shows the default backup policy.

   If you don't want to use the default policy, select **Create New**, and create a custom policy as described in the next procedure.

## Select a VM to back up

To create a scheduled daily backup to a Recovery Services vault, follow these steps:

1. Under **Virtual Machines**, select **Add**.

   Screenshot that shows adding virtual machines.

1. When the **Select virtual machines** pane opens, select the VMs that you want to back up by using the policy. Then select **OK**.

   Screenshot that shows the Select virtual machines pane.

   
   You can configure backup for all VMs in the same region and subscription as the vault.

## Enable backup on a VM

A Recovery Services vault is a logical container that stores backup data for protected resources like Azure VMs. When a backup job runs for a protected resource, it creates a recovery point in the Recovery Services vault. You can use these recovery points to restore data to a specific point in time.

To enable VM backup, in **Backup**, select **Enable backup**. This step deploys the policy to the vault and to the VMs. The backup extension is installed on the VM agent that runs on the Azure VM.

After you enable backup:

- Backup installs the backup extension whether or not the VM is running.
- An initial backup runs in accordance with your backup schedule.
- When backups run:
  - A VM that's running has the highest chance for capturing an application-consistent recovery point.
  - If the VM is turned off (an offline VM), it's still backed up, which results in a crash-consistent recovery point.
- Explicit outbound connectivity isn't required for backup of Azure VMs.

### Create a custom policy

If you selected to create a new backup policy, fill in the policy settings.

1. On the **Backup policy** pane, fill in the following fields:

    - **Policy name**: Specify a meaningful name.
    - **Backup schedule**: Specify when backups should be taken. You can take daily or weekly backups for Azure VMs.
    - **Instant Restore**: Specify how long you want to retain snapshots locally for Instant Restore:
        * When you restore, backed-up VM disks are copied from storage across the network to the recovery storage location. With Instant Restore, you can use locally stored snapshots taken during a backup job without waiting for the backup data to transfer to the vault.
        * You can retain snapshots for Instant Restore from one to five days. The default value is two days.
    - **Retention range**: Specify how long you want to keep your daily or weekly backup points.
    - **Retention of monthly backup point** and **Retention of yearly backup point**: Specify whether you want to keep a monthly or yearly backup of your daily or weekly backups.
1. Select **OK** to save the policy.
   
   To enable Azure Backup on Azure VMs in Extended Zones, use only the Enhanced policy. Backup creates a separate resource group to store the restore point collection. This resource group is different from the resource group of the VM.

    Screenshot that shows the new backup policy.

## Run an on-demand backup

The initial backup runs in accordance with the schedule in the backup policy. To run a backup job immediately, follow these steps:

1. Go to **Backup center** and select **Backup Instances**.
1. For **Datasource type**, select **Azure Virtual machines**. Then search for the VM that you configured for backup.
1. Select the relevant row or select the more icon (**…**), and then select **Backup Now**.
1. On **Backup Now**, use the calendar control to select the last day that the recovery point should be retained. Then select **OK**.

## Monitor the backup job

Monitor the portal notifications. To monitor the job progress, go to **Resiliency** > **Monitoring + Reporting** > **Jobs** and filter the list for **In progress** jobs. Depending on the size of your VM, creating the initial backup might take a while.

Backup job details show **Snapshot** and **Transfer data to vault** subtasks. **Snapshot** ensures availability of a recovery point for instant restores (up to 30 days, based on configured snapshot retention). **Transfer data to vault** creates a recovery point in the vault for long-term retention and starts after **Snapshot** completes.

   Screenshot that shows the backup job status.

Two subtasks run at the back end. One is for the front-end backup job that you can check on the **Backup Job Details** pane.

   Screenshot that shows backup job status subtasks.

For information on VM backup job phases and how to interpret the progress bar, see [Verify the backup job status](backup-azure-arm-vms-prepare.md#verify-the-backup-job-status).

Transfer data to vault can take multiple days to complete depending on the size of the disks, churn per disk, and several other factors.

Job status can vary depending on the following scenarios:

| Snapshot | Transfer data to vault | Job status |
| --- | --- | --- |
| Completed | In progress | In progress |
| Completed | Skipped | Completed |
| Completed | Completed | Completed |
| Completed | Failed | Completed with warning |
| Failed | Failed | Failed |

For parallel backup behavior and incremental recovery-point guidance, see [VM backup job progress phases](backup-azure-arm-vms-prepare.md#verify-the-backup-job-status).

## Optional steps

### Install the VM agent

Azure Backup backs up Azure VMs by installing an extension to the Azure VM agent that runs on the machine. If your VM was created from an Azure Marketplace image, the agent is already installed and running. If you create a custom VM or migrate an on-premises machine, you might need to install the agent manually, as summarized in the following table.

| VM | Details |
| --- | --- |
| Windows | 1. [Download and install](https://go.microsoft.com/fwlink/?LinkID=394789&clcid=0x409) the agent MSI file. <br><br> 2. Install with admin permissions on the machine. <br><br> 3. Verify the installation. In C:\WindowsAzure\Packages on the VM, right-click **WaAppAgent.exe** > **Properties**. On the **Details** tab, **Product Version** should be 2.6.1198.718 or later. <br><br> If you update the agent, make sure that no backup operations are running and [reinstall the agent](https://go.microsoft.com/fwlink/?LinkID=394789&clcid=0x409). |
| Linux | Install by using an RPM or a DEB package from your distribution's package repository. This method is preferred for installing and upgrading the Azure Linux agent. All the [endorsed distribution providers](https://learn.microsoft.com/azure/virtual-machines/linux/endorsed-distros) integrate the Azure Linux agent package into their images and repositories. The agent is available on [GitHub](https://github.com/Azure/WALinuxAgent), but we don't recommend installing from there. <br><br> If you're updating the agent, make sure that no backup operations are running, and update the binaries.</li><ul> |

## Clean up deployment

When no longer needed, you can disable protection on the VM, and remove the restore points and Recovery Services vault. Then you can delete the resource group and associated VM resources.

If you want to restore the VM by using the recovery points, skip the steps in this section and go to [Related content](#related-content).

1. Select the **Backup** option for your VM.

1. Select **Stop backup**.

   Screenshot that shows stopping VM backup from the Azure portal.

1. Select **Delete Backup Data** from the dropdown menu.

1. In the **Type the name of the Backup item** dialog, enter your VM name, such as **myVM**. Select **Stop Backup**.

    After the VM backup is stopped and recovery points are removed, you can delete the resource group. If you used an existing VM, you might want to leave the resource group and VM in place.

1. On the menu on the left, select **Resource groups**.
1. From the list, choose your resource group. If you used the sample VM quickstart commands, the resource group is named **myResourceGroup**.
1. Select **Delete resource group**. To confirm, enter the resource group name, and then select **Delete**.

## Related content

- To learn more about Extended Zones, see [Azure Extended Zones](../extended-zones/overview.md).
- To learn more about Azure VM restore, see [Azure VM restore](about-azure-vm-restore.md).
