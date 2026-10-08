---
title: Copy data from Oracle Eloqua (Preview)
description: Learn how to copy data from Oracle Eloqua to supported sink data stores using a copy activity in an Azure Data Factory or Synapse Analytics pipeline.
titleSuffix: Azure Data Factory & Azure Synapse
ms.author: tinglee
author: simplywilson
ms.subservice: data-movement
ms.topic: how-to
ms.date: 01/26/2025
ms.custom:
  - synapse
  - sfi-image-nochange
---

# Copy data from Oracle Eloqua using Azure Data Factory or Synapse Analytics (Preview)
**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


> **Important:**
> This connector is at [End of Support stage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/connector-deprecation-plan.md). You are recommended to migrate to [ODBC connector](connector-odbc.md) by installing a driver.

This article outlines how to use the Copy Activity in an Azure Data Factory or Synapse Analytics pipeline to copy data from Oracle Eloqua. It builds on the [copy activity overview](copy-activity-overview.md) article that presents a general overview of copy activity.

## Supported capabilities

This Oracle Eloqua connector is supported for the following capabilities:

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


## Create a linked service to Oracle Eloqua using UI

Use the following steps to create a linked service to Oracle Eloqua in the Azure portal UI.

1. Browse to the Manage tab in your Azure Data Factory or Synapse workspace and select Linked Services, then click New:

    # [Azure Data Factory](#tab/data-factory)

    Screenshot of creating a new linked service with Azure Data Factory UI.

    # [Azure Synapse](#tab/synapse-analytics)

    Screenshot of creating a new linked service with Azure Synapse UI.

2. Search for Oracle and select the Oracle Eloqua connector.

   Screenshot of the Oracle Eloqua connector.


1. Configure the service details, test the connection, and create the new linked service.

   Screenshot of linked service configuration for Oracle Eloqua.

## Connector configuration details

The following sections provide details about properties that are used to define Data Factory entities specific to Oracle Eloqua connector.

## Linked service properties

The following properties are supported for Oracle Eloqua linked service:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property must be set to: **Eloqua** | Yes |
| endpoint | The endpoint of the Eloqua server. Eloqua supports multiple data centers, to determine your endpoint, login to https://login.eloqua.com with your credential, then copy the **base URL** portion from the redirected URL with the pattern of `xxx.xxx.eloqua.com`. | Yes |
| username | The site name and user name of your Eloqua account in the form: `SiteName\Username` e.g. `Eloqua\Alice`. | Yes |
| password | The password corresponding to the user name. Mark this field as a SecureString to store it securely, or [reference a secret stored in Azure Key Vault](store-credentials-in-key-vault.md). | Yes |
| useEncryptedEndpoints | Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. | No |
| useHostVerification | Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over TLS. The default value is true. | No |
| usePeerVerification | Specifies whether to verify the identity of the server when connecting over TLS. The default value is true. | No |

**Example:**

```json
{
    "name": "EloquaLinkedService",
    "properties": {
        "type": "Eloqua",
        "typeProperties": {
            "endpoint" : "<base URL e.g. xxx.xxx.eloqua.com>",
            "username" : "<site name>\\<user name e.g. Eloqua\\Alice>",
            "password": {
                 "type": "SecureString",
                 "value": "<password>"
            }
        }
    }
}
```

## Dataset properties

For a full list of sections and properties available for defining datasets, see the [datasets](concepts-datasets-linked-services.md) article. This section provides a list of properties supported by Oracle Eloqua dataset.

To copy data from Oracle Eloqua, set the type property of the dataset to **EloquaObject**. The following properties are supported:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the dataset must be set to: **EloquaObject** | Yes |
| tableName | Name of the table. | No (if "query" in activity source is specified) |

**Example**

```json
{
    "name": "EloquaDataset",
    "properties": {
        "type": "EloquaObject",
        "typeProperties": {},
        "schema": [],
        "linkedServiceName": {
            "referenceName": "<Eloqua linked service name>",
            "type": "LinkedServiceReference"
        }
    }
}
```

## Copy activity properties

For a full list of sections and properties available for defining activities, see the [Pipelines](concepts-pipelines-activities.md) article. This section provides a list of properties supported by Oracle Eloqua source.

### Eloqua as source

To copy data from Oracle Eloqua, set the source type in the copy activity to **EloquaSource**. The following properties are supported in the copy activity **source** section:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the copy activity source must be set to: **EloquaSource** | Yes |
| query | Use the custom SQL query to read data. For example: `"SELECT * FROM Accounts"`. | No (if "tableName" in dataset is specified) |

**Example:**

```json
"activities":[
    {
        "name": "CopyFromEloqua",
        "type": "Copy",
        "inputs": [
            {
                "referenceName": "<Eloqua input dataset name>",
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
                "type": "EloquaSource",
                "query": "SELECT * FROM Accounts"
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
For a list of supported data stores in the service, see [supported data stores](copy-activity-overview.md#supported-data-stores-and-formats).
