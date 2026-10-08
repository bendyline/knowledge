---
title: Transform data in Quickbase (Preview)
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to transform data in Quickbase (Preview) by using Data Factory or Azure Synapse Analytics.
ms.author: tinglee
author: simplywilson
ms.subservice: data-movement
ms.topic: how-to
ms.date: 01/05/2024
ms.custom:
  - synapse
  - sfi-image-nochange
---

#  Transform data in Quickbase (Preview) using Azure Data Factory or Synapse Analytics

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article outlines how to use Data Flow to transform data in Quickbase (Preview). To learn more, read the introductory article for [Azure Data Factory](introduction.md) or [Azure Synapse Analytics](../synapse-analytics/overview-what-is.md).

> **Important:**
> This connector is currently in preview. You can try it out and give us feedback. If you want to take a dependency on preview connectors in your solution, please contact [Azure support](https://azure.microsoft.com/support/).

## Supported capabilities

This Quickbase connector is supported for the following capabilities:

| Supported capabilities | IR |
| --- | --- |
| [Mapping data flow](concepts-data-flow-overview.md) (source/-) | &#9312; |

*&#9312; Azure integration runtime &#9313; Self-hosted integration runtime*

For a list of data stores that are supported as sources/sinks, see the [Supported data stores](connector-overview.md#supported-data-stores) table.

## Create a Quickbase linked service using UI

Use the following steps to create a Quickbase linked service in the Azure portal UI.

1. Browse to the Manage tab in your Azure Data Factory or Synapse workspace and select Linked Services, then select New:

    # [Azure Data Factory](#tab/data-factory)

    Screenshot of creating a new linked service with Azure Data Factory U I.

    # [Azure Synapse](#tab/synapse-analytics)

    Screenshot of creating a new linked service with Azure Synapse U I.

2. Search for Quickbase (Preview) and select the Quickbase (Preview) connector.

    Screenshot showing selecting Quickbase connector.

3. Configure the service details, test the connection, and create the new linked service.

    Screenshot of configuration for Quickbase linked service.

## Connector configuration details

The following sections provide information about properties that are used to define Data Factory and Synapse pipeline entities specific to Quickbase.

## Linked service properties

The following properties are supported for the Quickbase linked service:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property must be set to **Quickbase**. | Yes |
| url | The application URL of the Quickbase service. | Yes |
| userToken | Specify a user token for the Quickbase. Mark this field as **SecureString** to store it securely. Or, you can [reference a secret stored in Azure Key Vault](store-credentials-in-key-vault.md). | Yes |

**Example:**

```json
{
    "name": "QuickbaseLinkedService",
    "properties": {
        "type": "Quickbase",
        "typeProperties": {
            "url": "<application url>",
            "userToken": {
                "type": "SecureString",
                "value": "<user token>"
            }
        }
    }
}
```

## Mapping data flow properties

When transforming data in mapping data flow, you can read tables from Quickbase. For more information, see the [source transformation](data-flow-source.md) in mapping data flows. You can only use an [inline dataset](data-flow-source.md#inline-datasets) as source type.

### Source transformation

The below table lists the properties supported by Quickbase source. You can edit these properties in the **Source options** tab.

| Name | Description | Required | Allowed values | Data flow script property |
| --- | --- | --- | --- | --- |
| Table | Data flow will fetch all the data from the table specified in the source options. | Yes when use inline mode | - | table |
| Report | Data flow will fetch the specified report for the table specified in the source options. | No | - | report |

#### Quickbase source script examples

```
source(allowSchemaDrift: true,
	validateSchema: false,
	store: 'quickbase',
	format: 'rest',
	table: 'Table',
	report: 'Report') ~> Quickbasesource
```

## Related content

For a list of data stores supported as sources and sinks by the copy activity, see [Supported data stores](copy-activity-overview.md#supported-data-stores-and-formats).
