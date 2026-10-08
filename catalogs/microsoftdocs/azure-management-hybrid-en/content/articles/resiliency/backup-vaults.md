---
title: Create vaults to back up and replicate resources
description: In this article, you learn how to create Recovery Services vault (or Backup vault) that stores backups and replication data.
ms.topic: how-to
ms.date: 11/19/2025
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Create a vault to back up and replicate resources

This article describes how to create Recovery Services vault (or Backup vault) that stores backups and replication data. Vault is required to configure protection with Azure Backup and Azure Site Recovery.

A [Recovery Services](../backup/backup-azure-recovery-services-vault-overview.md) vault is a management entity that stores recovery points that are created over time, and it provides an interface to perform backup-related and replication related operations. For certain newer workloads, Azure Backup also uses [Backup vault](../backup/backup-vault-overview.md) to store recovery points and interface for operations. [Learn about](../backup/guidance-best-practices.md#vault-considerations) on the guidelines when creating a vault.



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


## Create vault

To create a vault, follow these steps:

1.	On **Resiliency**, go to **Manage** > **Vaults**.
    Screenshot showing vaults page.
 
2.	On **Vaults**, select **+Vault**.
    Screenshot showing \*\*+Vault\*\* options.
 
3.	On **Start: Create Vault**, select the type of vault you want to create. You have two options:
    - [Recovery Services vaults](../backup/backup-azure-recovery-services-vault-overview.md) to hold backup data for various Azure services such as IaaS virtual machines (Linux or Windows) and SQL Server in Azure Virtual Machines (VMs). Recovery Services vaults support System Center Data protection Manager (DPM), Windows Server, Azure Backup Server, and replication data for Azure Site Recovery. 
    - [Backup vaults](../backup/backup-vault-overview.md) to hold backup data for various Azure services, such Azure Database for PostgreSQL servers and newer workloads that Azure Backup supports.
    Screenshot showing different vault options.
 
4.	Select **Continue** to go to the specific configuration page based on the selected vault type.
    For example, if you choose **Recovery Services vault**, it opens the **Create Recovery Services vault** page. Choosing **Backup vault** opens the **Create Backup Vault** page. 
1. Complete the workflow. After the vault is created, it appears in the list of vaults in the **Resiliency** section. If the vault doesn't appear, select **Refresh**.
    >**Note:**
    > It can take a while to create the vault. Monitor the status notifications in the **Notifications** pane at the top of the page.

## Next steps
 
- [Create protection policies](backup-protection-policy.md).
- [Manage vaults](manage-vault.md).
