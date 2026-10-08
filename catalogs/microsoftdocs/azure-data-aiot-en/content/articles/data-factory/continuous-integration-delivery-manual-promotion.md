---
title: Manual promotion of Resource Manager templates 
description: Learn how to manually promote a Resource Manager template to multiple environments with continuous integration and delivery in Azure Data Factory.
ms.subservice: ci-cd
author: kromerm
ms.author: makromer
ms.reviewer: whhender
ms.topic: how-to
ms.date: 01/29/2025
---

# Manually promote a Resource Manager template to each environment

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Use the steps below to promote a Resource Manager template to each environment for continuous integration and delivery in Azure Data Factory.

## Steps to manually promote a template

1. Go to **Manage** hub in your data factory, and select **ARM template** in the "Source control" section. Under **ARM template** section, select **Export ARM template** to export the Resource Manager template for your data factory in the development environment.

   Export a Resource Manager template

1. In your test and production data factories, select **Import ARM Template**. This action takes you to the Azure portal, where you can import the exported template. Select **Build your own template in the editor** to open the Resource Manager template editor.

   Build your own template

1. Select **Load file**, and then select the generated Resource Manager template. This is the **ARMTemplateForFactory.json** file located in the .zip file exported in step 1.

   Edit template

1. In the **Custom deployment** section, enter the target subscription, region, and other details required for the deployment. When you're done, select **Review + create** to deploy the Resource Manager template.

   Settings section

## Related content

- [Continuous integration and delivery overview](continuous-integration-delivery.md)
- [Automate continuous integration using Azure Pipelines releases](continuous-integration-delivery-automate-azure-pipelines.md)
- [Use custom parameters with a Resource Manager template](continuous-integration-delivery-resource-manager-custom-parameters.md)
- [Linked Resource Manager templates](continuous-integration-delivery-linked-templates.md)
- [Using a hotfix production environment](continuous-integration-delivery-hotfix-environment.md)
- [Sample pre- and post-deployment script](continuous-integration-delivery-sample-script.md)
