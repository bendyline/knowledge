---
title: Troubleshoot the Azure Data Explorer connector
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the Azure Data Explorer connector in Azure Data Factory and Azure Synapse Analytics. 
author: simplywilson
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 05/15/2024
ms.author: tinglee
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the Azure Data Explorer connector in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides suggestions to troubleshoot common problems with the Azure Data Explorer connector in Azure Data Factory and Azure Synapse.

## Error code: KustoMappingReferenceHasWrongKind

- **Message**: `Mapping reference should be of kind 'Csv'. Mapping reference: '%reference;'. Kind '%kind;'.`

- **Cause**: The ingestion mapping reference is not CSV type.

- **Recommendation**: Create a CSV ingestion mapping reference.

## Error code: KustoWriteFailed

- **Message**: `Write to Kusto failed with following error: '%message;'.`

- **Cause**: Wrong configuration or transient errors when the sink reads data from the source.

- **Recommendation**: For transient failures, set retries for the activity. For permanent failures, check your configuration and contact support.

## Related content

For more troubleshooting help, try these resources:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Azure videos](https://learn.microsoft.com/shows/data-exposed/?products=azure\&terms=data-factory)
- [Microsoft Q\&A page](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [X information about Data Factory](https://x.com/hashtag/DataFactory)
