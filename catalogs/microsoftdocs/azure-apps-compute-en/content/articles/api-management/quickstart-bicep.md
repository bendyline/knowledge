---
title: "Quickstart: Create Azure API Management instance by using Bicep"
description: Use this quickstart to create an Azure API Management instance in the Developer tier by using Bicep.
services: azure-resource-manager
ms.service: azure-api-management
tags: azure-resource-manager, bicep
ms.custom: devx-track-bicep, subject-bicepqs, devx-track-azurecli, devx-track-azurepowershell
ms.topic: quickstart-bicep
ms.date: 02/24/2026
---

# Quickstart: Create a new Azure API Management instance by using Bicep

**APPLIES TO: All API Management tiers**



This quickstart describes how to use a Bicep file to create an Azure API Management instance. You can also use Bicep for common management tasks such as importing APIs in your API Management instance.


[Azure API Management](api-management-key-concepts.md) helps organizations publish APIs to external, partner, and internal developers to unlock the potential of their data and services. API Management provides the core competencies to ensure a successful API program through developer engagement, business insights, analytics, security, and protection. With API Management, create and manage modern API gateways for existing backend services hosted anywhere.



[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/quickstart-bicep.md)

## Prerequisites

- If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- For Azure CLI:

    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/quickstart-bicep.md)

- For Azure PowerShell:

    [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-powershell-requirements-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/quickstart-bicep.md)

## Review the Bicep file

The Bicep file used in this quickstart is from [Azure quickstart templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/azure-api-management-create/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.apimanagement/azure-api-management-create/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/quickstart-bicep.md)

The following resource is defined in the Bicep file:

- [Microsoft.ApiManagement/service](https://learn.microsoft.com/azure/templates/microsoft.apimanagement/service)

In this example, the Bicep file by default configures the API Management instance in the Developer tier, an economical option to evaluate Azure API Management. This tier isn't for production use.

More Azure API Management Bicep samples can be found in [Azure quickstart templates](https://learn.microsoft.com/samples/browse/?terms=api%20management\&languages=bicep).

## Deploy the Bicep file

You can use Azure CLI or Azure PowerShell to deploy the Bicep file. For more information about deploying Bicep files, see [Deploy Bicep files with the Azure CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/deploy-cli.md).

1. Save the Bicep file as *main.bicep* to your local computer.

1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    Replace *\<publisher-name\>* and *\<publisher-email\>* with your organization's name and your email address to receive notifications.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus

    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters publisherEmail=<publisher-email> publisherName=<publisher-name>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus

    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -publisherEmail "<publisher-email>" -publisherName "<publisher-name>"
    ```

    ---

    When the deployment finishes, you should see a message indicating the deployment succeeded.

    > **Tip:**
    >  It can take between 30 and 40 minutes to create and activate an API Management service in the Developer tier. Times vary by tier.

## Review deployed resources

Use the Azure portal, Azure CLI, or Azure PowerShell to list the deployed App Configuration resource in the resource group.

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

When your API Management service instance is online, you're ready to use it. Start with the tutorial to [import and publish](import-and-publish.md) your first API.

## Clean up resources

If you plan to continue working with subsequent tutorials, you might want to leave the API Management instance in place. When no longer needed, delete the resource group, which deletes the resources in the resource group.

# [CLI](#tab/CLI)

```azurecli-interactive
az group delete --name exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```

---

## Next step

> 
> [Tutorial: Import and publish your first API](import-and-publish.md)
