---
ROBOTS: NOINDEX
title: 'Quickstart: Create a profile and endpoint - Bicep'
titleSuffix: Azure Content Delivery Network
description: In this quickstart, learn how to create an Azure Content Delivery Network profile and endpoint by using a Bicep file
services: cdn
author: halkazwini
ms.author: halkazwini
ms.service: azure-content-delivery-network
ms.topic: quickstart
ms.custom: subject-armqs, mode-arm, devx-track-bicep
ms.date: 02/28/2026
# Customer intent: "As a cloud engineer, I want to deploy an Azure Content Delivery Network profile and endpoint using a Bicep file, so that I can efficiently manage content delivery and performance for my applications."
---

# Quickstart: Create an Azure Content Delivery Network profile and endpoint - Bicep


> **Important:**
> Azure CDN Standard from Microsoft (classic) retires on **September 30, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](https://learn.microsoft.com/azure/cdn/migrate-tier). For more information, see ⁠[**Azure CDN Standard from Microsoft (classic) retirement**](https://azure.microsoft.com/updates?id=Azure-CDN-Standard-from-Microsoft-classic-will-be-retired-on-30-September-2027).

Get started with Azure Content Delivery Network by using a Bicep file. The Bicep file deploys a profile and an endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-bicep.md)

## Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-bicep.md)

## Review the Bicep file

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/cdn-with-custom-origin/).

This Bicep file is configured to create a:

- Profile
- Endpoint

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.cdn/cdn-with-custom-origin/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/create-profile-endpoint-bicep.md)

One Azure resource is defined in the Bicep file:

- **[Microsoft.Cdn/profiles](https://learn.microsoft.com/azure/templates/microsoft.cdn/profiles)**

## Deploy the Bicep file

1. Save the Bicep file as **main.bicep** to your local computer.
1. Deploy the Bicep file using either the Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters profileName=<profile-name> endpointName=<endpoint-name> originUrl=<origin-url>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -profileName "<profile-name>" -endpointName "<endpoint-name>" -originUrl "<origin-url>"
    ```

    ---

    > **Note:**
    > Replace **\<profile-name\>** with the name of the content delivery network profile. Replace **\<endpoint-name\>** with a unique content delivery network endpoint name. Replace **\<origin-url\>** with the URL of the origin.

    When the deployment finishes, you should see a message indicating the deployment succeeded.

## Review deployed resources

Use the Azure portal, the Azure CLI, or Azure PowerShell to list the deployed resources in the resource group. Verify that an Endpoint and content delivery network profile were created in the resource group.

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

## Clean up resources

When no longer needed, use the Azure portal, the Azure CLI, or Azure PowerShell to delete the resource group and its resources.

# [CLI](#tab/CLI)

```azurecli-interactive
az group delete --name exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```

---

## Next steps

In this quickstart, you created a:

- Content delivery network Profile
- Endpoint

To learn more about Azure Content Delivery Network, continue to the article below.

> 
> [Tutorial: Use content delivery network to serve static content from a web app](cdn-add-to-web-app.md)
