---
title: Manage vault lifecycle used for Azure Backup and Azure Site Recovery
description: In this article, you learn how to manage the lifecycle of the vaults (Recovery Services and Backup vault) used for Azure Backup and/or Azure Site Recovery.
ms.topic: how-to
ms.date: 11/19/2025
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Manage vault lifecycle used for Azure Backup and Azure Site Recovery

This article guides you on how to view your vaults and perform actions related to them using Resiliency in Azure.

By using the Resiliency in Azure, you can centrally manage the lifecycle of your Recovery Services and Backup vaults for both Azure Backup and Azure Site Recovery. 



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


## Prerequisites

Before you start managing your vaults using Resiliency, ensure you have the required resource permissions to view them  as part of the Resiliency experiences.

## View vaults using Resiliency in Azure

Use Resiliency to view all your existing Recovery Services and Backup vaults from a single location and manage their lifecycle as needed.

To view all vaults, follow these steps:

1.	On **Resiliency**, go to **Manage** > **Vaults** to see a list of all the vaults across subscription, resource groups, location, type, and more, along with their properties. 
    Screenshot showing vaults page.

2.	Azure Backup provides security features to help protect backed up data in a vault. These settings can be configured at a vault level. To view the configured [security settings](../backup/guidance-best-practices.md#security-considerations) for each vault within Azure Backup solution, select [**Security level**](../backup/backup-encryption.md) corresponding to each vault.
    Screenshot showing security level page.
 
1.	To view vault details, select the vault name or the ellipsis (`...`) icon, open the action menu, and go to the vault details pane.
 See the support matrix for a detailed list of supported and unsupported scenarios for actions on vaults.
    Screenshot showing options to see vault details.
 
5.	To look for specific vaults, use various filters, such as subscriptions, resource groups, location, and vault type, and etc. 
    Screenshot showing vault filtering page.
 
6.	You can also search by the vault name to get specific information.
 
7.	You can use **Select columns** to add or remove columns. 
    Screenshot showing \*select columns\* option.
 
You can also query information for your vaults at no extra cost using Azure Resource Graph (ARG). ARG is an Azure service designed to extend Azure Resource Management. It aims to provide efficient resource exploration with the ability to query at scale across a given set of subscriptions. 

To get started with querying information for your vaults using ARG, you can use the sample query provided by selecting **Open query**.

Screenshot showing how to view samples to view vault details.

## Modify security level for a vault

To modify the security level for a vault using Resiliency, follow these steps:

1.	On the **Vaults** page, select the security level value for a vault.
    Screenshot showing the security level option.
 
2.	On the vault properties page, modify the [security settings](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-azure-enhanced-soft-delete-about.md) as required. It can take a while to get the security levels updated in Resiliency.  
    Screenshot showing vaults settings page.
    > **Note:**
    > When you modify the security settings for a vault, Azure Backup applies the changes to all the protected datasources in that vault.


## Next steps

- [Create policy](backup-protection-policy.md).
- [Configure protection from Resiliency](tutorial-configure-protection-datasource.md).
