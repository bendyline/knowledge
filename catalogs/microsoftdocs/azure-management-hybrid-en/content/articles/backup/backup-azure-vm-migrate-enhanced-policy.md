---
title: Move VM backup - standard to enhanced policy in Azure Backup
description: Learn how to trigger Azure VM backups migration from standard  policy to enhanced policy, and then monitor the configuration backup migration job.
ms.topic: how-to
ms.date: 04/01/2026
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
ms.custom:
  - engagement-fy24
  - build-2025
# Customer intent: "As an IT administrator managing Azure VM backups, I want to migrate Azure Virtual Machine backups from standard to enhanced policy, so that I can improve backup frequency, retention, and disaster recovery capabilities without affecting existing backup operations."
---

# Migrate Azure VM backups from standard  to enhanced policy

This article describes how to migrate Azure Virtual Machine (VM) backups from standard to enhanced policy using Azure Backup.

Azure Backup now supports migration to the enhanced policy for Azure VM backups using standard policy. The migration of VM backups to enhanced policy enables you to schedule multiple backups per day (up to every 4 hours), retain snapshots for longer duration, and use multi-disk crash consistency for VM backups. Snapshot-tier recovery points (created using enhanced policy) are zone resilient. The migration of VM backups to enhanced policy also allows you to migrate your VMs to Trusted Launch and use Premium SSD v2 and Ultra Disks for the VMs without disrupting the existing backups.

>**Note:**
>Standard policy supports backup only for unprotected trusted launch VMs via CLI (version 2.73.0 and later), PowerShell (version Az 14.0.0 and later), and REST API (version 2025-01-01 and later). To enable trusted launch for existing VMs protected by Standard Policy, migrate to Enhanced Policy first.

## Considerations

- Before you start the migration, ensure that there are no ongoing backup jobs for the VM that you plan to migrate.
- Migration is supported for Managed VMs only and isn’t supported for Classic or unmanaged VMs.
- Once the migration is complete, you can’t change the backup policy back to standard policy.
- When you migrate a VM Backup Item from Standard to Enhanced policy, the process triggers a backup job that might take several hours for large VMs. This precautionary backup uses managed disk snapshots — starting with a full disk copy for instant restore, which increases backup time. Later snapshots are incremental, storing only changes since the last snapshot.
- The change from standard policy to enhanced policy can result in extra costs. [Learn More](backup-instant-restore-capability.md#cost-impact).

>**Note:**
> If the VM already has a shared disk attached to it, then perform migration by following these steps:
>1. Detach the shared disk from the VM.
>2. [Perform the Policy change](#trigger-the-backup-migration-operation).
>3. Reattach the shared disk to implement the exclusion.

## Trigger the backup migration operation

To do the policy migration using Azure portal, follow these steps:

>**Note:**
>For migrating VM backups from Standard to Enhanced policy using the Azure CLI, use the command provided in [az backup item](https://learn.microsoft.com/cli/azure/backup/item?view=azure-cli-latest\&preserve-view=true#az-backup-item-set-policy).

1. Sign in to the [Azure portal](https://portal.azure.com/).

2. Go to the *Recovery Services vault*.

3. On the **Backup Items** tile, select **Azure Virtual Machine**.

   Screenshot shows the selection of backup type as Azure VM.

4. On the **Backup Items** pane, you can view the list of *protected VMs* and *last backup status with latest restore points time*.

   Select **View details**.

   Screenshot shows how to view the backup item details.

5. On the **Change Backup Policy** pane, select **Policy subtype** as **Enhanced**, choose a *backup policy* to apply to the virtual machine, and then select **Change**.

   Screenshot shows how to change the Azure VM backup policy to enhanced.

## Monitor the policy migration job

To monitor the migration job on the **Backup Items** pane, select **View jobs**.

Screenshot shows how to go to the Backup Jobs pane.

The migration job is listed with Operation type Configure backup (Migrate policy).

Screenshot shows the backup migration policy job listed.

## Migrate protected VMs to Enhanced policy in bulk.

Azure Backup allows seamless bulk migration of protected VMs from the Standard policy to the Enhanced policy. This transition strengthens security, enhances operational efficiency, and optimizes data protection across your Azure infrastructure.

**Choose a path to change policy**:

# [Backup Items tile](#tab/backup-items-tile)

To trigger bulk migration of VMs protected using Standard policy to an Enhanced policy using the **Backup Items** tile, follow these steps:

1. In the [Azure portal](https://portal.azure.com/), go the **Recovery Services vault**.
1. On the **Backup Items** tile, select **Azure Virtual Machine**.
1. On the **Backup Items** pane, select the VMs from the list of protected VMs (using Standard policy) that you want to migrate, and then select **Change policy**. 

   Screenshot shows how to change policy from the Backup Items pane.

1. On the **Change policy** pane, on the **Basics** tab, review the selection of VMs, and then select **Next > Target policy**.

   Screenshot shows how to review the VM selection.

   You can modify the VM selection if necessary.

1. On the **Target policy** tab, under **Target policy**, select a target Enhanced policy from the dropdown list.

   Screenshot shows how to select a different backup policy.

1. Review the selected Enhanced policy details, and then select **Next > Review + Change policy**.
1. On the **Review + Change policy** tab, verify the selection of VMs and target policy, and then select **Change policy**.

   Screenshot shows how to trigger the change policy operation.


# [Backup Policies pane](#tab/backup-policies-pane)

To trigger bulk migration of VMs protected using Standard policy to an Enhanced policy via the **Backup Policies** pane, follow these steps:

1. In the [Azure portal](https://portal.azure.com/), go the **Recovery Services vault** >**Backup Policies**.
1. On the **Backup Policy** pane, select a backup policy with **Policy sub type** as **Standard**.

   Screenshot shows the selection of a Standard backup policy.

1. On the **Modify policy** pane, select **Associated items**.   

   Screenshot shows the selection of the Associated items option.

1. On the **Associated items** pane, select the VMs to migrate, and then select **Change policy**.

   Screenshot shows the associated items to the policy.

1. On the **Change policy** pane, on the **Basics** tab, review the selection of VMs, and then select **Next > Target policy**.

   Screenshot shows the VMs associated with the policy.

   You can modify the VM selection if necessary.

1. On the **Target policy** tab, under **Target policy**, select a target Enhanced policy from the dropdown list.

   Screenshot shows the selection of a different backup policy.

1. Review the selected Enhanced policy details, and then select **Next > Review + Change policy**.
1. On the **Review + Change policy** tab, verify the selection of VMs and target policy, and then select **Change policy**.

   Screenshot shows how to run the change policy operation.


---

## Next steps

- Learn about [Standard VM backup policy](backup-during-vm-creation.md#create-a-vm-with-backup-configuration).
- Learn how to [back up an Azure VM using Enhanced policy](backup-azure-vms-enhanced-policy.md).
- [Troubleshoot backup policy migration issue](backup-azure-vms-troubleshoot.md#migration-from-standard-to-enhanced-policy-issue).
