---
title: Quickstart to create an Azure Migrate project using an Azure Resource Manager template.
description: In this quickstart, you learn how to create an Azure Migrate project using an Azure Resource Manager template (ARM template).
ms.date: 05/08/2025
author: Jeronika-MS
ms.author: v-gajeronika
ms.manager: kmadnani
ms.service: azure-migrate
ms.reviewer: v-gajeronika
ms.update-cycle: 1095-days
ms.topic: quickstart
ms.custom: subject-armqs, mode-arm, devx-track-arm-template, engagement-fy25
# Customer intent: As a cloud administrator, I want to create an Azure Migrate project using an ARM template, so that I can efficiently assess and migrate my on-premises servers and applications to Azure.
---

# Quickstart: Create an Azure Migrate project using an ARM template

This quickstart describes how to set up an Azure Migrate project Recovery by using an Azure Resource Manager template (ARM template). Azure Migrate provides a centralized hub to assess and migrate to Azure on-premises servers, infrastructure, applications, and data. Azure Migrate supports assessment and migration of on-premises VMware VMs, Hyper-V VMs, physical servers, other virtualized VMs, databases, web apps, and virtual desktops.

This template creates an Azure Migrate project that will be used further for assessing and migrating your Azure on-premises servers, infrastructure, applications, and data.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/migrate/quickstart-create-migrate-project.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

If you don't have an active Azure subscription, you can create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/migrate-project-create/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.migrate/migrate-project-create/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/migrate/quickstart-create-migrate-project.md)

## Deploy the template

To deploy the template, the **Subscription**, **Resource group**, **Project name**, and **Location** are required.

1. To sign in to Azure and go to the template, select the **Deploy to Azure** image.

   Button to deploy the Resource Manager template to Azure.

2. Select or enter the following values:

   Template to create an Azure Migrate project.

   - **Subscription**: Select your Azure subscription.
   - **Resource group**: Select an existing group or select **Create new** to add a group.
   - **Region**: Defaults to the resource group's location and becomes unavailable after a
     resource group is selected.
   - **Migrate Project Name**: Provide a name for the vault.
   - **Location**: Select the location where you want to deploy the Azure Migrate project and its resources.

3. Click **Review + create** button to start the deployment.

## Validate the deployment

To confirm that the Azure Migrate project was created, use the Azure portal.


1. Navigate to Azure Migrate by searching for **Azure Migrate** in the search bar on the Azure portal.
2. Click the **Discover,** **Assess,** and **Migrate** button under the Servers, databases and web apps tile.
3. Select the **Azure subscription** and **Project** as per the values specified in the deployment.


## Next steps

In this quickstart, you created an Azure Migrate project. 
- To learn more about Azure Migrate and its capabilities, continue to the [Azure Migrate overview](migrate-services-overview.md).
- Follow these tutorials to discover [VMware VMs](tutorial-discover-vmware.md), [Hyper-V VMs](tutorial-discover-hyper-v.md), and [Physical servers](tutorial-discover-physical.md).
