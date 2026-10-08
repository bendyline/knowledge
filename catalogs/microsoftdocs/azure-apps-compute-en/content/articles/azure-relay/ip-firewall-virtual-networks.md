---
title: Configure IP firewall for Azure Relay namespace
description: This article describes how to Use firewall rules to allow connections from specific IP addresses to Azure Relay namespaces. 
ms.topic: how-to
ms.date: 01/24/2026
ms.custom: sfi-image-nochange
# Customer intent: As an Azure Relay user, I want to know how to restrict access to an Azure Relay namespace to certain IP addresses or ranges. 
---

# Configure IP firewall for an Azure Relay namespace
By default, Relay namespaces are accessible from internet as long as the request comes with valid authentication and authorization. With IP firewall, you can restrict it further to only a set of IPv4 addresses or IPv4 address ranges in [CIDR (Classless Inter-Domain Routing)](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation.

This feature is helpful in scenarios in which Azure Relay should be only accessible from certain well-known sites. Firewall rules enable you to configure rules to accept traffic originating from specific IPv4 addresses. For example, if you use Relay with [Azure Express Route](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-faqs.md#supported-services), you can create a **firewall rule** to allow traffic from only your on-premises infrastructure IP addresses. 


## Enable IP firewall rules
The IP firewall rules are applied at the namespace level. Therefore, the rules apply to all connections from clients using any supported protocol. Any connection attempt from an IP address that doesn't match an allowed IP rule on the namespace is rejected as unauthorized. The response doesn't mention the IP rule. IP filter rules are applied in order, and the first rule that matches the IP address determines the accept or reject action.

### Use Azure portal
This section shows you how to use the Azure portal to create IP firewall rules for a namespace. 

1. Navigate to your **Relay namespace** in the [Azure portal](https://portal.azure.com).
2. On the left menu, select **Networking**.
1. To restrict access to specific networks and IP addresses, select the **Selected networks** option. In the **Firewall** section, follow these steps:
    1. Select **Add your client IP address** option to give your current client IP the access to the namespace. 
    2. For **address range**, enter a specific IPv4 address or a range of IPv4 address in CIDR notation. 
    3. If you want to allow Microsoft services trusted by the Azure Relay service to bypass this firewall, select **Yes** for **Allow [trusted Microsoft services](#trusted-microsoft-services) to bypass this firewall?**. 
  
        Screenshot showing the Public access tab of the Networking page with the Firewall enabled.
1. Select **Save** on the toolbar to save the settings. Wait for a few minutes for the confirmation to show up on the portal notifications.


### Use Resource Manager template
The following Resource Manager template enables adding an IP filter rule to an existing Relay namespace.

The template takes one parameter: **ipMask**, which is a single IPv4 address or a block of IP addresses in CIDR notation. For example, in CIDR notation 70.37.104.0/24 represents the 256 IPv4 addresses from 70.37.104.0 to 70.37.104.255, with 24 indicating the number of significant prefix bits for the range.

> **Note:**
> While there are no deny rules possible, the Azure Resource Manager template has the default action set to **"Allow"** which doesn't restrict connections.
> When making Virtual Network or Firewalls rules, we must change the
> ***"defaultAction"***
> 
> from
> ```json
> "defaultAction": "Allow"
> ```
> to
> ```json
> "defaultAction": "Deny"
> ```
>

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "namespaces_name": {
            "defaultValue": "contosorelay0215",
            "type": "String"
        }
    },
    "variables": {},
    "resources": [
        {
            "type": "Microsoft.Relay/namespaces",
            "apiVersion": "2021-11-01",
            "name": "[parameters('namespaces_name')]",
            "location": "East US",
            "sku": {
                "name": "Standard",
                "tier": "Standard"
            },
            "properties": {}
        },
        {
            "type": "Microsoft.Relay/namespaces/authorizationrules",
            "apiVersion": "2021-11-01",
            "name": "[concat(parameters('namespaces_sprelayns0215_name'), '/RootManageSharedAccessKey')]",
            "location": "eastus",
            "dependsOn": [
                "[resourceId('Microsoft.Relay/namespaces', parameters('namespaces_sprelayns0215_name'))]"
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
            "type": "Microsoft.Relay/namespaces/networkRuleSets",
            "apiVersion": "2021-11-01",
            "name": "[concat(parameters('namespaces_sprelayns0215_name'), '/default')]",
            "location": "East US",
            "dependsOn": [
                "[resourceId('Microsoft.Relay/namespaces', parameters('namespaces_sprelayns0215_name'))]"
            ],
            "properties": {
                "publicNetworkAccess": "Enabled",
                "defaultAction": "Deny",
                "ipRules": [
                    {
                        "ipMask": "172.72.157.204",
                        "action": "Allow"
                    },
                    {
                        "ipMask": "10.1.1.1",
                        "action": "Allow"
                    },
                    {
                        "ipMask": "11.0.0.0/24",
                        "action": "Allow"
                    }
                ]
            }
        }
    ]
}
```

To deploy the template, follow the instructions for [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md).



## Trusted Microsoft services
When you enable the **Allow trusted Microsoft services to bypass this firewall** setting, the following services are granted access to your Azure Relay resources:

| Trusted service | Supported usage scenarios |
| --- | --- |
| Azure Machine Learning | AML Kubernetes uses Azure Relay to facilitate communication between AML services and the Kubernetes cluster. Azure Relay is a fully managed service that provides secure bi-directional communication between applications hosted on different networks. This feature makes it ideal for use in private link environments, where communication between Azure resources and on-premises resources is restricted. |
| Azure Arc | Azure Arc-enabled services associated with the resource providers can connect to the hybrid connections in your Azure Relay namespace as a sender without being blocked by the IP firewall rules set on the Azure Relay namespace. `Microsoft.Hybridconnectivity` service creates the hybrid connections in your Azure Relay namespace and provides the connection information to the relevant Arc service based on the scenario. These services communicate only with your Azure Relay namespace if you're using Azure Arc, with the following Azure Services: <br/><br> - Azure Kubernetes<br/> - Azure Machine Learning <br/> - Microsoft Purview |


The other trusted services for Azure Relay are:
- Azure Event Grid
- Azure IoT Hub
- Azure Stream Analytics
- Azure Monitor
- Azure API Management
- Azure Synapse
- Azure Data Explorer
- Azure IoT Central
- Azure Healthcare Data Services
- Azure Digital Twins

>**Note:**
> In the **2021-11-01** version or newer of the Microsoft Relay SDK, the **"trustedServiceAccessEnabled"** property is available in the **Microsoft.Relay/namespaces/networkRuleSets** properties to enable Trusted Service Access.
>
> To allow trusted services in Azure Resource Manager templates, include this property in your template:
> ```json
> "trustedServiceAccessEnabled": "True"
> ```

For example, based on the ARM template provided, you can modify it to include this Network Rule Set property for the enablement of Trusted Services:

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "namespaces_name": {
            "defaultValue": "contosorelay0215",
            "type": "String"
        }
    },
    "variables": {},
    "resources": [
        {
            "type": "Microsoft.Relay/namespaces",
            "apiVersion": "2021-11-01",
            "name": "[parameters('namespaces_name')]",
            "location": "East US",
            "sku": {
                "name": "Standard",
                "tier": "Standard"
            },
            "properties": {}
        },
        {
            "type": "Microsoft.Relay/namespaces/authorizationrules",
            "apiVersion": "2021-11-01",
            "name": "[concat(parameters('namespaces_sprelayns0215_name'), '/RootManageSharedAccessKey')]",
            "location": "eastus",
            "dependsOn": [
                "[resourceId('Microsoft.Relay/namespaces', parameters('namespaces_sprelayns0215_name'))]"
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
            "type": "Microsoft.Relay/namespaces/networkRuleSets",
            "apiVersion": "2021-11-01",
            "name": "[concat(parameters('namespaces_sprelayns0215_name'), '/default')]",
            "location": "East US",
            "dependsOn": [
                "[resourceId('Microsoft.Relay/namespaces', parameters('namespaces_sprelayns0215_name'))]"
            ],
            "properties": {
                "trustedServiceAccessEnabled": "True",
                "publicNetworkAccess": "Enabled",
                "defaultAction": "Deny",
                "ipRules": [
                    {
                        "ipMask": "172.72.157.204",
                        "action": "Allow"
                    },
                    {
                        "ipMask": "10.1.1.1",
                        "action": "Allow"
                    },
                    {
                        "ipMask": "11.0.0.0/24",
                        "action": "Allow"
                    }
                ]
            }
        }
    ]
}
```


## Related content
To learn about other network security-related features, see [Network security](network-security.md).


<!-- Links -->

[express-route]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-faqs.md#supported-services
