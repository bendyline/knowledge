---
title: 'Quickstart: Use Terraform to configure private DNS zones in Azure'
description: In this quickstart, you create a private DNS zone, network interfaces, Windows virtual machines, a private DNS A record, network security groups, and a network security rule in Azure.
ms.topic: quickstart
ms.date: 2/19/2025
ms.custom: devx-track-terraform
ms.service: azure-dns
author: asudbring
ms.author: allensu
#customer intent: As a Terraform user, I want to see how to create a private DNS zone and Windows virtual machines in Azure.
content_well_notification: 
  - AI-contribution
# Customer intent: As a Terraform user, I want to create private DNS zones and Windows virtual machines in Azure, so that I can efficiently manage resource configurations and networking within my cloud environment.
---

# Quickstart: Use Terraform to configure private DNS zones in Azure

In this quickstart, you use Terraform to create private DNS zones, network interfaces, Windows virtual machines, a private DNS A record, network security groups, and a network security rule in Azure.

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

> 
> * Create an Azure resource group with a unique name.
> * Establish a virtual network with a specified name and address.
> * Set up a subnet within the created virtual network.
> * Create a private DNS zone.
> * Generate random passwords for the virtual machines.
> * Create two network interfaces.
> * Create two Windows virtual machines, and attach the network interfaces.
> * Create a private DNS A record.
> * Create a network security group and a network security rule to allow ICMP traffic.
> * Output the names and admin credentials of the virtual machines.

## Prerequisites

- Create an Azure account with an active subscription. You can [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

## Implement the Terraform code

> **Note:**
> The sample code for this article is located in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-dns-private-zone). You can view the log file containing the [test results from current and previous versions of Terraform](https://github.com/Azure/terraform/tree/master/quickstart/101-dns-private-zone/TestRecord.md).
>
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform).

1. Create a directory in which to test and run the sample Terraform code, and make it the current directory.

1. Create a file named `main.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-dns-private-zone/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

1. Create a file named `outputs.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-dns-private-zone/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

1. Create a file named `providers.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-dns-private-zone/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

1. Create a file named `variables.tf`, and insert the following code:
    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-dns-private-zone/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

## Verify the results

### [Azure CLI](#tab/azure-cli)

1. Run `az network private-dns zone list` to view all DNS zones and find yours.

   ```azurecli
   az network private-dns zone list --output table
   ```

1. Run `az network private-dns zone show` to view the resource group associate with your DNS zone.

   ```azurecli
   az network private-dns zone show --name $dnsZoneName --resource-group $resourceGroupName
   ```

### [Azure PowerShell](#tab/azure-powershell)

1. Run `Get-AzPrivateDnsZone` to view all DNS zones and find yours.

    ```azurepowershell
    Get-AzPrivateDnsZone | Format-Table
    ```

2. Run `Get-AzPrivateDnsZone` to view the resource group associated with your DNS zone.

    ```azurepowershell
    Get-AzPrivateDnsZone -Name $dnsZoneName -ResourceGroupName $resourceGroupName
    ```

---

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-private-zone-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/troubleshoot).

## Next steps

> 
> [See more articles about Azure DNS zones](https://learn.microsoft.com/search/?terms=Azure%20dns%20zones%20and%20terraform).
