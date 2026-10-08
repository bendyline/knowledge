---
title: What is Azure Native Commvault Cloud?
description: Learn how Azure Native Commvault Cloud helps you provision and manage Commvault data-protection resources from Azure.
author: agrimayadav
ms.author: agrimayadav
ms.topic: overview
ms.service: partner-services
ms.date: 08/27/2026
---

# What is Azure Native Commvault Cloud?

The Azure Native Commvault integration lets you provision, configure, and manage Commvault data-protection resources directly from the [Azure portal](https://portal.azure.com/) as first-class Azure resources. Instead of using separate onboarding and management workflows, you can create a Commvault Cloud account, configure backup storage and plans, group Azure resources for protection, and perform supported backup and recovery operations through an integrated Azure experience.

Microsoft and Commvault developed the service and manage it together.

## What is Commvault Cloud used for?

Commvault Cloud helps organizations protect, recover, and manage business-critical data. You can configure backup policies, manage protected resources, and perform recovery operations.

Typical use cases include:

- Recovering applications and data from accidental deletion, corruption, ransomware, or cyberattacks
- Managing backup operations, retention policies, and compliance requirements at scale
- Protecting Azure virtual machines with policy-based backup and recovery

> **Note:**
> Azure Native Commvault Cloud currently supports backup and recovery for Azure virtual machines. Support for additional workload types is planned for future releases, including Azure Kubernetes Service (AKS) and other Azure workloads.

## Key capabilities

Azure Native Commvault Cloud provides the following integration capabilities:

- **Automated and orchestrated recovery:** Supports rapid, granular, and large-scale recovery
- **Immutable and air-gapped data protection:** Provides isolated, immutable backup storage to help protect recovery data from ransomware, accidental deletion, and malicious modification.
- **Integrated Azure management:** Provision and manage Commvault data-protection resources as Azure resources.
- **Backup and recovery management:** Create storage, plans, and protection groups; run scheduled or on-demand backups; and restore protected Azure virtual machines.
- **Single sign-on:** Access the Commvault experience without signing in separately after authenticating through Azure.
- **Unified billing:** Manage applicable Commvault charges through the Azure Marketplace subscription and your Azure bill.

## How the integration works

Azure Native Commvault Cloud exposes the following resources in Azure:

| Resource | Purpose |
| --- | --- |
| Commvault Cloud account | The parent Azure resource that establishes the relationship between an Azure subscription, its Azure Marketplace subscription, and the corresponding Commvault company or tenant. |
| Storage | Represents the storage used for protected data. Storage is referenced by a backup plan. |
| Plan | Defines when, how, and where backups run, including the backup schedule, retention settings, backup type, and associated storage. |
| Protection group | A user-defined collection of Azure resources that share a backup configuration and reference a backup plan. |

> **Note:**
> Create a Commvault Cloud account before creating storage, backup plans, or protection groups in an Azure subscription. An Azure subscription can have only one Commvault Cloud account. 

## Subscribe to Azure Native Commvault



You can subscribe to the service through the Azure Marketplace [online store](https://learn.microsoft.com/marketplace/marketplace-overview#azure-marketplace-online-store) or through the [Azure portal](https://learn.microsoft.com/azure/azure-portal/azure-portal-overview). Search for it by name:
 *Commvault*.


### Subscribe from the Azure portal

Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, on the service menu's global search bar, search for **marketplace**. In the **Services** results, select **Marketplace**.

    The Azure Marketplace **Get Started** pane appears.

1. On the command bar, enter the name of the service in the **Search the Marketplace** search box.

1. In the search results, choose the provider.

1. Choose your preferred plan, and then select **Subscribe**.

The pane for creating a resource appears.


## Next step

> 
> [Configure prerequisites](configure-prerequisites.md)
