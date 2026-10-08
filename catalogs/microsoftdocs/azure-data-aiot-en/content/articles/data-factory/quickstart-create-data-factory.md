---
title: Create an Azure Data Factory
description: Learn how to create a data factory using Azure Data Factory Studio or the Azure portal.
author: whhender
ms.topic: quickstart
ms.subservice: authoring
ms.date: 07/29/2026
ms.author: whhender
ms.reviewer: xupzhou
ms.custom: sfi-image-nochange

#customer intent: As a new data factory customer, I want to create a data factory instance so I can test its functions for my organization, or get started using it.

---

# Quickstart: Create a data factory

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This quickstart describes how to use either [Azure Data Factory Studio](https://adf.azure.com) or the [Azure portal UI](https://portal.azure.com) to create a data factory.

If you're new to Azure Data Factory, see the [introduction to the service](introduction.md) before you try this quickstart.

## Prerequisites

- If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- Make sure that you have the required Azure roles to create a data factory. For more information, see [Roles and permissions for Azure Data Factory](concepts-roles-permissions.md).

## Create a data factory in Azure Data Factory Studio

By using Azure Data Factory Studio, you can create a data factory in seconds:

1. Open the Microsoft Edge or Google Chrome web browser. Currently, the Data Factory UI is supported only in these browsers.

1. Go to [Azure Data Factory Studio](https://adf.azure.com) and select the **Create a new data factory** option.

1. You can use the default values for the new data factory. Or you can choose a unique name, a preferred location, and a specific subscription. When you finish with these details, select **Create**.

   Screenshot that shows the Azure Data Factory Studio page for creating a data factory.

1. After you create your data factory, you're taken to the home page of Azure Data Factory Studio where you can [get started](#related-content) using your data factory.

   Screenshot that shows the Azure Data Factory Studio page for a created data factory.

## Create a data factory in the Azure portal

When you use the Azure portal to create a data factory, the creation options are more advanced:

1. Open the Microsoft Edge or Google Chrome web browser. Currently, the Data Factory UI is supported only in these browsers.

1. Go to the [page for data factories in the Azure portal](https://portal.azure.com/#browse/Microsoft.DataFactory%2FdataFactories).

1. Select **Create**.

   Screenshot of the Create button on the Azure portal page for data factories.

1. For **Resource group**, take one of the following steps:
   - Select an existing resource group from the dropdown list.
   - Select **Create new**, and then enter the name of a new resource group.

   To learn about resource groups, see [What is a resource group?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md#resource-groups)

1. For **Region**, select a location for the data factory.

   The list shows only locations that Data Factory supports. This region is where your Data Factory metadata is stored. The associated data stores (like Azure Storage and Azure SQL Database) and computes (like Azure HDInsight) that Data Factory uses can run in other regions.

1. For **Name**, the name of the data factory must be *globally unique*. If you see an error that your name is already taken, change the name of the data factory (for example, to **\<yourname\>ADFTutorialDataFactory**) and try creating it again. To learn more about naming rules for Data Factory artifacts, see [Data Factory naming rules](naming-rules.md).

   Screenshot that shows an error for a new data factory that indicates a duplicate name.

1. For **Version**, select **V2**.

1. Select **Review + create**. After your configuration passes validation, select **Create**.

1. After the creation is complete, select **Go to resource**.

1. On the page for your data factory, select **Launch Studio** to open Azure Data Factory Studio. From here, you can [get started](#related-content) using your data factory.

   Screenshot of the home page for a data factory in the Azure portal, with the button for opening Azure Data Factory Studio highlighted.

   > **Note:**
   > If the web browser is stuck at **Authorizing**, clear the **Block third-party cookies and site data** checkbox. Or keep it selected, create an exception for **login.microsoftonline.com**, and then try to open the app again.

## Related content

- Learn how to [use Azure Data Factory to copy data from one location to another](quickstart-hello-world-copy-data-tool.md).
- Learn how to [create a data flow by using Azure Data Factory](data-flow-create.md).
- Check our [list of top tutorials](data-factory-tutorials.md) to get started with other Azure Data Factory topics.
