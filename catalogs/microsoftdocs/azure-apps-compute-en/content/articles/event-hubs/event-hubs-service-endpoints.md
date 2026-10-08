---
title: Secure Azure Event Hubs Using Virtual Network Integration
description: Discover how to bind Azure Event Hubs to virtual networks for enhanced security. Isolate messaging services from public internet access with this guide.
#customer intent: As an IT admin, I want to bind Event Hubs namespaces to virtual networks so that I can isolate messaging services from public internet access.
ms.topic: how-to
ms.date: 01/30/2026
ms.custom:
  - devx-track-azurepowershell, devx-track-azurecli
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:07/28/2025
  - ai-gen-description
  - sfi-image-nochange
---

# Allow access to Azure Event Hubs namespaces from specific virtual networks 

Integrate Event Hubs with Azure Virtual Network service endpoints to restrict access to your Event Hubs namespace from specific virtual network subnets. This article explains how virtual network integration works and provides step-by-step instructions to configure it.

## Overview

By using [Virtual Network service endpoints][vnet-sep], workloads running in a virtual network, such as virtual machines, can securely access your Event Hubs namespace. The network traffic path is secured on both ends.

When you configure an Event Hubs namespace with at least one virtual network service endpoint, the namespace only accepts traffic from authorized subnets. From the virtual network perspective, the service endpoint creates an isolated networking tunnel from the subnet to the Event Hubs namespace.

This configuration establishes a private and isolated connection between workloads in the subnet and your Event Hubs namespace, even though the Event Hubs service endpoint uses a public IP address.

## Important points

- This feature isn't supported in the **basic** tier.
- When you enable virtual networks for your Event Hubs namespace, incoming requests are blocked by default unless they originate from a service operating from allowed virtual networks. Blocked requests include the requests from other Azure services, the Azure portal, logging and metrics services, and so on. As an exception, you can allow access to Event Hubs resources from certain **trusted services** even when virtual networks are enabled. For a list of trusted services, see [Trusted services](#trusted-microsoft-services).
- Specify **at least one IP rule or virtual network rule** for the namespace to allow traffic only from the specified IP addresses or subnet of a virtual network. If you don't specify any IP and virtual network rules, the namespace is accessible over the public internet (using the access key).  

## Advanced security scenarios enabled by virtual network integration 

Virtual network integration supports scenarios that require strict security isolation while still allowing communication between compartmentalized services.

Direct IP routes between network compartments, even those using HTTPS over TCP/IP, are vulnerable to network-layer exploits. Event Hubs provides a more secure alternative by acting as an intermediary. Workloads in separate virtual networks that connect to the same Event Hubs instance can exchange messages reliably while maintaining network isolation.

This approach gives security-sensitive solutions access to Azure's scalable messaging capabilities while creating communication paths that are more secure than direct peer-to-peer connections.

## Bind Event Hubs to virtual networks

**Virtual network rules** control whether your Event Hubs namespace accepts connections from a specific virtual network subnet.

To bind an Event Hubs namespace to a virtual network:

1. Create a **service endpoint** on a virtual network subnet and enable it for **Microsoft.EventHub**. For more information, see [Virtual network service endpoints][vnet-sep].  
1. Add a **virtual network rule** to bind the Event Hubs namespace to the service endpoint.

The virtual network rule creates an association between the Event Hubs namespace and the virtual network subnet. All workloads in the subnet can access the Event Hubs namespace while the rule exists.

> **Note:**
> Event Hubs doesn't establish outbound connections to your subnet. The rule only grants inbound access from the subnet to Event Hubs.

## Use Azure portal

When creating a namespace, you can choose between:  

- **Public access**: Allows access from all networks.  
- **Private access**: Restricts access to private endpoints only.  

After creating the namespace, you can further refine access by specifying IP addresses or virtual networks or network security perimeters.

### Configure public access when creating a namespace

To enable public access, select **Public access** on the **Networking** page of the namespace creation wizard. 

Screenshot showing the Networking page of the Create namespace wizard with Public access option selected.

After you create the namespace, select **Networking** in the left menu of the **Event Hubs Namespace** page. 

By default, **Public network access** is enabled for the namespace for **all networks**.

Screenshot showing the Networking page of the Event Hubs namespace with Public network access enabled.

This option enables public access from all networks by using an **access key**. The namespace accepts connections from any IP address (using the access key). 

The next section provides you details on configuring virtual network service endpoints to specify the virtual networks from which the access is allowed. 

### Configure selected networks for an existing namespace

This section shows you how to use Azure portal to add a virtual network service endpoint. To limit access, integrate the virtual network service endpoint for this Event Hubs namespace.

1. Go to your **Event Hubs namespace** in the [Azure portal](https://portal.azure.com).
1. Select **Networking** under **Settings** in the left menu. 
1. On the **Networking** page, select **Manage** under **Public network access**.

    Screenshot showing the Public access page with Manage button highlighted.
1. On the **Public network access** page, in the **Default action** section, select **Enable from selected networks** to allow access from only specified IP addresses.

    Screenshot showing the Public network access page with Enable from selected networks option selected.

    > **Important:**
    > If you choose **Selected networks**, add at least one IP firewall rule or a virtual network that has access to the namespace. Choose **Disabled** if you want to restrict all traffic to this namespace over [private endpoints](private-link-service.md) only.
1. In the **Virtual networks** section of the page, select **+Add a virtual network** -> **Add existing virtual network***. Select **Add new virtual network** if you want to create a new virtual network. 

    Selection of Add existing virtual network menu item.

    > **Important:**
    > If you choose **Selected networks**, add at least one IP firewall rule or a virtual network that can access your namespace. Choose **Disabled** if you want to restrict all traffic to this namespace over [private endpoints](private-link-service.md) only.
1. Select the **virtual network** from the list of virtual networks, select the **subnet**, and then select **Enable**. You must enable the service endpoint before adding the virtual network to the list. If the service endpoint isn't enabled, the portal prompts you to enable it.
   
    Image showing the selection of a subnet.
1. You see a success message after enabling the service endpoint for the subnet for **Microsoft.EventHub**. Select **Add** at the bottom of the page to add the network. 

    Image showing the selection of a subnet and enabling an endpoint.

    > **Note:**
    > If you're unable to enable the service endpoint, you can ignore the missing virtual network service endpoint by using the Resource Manager template. This functionality isn't available on the portal.
1. In the **Exception** section, specify whether you want to **allow trusted Microsoft services to access this resource**. See [Trusted Microsoft services](#trusted-microsoft-services) for details.
1. Select **Save** on the toolbar to save the settings. Wait a few minutes for the confirmation to appear in the portal notifications.

    Image showing the saving of virtual network.

    > **Note:**
    > To restrict access to specific IP addresses or ranges, see [Allow access from specific IP addresses or ranges](event-hubs-ip-filtering.md).

    > **Note:**
    > To delete a Virtual Network rule, first remove any Azure Resource Manager delete lock on the Virtual Network.


## Trusted Microsoft services

When you enable the **Allow trusted Microsoft services to bypass this firewall** setting, the following services within the same tenant are granted access to your Event Hubs resources.

| Trusted service | Supported usage scenarios |
| --- | --- |
| Azure Event Grid | Allows Azure Event Grid to send events to event hubs in your Event Hubs namespace. You also need to do the following steps: <ul><li>Enable system-assigned identity for a topic or a domain</li><li>Add the identity to the Azure Event Hubs Data Sender role on the Event Hubs namespace</li><li>Then, configure the event subscription that uses an event hub as an endpoint to use the system-assigned identity.</li></ul> <p>For more information, see [Event delivery with a managed identity](../event-grid/managed-service-identity.md)</p> |
| Azure Stream Analytics | Allows an Azure Stream Analytics job to read data from ([input](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/stream-analytics-add-inputs.md)) or write data to ([output](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/event-hubs-output.md)) event hubs in your Event Hubs namespace. <p>**Important**: The Stream Analytics job should be configured to use a **managed identity** to access the event hub. For more information, see [Use managed identities to access the event hub from an Azure Stream Analytics job (Preview)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/event-hubs-managed-identity.md). </p> |
| Azure IoT Hub | Allows IoT Hub to send messages to event hubs in your Event Hubs namespace. You also need to do the following steps: <ul><li>Enable system-assigned identity for your IoT hub</li><li>Add the identity to the Azure Event Hubs Data Sender role on the Event Hubs namespace.</li><li>Then, configure the IoT Hub that uses an event hub as a custom endpoint to use the identity-based authentication.</li></ul> |
| Azure API Management | <p>The API Management service allows you to send events to an event hub in your Event Hubs namespace.</p> <ul><li>You can trigger custom workflows by sending events to your event hub when an API is invoked by using the [send-request policy](../api-management/api-management-sample-send-request.md).</li><li>You can also treat an event hub as your backend in an API. For a sample policy, see [Authenticate using a managed identity to access an event hub](https://github.com/Azure/api-management-policy-snippets/blob/master/examples/Authenticate%20using%20Managed%20Identity%20to%20access%20Event%20Hub.xml). You also need to do the following steps:<ol><li>Enable system-assigned identity on the API Management instance. For instructions, see [Use managed identities in Azure API Management](../api-management/api-management-howto-use-managed-service-identity.md).</li><li>Add the identity to the **Azure Event Hubs Data Sender** role on the Event Hubs namespace</li></ol></li></ul> |
| Azure Monitor (Diagnostic Settings and Action Groups) | Allows Azure Monitor to send diagnostic information and alert notifications to event hubs in your Event Hubs namespace. Azure Monitor can read from the event hub and also write data to the event hub. |
| Azure Synapse | Allows Azure Synapse to connect to the event hub using the Synapse Workspace Managed Identity. Add the Azure Event Hubs Data Sender, Receiver or Owner role to the identity on the Event Hubs namespace. |
| Azure Data Explorer | Allows Azure Data Explorer to receive events from the event hub using the Managed Identity of the cluster. You need to do the following steps: <ul><li>[Configure](https://learn.microsoft.com/azure/data-explorer/configure-managed-identities-cluster) the Managed Identity on Azure Data Explorer</li><li>Grant the **Azure Event Hubs Data Receiver** role to the identity, on the event hub.</li></ul>  |
| Azure IoT Central | <p>Allows IoT Central to export data to event hubs in your Event Hubs namespace. You also need to do the following steps:</p><ul><li>Enable system-assigned identity for your IoT Central application.</li><li>Add the identity to the **Azure Event Hubs Data Sender** role on the Event Hubs namespace.</li><li>Then, configure the Event Hubs [export destination on your IoT Central application](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-export-to-event-hubs.md) to use identity-based authentication.</li></ul> |
| Azure Health Data Services | Allows Healthcare APIs IoT connector to ingest medical device data from your Event Hubs namespace and persist data in your configured [Fast Healthcare Interoperability Resources (FHIR®) service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/fhir/overview.md). The IoT connector should be configured to use a managed identity to access the event hub. For more information, see [Get started with the IoT connector - Azure Healthcare APIs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/iot/get-started.md). |
| Azure Digital Twins | Allows Azure Digital Twins to egress data to event hubs in your Event Hubs namespace. You also need to do the following steps: <p><ul><li>Enable system-assigned identity for your Azure Digital Twins instance.</li><li>Add the identity to the **Azure Event Hubs Data Sender** role on the Event Hubs namespace.</li><li>Then, configure an Azure Digital Twins endpoint or Azure Digital Twins data history connection that uses the system-assigned identity to authenticate. For more information about configuring endpoints and event routes to Event Hubs resources from Azure Digital Twins, see [Route Azure Digital Twins events](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/concepts-route-events.md) and [Create endpoints in Azure Digital Twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-create-endpoints.md). </li></ul> |

The other trusted services for Azure Event Hubs can be found below: 
- Azure Arc
- Azure Kubernetes 
- Azure Machine Learning
- Microsoft Purview


## Use Resource Manager template
This sample Resource Manager template adds a virtual network rule to an existing Event Hubs namespace. It specifies the ID of a subnet in a virtual network for the network rule. 

The ID is a fully qualified Resource Manager path for the virtual network subnet. For example: `/subscriptions/{id}/resourceGroups/{rg}/providers/Microsoft.Network/virtualNetworks/{vnet}/subnets/default`.

When adding virtual network or firewall rules, set the value of `defaultAction` to `Deny`.


```json
{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
      "eventhubNamespaceName": {
        "type": "string",
        "metadata": {
          "description": "Name of the Event Hubs namespace"
        }
      },
      "virtualNetworkName": {
        "type": "string",
        "metadata": {
          "description": "Name of the Virtual Network Rule"
        }
      },
      "subnetName": {
        "type": "string",
        "metadata": {
          "description": "Name of the Virtual Network Sub Net"
        }
      },
      "location": {
        "type": "string",
        "metadata": {
          "description": "Location for Namespace"
        }
      }
    },
    "variables": {
      "namespaceNetworkRuleSetName": "[concat(parameters('eventhubNamespaceName'), concat('/', 'default'))]",
      "subNetId": "[resourceId('Microsoft.Network/virtualNetworks/subnets/', parameters('virtualNetworkName'), parameters('subnetName'))]"
    },
    "resources": [
      {
        "apiVersion": "2018-01-01-preview",
        "name": "[parameters('eventhubNamespaceName')]",
        "type": "Microsoft.EventHub/namespaces",
        "location": "[parameters('location')]",
        "sku": {
          "name": "Standard",
          "tier": "Standard"
        },
        "properties": { }
      },
      {
        "apiVersion": "2017-09-01",
        "name": "[parameters('virtualNetworkName')]",
        "location": "[parameters('location')]",
        "type": "Microsoft.Network/virtualNetworks",
        "properties": {
          "addressSpace": {
            "addressPrefixes": [
              "10.0.0.0/23"
            ]
          },
          "subnets": [
            {
              "name": "[parameters('subnetName')]",
              "properties": {
                "addressPrefix": "10.0.0.0/23",
                "serviceEndpoints": [
                  {
                    "service": "Microsoft.EventHub"
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "apiVersion": "2018-01-01-preview",
        "name": "[variables('namespaceNetworkRuleSetName')]",
        "type": "Microsoft.EventHub/namespaces/networkruleset",
        "dependsOn": [
          "[concat('Microsoft.EventHub/namespaces/', parameters('eventhubNamespaceName'))]"
        ],
        "properties": {
          "publicNetworkAccess": "Enabled",
          "defaultAction": "Deny",
          "virtualNetworkRules": 
          [
            {
              "subnet": {
                "id": "[variables('subNetId')]"
              },
              "ignoreMissingVnetServiceEndpoint": false
            }
          ],
          "ipRules":[],
          "trustedServiceAccessEnabled": false
        }
      }
    ],
    "outputs": { }
  }
```

To deploy the template, follow the instructions for [Azure Resource Manager][lnk-deploy].

> **Important:**
> If you don't specify any IP or virtual network rules, all traffic flows into the namespace even if you set the `defaultAction` to `Deny`. The namespace is accessible over the public internet (using the access key). To allow traffic only from the specified IP addresses or subnet of a virtual network, specify at least one IP rule or virtual network rule for the namespace.  

## Use Azure CLI

Use the [`az eventhubs namespace network-rule-set`](https://learn.microsoft.com/cli/azure/eventhubs/namespace/network-rule-set) commands to manage virtual network rules for an Event Hubs namespace:

- `add` - Add a virtual network rule
- `list` - List all network rules
- `update` - Update network rules
- `remove` - Remove a virtual network rule

## Use Azure PowerShell

Use the following Azure PowerShell commands to manage virtual network rules for an Event Hubs namespace:

| Command | Description |
| --- | --- |
| [`Add-AzEventHubVirtualNetworkRule`](https://learn.microsoft.com/powershell/module/az.eventhub/add-azeventhubvirtualnetworkrule) | Add a virtual network rule |
| [`New-AzEventHubVirtualNetworkRuleConfig`](https://learn.microsoft.com/powershell/module/az.eventhub/new-azeventhubipruleconfig) | Create a virtual network rule configuration (use with `Set-AzEventHubNetworkRuleSet`) |
| [`Set-AzEventHubNetworkRuleSet`](https://learn.microsoft.com/powershell/module/az.eventhub/set-azeventhubnetworkruleset) | Apply network rule configuration to a namespace |
| [`Remove-AzEventHubVirtualNetworkRule`](https://learn.microsoft.com/powershell/module/az.eventhub/remove-azeventhubvirtualnetworkrule) | Remove a virtual network rule |


## Default action and public network access 

### REST API

The behavior of the `defaultAction` property varies by API version:

| API version | Default value | Behavior |
| --- | --- | --- |
| **2021-01-01-preview and earlier** | `Deny` | The deny rule isn't enforced unless you configure IP filters or virtual network rules. Without rules, traffic is allowed. |
| **2021-06-01-preview and later** | `Allow` | The service enforces the configured action. Set to `Deny` to block traffic not matching your rules. |

API version **2021-06-01-preview** also introduces the `publicNetworkAccess` property:

- `Enabled` - Allow operations over the public internet
- `Disabled` - Restrict operations to private links only

The service remembers your rules when you disable and re-enable them.

For more information, see [Create or Update Network Rule Set](https://learn.microsoft.com/rest/api/eventhub/namespaces/create-or-update-network-rule-set) and [Create or Update Private Endpoint Connections](https://learn.microsoft.com/rest/api/eventhub/private-endpoint-connections/create-or-update).

> **Note:**
> Network settings don't bypass authentication. The service always validates SAS or Microsoft Entra authentication claims after checking the network rules configured by `defaultAction`, `publicNetworkAccess`, and `privateEndpointConnections`.

### Azure portal

The Azure portal always uses the latest API version to get and set properties. If you previously configured your namespace by using **2021-01-01-preview and earlier** versions with `defaultAction` set to `Deny`, and you specified zero IP filters and virtual network rules, the portal previously checked **Selected Networks** on the **Networking** page of your namespace. Now, it checks the **All networks** option. 

Screenshot of the Public access page with the All networks option selected.


## Related content

- [Azure virtual network service endpoints][vnet-sep]  
- [Allow access from specific IP addresses or ranges][ip-filtering]  
- [Use private endpoints for Azure Event Hubs](private-link-service.md)

[vnet-sep]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-network-service-endpoints-overview.md
[lnk-deploy]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md
[ip-filtering]: event-hubs-ip-filtering.md
