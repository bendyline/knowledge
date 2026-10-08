---
title: Troubleshoot the SAP Table, SAP Business Warehouse Open Hub, and SAP ODP connectors
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the SAP Table, SAP Business Warehouse Open Hub, and SAP ODP connectors in Azure Data Factory and Azure Synapse Analytics. 
author: simplywilson
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 06/22/2026
ms.update-cycle: 1095-days
ms.author: tinglee
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the SAP Table, SAP Business Warehouse Open Hub, and SAP ODP connectors in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides suggestions to troubleshoot common problems with the SAP Table, SAP Business Warehouse Open Hub, and SAP ODP connectors in Azure Data Factory and Azure Synapse. 

## Error code: SapRfcDestinationAddFailed

- **Message**: `Get or create destination '%destination; failed.`

- **Cause**: Unable to connect to SAP server, which may be caused by the connection issue between the machine with an integration runtime installed and SAP server, or wrong credentials.  

- **Recommendation**: If the error messages are like `'<serverName>:3300' not reached`, test connection in the machine with an integration runtime installed first by following the PowerShell command below:

    ```powershell
    
    Test-NetConnection <sap server> -port 3300  
    
    ```

## Related content

For more troubleshooting help, try these resources:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Azure videos](https://learn.microsoft.com/shows/data-exposed/?products=azure\&terms=data-factory)
- [Microsoft Q\&A page](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [X information about Data Factory](https://x.com/hashtag/DataFactory)
