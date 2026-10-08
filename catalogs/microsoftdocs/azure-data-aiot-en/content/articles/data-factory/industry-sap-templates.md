---
title: SAP Templates
titleSuffix: Azure Data Factory
description: Overview of the SAP templates
author: ukchrist
ms.author: ulrichchrist
ms.topic: overview
ms.date: 10/03/2024
ms.subservice: data-movement
---

# SAP templates overview

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


Azure Data Factory and Azure Synapse Analytics pipelines provide SAP templates to quickly get started with a pattern based approach for various SAP scenarios. 

See [pipeline templates](solution-templates-introduction.md) for an overview of pipeline templates.

## SAP templates summary

The following table shows the templates related to SAP connectors that can be found in the Azure Data Factory template gallery: 

| SAP Connector/Data Store | Scenario | Description |
| --- | --- | --- |
| SAP CDC | [Replicate multiple objects from SAP via SAP CDC](solution-template-replicate-multiple-objects-sap-cdc.md) | Use this template for metadata driven incremental loads from multiple SAP ODP sources to Delta tables in ADLS Gen 2 |
| SAP BW via Open Hub | [Incremental copy to Azure Data Lake Storage Gen 2](load-sap-bw-data.md) | Use this template to incrementally copy SAP BW data via LastRequestID watermark to ADLS Gen 2 |
| SAP HANA | Dynamically copy tables to Azure Data Lake Storage Gen 2 | Use this template to do a full copy of list of tables from SAP HANA to ADLS Gen 2 |
| SAP Table | Incremental copy to Azure Blob Storage | Use this template to incrementally copy SAP Table data via a date timestamp watermark to Azure Blob Storage |
