---
title: Copy data from Oracle Service Cloud (Preview)
description: Learn how to copy data from Oracle Service Cloud to supported sink data stores using a copy activity in an Azure Data Factory or Synapse Analytics pipeline.
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
---

# Copy data from Oracle Service Cloud using Azure Data Factory or Synapse Analytics (Preview)
**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


> **Important:**
> This connector is at [End of Support stage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/connector-deprecation-plan.md). You're recommended to migrate to [ODBC connector](connector-odbc.md) by installing a driver.

This article outlines how to use the Copy Activity in an Azure Data Factory or Synapse Analytics pipeline to copy data from Oracle Service Cloud. It builds on the [copy activity overview](copy-activity-overview.md) article that presents a general overview of copy activity.

## Supported capabilities

This Oracle Service Cloud connector is supported for the following capabilities:

| Supported capabilities | IR |
| --- | --- |
| [Copy activity](copy-activity-overview.md) (source/-) | &#9312; &#9313; |
| [Lookup activity](control-flow-lookup-activity.md) | &#9312; &#9313; |

*&#9312; Azure integration runtime &#9313; Self-hosted integration runtime*

For a list of data stores that are supported as sources/sinks, see the [Supported data stores](connector-overview.md#supported-data-stores) table.

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


## Create a linked service to Oracle Service Cloud using UI

Use the following steps to create a linked service to Oracle Service Cloud in the Azure portal UI.

1. Browse to the Manage tab in your Azure Data Factory or Synapse workspace and select Linked Services, then select New:

    # [Azure Data Factory](#tab/data-factory)

    Create a new linked service with Azure Data Factory UI.

    # [Azure Synapse](#tab/synapse-analytics)

    Create a new linked service with Azure Synapse UI.

2. Search for Oracle and select the Oracle Service Cloud connector.

   Select the Oracle Service Cloud connector.


1. Configure the service details, test the connection, and create the new linked service.

   Configure a linked service to Oracle Service Cloud.

## Connector configuration details

The following sections provide details about properties that are used to define Data Factory entities specific to Oracle Service Cloud connector.

## Linked service properties

The following properties are supported for Oracle Service Cloud linked service:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property must be set to: **OracleServiceCloud** | Yes |
| host | The URL of the Oracle Service Cloud instance. | Yes |
| username | The user name that you use to access Oracle Service Cloud server. | Yes |
| password | The password corresponding to the user name that you provided in the username key. You can choose to mark this field as a SecureString to store it securely in the service, or store password in Azure Key Vault and let the service copy activity pull from there when performing data copy - learn more from [Store credentials in Key Vault](store-credentials-in-key-vault.md). | Yes |
| useEncryptedEndpoints | Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. | No |
| useHostVerification | Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over TLS. The default value is true. | No |
| usePeerVerification | Specifies whether to verify the identity of the server when connecting over TLS. The default value is true. | No |

**Example:**

```json
{
    "name": "OracleServiceCloudLinkedService",
    "properties": {
        "type": "OracleServiceCloud",
        "typeProperties": {
            "host" : "<host>",
            "username" : "<username>",
            "password": {
                 "type": "SecureString",
                 "value": "<password>"
            },
            "useEncryptedEndpoints" : true,
            "useHostVerification" : true,
            "usePeerVerification" : true,
        }
    }
}

```

## Dataset properties

For a full list of sections and properties available for defining datasets, see the [datasets](concepts-datasets-linked-services.md) article. This section provides a list of properties supported by Oracle Service Cloud dataset.

To copy data from Oracle Service Cloud, set the type property of the dataset to **OracleServiceCloudObject**. The following properties are supported:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the dataset must be set to: **OracleServiceCloudObject** | Yes |
| tableName | Name of the table. | No (if "query" in activity source is specified) |

**Example**

```json
{
    "name": "OracleServiceCloudDataset",
    "properties": {
        "type": "OracleServiceCloudObject",
        "typeProperties": {},
        "schema": [],
        "linkedServiceName": {
            "referenceName": "<OracleServiceCloud linked service name>",
            "type": "LinkedServiceReference"
        }
    }
}

```

## Copy activity properties

For a full list of sections and properties available for defining activities, see the [Pipelines](concepts-pipelines-activities.md) article. This section provides a list of properties supported by Oracle Service Cloud source.

### Oracle Service Cloud as source

To copy data from Oracle Service Cloud, set the source type in the copy activity to **OracleServiceCloudSource**. The following properties are supported in the copy activity **source** section:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the copy activity source must be set to: **OracleServiceCloudSource** | Yes |
| query | Use the custom SQL query to read data. For example: `"SELECT * FROM MyTable"`. | No (if "tableName" in dataset is specified) |

**Example:**

```json
"activities":[
    {
        "name": "CopyFromOracleServiceCloud",
        "type": "Copy",
        "inputs": [
            {
                "referenceName": "<OracleServiceCloud input dataset name>",
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
                "type": "OracleServiceCloudSource",
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
