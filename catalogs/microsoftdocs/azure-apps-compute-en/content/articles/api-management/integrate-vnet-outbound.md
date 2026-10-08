---
title: Integrate API Management in private network
description: Learn how to integrate an Azure API Management instance in the Standard v2 or Premium v2 tier with a virtual network to access backend APIs in the network.
ms.service: azure-api-management
ms.topic: how-to 
ms.date: 12/04/2025
---

# Integrate an Azure API Management instance with a private virtual network for outbound connections 


**APPLIES TO: Standard v2 | Premium v2** 

This article guides you through the process of configuring *virtual network integration* for your Standard v2 or Premium v2 Azure API Management instance. With virtual network integration, your instance can make outbound requests to APIs that are isolated in a single connected virtual network or any peered virtual network, as long as network connectivity is properly configured.

When an API Management instance is integrated with a virtual network for outbound requests, the gateway and developer portal endpoints remain publicly accessible. The API Management instance can reach both public and network-isolated backend services.

Diagram of integrating API Management instance with a virtual network for outbound traffic.

If you want to inject a Premium v2 API Management instance into a virtual network to isolate both inbound and outbound traffic, see [Inject a Premium v2 instance into a virtual network](inject-vnet-v2.md).

> **Important:**
> * Outbound virtual network integration described in this article is available only for API Management instances in the Standard v2 and Premium v2 tiers. For networking options in the different tiers, see [Use a virtual network with Azure API Management](virtual-network-concepts.md).
> * You can enable virtual network integration when you create an API Management instance in the Standard v2 or Premium v2 tier, or after the instance is created.
> * Currently, you can't switch between virtual network injection and virtual network integration for a Premium v2 instance.



## Prerequisites

- An Azure API Management instance in the [Standard v2 or Premium v2](v2-service-tiers-overview.md) pricing tier
- (Optional) For testing, a sample backend API hosted within a different subnet in the virtual network. For example, see [Tutorial: Establish Azure Functions private site access](../azure-functions/functions-create-private-site-access.md).
- A virtual network with a subnet where your API Management backend APIs are hosted. See the following sections for requirements and recommendations for the virtual network and subnet.

### Network location

* The virtual network must be in the same region and Azure subscription as the API Management instance.

### Dedicated subnet

* The subnet used for virtual network integration can only be used by a single API Management instance. It can't be shared with another Azure resource.

### Subnet size 

* Minimum: /27 (32 addresses)
* Recommended: /24 (256 addresses) - to accommodate scaling of API Management instance

### Network security group



You must associate a network security group (NSG) with the subnet. To set up a network security group, see [Create a network security group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/manage-network-security-group.md). 

* Configure the rules in the following table to allow outbound access to Azure Key Vault, which is a dependency for API Management.
* Configure other outbound rules you need for the gateway to reach your API backends.
* Configure other NSG rules to meet your organization's network access requirements. For example, use NSG rules to block outbound traffic to the internet and allow access only to resources in your virtual network.

| Direction | Source | Source port ranges | Destination | Destination port ranges | Protocol | Action | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Outbound | VirtualNetwork | * | AzureKeyVault | 443 | TCP | Allow | Dependency on Azure Key Vault |


> **Important:**
> * Inbound NSG rules do not apply when a v2 tier instance is integrated in a virtual network for private outbound access. To enforce inbound NSG rules, use virtual network injection instead of integration.
> * This differs from networking in the classic Premium tier, where inbound NSG rules are enforced in both external and internal virtual network injection modes. [Learn more](virtual-network-injection-resources.md)

### Subnet delegation

The subnet needs to be delegated to the **Microsoft.Web/serverFarms** service.

Screenshot showing subnet delegation to Microsoft.Web/serverFarms in the portal.



> **Note:**
> The `Microsoft.Web` resource provider must be registered in the subscription so that you can delegate the subnet to the service. For steps to register a resource provider using the portal, see [Register resource provider](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types#register-resource-provider-1).

For more information about configuring subnet delegation, see [Add or remove a subnet delegation](https://learn.microsoft.com/azure/virtual-network/manage-subnet-delegation).

### Permissions

You must have at least the following role-based access control permissions on the subnet or at a higher level to configure virtual network integration:

| Action | Description |
| --- | --- |
| Microsoft.Network/virtualNetworks/read | Read the virtual network definition |
| Microsoft.Network/virtualNetworks/subnets/read | Read a virtual network subnet definition |
| Microsoft.Network/virtualNetworks/subnets/join/action | Joins a virtual network |


## Configure virtual network integration

This section guides you through the process to configure external virtual network integration for an existing Azure API Management instance. You can also configure virtual network integration when you create a new API Management instance.


1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. In the left menu, under **Deployment + Infrastructure**, select **Network** > **Edit**.
1. On the **Network configuration** page, under **Outbound features**, select **Enable** virtual network integration.
1. Select the virtual network and the delegated subnet that you want to integrate. 
1. Select **Save**. The virtual network is integrated.

## (Optional) Test virtual network integration

If you have an API hosted in the virtual network, you can import it to your Management instance and test the virtual network integration. For basic steps, see [Import and publish an API](import-and-publish.md).


## Related content

* [Use a virtual network with Azure API Management](virtual-network-concepts.md)
