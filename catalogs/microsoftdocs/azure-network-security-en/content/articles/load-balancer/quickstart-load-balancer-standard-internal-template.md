---
title: 'Quickstart: Create an internal load balancer - ARM template'
description: This quickstart creates an internal Azure load balancer using an Azure Resource Manager template (ARM template).
services: load-balancer
author: mbender-ms
ms.service: azure-load-balancer
ms.topic: quickstart
ms.author: mbender
ms.date: 01/28/2026
ms.custom:
  - subject-armqs
  - mode-arm
  - template-quickstart
  - engagement-fy23
  - devx-track-arm-template
  - build-2025
# Customer intent: "As a cloud administrator, I want to deploy an internal load balancer using an ARM template, so that I can efficiently manage traffic distribution to virtual machines within a virtual network."
---

# Quickstart: Create an internal load balancer to load balance VMs using an ARM template

In this quickstart, you learn to use an Azure Resource Manager template (ARM template) to create an internal Azure load balancer. The internal load balancer distributes traffic to virtual machines in a virtual network located in the load balancer's backend pool. Along with the internal load balancer, this template creates a virtual network, network interfaces, a NAT Gateway, and an Azure Bastion instance.

Diagram of resources deployed for a standard internal load balancer.

Using an ARM template takes fewer steps comparing to other deployment methods.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template opens in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the template

The template used in this quickstart is from the [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/internal-loadbalancer-create/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/internal-loadbalancer-create/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-template.md)

Multiple Azure resources have been defined in the template:

- [**Microsoft.Network/virtualNetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualNetworks): Virtual network for load balancer and virtual machines.
- [**Microsoft.Network/networkInterfaces**](https://learn.microsoft.com/azure/templates/microsoft.network/networkInterfaces): Network interfaces for virtual machines.
- [**Microsoft.Network/loadBalancers**](https://learn.microsoft.com/azure/templates/microsoft.network/loadBalancers): Internal load balancer.
- [**Microsoft.Network/natGateways**](https://learn.microsoft.com/azure/templates/microsoft.network/natGateways)
- [**Microsoft.Network/publicIPAddresses**](https://learn.microsoft.com/azure/templates/microsoft.network/publicipaddresses): Public IP addresses for the NAT Gateway and Azure Bastion.
- [**Microsoft.Compute/virtualMachines**](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachines): Virtual machines in the backend pool.
- [**Microsoft.Network/bastionHosts**](https://learn.microsoft.com/azure/templates/microsoft.network/bastionhosts): Azure Bastion instance.
- [**Microsoft.Network/virtualNetworks/subnets**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks/subnets): Subnets for the virtual network.
- [**Microsoft.Storage/storageAccounts**](https://learn.microsoft.com/azure/templates/microsoft.storage/storageaccounts): Storage account for the virtual machines.

To find more templates that are related to Azure Load Balancer, see [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Network&pageNumber=1&sort=Popular).

## Deploy the template

In this step, you deploy the template using Azure PowerShell with the [New-AzResourceGroupDeployment](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroupdeployment) command. 

1. Select **Try it** from the following code block to open Azure Cloud Shell, and then follow the instructions to sign in to Azure.

1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

   # [CLI](#tab/CLI)

   ```azurecli
    echo "Enter a project name with 12 or less letters or numbers that is used to generate Azure resource names"
    read projectName
    echo "Enter the location (i.e. centralus)"
    read location
    
    resourceGroupName="${projectName}rg"
    templateUri="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.network/internal-loadbalancer-create/azuredeploy.json"
    
    az group create --name $resourceGroupName --location $location
    az deployment group create --resource-group $resourceGroupName --template-uri $templateUri --name $projectName --parameters location=$location
    
    read -p "Press [ENTER] to continue."
    ```
   
   # [PowerShell](#tab/PowerShell)

   ```azurepowershell
   $projectName = Read-Host -Prompt "Enter a project name with 12 or less letters or numbers that is used to generate Azure resource names"
   $location = Read-Host -Prompt "Enter the location (i.e. centralus)"

   $resourceGroupName = "${projectName}rg"
   $templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.network/internal-loadbalancer-create/azuredeploy.json"

   New-AzResourceGroup -Name $resourceGroupName -Location $location
   New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -Name $projectName -location $location

   Write-Host "Press [ENTER] to continue."
    ```
    ---

    You're prompted to enter the following values:

    - **projectName**: used for generating resource names.
    - **adminUsername**: virtual machine administrator username.
    - **adminPassword**: virtual machine administrator password.

It takes about 10 minutes to deploy the template. 

Azure PowerShell or Azure CLI is used to deploy the template. You can also use the Azure portal and REST API. To learn other deployment methods, see [Deploy templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-portal.md).

## Review deployed resources

Use Azure CLI or Azure PowerShell to list the deployed resources in the resource group with the following commands:

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group $resourceGroupName
```
# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName $resourceGroupName
```

---

## Clean up resources

When no longer needed, use Azure CLI or Azure PowerShell to delete the resource group and its resources with the following commands:

# [CLI](#tab/CLI)

```azurecli-interactive
Remove-AzResourceGroup -Name "${projectName}rg"
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name CreateIntLBQS-rg
```
---

## Next steps

For a step-by-step tutorial that guides you through the process of creating a template, see:

> 
> [Tutorial: Create and deploy your first ARM template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/template-tutorial-create-first-template.md)
