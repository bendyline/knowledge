---
title: Troubleshoot the Microsoft Fabric Warehouse connector
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the Microsoft Fabric Warehouse connector in Azure Data Factory and Azure Synapse Analytics. 
author: simplywilson
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 12/16/2025
ms.author: tinglee
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the Microsoft Fabric Warehouse connector in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides suggestions to troubleshoot common problems with the Microsoft Fabric Warehouse connector in Azure Data Factory and Azure Synapse.

## A transport-level error has occurred when receiving results from the server

- **Message**: `A transport-level error has occurred when receiving results from the server. (provider: TCP Provider, error: 0 - An existing connection was forcibly closed by the remote host.) An existing connection was forcibly closed by the remote host `

- **Cause**: The server terminates the connection unexpectedly, usually due to network instability, timeout, or server-side resource limits.

- **Recommendation**: Check server logs and network stability. Split the copy into partitions instead of a long‑running copy.

## Error code: DWCopyCommandOperationFailed

- **Message**: `ErrorCode=DWCopyCommandOperationFailed,'Type=Microsoft.DataTransfer.Common.Shared.HybridDeliveryException,Message='DataWarehouse' Copy Command operation failed with error 'A transport-level error has occurred when receiving results from the server. (provider: TCP Provider, error: 0 - A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.)'.`

- **Cause**: The server terminates the connection unexpectedly, usually due to network instability, timeout, or server-side resource limits.

- **Recommendation**: Check server logs and network stability. Split the copy into partitions instead of a long‑running copy.

## SHUTDOWN is in progress

- **Message**: `SHUTDOWN is in progress.`

- **Cause**: The server is unavailable due to a SHUTDOWN operation is in progress. 

- **Recommendation**: Check the server logs to confirm whether a shutdown has been initiated and ensure the server is fully available.

## Related content

For more troubleshooting help, try these resources:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Azure videos](https://learn.microsoft.com/shows/data-exposed/?products=azure\&terms=data-factory)
- [Microsoft Q\&A page](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [X information about Data Factory](https://x.com/hashtag/DataFactory)
