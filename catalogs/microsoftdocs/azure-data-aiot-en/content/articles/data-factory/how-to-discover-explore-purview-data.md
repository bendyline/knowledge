---
title: Discover and explore data in ADF using Microsoft Purview
description: Learn how to discover, explore data in Azure Data Factory using Microsoft Purview
ms.topic: how-to
author: simplywilson
ms.author: tinglee
ms.date: 10/03/2024
ms.subservice: monitoring
---

# Discover and explore data in ADF using Microsoft Purview

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


In this article, you will register a Microsoft Purview Account to a Data Factory. That connection allows you to discover Microsoft Purview assets and interact with them through ADF capabilities. 

You can perform the following tasks in ADF: 
- Use the search box at the top to find Microsoft Purview assets based on keywords 
- Understand the data based on metadata, lineage, annotations 
- Connect those data to your data factory with linked services or datasets 

## Prerequisites 

- [Microsoft Purview account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/purview/create-catalog-portal.md) 
- [Data Factory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/quickstart-create-data-factory-portal.md) 
- [Connect a Microsoft Purview Account into Data Factory](connect-data-factory-to-azure-purview.md) 

## Using Microsoft Purview in Data Factory 

The use Microsoft Purview in Data Factory requires you to have access to that Microsoft Purview account. Data Factory passes-through your Microsoft Purview permission. As an example, if you have a curator permission role, you will be able to edit metadata scanned by Microsoft Purview. 

### Data discovery: search datasets 

To discover data registered and scanned by Microsoft Purview, you can use the Search bar at the top center of Data Factory portal. Make sure that you select Microsoft Purview to search for all of your organization data. 

Screenshot for performing over datasets.

### Actions that you can perform over datasets with Data Factory resources 
You can directly create Linked Service, Dataset, or dataflow over the data you search by Microsoft Purview.

Screenshot that shows how you can directly create Linked Service, Dataset, or dataflow over the data you search by Microsoft Purview.

##  Next steps 

[Tutorial: Push Data Factory lineage data to Microsoft Purview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/turorial-push-lineage-to-purview.md)

[Connect a Microsoft Purview Account into Data Factory](connect-data-factory-to-azure-purview.md) 

[How to Search Data in Microsoft Purview Data Catalog](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/purview/how-to-search-catalog.md)
