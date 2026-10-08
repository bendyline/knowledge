---
title: "Quickstart: Configure an Azure Kubernetes Services cluster backup"
description: Learn how to configure backup for an Azure Kubernetes Service (AKS) cluster, and then use Azure Backup to back up specific items in the cluster.
ms.topic: quickstart
ms.date: 01/28/2026
ms.service: azure-backup
ms.custom:
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: "As a cloud administrator, I want to configure a backup for my Azure Kubernetes Service cluster, so that I can ensure the protection of my cluster resources and persistent volumes."
---

# Quickstart: Configure backup for an AKS cluster

In this quickstart, you configure vaulted backup for an Azure Kubernetes Service (AKS) cluster, and then use the Azure Backup configuration to back up specific items in the cluster.

You can use Azure Backup to back up AKS clusters by installing the Backup extension. The extension must be installed in the cluster. An AKS cluster backup includes cluster resources and persistent volumes that are attached to the cluster.

The Backup vault communicates with the cluster via the Backup extension to complete backup and restore operations.

## Prerequisites

Before you configure vaulted backup for AKS cluster, ensure the following prerequisites are met:

- Identify or [create a Backup vault](create-manage-backup-vault.md) in the same region where you want to back up an AKS cluster.
- [Install the Backup extension](quick-install-backup-extension.md) in the AKS cluster that you want to back up.

## Configure vaulted backup for an AKS cluster

1. In the [Azure portal](https://portal.azure.com), go to the AKS cluster that you want to back up.

1. In the resource menu, select **Backup**, and then select **Configure Backup**.
  
1. Select a Backup vault to use for the AKS instance backup.
  
    Screenshot that shows the Configure Backup page.

    The Backup vault must have Trusted Access enabled for the AKS cluster that you want to back up. To enable Trusted Access, select **Grant permission**. Once enabled, select **Next**.

    Screenshot that shows the review page for Configure Backup.

   > **Note:**
   > In case you are looking to backup you AKS clusters in a secondary region, select a Backup vault with Storage Redundancy set as Globally redundant and Cross Region Restore enabled.

1. Select a backup policy, which defines the schedule for backups and their retention period. Then select **Next**.

    Screenshot that shows the Backup policy tab.

   > **Note:**
   > Please add a retention rule for Vault Tier if you are looking to store backups for long term for compliance reasons, enable ransomware protection features or use them for regional disaster recovery. 

1. On the **Datasources** tab, select **Add/Edit** to define the backup instance configuration.

    Screenshot that shows the Add/Edit option on the Datasources tab.

1. In the **Select Resources to Backup** pane, define the cluster resources that you want to back up. [Learn more](azure-kubernetes-service-cluster-backup-concept.md).

    Screenshot that shows how to select resources to add to the backup.

1. For **Snapshot resource group**, select the resource group that you want to use to store the persistent volume (Azure Disk Storage) snapshots. Then select **Validate**.

    Screenshot that shows the Snapshot resource group dropdown.

1. When validation is finished, if required roles aren't assigned to the vault in the snapshot resource group, an error appears.
     Screenshot that shows a validation error.

1. To resolve the error, under **Datasource name**, select the datasource, and then select **Assign missing roles**.

    Screenshot that shows how to resolve a validation error.

1. When role assignment is finished, select **Next**.

    Screenshot that shows the resolved Configure Backup page.

1. Select **Configure backup**.

1. When the configuration is finished, select **Next**.

    Screenshot that shows the Review Configure Backup page.

   The backup instance is created when you finish configuring the backup.

    Screenshot that shows a backup configured for an AKS cluster.

## Next steps

Restore a backup for an AKS cluster using:

> 
>- [Azure portal](azure-kubernetes-service-cluster-restore.md)
>- [Azure CLI](azure-kubernetes-service-cluster-restore-using-cli.md)

## Related content

[Configure item-level backup for an AKS cluster](tutorial-configure-backup-aks.md).
