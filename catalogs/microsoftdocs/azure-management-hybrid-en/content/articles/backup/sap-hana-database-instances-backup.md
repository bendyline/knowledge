---
title: Back up SAP HANA database instances on Azure VMs
description: In this article, you'll learn how to back up SAP HANA database instances that are running on Azure virtual machines.
ms.topic: how-to
ms.date: 07/16/2026
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As an IT administrator managing SAP HANA databases on Azure VMs, I want to configure a snapshot-based backup policy, so that I can ensure consistent backups and simplify the recovery process while adhering to SAP's backup requirements.
---

# Back up SAP HANA database instance snapshots on Azure VMs

This article describes how to back up SAP HANA database instances that are running on Azure VMs to an Azure Backup Recovery Services vault.

Azure Backup now performs an SAP HANA storage snapshot-based backup of an entire database instance. Backup combines an Azure managed disk full or incremental snapshot with HANA snapshot commands to provide instant HANA backup and restore.

This snapshot workflow also applies to HSR-enabled SAP HANA systems when you register both nodes with the same vault and use the **Enhanced (Preview)** snapshot backup policy.

For SAP HANA instance snapshots, Azure Backup supports two policy subtypes: **Standard** (Generally Available) and **Enhanced** (Preview). HSR snapshot support is currently available only with the **Enhanced (Preview)** policy.

## Snapshot consistency and backup behavior for SAP HANA backups
For SAP HANA database snapshot backup, Azure Backup performs the following actions:

- Triggers snapshots through SAP HANA native snapshot APIs.
- Quiesces HANA I/O during snapshot creation to maintain consistency.
- Continues log backups independently through the streaming backup solution and uses them for recovery.
- Transfers all disk data in the first snapshot backup. Subsequent backups transfer only changed blocks since the last snapshot backup.
- Keeps log backups healthy and requires weekly full backups for recovery. Logs aren't embedded in the snapshot.
- Uses the snapshot as the baseline for recovery and replays logs over the snapshot during restore.

>**Note:**
>- You can now store the Snapshot backups in a Recovery Services vault by using **Enhanced backup policy (preview)** for HANA Snapshot backup. This provides all the vault level features, such as Immutability, Soft-delete, cross-region restore, and more, for SAP HANA snapshot backups. This policy also ensures faster restores from **instant tier**.
>- For pricing, as per SAP advisory, you must do a weekly full backup + logs streaming/Backint based backup so that the existing protected instance fee and storage cost are applied. For snapshot backup, the snapshot data created by Azure Backup is saved in your storage account and incurs snapshot storage charges. Thus, in addition to streaming/Backint backup charges, you're charged for per GB data stored in your snapshots, which is charged separately. Learn more about [Snapshot pricing](https://azure.microsoft.com/pricing/details/managed-disks/) and [Streaming/Backint based backup pricing](https://azure.microsoft.com/pricing/details/backup/?ef_id=_k_CjwKCAjwp8OpBhAFEiwAG7NaEsaFZUxIBD-FH1IUIfF-7yZRWAYJSMHP67InGf0drY0X2Km71KOKDBoCktgQAvD_BwE_k_&OCID=AIDcmmf1elj9v5_SEM__k_CjwKCAjwp8OpBhAFEiwAG7NaEsaFZUxIBD-FH1IUIfF-7yZRWAYJSMHP67InGf0drY0X2Km71KOKDBoCktgQAvD_BwE_k_&gclid=CjwKCAjwp8OpBhAFEiwAG7NaEsaFZUxIBD-FH1IUIfF-7yZRWAYJSMHP67InGf0drY0X2Km71KOKDBoCktgQAvD_BwE).


To learn about the supported SAP HANA database backup and restore scenarios, region availability, and limitations, see the [support matrix](backup-azure-sql-database.md). For common questions, see the [frequently asked questions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/sap-hana-faq-backup-azure-vm.yml).

You can also [back up SAP HANA System Replication databases on Azure VMs using Azure portal](sap-hana-database-with-hana-system-replication-backup.md).


## Before you start

### Policy

According to SAP, you must run a weekly full backup of all databases within an instance. Currently, logs are also mandatory for a database when you create a policy. With snapshots happening daily, you don't need incremental or differential backups in the database policy. Therefore, all databases in the database instance, which is required to be protected by a snapshot, should have a database policy of only *weekly fulls + logs ONLY*, along with daily snapshots at an instance level.

>**Important:**
>- As per SAP advisory, configure *Database via Backint* with *weekly fulls + log backup only* policy before configuring *DB Instance via Snapshot* backup. If *weekly fulls + logs backup only using Backint based backup* isn't enabled, snapshot backup configuration fails.
>     Screenshot shows the 'Database via Backint' backup goal.
>- Because the policy doesn't call for differential or incremental backups, don't trigger on-demand differential backups from any client.

To summarize the backup policy:

- Always protect all databases within an instance with a database policy before you apply daily snapshots to the database instance.
- Make sure that all database policies have only *Weekly fulls + logs* and no differential or incremental backups.
- Don't trigger on-demand Backint-based streaming differential or incremental backups for these databases.

### Permissions required for backup

You must assign the required permissions to the Azure Backup service, which resides on a HANA virtual machine (VM), to take snapshots of the managed disks and place them in a user-specified resource group that's mentioned in the policy. Use the system-assigned managed identity of the source VM for this task.

The following table lists the resource, permissions, and scope.

| Entity | Built-in role | Scope of permission | Description |
| --- | --- | --- | --- |
| Source VM | Virtual Machine Contributor | The backup admin who configures and runs the HANA snapshot backup | Configures the HANA instance |
| Source disk resource group (where all disks are present for backup) | Disk Backup Reader | The source VM system-assigned managed identity | Creates disk snapshots |
| Source snapshot resource group | Disk Snapshot Contributor | The source VM system-assigned managed identity | Creates disk snapshots and stores them in the source snapshot resource group |
| Source snapshot resource group | Disk Snapshot Contributor | Backup Management Service | Deletes old snapshots in the source snapshot resource group. |

When you assign permissions, consider the following points:

- Use credentials that have permissions to grant roles to other resources. The credentials must be either Owner or User Access Administrator, as described in the [steps for assigning user roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-steps.md#step-4-check-your-prerequisites).

- During backup configuration, use the Azure portal to assign the previously mentioned permissions, except `Disk Snapshot Contributor` to the `Backup Management Service` principal for the snapshot resource group. You need to manually assign this permission.

- Don't change the resource groups after you give or assign them to Azure Backup, because it makes handling the permissions easier.

Learn about the [permissions required for snapshot restore](sap-hana-database-instances-restore.md#permissions-required-for-the-snapshot-restore) and the [SAP HANA instance snapshot backup architecture](azure-backup-architecture-for-sap-hana-backup.md#backup-architecture-for-database-instance-snapshot).

### Establish network connectivity

[Learn about](backup-azure-sap-hana-database.md#establish-network-connectivity) the network configurations required for HANA instance snapshot.


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


## Create a policy

To create a policy for the SAP HANA database instance backup, follow these steps:

1. In the [Azure portal](https://portal.azure.com/), select a Recovery Services vault.

1. Under **Backup**, select **Backup Policies**.

1. Select **Add**.

1. On **Select policy type**, select **SAP HANA in Azure VM (DB Instance via snapshot)**.

   Screenshot that shows a list of policy types.

1. On **Create policy**, select the **Policy sub type**. Select the **Enhanced(Preview)** policy to retain your snapshot backups for long term in a Recovery Services Vault and leverage additional security features like immutability, soft-delete, MUA, and more.

   Screenshot that shows policy sub types.
   

1. On **Create policy**, enter the following details:

   Screenshot that shows the 'Create policy' pane for configuring backup and restore.

   1. **Policy name**: Enter a unique policy name.  
   1. **Snapshot Backup**: Set the **Time** and **Timezone** for backup in the dropdown lists. The default settings are *10:30 PM* and *(UTC) Coordinated Universal Time*.

      >**Note:**
      >Azure Backup currently supports **Daily** backup only.

   1. **Instant Restore**: Set the retention of recovery snapshots from *1* to *35* days. The default value is *2*.  
   1. **Resource group**: Select the appropriate resource group in the drop-down list.
   1. **Retention range**: If you select **Enhanced(Preview)** as the policy sub type, provide the retention durations for backups stored in Recovery Services Vault. Provide the retention duration for your daily, weekly, monthly, and yearly backup points as required.
   
       Screenshot that shows the 'Create policy' pane for configuring backup and restore.
   1. **Managed Identity**: Select a managed identity in the dropdown list to assign permissions for taking snapshots of the managed disks and place them in the resource group that you selected in the policy.
   
      You can also create a new managed identity for snapshot backup and restore. To create a managed identity and assign it to the VM with SAP HANA database, follow these steps:

      1. Select **+ Create**.
      
         Screenshot that shows how to create managed identity.
      
      1. On **Create User Assigned Managed Identity**, choose the required *Subscription*, *Resource group*, *Instance region*, and add an *Instance name*.
      1. Select **Review + create**.
      
         Screenshot that shows how to configure a new managed identity.

      1. Go to the *VM with SAP HANA database*, and then select **Identity** > **User assigned** tab.
      1. Select **User assigned managed identity**.
         
         Screenshot shows how to assign user-assigned managed identity to VM with SAP HANA database.
         
      1. Select the *subscription*, *resource group*, and the *new user-assigned managed identity*.
      1. Select **Add**.
                  
         Screenshot shows how to add the new user-assigned managed identity.
                  
      1. On **Create policy**, under **Managed Identity**, select the *newly created user-assigned managed identity* > **OK**.
         
         Screenshot shows how to add new user-assigned managed identity to the backup policy.




   You need to manually assign the permissions for the Azure Backup service to delete the snapshots as per the policy. Other [permissions are assigned in the Azure portal](#configure-snapshot-backup-for-sap-hana-database-instance).
   
   To assign the Disk Snapshot Contributor role to the Backup Management Service manually in the snapshot resource group, see [Assign Azure roles by using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal?tabs=current).

1. Select **Create**.

You'll also need to [create a policy for SAP HANA database backup](backup-azure-sap-hana-database.md#create-a-backup-policy).

## Discover the database instance

To discover the database instance where the snapshot is present, see [Back up SAP HANA databases in Azure VMs](backup-azure-sap-hana-database.md#discover-the-databases).

For HSR-enabled systems, ensure that both HSR nodes are registered with the same vault before you enable snapshot protection. [Learn how to register HSR nodes with a vault](sap-hana-database-with-hana-system-replication-backup.md).


## Configure snapshot backup for SAP HANA database instance

Before you configure a snapshot backup in this section, [configure the backup for the database](https://learn.microsoft.com/azure/backup/backup-azure-sap-hana-database#configure-backup).

Then, to configure a snapshot backup, do the following:

1. In the Recovery Services vault, select **Backup**.

1. Select **SAP HANA in Azure VM** as the data source type, select a Recovery Services vault to use for backup, and then select **Continue**.

1. On the **Backup Goal** pane, under **Step 2: Configure Backup**, select **DB Instance via snapshot**, and then select **Configure Backup**.

   Screenshot that shows the 'DB Instance via snapshot' option.

1. On the **Configure Backup** pane, in the **Backup policy** dropdown list, select the database instance policy, and then select **Add/Edit** to check the available database instances.

   Screenshot that shows where to select and add a database instance policy.

   To edit a DB instance selection, select the checkbox that corresponds to the instance name, and then select **Add/Edit**.

1. On the **Select items to backup** pane, select the checkboxes next to the database instances that you want to back up, and then select **OK**.

   Screenshot that shows the 'Select items to backup' pane and a list of database instances.

   When you select HANA instances for backup, the Azure portal validates for missing permissions in the system-assigned managed identity that's assigned to the policy.

   If the permissions aren't present, you need to select **Assign missing roles/identity** to assign all permissions.

   The Azure portal then automatically re-validates the permissions, and the **Backup readiness** column displays the status as *Success*.

1. When the backup readiness check is successful, select **Enable backup**.

   Screenshot that shows that the HANA database instance backup is ready to be enabled.
 
## Run an on-demand backup for SAP HANA database instance snapshot

To run an on-demand backup, do the following:

1. In the Azure portal, select a Recovery Services vault.

1. In the Recovery Services vault, on the left pane, select **Backup items**.

1. By default, **Primary Region** is selected. Select **SAP HANA in Azure VM**.

1. On the **Backup Items** pane, select the **View details** link next to the SAP HANA snapshot instance.

   Screenshot that shows the 'View details' links next to the HANA database snapshot instances.

1. Select **Backup now**.

   Screenshot that shows the 'Backup now' button for starting a backup of a HANA database snapshot instance.

1. On the **Backup now** pane, select **OK**.

   Screenshot showing to trigger HANA database snapshot instance backup.

## Track a backup job for SAP HANA database instance snapshot

The Azure Backup service creates a job if you schedule backups or if you trigger an on-demand backup operation for tracking. To view the backup job status, do the following:

1. In the Recovery Services vault, on the left pane, select **Backup Jobs**.

   The jobs dashboard displays the status of the jobs that were triggered in the past 24 hours. To modify the time range, select **Filter**, and then make the required changes.

1. To review the details of a job, select the **View details** link next to the job name.

## Next steps

Learn how to:

- [Restore SAP HANA database instance snapshots on Azure VMs using Azure portal](sap-hana-database-instances-restore.md).
- [Manage SAP HANA databases on Azure VMs using Azure portal](sap-hana-database-manage.md).
- [Manage SAP HANA databases that are backed up by Azure Backup using Azure CLI](tutorial-sap-hana-manage-cli.md).
- [Troubleshoot SAP HANA snapshot backup jobs on Azure Backup](sap-hana-database-instance-troubleshoot.md).
