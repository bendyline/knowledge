---
title: Configure IP Firewall Rules for Azure Event Hubs Namespaces
description: Learn how to configure IP firewall rules for Azure Event Hubs namespaces to restrict access to specific IP addresses and enhance your network security.
#customer intent: As a network administrator, I want to configure IP firewall rules for my Azure Event Hubs namespace so that I can restrict access to only specific IP addresses and improve security
ms.topic: how-to
ms.date: 01/30/2026
ms.custom:
  - devx-track-azurepowershell, devx-track-azurecli
  - ai-gen-docs-bap
  - ai-gen-title
  - ai-seo-date:07/25/2025
  - ai-gen-description
  - sfi-image-nochange
---

# Allow access to Azure Event Hubs namespaces from specific IP addresses or ranges

By default, users can access Event Hubs namespaces from the internet as long as the request comes with valid authentication and authorization. By using the IP firewall, you can restrict access to only a set of IPv4 and IPv6 addresses or address ranges in [CIDR (Classless Inter-Domain Routing)](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation.

This feature is helpful in scenarios where Azure Event Hubs should be accessible only from certain well-known sites. Firewall rules enable you to configure rules to accept traffic originating from specific IPv4 and IPv6 addresses. For example, if you use Event Hubs with [Azure Express Route][express-route], you can create a **firewall rule** to allow traffic from only your on-premises infrastructure IP addresses. 

## IP firewall rules

You specify IP firewall rules at the Event Hubs namespace level. The rules apply to all connections from clients using any supported protocol. The Event Hubs namespace rejects any connection attempt from an IP address that doesn't match an allowed IP rule as unauthorized. The response doesn't mention the IP rule. IP firewall rules are applied in order, and the first rule that matches the IP address determines the accept or reject action.


## Important points

- This feature isn't supported in the **basic** tier.
- When you turn on firewall rules for your Event Hubs namespace, the firewall blocks incoming requests by default, unless requests originate from a service operating from allowed public IP addresses. Blocked requests include the requests from other Azure services, from the Azure portal, from logging and metrics services, and so on. As an exception, you can allow access to Event Hubs resources from certain **trusted services** even when the IP filtering is enabled. For a list of trusted services, see [Trusted Microsoft services](#trusted-microsoft-services).
- Specify **at least one IP firewall rule or virtual network rule** for the namespace to allow traffic only from the specified IP addresses or subnet of a virtual network. If there are no IP and virtual network rules, users can access the namespace over the public internet (by using the access key).  


## Configure firewall rules using the Azure portal

When creating a namespace, you can either allow public only (from all networks) or private only (only via private endpoints) access to the namespace. Once you create the namespace, you can allow access from specific IP addresses or from specific virtual networks (by using network service endpoints). 

### Configure public access when creating a namespace

To enable public access, select **Public access** on the **Networking** page of the namespace creation wizard. 

Screenshot showing the Networking page of the Create namespace wizard with Public access option selected.

After you create the namespace, select **Networking** in the left menu of the **Event Hubs Namespace** page. 

By default, **Public network access** is enabled for the namespace for **all networks**.

Screenshot showing the Networking page of the Event Hubs namespace with Public network access enabled.

This option enables public access from all networks by using an **access key**. The namespace accepts connections from any IP address (using the access key). 

The next section provides you details on configuring IP firewall rules to specify the IP addresses from which the access is allowed. 

### Configure IP firewall for an existing namespace
This section shows you how to use the Azure portal to create IP firewall rules for an Event Hubs namespace. 

1. Navigate to your **Event Hubs namespace** in the [Azure portal](https://portal.azure.com).
1. Select **Networking** under **Settings** on the left menu. 
1. On the **Networking** page, select **Manage** under **Public network access**.

    Screenshot showing the Public access page with Manage button highlighted.
1. On the **Public network access** page, in the **Default action** section, select **Enable from selected networks** to allow access from only specified IP addresses.

    Screenshot showing the Public network access page with Enable from selected networks option selected.

    > **Important:**
    > If you choose **Selected networks**, add at least one IP firewall rule or a virtual network that has access to the namespace. Choose **Disabled** if you want to restrict all traffic to this namespace over [private endpoints](private-link-service.md) only.
1. In the **IP Addresses** section, select **Add your client IP address** option to give your current client IP the access to the namespace. 
1. For **address range**, enter specific IPv4 or IPv6 addresses or address ranges in CIDR notation.

    > **Important:**
    > We recommend that you add IPv6 addresses to the list of allowed IP addresses now so that your clients don't break when the service eventually switches to supporting only IPv6. 
1. In the **Exception** section, specify whether you want to **allow trusted Microsoft services to access this resource**. See [Trusted Microsoft services](#trusted-microsoft-services) for details. 

    Firewall section highlighted in the Public access tab of the Networking page.
1. Select **Save** on the toolbar to save the settings. Wait for a few minutes for the confirmation to show up on the portal notifications.

    > **Note:**
    > To restrict access to specific virtual networks, see [Allow access from specific networks](event-hubs-service-endpoints.md).


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



## Configure firewall rules by using Resource Manager templates

> **Important:**
> The Firewall feature isn't supported in the basic tier.

The following Resource Manager template enables adding an IP filter rule to an existing Event Hubs namespace.

The **ipMask** in the template is a single IPv4 address or a block of IP addresses in CIDR notation. For example, in CIDR notation 70.37.104.0/24 represents the 256 IPv4 addresses from 70.37.104.0 to 70.37.104.255, with 24 indicating the number of significant prefix bits for the range.

> **Note:**
> The default value of the `defaultAction` is `Allow`. When adding virtual network or firewalls rules, make sure you set the `defaultAction` to `Deny`.

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "namespace_name": {
            "defaultValue": "contosoehub1333",
            "type": "String"
        }
    },
    "variables": {},
    "resources": [
        {
            "type": "Microsoft.EventHub/namespaces",
            "apiVersion": "2022-01-01-preview",
            "name": "[parameters('namespace_name')]",
            "location": "East US",
            "sku": {
                "name": "Standard",
                "tier": "Standard",
                "capacity": 1
            },
            "properties": {
                "minimumTlsVersion": "1.2",
                "publicNetworkAccess": "Enabled",
                "disableLocalAuth": false,
                "zoneRedundant": true,
                "isAutoInflateEnabled": false,
                "maximumThroughputUnits": 0,
                "kafkaEnabled": true
            }
        },
        {
            "type": "Microsoft.EventHub/namespaces/authorizationrules",
            "apiVersion": "2022-01-01-preview",
            "name": "[concat(parameters('namespace_name'), '/RootManageSharedAccessKey')]",
            "location": "eastus",
            "dependsOn": [
                "[resourceId('Microsoft.EventHub/namespaces', parameters('namespace_name'))]"
            ],
            "properties": {
                "rights": [
                    "Listen",
                    "Manage",
                    "Send"
                ]
            }
        },
        {
            "type": "Microsoft.EventHub/namespaces/networkRuleSets",
            "apiVersion": "2022-01-01-preview",
            "name": "[concat(parameters('namespace_name'), '/default')]",
            "location": "East US",
            "dependsOn": [
                "[resourceId('Microsoft.EventHub/namespaces', parameters('namespace_name'))]"
            ],
            "properties": {
                "publicNetworkAccess": "Enabled",
                "defaultAction": "Deny",
                "virtualNetworkRules": [],
                "ipRules": [
                    {
                        "ipMask": "10.1.1.1",
                        "action": "Allow"
                    },
                    {
                        "ipMask": "11.0.0.0/24",
                        "action": "Allow"
                    },
                    {
                        "ipMask": "172.72.157.204",
                        "action": "Allow"
                    }
                ]
            }
        }
    ]
}
```

To deploy the template, follow the instructions for [Azure Resource Manager][lnk-deploy].

> **Important:**
> If you don't add any IP or virtual network rules, all traffic flows into the namespace even if you set the `defaultAction` to `deny`. Users can access the namespace over the public internet (by using the access key). To allow traffic only from the specified IP addresses or subnet of a virtual network, specify at least one IP rule or virtual network rule for the namespace.  

## Configure firewall rules by using Azure CLI
Use [`az eventhubs namespace network-rule-set`](https://learn.microsoft.com/cli/azure/eventhubs/namespace/network-rule-set) add, list, update, and remove commands to manage IP firewall rules for an Event Hubs namespace.

## Configure firewall rules by using Azure PowerShell
Use the [`Set-AzEventHubNetworkRuleSet`](https://learn.microsoft.com/powershell/module/az.eventhub/set-azeventhubnetworkruleset) cmdlet to add one or more IP firewall rules. An example from the article:

```azurepowershell-interactive
$ipRule1 = New-AzEventHubIPRuleConfig -IPMask 2.2.2.2 -Action Allow
$ipRule2 = New-AzEventHubIPRuleConfig -IPMask 3.3.3.3 -Action Allow
$virtualNetworkRule1 = New-AzEventHubVirtualNetworkRuleConfig -SubnetId '/subscriptions/subscriptionId/resourcegroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myVirtualNetwork/subnets/default'
$networkRuleSet = Get-AzEventHubNetworkRuleSet -ResourceGroupName myResourceGroup -NamespaceName myNamespace
$networkRuleSet.IPRule += $ipRule1
$networkRuleSet.IPRule += $ipRule2
$networkRuleSet.VirtualNetworkRule += $virtualNetworkRule1
Set-AzEventHubNetworkRuleSet -ResourceGroupName myResourceGroup -NamespaceName myNamespace -IPRule $ipRule1,$ipRule2 -VirtualNetworkRule $virtualNetworkRule1,$virtualNetworkRule2,$virtualNetworkRule3
```

## Default action and public network access 

### REST API

For API versions **2021-01-01-preview and earlier**, the default value of the `defaultAction` property is `Deny`. However, the service doesn't enforce the deny rule unless you set IP filters or virtual network rules. If you don't set any IP filters or virtual network rules, the service treats the default action as `Allow`. 

From API version **2021-06-01-preview onwards**, the default value of the `defaultAction` property is `Allow`, which accurately reflects the service-side enforcement. If you set the default action to `Deny`, the service enforces IP filters and virtual network rules. If you set the default action to `Allow`, the service doesn't enforce IP filters and virtual network rules. The service remembers the rules when you turn them off and then back on again. 

API version **2021-06-01-preview onwards** also introduces a new property named `publicNetworkAccess`. If you set this property to `Disabled`, operations are restricted to private links only. If you set it to `Enabled`, operations are allowed over the public internet. 

For more information about these properties, see [Create or Update Network Rule Set](https://learn.microsoft.com/rest/api/eventhub/namespaces/create-or-update-network-rule-set) and [Create or Update Private Endpoint Connections](https://learn.microsoft.com/rest/api/eventhub/private-endpoint-connections/create-or-update).

> **Note:**
> None of the preceding settings bypass validation of claims through SAS or Microsoft Entra authentication. The authentication check always runs after the service validates the network checks that the `defaultAction`, `publicNetworkAccess`, and `privateEndpointConnections` settings configure.

### Azure portal

Azure portal always uses the latest API version to get and set properties. If you configured your namespace by using **2021-01-01-preview and earlier** versions with the `defaultAction` set to `Deny`, and you specified zero IP filters and virtual network rules, the portal previously checked **Selected Networks** on the **Networking** page of your namespace. Now, it checks the **All networks** option. 

Screenshot that shows the Public access page with the All networks option selected.





## Next steps

To constrain access to Event Hubs to Azure virtual networks, see the following article:

- [Virtual Network Service Endpoints for Event Hubs][lnk-vnet]

<!-- Links -->

[express-route]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-faqs.md#supported-services

[lnk-deploy]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md

[lnk-vnet]: event-hubs-service-endpoints.md
