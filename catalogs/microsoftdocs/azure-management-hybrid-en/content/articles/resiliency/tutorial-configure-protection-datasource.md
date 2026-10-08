---
title: Tutorial - Configure protection for data sources
description: Learn how to configure protection for your datasources, which are currently not protected by any solution using Resiliency in Azure.
ms.topic: tutorial
ms.date: 11/19/2025
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Tutorial: Configure protection for data sources 

This tutorial guides you to configure protection for your data sources that are currently not protected by any solution using Resiliency in Azure. 

The key principle of data protection is to safeguard and make data or application available under all circumstances.



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


## Prerequisites

Before you configure protection for datasources, ensure you have the required resource permissions to view them in the Resiliency.

## Protect your data and applications

To decide backup frequency and storage location, assess the cost of downtime and the impact of losing access to data and applications. Also, consider the expense of replacing or recreating lost data. To determine the backup frequency and availability decisions, determine recovery time objectives (RTOs) and recovery point objectives (RPOs) for each data source and application to guide frequency.

- **Recovery Point Objective (RPO)**: The amount of data the organization can afford to lose. This feature helps to determine how frequently you must back up your data to avoid losing more.
- **Recovery Time Objective (RTO)**:  The maximum amount of time the business can afford to be without access to the data or application, that is, being offline or how quickly you must recover the data and application. This helps in developing your recovery strategy.

RTOs and RPOs might vary depending on the business and the individual applications data. Mission-critical applications mostly require microscopic RTOs and RPOs since, downtime could cost millions per minute.

A datasource is an Azure resource or an item hosted in Azure resource (for example SQL database in Azure Virtual Machine (VM), SAP Hana database in Azure Virtual Machine, and etc.). A datasource belonging to a critical business application should be recoverable in both primary and secondary region during any malicious attack or operational disruptions. 

- **Primary region**: Region in which datasource is hosted.
- **Secondary region**: Paired or target region in which datasource can be recovered if primary region isn't accessible.


## Get started

Resiliency in Azure helps you configure protection, enabling backup or replication of the datasources from various views and options like overview, protectable resources, protected items, and more options. You can choose from the following options to configure protection:

- **Option 1: Multiple datasources**: To configure protection for multiple datasources, you can use the **Configure protection** option available through the menu on the left or the top menu, like **Overview**, **Protectable resources**, **Protected items**, and etc. 
    Screenshot showing configure protection for multiple resources.
 
- **Option 2: Single datasource**: To configure protection for a single datasource, use the menu on individual resources in **Protectable resources** blade. 
    Screenshot showing configure protection for a single resource.
 

## Configure protection

This tutorial uses option 1 shown in the [Getting started section](#get-started) to initiate the protection configuration for Azure Virtual Machines.

To configure protection for Azure VMs, follow these steps:


1. Go to one of the views from **Overview, Protectable resources**, **Protected items**, and so on, and then select **Configure Protection** from the menu available on the top of the view.
    Screenshot showing \*\*Configure protection\*\* option.

2. On the **Configure protection** blade, choose **Resources managed by**, select **Datasource type** for which you want to configure protection, and then select the solution (limited to Azure Backup and Azure Site Recovery) by which you want to configure protection.
    Screenshot showing \*\*Configure protection\*\* page.

> **Note:**
> Ensure you have a *Recovery services* vault created to proceed with the flow for [Azure Backup](../backup/backup-overview.md) or [Azure Site Recovery](../site-recovery/site-recovery-overview.md). You can create a vault from Vaults view in Resiliency: <br>
>       Screenshot showing the create vault option.

 
3. Select **Configure** to go to the solution-specific configuration page. 

   For example, if you select *Azure Backup*, it opens the **Configure Backup** page in Backup. If you select *Azure Site Recovery*, it opens the **Enable Replication** page. 
    Screenshot showing \*\*Configure Backup\*\* page.
 
## Next steps

- [Review protected items from Resiliency in Azure](tutorial-view-protectable-resources.md).
- [Monitor progress of configure protection](tutorial-monitor-protection-summary.md).
