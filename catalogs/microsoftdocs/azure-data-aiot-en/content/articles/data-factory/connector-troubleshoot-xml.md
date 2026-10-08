---
title: Troubleshoot the XML format connector
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the XML format connector in Azure Data Factory and Azure Synapse Analytics. 
author: simplywilson
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 10/20/2023
ms.author: tinglee
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the XML format connector in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides suggestions to troubleshoot common problems with the XML format connector in Azure Data Factory and Azure Synapse.

## Error code: XmlSinkNotSupported

- **Message**: `Write data in XML format is not supported yet, choose a different format!`

- **Cause**: An XML dataset was used as a sink dataset in your copy activity.

- **Recommendation**:  Use a dataset in a different format from that of the sink dataset.


## Error code: XmlAttributeColumnNameConflict

- **Message**: `Column names %attrNames;' for attributes of element '%element;' conflict with that for corresponding child elements, and the attribute prefix used is '%prefix;'.`

- **Cause**: An attribute prefix was used, which caused the conflict.

- **Recommendation**:  Set a different value for the "attributePrefix" property.


## Error code: XmlValueColumnNameConflict

- **Message**: `Column name for the value of element '%element;' is '%columnName;' and it conflicts with the child element having the same name.`

- **Cause**: One of the child element names was used as the column name for the element value.

- **Recommendation**:  Set a different value for the "valueColumn" property.


## Error code: XmlInvalid

- **Message**: `Input XML file '%file;' is invalid with parsing error '%error;'.`

- **Cause**: The input XML file is not well formed.

- **Recommendation**:  Correct the XML file to make it well formed.

## Related content

For more troubleshooting help, try these resources:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Azure videos](https://learn.microsoft.com/shows/data-exposed/?products=azure\&terms=data-factory)
- [Microsoft Q\&A page](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [X information about Data Factory](https://x.com/hashtag/DataFactory)
