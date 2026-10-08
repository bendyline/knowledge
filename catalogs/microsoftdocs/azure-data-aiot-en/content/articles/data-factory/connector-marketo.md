---
title: Copy data from Marketo (Preview) 
description: Learn how to copy data from Marketo to supported sink data stores using a copy activity in an Azure Data Factory or Synapse Analytics pipeline.
titleSuffix: Azure Data Factory & Azure Synapse
ms.subservice: data-movement
ms.topic: how-to
ms.date: 06/22/2026
ms.update-cycle: 1095-days
ms.author: makromer
author: kromerm
ms.custom:
  - synapse
  - sfi-image-nochange
---

# Copy data from Marketo using Azure Data Factory or Synapse Analytics (Preview)
**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


> **Important:**
> This connector is at [End of Support stage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/connector-deprecation-plan.md). You're recommended to migrate to [ODBC connector](connector-odbc.md) by installing a driver.

This article outlines how to use the Copy Activity in an Azure Data Factory or Synapse Analytics pipeline to copy data from Marketo. It builds on the [copy activity overview](copy-activity-overview.md) article that presents a general overview of copy activity.

## Supported capabilities

This Marketo connector is supported for the following capabilities:

| Supported capabilities | IR |
| --- | --- |
| [Copy activity](copy-activity-overview.md) (source/-) | &#9312; &#9313; |
| [Lookup activity](control-flow-lookup-activity.md) | &#9312; &#9313; |

*&#9312; Azure integration runtime &#9313; Self-hosted integration runtime*

For a list of data stores that are supported as sources/sinks, see the [Supported data stores](connector-overview.md#supported-data-stores) table.

Currently, Marketo instance which is integrated with external CRM isn't supported.

>**Note:**
>This Marketo connector is built on top of the Marketo REST API. Be aware that the Marketo has [concurrent request limit](https://developers.marketo.com/rest-api/) on service side. If you hit errors saying "Error while attempting to use REST API: Max rate limit '100' exceeded with in '20' secs (606)" or "Error while attempting to use REST API: Concurrent access limit '10' reached (615)", consider to reduce the concurrent copy activity runs to reduce the number of requests to the service.

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


## Create a linked service to Marketo using UI

Use the following steps to create a linked service to Marketo in the Azure portal UI.

1. Browse to the Manage tab in your Azure Data Factory or Synapse workspace and select Linked Services, then select New:

    # [Azure Data Factory](#tab/data-factory)

    Screenshot of creating a new linked service with Azure Data Factory UI.

    # [Azure Synapse](#tab/synapse-analytics)

    Screenshot of creating a new linked service with Azure Synapse UI.

2. Search for Marketo and select the Marketo connector.

   Screenshot of the Marketo connector.


1. Configure the service details, test the connection, and create the new linked service.

   Screenshot of linked service configuration for Marketo.

## Connector configuration details

The following sections provide details about properties that are used to define Data Factory entities specific to Marketo connector.

## Linked service properties

The following properties are supported for Marketo linked service:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property must be set to: **Marketo** | Yes |
| endpoint | The endpoint of the Marketo server. (i.e. 123-ABC-321.mktorest.com) | Yes |
| clientId | The client ID of your Marketo service. | Yes |
| clientSecret | The client secret of your Marketo service. Mark this field as a SecureString to store it securely, or [reference a secret stored in Azure Key Vault](store-credentials-in-key-vault.md). | Yes |
| useEncryptedEndpoints | Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. | No |
| useHostVerification | Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over TLS. The default value is true. | No |
| usePeerVerification | Specifies whether to verify the identity of the server when connecting over TLS. The default value is true. | No |

**Example:**

```json
{
    "name": "MarketoLinkedService",
    "properties": {
        "type": "Marketo",
        "typeProperties": {
            "endpoint" : "123-ABC-321.mktorest.com",
            "clientId" : "<clientId>",
            "clientSecret": {
                "type": "SecureString",
                "value": "<clientSecret>"
            }
        }
    }
}
```

## Dataset properties

For a full list of sections and properties available for defining datasets, see the [datasets](concepts-datasets-linked-services.md) article. This section provides a list of properties supported by Marketo dataset.

To copy data from Marketo, set the type property of the dataset to **MarketoObject**. The following properties are supported:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the dataset must be set to: **MarketoObject** | Yes |
| tableName | Name of the table. | No (if "query" in activity source is specified) |

**Example**

```json
{
    "name": "MarketoDataset",
    "properties": {
        "type": "MarketoObject",
        "typeProperties": {},
        "schema": [],
        "linkedServiceName": {
            "referenceName": "<Marketo linked service name>",
            "type": "LinkedServiceReference"
        }
    }
}
```

## Copy activity properties

For a full list of sections and properties available for defining activities, see the [Pipelines](concepts-pipelines-activities.md) article. This section provides a list of properties supported by Marketo source.

### Marketo as source

To copy data from Marketo, set the source type in the copy activity to **MarketoSource**. The following properties are supported in the copy activity **source** section:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the copy activity source must be set to: **MarketoSource** | Yes |
| query | Use the custom SQL query to read data. For example: `"SELECT * FROM Activity_Types"`. | No (if "tableName" in dataset is specified) |

**Example:**

```json
"activities":[
    {
        "name": "CopyFromMarketo",
        "type": "Copy",
        "inputs": [
            {
                "referenceName": "<Marketo input dataset name>",
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
                "type": "MarketoSource",
                "query": "SELECT top 1000 * FROM Activity_Types"
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
