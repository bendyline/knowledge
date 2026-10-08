---
title: Azure PowerShell Samples for Azure Data Factory 
description: Azure PowerShell Samples - Scripts to help you create and manage data factories. 
ms.custom: devx-track-azurepowershell
author: ssabat
ms.author: susabat
ms.reviewer: whhender
ms.topic: reference
ms.date: 05/15/2024
---

# Azure PowerShell samples for Azure Data Factory

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


The following table includes links to sample Azure PowerShell scripts for Azure Data Factory.

| Script | Description |
| --- | --- |
| **Copy data** |  |
| [Copy blobs from a folder to another folder in an Azure Blob Storage](scripts/copy-azure-blob-powershell.md?toc=%2fpowershell%2fmodule%2ftoc.json) | This PowerShell script copies blobs from a folder in Azure Blob Storage to another folder in the same Blob Storage. |
| [Copy data from SQL Server to Azure Blob Storage](scripts/hybrid-copy-powershell.md?toc=%2fpowershell%2fmodule%2ftoc.json) | This PowerShell script copies data from a SQL Server database to an Azure blob storage. |
| [Bulk copy](scripts/bulk-copy-powershell.md?toc=%2fpowershell%2fmodule%2ftoc.json) | This sample PowerShell script copies data from multiple tables in a database in Azure SQL Database to Azure Synapse Analytics. |
| [Incremental copy](scripts/incremental-copy-powershell.md?toc=%2fpowershell%2fmodule%2ftoc.json) | This sample PowerShell script loads only new or updated records from a source data store to a sink data store after the initial full copy of data from the source to the sink. |
| **Transform data** |  |
| [Transform data using a Spark cluster](scripts/transform-data-spark-powershell.md?toc=%2fpowershell%2fmodule%2ftoc.json) | This PowerShell script transforms data by running a program on a Spark cluster. |
| **Lift and shift SSIS packages to Azure** |  |
| [Create Azure-SSIS integration runtime](scripts/deploy-azure-ssis-integration-runtime-powershell.md?toc=%2fpowershell%2fmodule%2ftoc.json) | This PowerShell script provisions an Azure-SSIS integration runtime that runs SQL Server Integration Services (SSIS) packages in Azure. |
