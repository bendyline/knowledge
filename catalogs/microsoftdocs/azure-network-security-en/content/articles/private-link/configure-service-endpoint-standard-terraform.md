---
title: 'Quickstart: Configure a standard service endpoint - Terraform'
titleSuffix: Azure Private Link
description: In this quickstart, you learn how to configure a standard service endpoint with a network identifier and a network security perimeter by using Terraform.
ms.topic: quickstart
ms.date: 08/04/2026
ms.custom: devx-track-terraform
ms.service: azure-private-link
author: asudbring
ms.author: allensu
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
# Customer intent: As a network administrator, I want to configure a standard service endpoint with a network identifier and a network security perimeter by using Terraform, so that I can securely connect my IaaS workloads to Azure Storage at scale.
---

# Quickstart: Configure a standard service endpoint by using Terraform

In this quickstart, use Terraform to configure a [standard service endpoint](service-endpoint-standard-overview.md) for Azure Storage.

A standard service endpoint securely connects IaaS workloads to PaaS resources by using a *network identifier* and a [network security perimeter](network-security-perimeter-concepts.md). The network identifier is a public IP address that you associate with the service endpoint on a subnet. Services inside the perimeter use that address to recognize service endpoint traffic, and an IP-based inbound access rule authorizes it. Because you can assign the same public IP address to every subnet in a region and subscription, this approach removes the scale limits of [basic service endpoints](../virtual-network/virtual-network-service-endpoints-overview.md).

> **Important:**
> Standard service endpoint is currently in preview. This preview is provided without a service level agreement, and it's not recommended for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/abstract.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

In this article, you learn how to:

> 
> * Create a public IP prefix and public IP address to use as a network identifier.
> * Create a subnet with a service endpoint that's associated with the network identifier.
> * Create a storage account and file share as the PaaS resource.
> * Create a network security perimeter and associate the storage account with it.
> * Create an inbound access rule that authorizes the network identifier.

## Prerequisites

- You need an Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- [Install and configure Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure).

- **Network Contributor** role or higher on the subscription. Specifically, you need the `Microsoft.Network/publicIPAddresses/joinServiceEndpointNetworkIdentifier/action` permission. For more information, see [network security perimeter role-based access control requirements](network-security-perimeter-role-based-access-control-requirements.md).

- Standard service endpoint is currently behind a feature flag. Before you deploy, register the **AllowServiceEndpointNetworkIdentifier** feature in your subscription:

    ```azurecli
    az feature register \
        --namespace Microsoft.Network \
        --name AllowServiceEndpointNetworkIdentifier
    ```

    Verify the registration status:

    ```azurecli
    az feature show \
        --namespace Microsoft.Network \
        --name AllowServiceEndpointNetworkIdentifier \
        --query "properties.state" \
        --output tsv
    ```

    Wait for the state to show **Registered**, then refresh the resource provider registration:

    ```azurecli
    az provider register --namespace Microsoft.Network
    ```

## Implement the Terraform code

> **Note:**
> You can find the sample code for this article in the [Azure Terraform GitHub repo](https://github.com/Azure/terraform/tree/master/quickstart/101-standard-service-endpoint-storage).
> 
> See more [articles and sample code showing how to use Terraform to manage Azure resources](https://learn.microsoft.com/azure/terraform).

1. Create a directory to test and run the sample Terraform code. Make it the current directory.

1. Create a file named `providers.tf` and add the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-standard-service-endpoint-storage/providers.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

1. Create a file named `main.tf` and add the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-standard-service-endpoint-storage/main.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

1. Create a file named `ssh.tf` and add the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-standard-service-endpoint-storage/ssh.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

1. Create a file named `variables.tf` and add the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-standard-service-endpoint-storage/variables.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

1. Create a file named `outputs.tf` and add the following code:

    [Code reference unavailable in this source snapshot: ~/terraform_samples/quickstart/101-standard-service-endpoint-storage/outputs.tf](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

> **Note:**
> Create the subnet by using the `azapi` provider because the `azurerm` provider doesn't expose the service endpoint `networkIdentifier` property. The property is available in the `Microsoft.Network/virtualNetworks/subnets@2025-07-01` API version.
>
> The public IP address that you use as the network identifier must be Standard SKU, static allocation, and IPv4. It must exist before you associate it with the service endpoint.

## Initialize Terraform

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-init.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

## Create a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

## Apply a Terraform execution plan

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-apply-plan.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

## Verify the results

#### [Azure CLI](#tab/azure-cli)

1. Get the Azure resource group name.

    ```console
    resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the virtual network and subnet names.

    ```console
    virtual_network_name=$(terraform output -raw virtual_network_name)
    subnet_name=$(terraform output -raw subnet_name)
    ```

1. Run [az network vnet subnet show](https://learn.microsoft.com/cli/azure/network/vnet/subnet#az-network-vnet-subnet-show) to confirm that the service endpoint is associated with the network identifier. The `networkIdentifier` property in the output is the public IP address resource, and `provisioningState` is `Succeeded`.

    ```azurecli
    az network vnet subnet show \
        --resource-group $resource_group_name \
        --vnet-name $virtual_network_name \
        --name $subnet_name \
        --query serviceEndpoints \
        --output json
    ```

1. Install the network security perimeter extension for the Azure CLI.

    ```azurecli
    az extension add --name nsp
    ```

1. Run [az network perimeter association list](https://learn.microsoft.com/cli/azure/network/perimeter/association#az-network-perimeter-association-list) to confirm that the storage account is associated with the network security perimeter.

    ```azurecli
    az network perimeter association list \
        --perimeter-name nsp-1 \
        --resource-group $resource_group_name \
        --output json
    ```

1. Run [az network perimeter profile access-rule list](https://learn.microsoft.com/cli/azure/network/perimeter/profile/access-rule#az-network-perimeter-profile-access-rule-list) to confirm that the inbound access rule authorizes the network identifier prefix.

    ```azurecli
    az network perimeter profile access-rule list \
        --perimeter-name nsp-1 \
        --resource-group $resource_group_name \
        --profile-name profile-1 \
        --output json
    ```

1. Compare the returned address prefix with the network identifier prefix from the Terraform output.

    ```console
    terraform output -raw network_identifier_prefix
    ```

#### [Azure PowerShell](#tab/azure-powershell)

1. Get the Azure resource group name.

    ```console
    $resource_group_name=$(terraform output -raw resource_group_name)
    ```

1. Get the virtual network and subnet names.

    ```console
    $virtual_network_name=$(terraform output -raw virtual_network_name)
    $subnet_name=$(terraform output -raw subnet_name)
    ```

1. Run [Get-AzVirtualNetwork](https://learn.microsoft.com/powershell/module/az.network/get-azvirtualnetwork) to confirm that the service endpoint is associated with the network identifier.

    ```azurepowershell
    $vnet = Get-AzVirtualNetwork -ResourceGroupName $resource_group_name -Name $virtual_network_name
    $subnet = $vnet.Subnets | Where-Object { $_.Name -eq $subnet_name }
    $subnet.ServiceEndpoints
    ```

1. Run [Get-AzNetworkSecurityPerimeterAssociation](https://learn.microsoft.com/powershell/module/az.network/get-aznetworksecurityperimeterassociation) to confirm that the storage account is associated with the network security perimeter.

    ```azurepowershell
    $association = @{
        ResourceGroupName             = $resource_group_name
        SecurityPerimeterName         = 'nsp-1'
    }
    Get-AzNetworkSecurityPerimeterAssociation @association
    ```

1. Run [Get-AzNetworkSecurityPerimeterAccessRule](https://learn.microsoft.com/powershell/module/az.network/get-aznetworksecurityperimeteraccessrule) to confirm that the inbound access rule authorizes the network identifier prefix.

    ```azurepowershell
    $rule = @{
        ResourceGroupName             = $resource_group_name
        SecurityPerimeterName         = 'nsp-1'
        ProfileName                   = 'profile-1'
    }
    Get-AzNetworkSecurityPerimeterAccessRule @rule
    ```

---

> **Note:**
> The network security perimeter association is created in **Learning** mode, which logs traffic without blocking it. Learning mode is the recommended starting point when you evaluate access rules. To apply the rules, set the `nsp_access_mode` variable to `Enforced`. For more information, see [Diagnostic logging for network security perimeter](network-security-perimeter-diagnostic-logs.md).

## Clean up resources

[Include unavailable in this source snapshot: ~/azure-dev-docs-pr/articles/terraform/includes/terraform-plan-destroy.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/configure-service-endpoint-standard-terraform.md)

## Troubleshoot Terraform on Azure

[Troubleshoot common problems when using Terraform on Azure.](https://learn.microsoft.com/azure/developer/terraform/troubleshoot)

## Next steps

- [Configure a standard service endpoint using the Azure CLI](configure-service-endpoint-standard-cli.md)
- [Configure a standard service endpoint using Azure PowerShell](configure-service-endpoint-standard-powershell.md)
- [What is a standard service endpoint?](service-endpoint-standard-overview.md)

>  
> [What is a network security perimeter?](network-security-perimeter-concepts.md)
