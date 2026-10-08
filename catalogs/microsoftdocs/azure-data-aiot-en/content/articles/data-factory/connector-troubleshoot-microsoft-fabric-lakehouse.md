---
title: Troubleshoot the Microsoft Fabric Lakehouse connector
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the Microsoft Fabric Lakehouse connector in Azure Data Factory and Azure Synapse Analytics. 
author: simplywilson
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 12/16/2025
ms.author: tinglee
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the Microsoft Fabric Lakehouse connector in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides suggestions to troubleshoot common problems with the Microsoft Fabric Lakehouse connector in Azure Data Factory and Azure Synapse.

## Error code: LakehouseForbiddenError

- **Message**: `ErrorCode=LakehouseForbiddenError,'Type=Microsoft.DataTransfer.Common.Shared.HybridDeliveryException,Message=Lakehouse failed for forbidden which may be caused by user account or service principal doesn't have enough permission to access Lakehouse. Workspace: '4137113f-8f02-4c59-9a33-ec9d6f0f1468'. Path: '606c4b64-92ad-4621-b116-a9a871ac099d/Tables/dbo'. ErrorCode: 'Forbidden'. Message: 'Forbidden'. TimeStamp: 'Tue, 04 Nov 2025 11:57:11 GMT'.`

- **Cause**: The service principal, system-assigned managed identity or user-assigned managed identity doesn't have sufficient permission to access Microsoft Fabric Lakehouse.

- **Recommendation**: Grant the service principal, system-assigned managed identity or user-assigned managed identity at least Contributor role in the Microsoft Fabric workspace with the Lakehouse. For more information, see [Grant permissions in Microsoft Fabric workspace](connector-microsoft-fabric-lakehouse.md#grant-permissions-in-microsoft-fabric-workspace).

## Related content

For more troubleshooting help, try these resources:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Azure videos](https://learn.microsoft.com/shows/data-exposed/?products=azure\&terms=data-factory)
- [Microsoft Q\&A page](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [X information about Data Factory](https://x.com/hashtag/DataFactory)
