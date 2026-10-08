---
title: Set up disaster recovery when creating a VM 
description: Learn how to set up disaster recovery for Virtual machines on Azure Extended Zones using VM Flow.
author: Jeronika-MS
ms.service: azure-site-recovery
ms.topic: tutorial
ms.date: 01/09/2025
ms.author: v-gajeronika
ms.custom: sfi-image-nochange
# Customer intent: As an IT administrator, I want to set up disaster recovery for my virtual machines using Azure Extended Zones, so that I can ensure business continuity in the event of a disaster.
---

# Tutorial: Set up disaster recovery for Azure Extended Zones using VM Flow

> **Important:**
> The Azure Site Recovery (ASR) functionality for Extended Zones is in preview state.


This tutorial shows you how to set up disaster recovery for Azure Site Recovery Extended Zones (preview) using VM Flow. You will do this using the Azure Site Recovery portal.


In this article, you learn how to:

> 
> * Enable replication for the Azure VMs

When you enable replication for a VM to set up disaster recovery, the Site Recovery Mobility service extension installs on the VM, and registers it with Azure Site Recovery (ASR as a service for Azure Extended Zones is in preview). During replication, VM disk writes are sent to a cache storage account in the source region. Data is sent from there to the target region, and recovery points are generated from the data. When you fail over a VM during disaster recovery, a recovery point is used to restore the VM in the target region. [Learn more](azure-to-azure-architecture.md) about the architecture.

If you don’t have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Enable replication for the Azure VMs

To enable replication to a secondary location, follow the below steps: 

1. On the Azure portal, select **Virtual machines** and select a VM to replicate.
1. On the left pane, under **Backup + disaster recovery**, select **Disaster recovery**.
    &#x20;Screenshot of Select Disaster Recovery option.
     
1. In **Basics**, select the **Target region** or an Azure Extended Zones.
    
    Screenshot of Option 1 Edge Zone to Region.

    
    >**Note:**
    >This flow proceeds with Option 1: Extended Zones to Region replication.

1. Select **Next : Advanced settings**.

    >**Note:**
    >**Review + Start replication** will appear grey at this step.
1. In **Advanced settings**, select **Subscription**, **VM resource group**, **Virtual network**, **Availability** and **Proximity placement group** as required.
    1. Under **Capacity Reservation Settings**, **Capacity Reservation Groups** is disabled.
    1. Under **Storage settings** > **Cache storage account**, select the cache storage account associated with the vault from the dropdown.
        Screenshot of cache storage field.

        Screenshot of cache storage field step 2.
    
1. Select **Next : Review + Start replication**.
    Screenshot of Review settings tab.

1. In **Review + Start replication**, review the VM settings and select **Start replication**.

## Next steps

See [Set up disaster recovery for VMs on Azure Extended Zones using Vault flow](disaster-recovery-for-edge-zone-vm-tutorial.md).
