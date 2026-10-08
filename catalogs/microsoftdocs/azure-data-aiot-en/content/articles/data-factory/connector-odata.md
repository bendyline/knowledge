---
title: Copy data from OData sources
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to copy data from OData sources to supported sink data stores using a copy activity in an Azure Data Factory or Synapse Analytics pipeline.
author: simplywilson
ms.subservice: data-movement
ms.topic: how-to
ms.date: 02/13/2025
ms.author: tinglee
ms.custom:
  - synapse
  - sfi-image-nochange
---
# Copy data from an OData source by using Azure Data Factory or Synapse Analytics
**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).



This article outlines how to use Copy Activity in an Azure Data Factory or Synapse Analytics pipeline to copy data from an OData source. The article builds on [Copy Activity](copy-activity-overview.md), which presents a general overview of Copy Activity.

> **Note:**
> This connector is also available in [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/data-factory-overview). For Fabric-specific configuration and features, see the [Fabric OData connector documentation](https://learn.microsoft.com/fabric/data-factory/connector-odata-overview).


## Supported capabilities

This OData connector is supported for the following capabilities:

| Supported capabilities | IR |
| --- | --- |
| [Copy activity](copy-activity-overview.md) (source/-) | &#9312; &#9313; |
| [Lookup activity](control-flow-lookup-activity.md) | &#9312; &#9313; |

*&#9312; Azure integration runtime &#9313; Self-hosted integration runtime*

For a list of data stores that are supported as sources/sinks, see [Supported data stores](connector-overview.md#supported-data-stores).

Specifically, this OData connector supports:

- OData version 2.0, 3.0, and 4.0.
- Copying data by using one of the following authentications: **Anonymous**, **Basic**, **Windows**, and **Microsoft Entra service principal**.

## Prerequisites

<!--
    Separate the generic requirement on Self-hosted Integration Runtime setup from connector articles.
-->
If your data store is located inside an on-premises network, an Azure virtual network, or Amazon Virtual Private Cloud, you need to configure a [self-hosted integration runtime](create-self-hosted-integration-runtime.md) to connect to it.

If your data store is a managed cloud data service, you can use the Azure Integration Runtime. If the access is restricted to IPs that are approved in the firewall rules, you can add [Azure Integration Runtime IPs](azure-integration-runtime-ip-addresses.md) to the allow list. 

You can also use the [managed virtual network integration runtime](tutorial-managed-virtual-network-on-premise-sql-server.md) feature in Azure Data Factory to access the on-premises network without installing and configuring a self-hosted integration runtime.

For more information about the network security mechanisms and options supported by Data Factory, see [Data access strategies](data-access-strategies.md).


## Get started

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


## Create a linked service to an OData store using UI

Use the following steps to create a linked service to an OData store in the Azure portal UI.

1. Browse to the Manage tab in your Azure Data Factory or Synapse workspace and select Linked Services, then select New:

    # [Azure Data Factory](#tab/data-factory)

    Screenshot of creating a new linked service with Azure Data Factory UI.

    # [Azure Synapse](#tab/synapse-analytics)

    Screenshot of creating a new linked service with Azure Synapse UI.

2. Search for OData and select the OData connector.

    Screenshot of the OData connector.

1. Configure the service details, test the connection, and create the new linked service.

    Screenshot of linked service configuration for an OData store.

## Connector configuration details

The following sections provide details about properties you can use to define Data Factory entities that are specific to an OData connector.

## Linked service properties

The following properties are supported for an OData linked service:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The **type** property must be set to **OData**. | Yes |
| url | The root URL of the OData service. | Yes |
| authenticationType | The type of authentication used to connect to the OData source. Allowed values are **Anonymous**, **Basic**, **Windows**, and **AadServicePrincipal**. User-based OAuth isn't supported. You can additionally configure authentication headers in `authHeader` property. | Yes |
| authHeaders | Additional HTTP request headers for authentication.<br/> For example, to use API key authentication, you can select authentication type as “Anonymous” and specify API key in the header. | No |
| userName | Specify **userName** if you use Basic or Windows authentication. | No |
| password | Specify **password** for the user account you specified for **userName**. Mark this field as a **SecureString** type to store it securely. You also can [reference a secret stored in Azure Key Vault](store-credentials-in-key-vault.md). | No |
| servicePrincipalId | Specify the Microsoft Entra application's client ID. | No |
| aadServicePrincipalCredentialType | Specify the credential type to use for service principal authentication. Allowed values are: `ServicePrincipalKey` or `ServicePrincipalCert`. | No |
| servicePrincipalKey | Specify the Microsoft Entra application's key. Mark this field as a **SecureString** to store it securely, or [reference a secret stored in Azure Key Vault](store-credentials-in-key-vault.md). | No |
| servicePrincipalEmbeddedCert | Specify the base64 encoded certificate of your application registered in Microsoft Entra ID, and ensure the certificate content type is **PKCS #12**. Mark this field as a **SecureString** to store it securely, or [reference a secret stored in Azure Key Vault](store-credentials-in-key-vault.md). | No |
| servicePrincipalEmbeddedCertPassword | Specify the password of your certificate if your certificate is secured with a password. Mark this field as a **SecureString** to store it securely, or [reference a secret stored in Azure Key Vault](store-credentials-in-key-vault.md). | No |
| tenant | Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering the mouse in the top-right corner of the Azure portal. | No |
| aadResourceId | Specify the Microsoft Entra resource you are requesting for authorization. | No |
| azureCloudType | For service principal authentication, specify the type of Azure cloud environment to which your Microsoft Entra application is registered. <br/> Allowed values are **AzurePublic**, **AzureChina**, **AzureUsGovernment**, and **AzureGermany**. By default, the service's cloud environment is used. | No |
| connectVia | The [Integration Runtime](concepts-integration-runtime.md) to use to connect to the data store. Learn more from [Prerequisites](#prerequisites) section. If not specified, the default Azure Integration Runtime is used. | No |

**Example 1: Using Anonymous authentication**

```json
{
    "name": "ODataLinkedService",
    "properties": {
        "type": "OData",
        "typeProperties": {
            "url": "https://services.odata.org/OData/OData.svc",
            "authenticationType": "Anonymous"
        },
        "connectVia": {
            "referenceName": "<name of Integration Runtime>",
            "type": "IntegrationRuntimeReference"
        }
    }
}
```

**Example 2: Using Basic authentication**

```json
{
    "name": "ODataLinkedService",
    "properties": {
        "type": "OData",
        "typeProperties": {
            "url": "<endpoint of OData source>",
            "authenticationType": "Basic",
            "userName": "<user name>",
            "password": {
                "type": "SecureString",
                "value": "<password>"
            }
        },
        "connectVia": {
            "referenceName": "<name of Integration Runtime>",
            "type": "IntegrationRuntimeReference"
        }
    }
}
```

**Example 3: Using Windows authentication**

```json
{
    "name": "ODataLinkedService",
    "properties": {
        "type": "OData",
        "typeProperties": {
            "url": "<endpoint of OData source>",
            "authenticationType": "Windows",
            "userName": "<domain>\\<user>",
            "password": {
                "type": "SecureString",
                "value": "<password>"
            }
        },
        "connectVia": {
            "referenceName": "<name of Integration Runtime>",
            "type": "IntegrationRuntimeReference"
        }
    }
}
```

**Example 4: Using service principal key authentication**

```json
{
    "name": "ODataLinkedService",
    "properties": {
        "type": "OData",
        "typeProperties": {
            "url": "<endpoint of OData source>",
            "authenticationType": "AadServicePrincipal",
            "servicePrincipalId": "<service principal id>",
            "aadServicePrincipalCredentialType": "ServicePrincipalKey",
            "servicePrincipalKey": {
                "type": "SecureString",
                "value": "<service principal key>"
            },
            "tenant": "<tenant info, e.g. microsoft.onmicrosoft.com>",
            "aadResourceId": "<AAD resource URL>"
        }
    },
    "connectVia": {
        "referenceName": "<name of Integration Runtime>",
        "type": "IntegrationRuntimeReference"
    }
}
```

**Example 5: Using service principal cert authentication**

```json
{
    "name": "ODataLinkedService",
    "properties": {
        "type": "OData",
        "typeProperties": {
            "url": "<endpoint of OData source>",
            "authenticationType": "AadServicePrincipal",
            "servicePrincipalId": "<service principal id>",
            "aadServicePrincipalCredentialType": "ServicePrincipalCert",
            "servicePrincipalEmbeddedCert": { 
                "type": "SecureString", 
                "value": "<base64 encoded string of (.pfx) certificate data>"
            },
            "servicePrincipalEmbeddedCertPassword": { 
                "type": "SecureString", 
                "value": "<password of your certificate>"
            },
            "tenant": "<tenant info, e.g. microsoft.onmicrosoft.com>",
            "aadResourceId": "<AAD resource e.g. https://tenant.sharepoint.com>"
        }
    },
    "connectVia": {
        "referenceName": "<name of Integration Runtime>",
        "type": "IntegrationRuntimeReference"
    }
}
```

**Example 6: Using API key authentication**

```json
{
    "name": "ODataLinkedService",
    "properties": {
        "type": "OData",
        "typeProperties": {
            "url": "<endpoint of OData source>",
            "authenticationType": "Anonymous",
            "authHeader": {
                "APIKey": {
                    "type": "SecureString",
                    "value": "<API key>"
                }
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

This section provides a list of properties that the OData dataset supports.

For a full list of sections and properties that are available for defining datasets, see [Datasets and linked services](concepts-datasets-linked-services.md). 

To copy data from OData, set the **type** property of the dataset to **ODataResource**. The following properties are supported:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The **type** property of the dataset must be set to **ODataResource**. | Yes |
| path | The path to the OData resource. | Yes |

**Example**

```json
{
    "name": "ODataDataset",
    "properties":
    {
        "type": "ODataResource",
        "schema": [],
        "linkedServiceName": {
            "referenceName": "<OData linked service name>",
            "type": "LinkedServiceReference"
        },
        "typeProperties":
        {
            "path": "Products"
        }
    }
}
```

## Copy Activity properties

This section provides a list of properties that the OData source supports.

For a full list of sections and properties that are available for defining activities, see [Pipelines](concepts-pipelines-activities.md). 

### OData as source

To copy data from OData, the following properties are supported in the Copy Activity **source** section:

| Property | Description | Required |
| :--- | :--- | :--- |
| type | The **type** property of the Copy Activity source must be set to **ODataSource**. | Yes |
| query | OData query options for filtering data. Example: `"$select=Name,Description&$top=5"`.<br/><br/>**Note**: The OData connector copies data from the combined URL: `[URL specified in linked service]/[path specified in dataset]?[query specified in copy activity source]`. For more information, see [OData URL components](https://www.odata.org/documentation/odata-version-3-0/url-conventions/). | No |
| httpRequestTimeout | The  time-out (the **TimeSpan** value) for the HTTP request to get a response. This value is the  time-out to get a response, not the  time-out to read response data. If not specified, the default value is **00:30:00** (30 minutes). | No |

**Example**

```json
"activities":[
    {
        "name": "CopyFromOData",
        "type": "Copy",
        "inputs": [
            {
                "referenceName": "<OData input dataset name>",
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
                "type": "ODataSource",
                "query": "$select=Name,Description&$top=5"
            },
            "sink": {
                "type": "<sink type>"
            }
        }
    }
]
```

If you were using `RelationalSource` typed source, it is still supported as-is, while you are suggested to use the new one going forward.

## Data type mapping for OData

When you copy data from OData, the following mappings are used between OData data types and interim data types used within the service internally. To learn how Copy Activity maps the source schema and data type to the sink, see [Schema and data type mappings](copy-activity-schema-and-type-mapping.md).

| OData data type | Interim service data type |
| :--- | :--- |
| Edm.Binary | Byte[] |
| Edm.Boolean | Bool |
| Edm.Byte | Byte[] |
| Edm.DateTime | DateTime |
| Edm.Decimal | Decimal |
| Edm.Double | Double |
| Edm.Single | Single |
| Edm.Guid | Guid |
| Edm.Int16 | Int16 |
| Edm.Int32 | Int32 |
| Edm.Int64 | Int64 |
| Edm.SByte | Int16 |
| Edm.String | String |
| Edm.Time | TimeSpan |
| Edm.DateTimeOffset | DateTimeOffset |

> **Note:**
> OData complex data types (such as **Object**) aren't supported.

## Copy data from Project Online

Project Online requires user-based OAuth, which is not supported by Azure Data Factory. To copy data from Project Online, you can use the OData connector and an access token obtained from tools like Postman.

> **Caution:**
> The access token expires in 1 hour by default, you need to get a new access token when it expires.

1. Use **Postman** to get the access token:

    > **Note:**
    > Postman is a used by some developers for testing remote web APIs. However, there are some security and privacy risks associated with its usage. This article does not endorse the use of Postman for production environments. Please use it at your own risk.

    1. Navigate to **Authorization** tab on the Postman Website.
    1. In the **Type** box, select **OAuth 2.0**, and in the **Add authorization data to** box, select **Request Headers**.
    1. Fill the following information in the **Configure New Token** page to get a new access token: 
       - **Grant type**: Select **Authorization Code**.
       - **Callback URL**: Enter `https://www.localhost.com/`.
       - **Auth URL**: Enter `https://login.microsoftonline.com/common/oauth2/authorize?resource=https://<your tenant name>.sharepoint.com`. Replace `<your tenant name>` with your own tenant name. 
       - **Access Token URL**: Enter `https://login.microsoftonline.com/common/oauth2/token`.
       - **Client ID**: Enter your Microsoft Entra service principal ID.
       - **Client Secret**: Enter your service principal secret.
       - **Client Authentication**: Select **Send as Basic Auth header**.
    1. You will be asked to sign in with your username and password.
    1. Once you get your access token, please copy and save it for the next step.

    Screenshot of using Postman to get the access token.

1. Create the OData linked service:
    - **Service URL**: Enter `https://<your tenant name>.sharepoint.com/sites/pwa/_api/Projectdata`. Replace `<your tenant name>` with your own tenant name. 
    - **Authentication type**: Select **Anonymous**.
    - **Auth headers**:
        - **Property name**: Choose **Authorization**.
        - **Value**: Enter `Bearer <access token from step 1>`.
    - Test the linked service.

    Create OData linked service

1. Create the OData dataset:
    1. Create the dataset with the OData linked service created in step 2.
    1. Preview data.
 
    Preview data
 


## Lookup activity properties

To learn details about the properties, check [Lookup activity](control-flow-lookup-activity.md).

## Related content

For a list of data stores that Copy Activity supports as sources and sinks, see [Supported data stores and formats](copy-activity-overview.md#supported-data-stores-and-formats).
