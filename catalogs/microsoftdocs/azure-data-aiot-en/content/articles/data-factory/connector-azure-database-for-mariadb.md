---
title: Copy data from Azure Database for MariaDB
description: Learn how to copy data from Azure Database for MariaDB to supported sink data stores using a copy activity in an Azure Data Factory or Synapse Analytics pipeline.
titleSuffix: Azure Data Factory & Azure Synapse
ms.author: tinglee
author: simplywilson
ms.subservice: data-movement
ms.topic: how-to
ms.date: 06/22/2026
ms.update-cycle: 1095-days
ms.custom:
  - synapse
  - sfi-image-nochange
  - sfi-ropc-nochange
---

# Copy data from Azure Database for MariaDB using Azure Data Factory or Synapse Analytics

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


> **Important:**
> This connector is at [End of Support stage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/connector-deprecation-plan.md). Please migrate to [Azure Database for MySQL connector](connector-azure-database-for-mysql.md). You can also refer to this [article](https://techcommunity.microsoft.com/blog/adformysql/migrating-from-azure-database-for-mariadb-to-azure-database-for-mysql/3838455) for the Azure Database for MariaDB migration guidance.

This article outlines how to use the Copy Activity in an Azure Data Factory or Synapse Analytics pipeline to copy data from Azure Database for MariaDB. It builds on the [copy activity overview](copy-activity-overview.md) article that presents a general overview of copy activity.

## Supported capabilities

This Azure Database for MariaDB connector is supported for the following capabilities:

| Supported capabilities | IR | Managed private endpoint |
| --- | --- | --- |
| [Copy activity](copy-activity-overview.md) (source/-) | &#9312; &#9313; | ✓ |
| [Lookup activity](control-flow-lookup-activity.md) | &#9312; &#9313; | ✓ |

*&#9312; Azure integration runtime &#9313; Self-hosted integration runtime*
 
You can copy data from Azure Database for MariaDB to any supported sink data store. For a list of data stores that are supported as sources/sinks by the copy activity, see the [Supported data stores](copy-activity-overview.md#supported-data-stores-and-formats) table.

The service provides a built-in driver to enable connectivity, therefore you don't need to manually install any driver using this connector.

## Getting started

<!--
    Separate the generic "Get started" paragraph from each connector-* article in azure-docs-pr/ to ease future central update.
-->

To perform the copy activity with a pipeline, you can use one of the following tools or SDKs:

- [Copy Data tool](quickstart-hello-world-copy-data-tool.md)
- [Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/quickstart-create-data-factory-portal.md)
- [.NET SDK](quickstart-create-data-factory-dot-net.md)
- [Python SDK](quickstart-create-data-factory-python.md)
- [Azure PowerShell](quickstart-create-data-factory-powershell.md)
- [REST API](quickstart-create-data-factory-rest-api.md)
- [Azure Resource Manager template](quickstart-create-data-factory-resource-manager-template.md)


## Create a linked service to Azure Database for MariaDB using UI

Use the following steps to create a linked service to Azure Database for MariaDB in the Azure portal UI.

1. Browse to the Manage tab in your Azure Data Factory or Synapse workspace and select Linked Services, then select New:

    # [Azure Data Factory](#tab/data-factory)

    Screenshot of creating a new linked service with Azure Data Factory UI.

    # [Azure Synapse](#tab/synapse-analytics)

    Screenshot of creating a new linked service with Azure Synapse UI.

2. Search for Maria and select the Azure Database for MariaDB connector.

   Screenshot of the Azure Database for MariaDB connector.


1. Configure the service details, test the connection, and create the new linked service.

   Screenshot of linked service configuration for Azure Database for MariaDB.

## Connector configuration details

The following sections provide details about properties that are used to define Data Factory entities specific to Azure Database for MariaDB connector.

## Linked service properties

The following properties are supported for Azure Database for MariaDB linked service:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property must be set to: **AzureMariaDB** | Yes |
| connectionString | A connection string to connect to Azure Database for MariaDB. You can find it from the Azure portal -> your Azure Database for MariaDB -> Connection strings -> ADO.NET one. <br/> You can also put password in Azure Key Vault and pull the `pwd` configuration out of the connection string. Refer to the following samples and [Store credentials in Azure Key Vault](store-credentials-in-key-vault.md) article with more details. | Yes |
| connectVia | The [Integration Runtime](concepts-integration-runtime.md) to be used to connect to the data store. If not specified, it uses the default Azure Integration Runtime. | No |

**Example:**

```json
{
    "name": "AzureDatabaseForMariaDBLinkedService",
    "properties": {
        "type": "AzureMariaDB",
        "typeProperties": {
            "connectionString": "Server={your_server}.mariadb.database.azure.com; Port=3306; Database={your_database}; Uid={your_user}@{your_server}; Pwd={your_password}; SslMode=Preferred;"
        },
        "connectVia": {
            "referenceName": "<name of Integration Runtime>",
            "type": "IntegrationRuntimeReference"
        }
    }
}
```

**Example: store password in Azure Key Vault**

```json
{
    "name": "AzureDatabaseForMariaDBLinkedService",
    "properties": {
        "type": "AzureMariaDB",
        "typeProperties": {
            "connectionString": "Server={your_server}.mariadb.database.azure.com; Port=3306; Database={your_database}; Uid={your_user}@{your_server}; SslMode=Preferred;",
            "pwd": { 
                "type": "AzureKeyVaultSecret", 
                "store": { 
                    "referenceName": "<Azure Key Vault linked service name>", 
                    "type": "LinkedServiceReference" 
                }, 
                "secretName": "<secretName>" 
            }
        },
        "connectVia": {
            "referenceName": "<name of Integration Runtime>",
            "type": "IntegrationRuntimeReference"
        }
    }
}
```

## Dataset properties

For a full list of sections and properties available for defining datasets, see the [datasets](concepts-datasets-linked-services.md) article. This section provides a list of properties supported by Azure Database for MariaDB dataset.

To copy data from Azure Database for MariaDB, the following properties are supported:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the dataset must be set to: **AzureMariaDBTable** | Yes |
| tableName | Name of the table. | No (if "query" in activity source is specified) |

**Example**

```json
{
    "name": "AzureDatabaseForMariaDBDataset",
    "properties": {
        "type": "AzureMariaDBTable",
        "typeProperties": {},
        "schema": [],
        "linkedServiceName": {
            "referenceName": "<Azure Database for MariaDB linked service name>",
            "type": "LinkedServiceReference"
        }
    }
}
```

## Copy activity properties

For a full list of sections and properties available for defining activities, see the [Pipelines](concepts-pipelines-activities.md) article. This section provides a list of properties supported by Azure Database for MariaDB source.

### Azure Database for MariaDB as source

To copy data from Azure Database for MariaDB, the following properties are supported in the copy activity **source** section:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the copy activity source must be set to: **AzureMariaDBSource** | Yes |
| query | Use the custom SQL query to read data. For example: `"SELECT * FROM MyTable"`. | No (if "tableName" in dataset is specified) |

**Example:**

```json
"activities":[
    {
        "name": "CopyFromAzureDatabaseForMariaDB",
        "type": "Copy",
        "inputs": [
            {
                "referenceName": "<Azure Database for MariaDB input dataset name>",
                "type": "DatasetReference"
            }
        ],
        "outputs": [
            {
                "referenceName": "<output dataset name>",
                "type": "DatasetReference"
            }
        ],
        "typeProperties": {
            "source": {
                "type": "AzureMariaDBSource",
                "query": "SELECT * FROM MyTable"
            },
            "sink": {
                "type": "<sink type>"
            }
        }
    }
]
```
## Lookup activity properties

To learn details about the properties, check [Lookup activity](control-flow-lookup-activity.md).

## Related content
For a list of data stores supported as sources and sinks by the copy activity, see [supported data stores](copy-activity-overview.md#supported-data-stores-and-formats).
