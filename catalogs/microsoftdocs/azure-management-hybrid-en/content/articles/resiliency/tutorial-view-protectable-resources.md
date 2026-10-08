---
title: Tutorial - View protectable resources
description: In this tutorial, learn how to view your resources that are currently not protected by any solution using Resiliency in Azure.
ms.topic: tutorial
ms.date: 11/19/2025
ms.service: resiliency
ms.custom:
  - ignite-2023
  - ignite-2024
author: AbhishekMallick-MS
ms.author: v-mallicka
---

# Tutorial: View protectable resources 

This tutorial describes how to view your resources that are currently not protected by any solution, using Resiliency in Azure. 



>**Important:**
>Azure Business Continuity Center is now Resiliency in Azure, a unified platform for Zone Resiliency, High Availability, Backup & Disaster Recovery, and Ransomware Protection that offers integrated experiences to ensure ongoing resilience of your applications. To try the zonal feature in Resiliency, fill out [this enrollment form](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9NW9IkjD2RCnDQwsmIfABFUNU5MWUVaN1FWWDYxMFY1VTNBM1FPVDM3OC4u&route=shorturl).


## Prerequisites

Before you start viewing protectable resources, ensure the following prerequisites are met:

- Review [supported regions for Resiliency in Azure](resiliency-support-matrix.md#supported-regions).
- Ensure you have the required resource permissions to view them in the Resiliency.

## View protectable resources

As a resiliency admin, the first stage in the journey is to identify your critical resources that don't have backup or replication configured. During any outage, malicious attack, or operational failures, these resources can’t be recovered in primary or secondary region, which can then lead to data loss. 

To view the protectable resources, follow these steps:

1. Go to the Resiliency from the Azure portal.
1. Select **Protectable resources** under the **Protection inventory** section. 

    Screenshot showing \*\*Protectable resources\*\* option.
 
In this view, you can see a list of all the resources, which aren't protected by any solution across subscription, resource groups, location, type, and more along with their properties. To view further details for each resource, you can select any resource name, subscription, or resource group from the list.

> **Note:**
> Currently, you can only view the unprotected Azure resources under **Protectable resources**.

You can also query information on your protectable Azure resources at no extra cost using Azure Resource Graph (ARG). ARG is an Azure service designed to extend Azure Resource Management. It aims to provide efficient resource exploration with the ability to query at scale across a given set of subscriptions. 

To get started with querying your protectable Azure resources using ARG, you can use the sample query provided by selecting **Open query**.

Screenshot showing how to query information on protectable instance.

## Customize the view

By default, only Azure Virtual machines are shown in the **Protectable resources** list. You can change the filters to view other resources.

- To look for specific resources, you can use various filters, such as subscriptions, resource groups, location, and resource type, and more. 
    Screenshot showing the filtering options.
- You can also search by resource name to get information specific to the single resource.
    Screenshot showing filter by name option.


## Next steps

[Configure protection from Resiliency in Azure](tutorial-configure-protection-datasource.md).
