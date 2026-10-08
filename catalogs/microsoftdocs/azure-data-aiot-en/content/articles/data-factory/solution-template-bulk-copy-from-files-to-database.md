---
title: Bulk copy from files to database
description: Learn how to use a solution template to copy data in bulk from Azure Data Lake Storage Gen2 to Azure Synapse Analytics / Azure SQL Database.
titleSuffix: Azure Data Factory & Azure Synapse
author: simplywilson
ms.author: tinglee
ms.subservice: data-movement
ms.topic: how-to
ms.date: 05/15/2024
ms.custom: sfi-image-nochange
---

# Bulk copy from files to database

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article describes a solution template that you can use to copy data in bulk from Azure Data Lake Storage Gen2 to Azure Synapse Analytics / Azure SQL Database.

## About this solution template

This template retrieves files from Azure Data Lake Storage Gen2 source. Then it iterates over each file in the source and copies the file to the destination data store. 

Currently this template only supports copying data in **DelimitedText** format. Files in other data formats can also be retrieved from source data store, but can not be copied to the destination data store.  

The template contains three activities:
- **Get Metadata** activity retrieves files from Azure Data Lake Storage Gen2, and passes them to subsequent *ForEach* activity.
- **ForEach** activity gets files from the *Get Metadata* activity and iterates each file to the *Copy* activity.
- **Copy** activity resides in *ForEach* activity to copy each file from the source data store to the destination data store.

The template defines the following two parameters:
- *SourceContainer* is the root container path where the data is copied from in your Azure Data Lake Storage Gen2. 
- *SourceDirectory* is the directory path under the root container where the data is copied from in your Azure Data Lake Storage Gen2.

## How to use this solution template

1. Open the Azure Data Factory Studio and select the **Author** tab with the pencil icon.
1. Hover over the **Pipelines** section and select the ellipsis that appears to the right side.  Select **Pipeline from template** then.
1. Select the **Bulk Copy from Files to Database** template, then select **Continue**. 
   Screenshot of the Bulk copy files to database template in the template browser.
1. Create a **New** connection to the source Gen2 store as your source, and one to the database for your sink. Then select **Use this template**.

    Screenshot of the template editor with source and sink data sources highlighted.
  
1. A new pipeline is created as shown in the following example:

    Review the pipeline

1. Select **Debug**, enter the **Parameters**, and then select **Finish**.

    Click \*\*Debug\*\*

1. When the pipeline run completes successfully, you will see results similar to the following example:

    Review the result

       
## Related content

- [Introduction to Azure Data Factory](introduction.md)
