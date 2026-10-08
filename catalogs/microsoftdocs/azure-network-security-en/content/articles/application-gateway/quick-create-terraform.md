---
title: 'Quickstart: Direct web traffic with Azure Application Gateway - Terraform'
titleSuffix: Azure Application Gateway
description: In this quickstart, you learn how to use Terraform to create an Azure Application Gateway that directs web traffic to virtual machines in a backend pool.
services: application-gateway
author: mbender-ms
ms.author: mbender
ms.date: 05/30/2024
ms.topic: quickstart
ms.service: azure-application-gateway
ms.custom: devx-track-terraform
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
# Customer intent: As a cloud engineer, I want to set up an Azure Application Gateway using Terraform, so that I can efficiently direct web traffic to virtual machines and ensure proper connectivity within my cloud infrastructure.
---

# Quickstart: Direct web traffic with Azure Application Gateway - Terraform

In this quickstart, you use Terraform to create an Azure Application Gateway. Then you test the application gateway to make sure it works correctly. The Standard v2 SKU is used in this example.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

> 
> * Create an Azure resource group using [azurerm_resource_group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group)
> * Create an Azure Virtual Network using [azurerm_virtual_network](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_network)
> * Create an Azure subnet using [azurerm_subnet](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet)
> * Create an Azure public IP using [azurerm_public_ip](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/public_ip)
> * Create an Azure Application Gateway using [azurerm_application_gateway](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/application_gateway)
> * Create an Azure network interface using [azurerm_network_interface](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/network_interface)
> * Create an Azure network interface application gateway backend address pool association using [azurerm_network_interface_application_gateway_backend_address_pool_association](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/network_interface_application_gateway_backend_address_pool_association)
> * Create an Azure Windows Virtual Machine using [azurerm_windows_virtual_machine](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/windows_virtual_machine)
> * Create an Azure Virtual Machine Extension using [azurerm_virtual_machine_extension](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension)

Conceptual diagram of the quickstart setup.

> **Note:**
> Application Gateway frontend now supports dual-stack IP addresses (Preview). You can now create up to four frontend IP addresses: Two IPv4 addresses (public and private) and two IPv6 addresses (public and private).

## Prerequisites

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure)

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-application-gateway). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-application-gateway/TestRecord.md).
>
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform)

1. Create a directory in which to test the sample Terraform code and make it the current directory.

2. Create a file named `providers.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-application-gateway/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

3. Create a file named `main.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-application-gateway/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

> **Tip:**
> You can modify values of the `Name` and `Tier` parameters under `resource\applicationGateWay\main\sku` to use a different SKU. For example: `Basic`.

4. Create a file named `variables.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-application-gateway/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

5. Create a file named `outputs.tf` and insert the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-application-gateway/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

## Verify the results

1. When you apply the execution plan, Terraform displays the frontend public IP address. If you've cleared the screen, you can retrieve that value with the following Terraform command:

    ```console
    echo $(terraform output -raw gateway_frontend_ip)
    ```

1. Paste the public IP address into the address bar of your web browser. Refresh the browser to see the name of the virtual machine. A valid response verifies the application gateway is successfully created and can connect with the backend.

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/quick-create-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

> 
> [Learn more about using Application Gateway](https://learn.microsoft.com/azure/application-gateway/overview)
