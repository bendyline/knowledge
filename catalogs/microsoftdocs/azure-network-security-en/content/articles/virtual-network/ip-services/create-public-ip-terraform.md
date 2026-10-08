---
title: 'Quickstart: Create a public IP - Terraform'
titleSuffix: Azure Virtual Network
description: Learn how to create a public IP address using Terraform
services: virtual-network
author: mbender-ms
ms.author: mbender
ms.service: azure-virtual-network
ms.topic: quickstart
ms.date: 11/05/2025
ms.custom: mode-api, devx-track-terraform 
# Customer intent: As a cloud engineer, I want to create and configure public IP addresses using Terraform, so that I can facilitate public connections to Azure resources with the appropriate routing preferences and tiers for my applications.
---

# Quickstart: Create a public IP address using Terraform

In this quickstart, you learn how to create an Azure public IP address. Public IP addresses in Azure are used for public connections to Azure resources. Public IP addresses are available in two SKUs: basic, and standard. Two tiers of public IP addresses are available: regional, and global. The routing preference of a public IP address is set when created. Internet routing and Microsoft Network routing are the available choices.

Diagram of an example use of a public IP address. A public IP address is assigned to a load balancer.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-public-ip-terraform.md)

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-public-ip-terraform.md)

In this article, you learn how to:

> 
> * Create a random pet name for the Azure resource group name using [random_pet](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/pet)
> * Create an Azure resource group using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group)
> * Create a standard zone-redundant public IPv4 address named **myStandardPublicIP**
> * Create a standard v2 zone-redundant public IPv4 address named **myStandardv2PublicIP**
> * Create a standard zonal public IPv4 address in Zone 2 named **myZonalStandardPublicIP**
> * Create a standard static public IPv4 address named **myRoutingPreferenceStandardPublicIP** that supports the Routing Preference feature
> * Create a standard static public IPv4 address named **myGlobalTierStandardPublicIP** that supports the Global Tier feature

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-virtual-network-public-ip). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-virtual-network-public-ip/TestRecord.md).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform).

## Create a resource group

An Azure resource group is a logical container into which Azure resources are deployed and managed.

[Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-public-ip/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-public-ip-terraform.md)

## Create public IP

# [Zone-Redundant Standard SKU](#tab/create-public-ip-standard)

### Create a standard zone-redundant IP address

In this section, you learn how to create a standard zone-redundant public IP address.

>**Note:**
>Standard SKU public IP is recommended for production workloads. For more information about SKUs, see **[Public IP addresses](public-ip-addresses.md)**.
>
>The following command snippet works for API version **2020-08-01** or **later**. For more information about the API version currently being used, see [Resource Providers and Types](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/resource-providers-and-types.md).

[Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-public-ip/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-public-ip-terraform.md)

> **Important:**
> For versions of the API older than 2020-08-01, omit the `zone` field to create a zone-redundant IP address. 
>

# [Zone-Redundant Standardv2 SKU](#tab/create-public-ip-standardv2)

### Create a standard v2 zone-redundant IP address

>**Note:**
>Standard v2 SKU public IP is required for use of the Standard v2 NAT Gateway with zone-redundancy. For more information about SKUs, see **[Public IP addresses](public-ip-addresses.md)**.
>
>The following command snippet works for API version **2020-08-01** or **later**. For more information about the API version currently being used, see [Resource Providers and Types](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/resource-providers-and-types.md).

The following code snippet creates a standard v2 zone-redundant public IPv4 address named **myStandardv2PublicIP**.

To create an IPv6 address, set the `ip_version` value to **IPv6**.

```terraform
resource "azurerm_public_ip" "public_ip_standardv2" {
  name                = "myStandardv2PublicIP"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  allocation_method   = "Static"
  sku                 = "Standard_v2"
  zones               = ["1", "2", "3"]
}
```

> **Important:**
> For versions of the API older than 2020-08-01, omit the `zones` field to create a zone-redundant IP address.
>

# [Zonal Standard SKU](#tab/create-public-ip-zonal)

### Create a zonal public IP address

In this section, you learn how to create a zonal public IP address. Note this latter type of address is only valid in regions with no availability zones.

The following code snippet creates a standard zonal public IPv4 address in Zone 2 named **myZonalStandardPublicIP**.

To create an IPv6 address, set the `ip_version` value to **IPv6**.

[Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-public-ip/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-public-ip-terraform.md)

>**Note:**
>For more information about availability zones, see [What are availability zones?](https://learn.microsoft.com/azure/reliability/availability-zones-overview?toc=%2fazure%2fvirtual-network%2ftoc.json)

---

## Routing Preference and Tier

Standard SKU static public IPv4 addresses support Routing Preference or the Global Tier feature.

# [Routing Preference](#tab/routing-preference)

By default, the routing preference for public IP addresses is set to **Microsoft network**, which delivers traffic over Microsoft's global wide area network to the user. 

The selection of **Internet** minimizes travel on Microsoft's network, instead using the transit ISP network to deliver traffic at a cost-optimized rate. 

For more information on routing preference, see [What is routing preference (preview)?](routing-preference-overview.md)

The following code snippet creates a new standard zone-redundant public IPv4 address with a routing preference of type **Internet**:

[Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-public-ip/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-public-ip-terraform.md)

# [Tier](#tab/tier)

Public IP addresses are associated with a single region. The **Global** tier spans an IP address across multiple regions. **Global** tier is required for the frontends of cross-region load balancers. 

For more information, see [Cross-region load balancer](../../load-balancer/cross-region-overview.md).

The following code snippet creates a global IPv4 address. This address can be associated with the frontend of a cross-region load balancer.

[Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-virtual-network-public-ip/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-public-ip-terraform.md)

>**Note:**
>Global tier addresses don't support Availability Zones.

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-public-ip-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

> 
> [Create public IP prefix using the Azure CLI](create-public-ip-prefix-cli.md)
