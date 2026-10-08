---
title: Troubleshoot the MongoDB connector
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the MongoDB connector in Azure Data Factory and Azure Synapse Analytics. 
author: simplywilson
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 08/06/2026
ms.author: suvishod
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the MongoDB connector in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides suggestions to troubleshoot common problems with the MongoDB connector in Azure Data Factory and Azure Synapse.

## Error code: MongoDbUnsupportedUuidType

- **Message**:
    `Failed to read data via MongoDB client.,
    Source=Microsoft.DataTransfer.Runtime.MongoDbV2Connector,Type=System.FormatException,
    Message=The GuidRepresentation for the reader is CSharpLegacy which requires the binary sub type to be UuidLegacy not UuidStandard.,Source=MongoDB.Bson,’“,`

- **Cause**: When you copy data from Azure Cosmos DB for MongoDB or Azure DocumentDB (with MongoDB compatibility) or MongoDB with the universally unique identifier (UUID) field, two formats represent the UUID in Binary JSON (BSON): UuidStandard and UuidLegacy. By default, the connector uses UuidLegacy to read data. You get an error if your UUID data in MongoDB uses UuidStandard.

- **Resolution**: In the Azure DocumentDB/MongoDB connection string, add the *uuidRepresentation=standard* option. For more information, see [MongoDB connection string](connector-mongodb.md#linked-service-properties).

## Migrate to the new version of MongoDB connector

- **Symptoms**: You see the following error code and error message:
    - **Error code**: `DeprecatedMongoDbOdbcConnector`
    - **Error message**: `The legacy MongoDB connector has been deprecated. To ensure your pipeline works, please create a new MongoDB linked service. Detailed instructions can be found in this documentation: https://learn.microsoft.com/azure/data-factory/connector-mongodb#upgrade-the-mongodb-linked-service`

- **Cause**: 
    Your pipeline uses a legacy MongoDB connector that causes the error.

- **Resolution**: 
    Upgrade your MongoDB linked service to the latest version. See [Upgrade the MongoDB linked service](connector-mongodb.md#upgrade-the-mongodb-linked-service).

## Related content

For more troubleshooting help, try these resources:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Azure videos](https://learn.microsoft.com/shows/data-exposed/?products=azure\&terms=data-factory)
- [Microsoft Q\&A page](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [X information about Data Factory](https://x.com/hashtag/DataFactory)
