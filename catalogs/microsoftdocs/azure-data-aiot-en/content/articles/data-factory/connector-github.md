---
title: Connect to GitHub
titleSuffix: Azure Data Factory & Azure Synapse
description: Use GitHub to specify your Common Data Model entity references
author: simplywilson
ms.subservice: data-movement
ms.topic: how-to
ms.date: 06/22/2026
ms.update-cycle: 1095-days
ms.author: tinglee
ms.custom:
  - synapse
  - sfi-image-nochange
---

# Use GitHub to read Common Data Model entity references

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


The GitHub connector in Azure Data Factory and Synapse Analytics pipelines is only used to receive the entity reference schema for the [Common Data Model](format-common-data-model.md) format in mapping data flow.

## Create a linked service to GitHub using UI

Use the following steps to create a linked service to GitHub in the Azure portal UI.

1. Browse to the Manage tab in your Azure Data Factory or Synapse workspace and select Linked Services, then select New:

   # [Azure Data Factory](#tab/data-factory)

   Screenshot of creating a new linked service with Azure Data Factory UI.

   # [Azure Synapse](#tab/synapse-analytics)

   Screenshot of creating a new linked service with Azure Synapse UI.
  
2. Search for GitHub and select the GitHub connector.

   Screenshot of the GitHub connector.


1. Configure the service details, test the connection, and create the new linked service.

   Screenshot of linked service configuration for GitHub.


## Linked service properties

The following properties are supported for the GitHub linked service.

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property must be set to **GitHub**. | yes |
| userName | GitHub username | yes |
| password | GitHub password | yes |

## Related content

Create a [source dataset](data-flow-source.md) in mapping data flow.
