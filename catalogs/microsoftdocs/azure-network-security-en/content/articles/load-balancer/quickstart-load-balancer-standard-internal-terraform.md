---
title: 'Quickstart: Create an internal load balancer - Terraform'
titleSuffix: Azure Load Balancer
description: This quickstart shows how to create an internal load balancer by using Terraform.
services: load-balancer
author: mbender-ms
manager: kumud
ms.service: azure-load-balancer
ms.topic: quickstart
ms.date: 01/28/2026
ms.author: mbender
ms.custom: devx-track-terraform
#Customer intent: I want to create an internal load balancer by using Terraform so that I can load balance internal traffic to VMs.
# Customer intent: As a cloud engineer, I want to create an internal load balancer with Terraform so that I can efficiently manage and distribute internal traffic to virtual machines.
---

# Quickstart: Create an internal load balancer to load balance internal traffic to VMs using Terraform

This quickstart shows you how to deploy a standard internal load balancer and two virtual machines using Terraform. Additional resources include Azure Bastion, NAT Gateway, a virtual network, and the required subnets.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

> 
> * Create an Azure resource group using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group)
> * Create an Azure Virtual Network using [azurerm_virtual_network](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_network)
> * Create an Azure subnet using [azurerm_subnet](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet)
> * Create an Azure public IP using [azurerm_public_ip](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/public_ip)
> * Create an Azure Load Balancer using [azurerm_lb](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/lb)
> * Create an Azure network interface using [azurerm_network_interface](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/network_interface)
> * Create an Azure network interface load balancer backend address pool association using [azurerm_network_interface_backend_address_pool_association](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/network_interface_backend_address_pool_association)
> * Create an Azure Linux Virtual Machine using [azurerm_linux_virtual_machine](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_virtual_machine)
> * Create an Azure Virtual Machine Extension using [azurerm_virtual_machine_extension](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension)
> * Create an Azure NAT Gateway using [azurerm_nat_gateway](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/nat_gateway)
> * Create an Azure Bastion using [azurerm_bastion_host](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/bastion_host)

## Prerequisites
- Create an Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-load-balancer-internal). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-azure-load-balancer-internal/TestRecord.md). See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `providers.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-load-balancer-internal/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

1. Create a file named `main.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-load-balancer-internal/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

1. Create a file named `variables.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-load-balancer-internal/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

1. Create a file named `outputs.tf` and insert the following code.
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-azure-load-balancer-internal/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

> **Important:**
> If you're using the 4.x azurerm provider, you must [explicitly specify the Azure subscription ID](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/4.0-upgrade-guide#specifying-subscription-id-is-now-mandatory) to authenticate to Azure before running the Terraform commands.
>
> One way to specify the Azure subscription ID without putting it in the `providers` block is to specify the subscription ID in an environment variable named `ARM_SUBSCRIPTION_ID`.
>
> For more information, see the [Azure provider reference documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs#argument-reference).

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

## Verify the results

1. Display the Azure resource group name.

    ```console
    terraform output -raw resource_group_name
    ```

1. Optionally, display the VM (virtual machine) password.

    ```console
    terraform output -raw vm_password
    ```

1. Display the frontend private IP address.

    ```console
    terraform output -raw private_ip_address
    ```

1. Log in to the VM that isn't associated with the backend pool of the load balancer using Bastion.

1. Run the curl command to access the custom web page of the Nginx web server using the frontend private IP address of the load balancer.

   ```
   curl http://<Frontend IP address>
   ```

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

> 
> [What is Azure Load Balancer?](load-balancer-overview.md)
