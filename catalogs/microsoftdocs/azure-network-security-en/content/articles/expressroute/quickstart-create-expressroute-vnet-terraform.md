---
title: 'Quickstart: Create an ExpressRoute circuit and virtual network gateway with Terraform'
description: In this quickstart, you create a resource group, a virtual network, a subnet for the gateway, an Azure ExpressRoute gateway, an ExpressRoute circuit, and an ExpressRoute circuit peering in Azure using Terraform.
ms.topic: quickstart
ms.date: 10/09/2025
ms.custom: devx-track-terraform
ms.service: azure-expressroute
author: duongau
ms.author: duau
content_well_notification: 
  - AI-contribution
# Customer intent: As a Terraform user, I want to configure an Azure ExpressRoute circuit and its associated resources so that I can establish a dedicated network connection for reliable performance and security.
---

# Quickstart: Create an ExpressRoute circuit and virtual network gateway with Terraform

In this quickstart, you use Terraform to create an Azure ExpressRoute circuit and its associated infrastructure. The Terraform template creates a complete ExpressRoute setup including a virtual network, ExpressRoute gateway, circuit configuration, and private peering. All resources are deployed with configurable parameters that allow you to customize the deployment for your specific requirements.

Diagram of an Azure ExpressRoute circuit deployment environment using Terraform.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

In this article, you learn how to:

> 
> * Create an Azure resource group with a unique name
> * Create a virtual network with a subnet for the gateway
> * Create an ExpressRoute gateway with configurable SKU
> * Create an ExpressRoute circuit with configurable service provider settings
> * Configure private peering for the ExpressRoute circuit
> * Output key resource identifiers and configuration details

## Prerequisites

- Create an Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-expressroute). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-expressroute/TestRecord.md).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform).

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `main.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-expressroute/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

1. Create a file named `outputs.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-expressroute/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

1. Create a file named `providers.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-expressroute/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

1. Create a file named `variables.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-expressroute/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

## Verify the results

### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name.

   ```bash
   resource_group_name=$(terraform output -raw resource_group_name)
   ```

1. Get the ExpressRoute circuit name.

   ```bash
   circuit_name=$(terraform output -raw expressroute_circuit_name)
   ```

1. Get the gateway name.

   ```bash
   gateway_name=$(terraform output -raw gateway_name)
   ```

1. Run [`az network express-route show`](https://learn.microsoft.com/cli/azure/network/express-route#az-network-express-route-show) to view the ExpressRoute circuit.

   ```azurecli
   az network express-route show --name $circuit_name --resource-group $resource_group_name
   ```

1. Run [`az network vnet-gateway show`](https://learn.microsoft.com/cli/azure/network/vnet-gateway#az-network-vnet-gateway-show) to view the Azure virtual network gateway.

   ```azurecli
   az network vnet-gateway show --name $gateway_name --resource-group $resource_group_name
   ```

### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

   ```powershell
   $resource_group_name=$(terraform output -raw resource_group_name)
   ```

1. Get the ExpressRoute circuit name.

   ```powershell
   $circuit_name=$(terraform output -raw expressroute_circuit_name)
   ```

1. Get the gateway name.

   ```powershell
   $gateway_name=$(terraform output -raw gateway_name)
   ```

1. Run [`Get-AzExpressRouteCircuit`](https://learn.microsoft.com/powershell/module/az.network/get-azexpressroutecircuit) to view the ExpressRoute circuit.

   ```azurepowershell
   Get-AzExpressRouteCircuit -Name $circuit_name -ResourceGroupName $resource_group_name
   ```

1. Run [`Get-AzVirtualNetworkGateway`](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetworkgateway#:~\:text=Example%202:%20Get%20a%20Virtual%20Network%20Gateway) to view the Azure virtual network gateway.

   ```azurepowershell
   Get-AzVirtualNetworkGateway -Name $gateway_name -ResourceGroupName $resource_group_name
   ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/quickstart-create-expressroute-vnet-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next steps

> 
[See more articles about Azure virtual network gateway.](https://learn.microsoft.com/search/?terms=Azure%20virtual%20network%20gateway%20and%20terraform)

To learn how to link a virtual network to a circuit, continue to the ExpressRoute tutorials.

> 
> [ExpressRoute tutorials](expressroute-howto-linkvnet-portal-resource-manager.md)
