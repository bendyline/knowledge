---
title: 'Quickstart: Create a profile and endpoint - Resource Manager template'
titleSuffix: Azure Content Delivery Network
description: In this quickstart, learn how to create an Azure Content Delivery Network profile and endpoint a Resource Manager template
services: cdn
author: halkazwini
ms.author: halkazwini
manager: KumudD
ms.service: azure-content-delivery-network
ms.topic: quickstart
ms.custom: subject-armqs, mode-arm, devx-track-arm-template
ms.date: 02/28/2026
ROBOTS: NOINDEX
# Customer intent: "As a cloud engineer, I want to deploy a Content Delivery Network profile and endpoint using an ARM template, so that I can efficiently manage content delivery for my applications."
---

# Quickstart: Create an Azure Content Delivery Network profile and endpoint - ARM template


> **Important:**
> Azure CDN Standard from Microsoft (classic) retires on **September 30, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](https://learn.microsoft.com/azure/cdn/migrate-tier). For more information, see ⁠[**Azure CDN Standard from Microsoft (classic) retirement**](https://azure.microsoft.com/updates?id=Azure-CDN-Standard-from-Microsoft-classic-will-be-retired-on-30-September-2027).

Get started with Azure Content Delivery Network by using an Azure Resource Manager template (ARM template). The template deploys a profile and an endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template opens in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-template.md)

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/cdn-with-custom-origin/).

This template is configured to create a:

- Profile
- Endpoint

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.cdn/cdn-with-custom-origin/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-template.md)

One Azure resource is defined in the template:

- **[Microsoft.Cdn/profiles](https://learn.microsoft.com/azure/templates/microsoft.cdn/profiles)**

## Deploy the template

<a name='azure-cli'></a>

### The Azure CLI

```azurecli-interactive
read -p "Enter the location (i.e. eastus): " location
resourceGroupName="myResourceGroupCDN"
templateUri="https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.cdn/cdn-with-custom-origin/azuredeploy.json"

az group create \
--name $resourceGroupName \
--location $location

az deployment group create \
--resource-group $resourceGroupName \
--template-uri  $templateUri
```

### PowerShell

```azurepowershell-interactive
$location = Read-Host -Prompt "Enter the location (i.e. eastus)"
$templateUri = "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.cdn/cdn-with-custom-origin/azuredeploy.json"

$resourceGroupName = "myResourceGroupCDN"

New-AzResourceGroup -Name $resourceGroupName -Location $location
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri
```

### Portal

Button to deploy the Resource Manager template to Azure.

## Review deployed resources

1. Sign in to the [Azure portal](https://portal.azure.com).

2. Select **Resource groups** from the left pane.

3. Select the resource group that you created in the previous section. The default resource group name is **myResourceGroupCDN**

4. Verify the following resources were created in the resource group:

    Screenshot of Azure Content Delivery Network resource group.

## Clean up resources

<a name='azure-cli'></a>

### The Azure CLI

When no longer needed, you can use the [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) command to remove the resource group and all resources contained within.

```azurecli-interactive
  az group delete \
    --name myResourceGroupCDN
```

### PowerShell

When no longer needed, you can use the [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) command to remove the resource group and all resources contained within.

```azurepowershell-interactive
Remove-AzResourceGroup -Name myResourceGroupCDN
```

### Portal

When no longer needed, delete the resource group, content delivery network profile, and all related resources. Select the resource group **myResourceGroupCDN** that contains the content delivery network profile and endpoint, and then select **Delete**.

## Next steps

In this quickstart, you created a:

- Content delivery network Profile
- Endpoint

To learn more about Azure Content Delivery Network and Azure Resource Manager, continue to the next article:

> 
> [Tutorial: Use content delivery network to serve static content from a web app](cdn-add-to-web-app.md)
