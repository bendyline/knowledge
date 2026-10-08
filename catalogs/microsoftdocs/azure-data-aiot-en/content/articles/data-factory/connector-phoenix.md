---
title: Copy data from Phoenix
description: Learn how to copy data from Phoenix to supported sink data stores using a copy activity in an Azure Data Factory or Synapse Analytics pipeline.
titleSuffix: Azure Data Factory & Azure Synapse
author: simplywilson
ms.subservice: data-movement
ms.topic: concept-article
ms.date: 01/26/2025
ms.author: tinglee
ms.custom:
  - synapse
  - sfi-image-nochange
---
# Copy data from Phoenix using Azure Data Factory or Synapse Analytics
**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


> **Important:**
> This connector is at [End of Support stage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/connector-deprecation-plan.md). You are recommended to migrate to [ODBC connector](connector-odbc.md) by installing a driver.

This article outlines how to use the Copy Activity in an Azure Data Factory or Synapse Analytics pipeline to copy data from Phoenix. It builds on the [copy activity overview](copy-activity-overview.md) article that presents a general overview of copy activity.

## Supported capabilities

This Phoenix connector is supported for the following capabilities:

| Supported capabilities | IR |
| --- | --- |
| [Copy activity](copy-activity-overview.md) (source/-) | &#9312; &#9313; |
| [Lookup activity](control-flow-lookup-activity.md) | &#9312; &#9313; |

*&#9312; Azure integration runtime &#9313; Self-hosted integration runtime*

For a list of data stores that are supported as sources/sinks by the copy activity, see the [Supported data stores](copy-activity-overview.md#supported-data-stores-and-formats) table.

The service provides a built-in driver to enable connectivity, therefore you don't need to manually install any driver using this connector.

## Prerequisites

<!--
    Separate the generic requirement on Self-hosted Integration Runtime setup from connector articles.
-->
If your data store is located inside an on-premises network, an Azure virtual network, or Amazon Virtual Private Cloud, you need to configure a [self-hosted integration runtime](create-self-hosted-integration-runtime.md) to connect to it.

If your data store is a managed cloud data service, you can use the Azure Integration Runtime. If the access is restricted to IPs that are approved in the firewall rules, you can add [Azure Integration Runtime IPs](azure-integration-runtime-ip-addresses.md) to the allow list. 

You can also use the [managed virtual network integration runtime](tutorial-managed-virtual-network-on-premise-sql-server.md) feature in Azure Data Factory to access the on-premises network without installing and configuring a self-hosted integration runtime.

For more information about the network security mechanisms and options supported by Data Factory, see [Data access strategies](data-access-strategies.md).


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


## Create a linked service to Phoenix using UI

Use the following steps to create a linked service to Phoenix in the Azure portal UI.

1. Browse to the Manage tab in your Azure Data Factory or Synapse workspace and select Linked Services, then click New:

    # [Azure Data Factory](#tab/data-factory)

    Screenshot of creating a new linked service with Azure Data Factory UI.

    # [Azure Synapse](#tab/synapse-analytics)

    Screenshot of creating a new linked service with Azure Synapse UI.

2. Search for Phoenix and select the Phoenix connector.

   Screenshot of the Phoenix connector.


1. Configure the service details, test the connection, and create the new linked service.

   Screenshot of linked service configuration for Phoenix.

## Connector configuration details

The following sections provide details about properties that are used to define Data Factory entities specific to Phoenix connector.

## Linked service properties

The following properties are supported for Phoenix linked service:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property must be set to: **Phoenix** | Yes |
| host | The IP address or host name of the Phoenix server. (that is, 192.168.222.160) | Yes |
| port | The TCP port that the Phoenix server uses to listen for client connections. The default value is 8765. If you connect to Azure HDInsights, specify port as 443. | No |
| httpPath | The partial URL corresponding to the Phoenix server. (that is, /gateway/sandbox/phoenix/version). Specify `/hbasephoenix0` if using HDInsights cluster. | No |
| authenticationType | The authentication mechanism used to connect to the Phoenix server. <br/>Allowed values are: **Anonymous**, **UsernameAndPassword**, **WindowsAzureHDInsightService** | Yes |
| username | The user name used to connect to the Phoenix server. | No |
| password | The password corresponding to the user name. Mark this field as a SecureString to store it securely, or [reference a secret stored in Azure Key Vault](store-credentials-in-key-vault.md). | No |
| enableSsl | Specifies whether the connections to the server are encrypted using TLS. The default value is false. | No |
| trustedCertPath | The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over TLS. This property can only be set when using TLS on self-hosted IR. The default value is the cacerts.pem file installed with the IR. | No |
| useSystemTrustStore | Specifies whether to use a CA certificate from the system trust store or from a specified PEM file. The default value is false. | No |
| allowHostNameCNMismatch | Specifies whether to require a CA-issued TLS/SSL certificate name to match the host name of the server when connecting over TLS. The default value is false. | No |
| allowSelfSignedServerCert | Specifies whether to allow self-signed certificates from the server. The default value is false. | No |
| connectVia | The [Integration Runtime](concepts-integration-runtime.md) to be used to connect to the data store. Learn more from [Prerequisites](#prerequisites) section. If not specified, it uses the default Azure Integration Runtime. | No |

>**Note:**
>If your cluster doesn't support sticky session e.g. HDInsight, explicitly add node index at the end of the http path setting, e.g. specify `/hbasephoenix0` instead of `/hbasephoenix`.

**Example:**

```json
{
    "name": "PhoenixLinkedService",
    "properties": {
        "type": "Phoenix",
        "typeProperties": {
            "host" : "<cluster>.azurehdinsight.net",
            "port" : "443",
            "httpPath" : "/hbasephoenix0",
            "authenticationType" : "WindowsAzureHDInsightService",
            "username" : "<username>",
            "password": {
                 "type": "SecureString",
                 "value": "<password>"
            }
        }
    }
}
```

## Dataset properties

For a full list of sections and properties available for defining datasets, see the [datasets](concepts-datasets-linked-services.md) article. This section provides a list of properties supported by Phoenix dataset.

To copy data from Phoenix, set the type property of the dataset to **PhoenixObject**. The following properties are supported:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the dataset must be set to: **PhoenixObject** | Yes |
| schema | Name of the schema. | No (if "query" in activity source is specified) |
| table | Name of the table. | No (if "query" in activity source is specified) |
| tableName | Name of the table with schema. This property is supported for backward compatibility. Use `schema` and `table` for new workload. | No (if "query" in activity source is specified) |

**Example**

```json
{
    "name": "PhoenixDataset",
    "properties": {
        "type": "PhoenixObject",
        "typeProperties": {},
        "schema": [],
        "linkedServiceName": {
            "referenceName": "<Phoenix linked service name>",
            "type": "LinkedServiceReference"
        }
    }
}
```

## Copy activity properties

For a full list of sections and properties available for defining activities, see the [Pipelines](concepts-pipelines-activities.md) article. This section provides a list of properties supported by Phoenix source.

### Phoenix as source

To copy data from Phoenix, set the source type in the copy activity to **PhoenixSource**. The following properties are supported in the copy activity **source** section:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The type property of the copy activity source must be set to: **PhoenixSource** | Yes |
| query | Use the custom SQL query to read data. For example: `"SELECT * FROM MyTable"`. | No (if "tableName" in dataset is specified) |

**Example:**

```json
"activities":[
    {
        "name": "CopyFromPhoenix",
        "type": "Copy",
        "inputs": [
            {
                "referenceName": "<Phoenix input dataset name>",
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
                "type": "PhoenixSource",
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
