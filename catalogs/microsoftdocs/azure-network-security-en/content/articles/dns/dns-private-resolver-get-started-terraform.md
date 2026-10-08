---
title: 'Quickstart: Create an Azure DNS Private Resolver using Terraform'
description: In this quickstart, you learn how to use Terraform to create and manage an Azure DNS Private Resolver. 
ms.topic: quickstart
ms.date: 02/18/2025
ms.custom: devx-track-terraform
ms.service: azure-dns
author: asudbring
ms.author: allensu
#customer intent: As a Terraform user, I want to learn how to use Terraform to create and manage an Azure DNS Private Resolver.
content_well_notification: 
  - AI-contribution
# Customer intent: As a Terraform user, I want to create and manage an Azure DNS Private Resolver using Terraform, so that I can enable custom domain name resolution within my private Azure network efficiently.
---

# Quickstart: Create an Azure DNS Private Resolver using Terraform

This quickstart describes how to use Terraform to create an Azure DNS Private Resolver. Azure private DNS resolver is a service that provides custom domain name resolution for your private Azure network. It's used to resolve domain names in a virtual network without needing to add a custom DNS solution. The resources created include the Azure DNS Private Resolver, a virtual network, and a subnet. The DNS resolver is associated with the virtual network, and the subnet is configured with a delegation to the DNS Private Resolver service.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

The following figure summarizes the general setup used. Subnet address ranges used in templates are slightly different than those shown in the figure.

Conceptual figure displaying components of the private resolver.

> 
> * Create an Azure resource group with a unique name.
> * Establish an Azure virtual network within the created resource group.
> * Define a subnet within the virtual network, and delegate DNS Private Resolver service to it.
> * Set up DNS Private Resolver within the resource group, and associate it with the virtual network.
> * View DNS Private Resolver within the resource group.

## Prerequisites

- If you don't have an Azure account, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-dns-private-resolver). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-dns-private-resolver/TestRecord.md).
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform).

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `main.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-dns-private-resolver/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

1. Create a file named `outputs.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-dns-private-resolver/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

1. Create a file named `providers.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-dns-private-resolver/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

1. Create a file named `variables.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-dns-private-resolver/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

## Verify the results

### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Run `az dns-resolver list` to view the DNS private resolvers in the resource group.

   ```azurecli
   az dns-resolver list --resource-group $resource_group_name --output table
   ```

1. Run `az dns-resolver show` to view the details of the DNS private resolver.

    ```azurecli
    dns_resolver_name=$(az dns-resolver list --resource-group $resource_group_name --query "[0].name" --output tsv)
    az dns-resolver show --name $dns_resolver_name --resource-group $resource_group_name
    ```

### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Run `Get-AzDnsResolver` to view the DNS private resolvers in the resource group.

    ```azurepowershell
    Get-AzDnsResolver -ResourceGroupName $resource_group_name | Format-Table
    ```

1. Run `Get-AzDnsResolver` with the resolver name to view the details of the DNS private resolver.

    ```azurepowershell
    $dns_resolver_name = (Get-AzDnsResolver -ResourceGroupName $resource_group_name)[0].Name
    Get-AzDnsResolver -Name $dns_resolver_name -ResourceGroupName $resource_group_name
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-resolver-get-started-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next steps

> 
> [See more articles about Azure DNS Private Resolver](https://learn.microsoft.com/search/?terms=Azure%20private%20dns%20resolver%20and%20terraform).
