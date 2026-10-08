---
title: 'Quickstart: Deploy Using an ARM Template'
description: Learn how to deploy an Azure AI Search service instance using an Azure Resource Manager template.
author: mattwojo
ms.author: mattwoj
ms.service: azure-ai-search
ms.topic: quickstart
ms.custom:
  - subject-armqs
  - mode-arm
  - devx-track-arm-template
  - ignite-2023
ms.date: 07/20/2026
ms.update-cycle: 365-days
ai-usage: ai-assisted
---

# Quickstart: Deploy Azure AI Search using an Azure Resource Manager template


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


In this quickstart, use an Azure Resource Manager template to deploy an Azure AI Search service in the Azure portal.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-arm.md)

The deployment uses only the properties included in the template. If you need more customization, such as [setting up network security](search-security-best-practices.md#configure-network-security), you can update the service as a post-deployment task. To customize an existing service with the fewest steps, use [Azure CLI](search-manage-azure-cli.md) or [Azure PowerShell](search-manage-powershell.md). If you're evaluating preview features, use the [Management REST API](search-manage-rest.md).

Assuming your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the template

This quickstart uses a template from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/azure-search-create/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.search/azure-search-create/azuredeploy.json](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-get-started-arm.md)

The template defines the following Azure resource:

- [Microsoft.Search/searchServices](https://learn.microsoft.com/azure/templates/Microsoft.Search/searchServices): create an Azure AI Search service

## Deploy the template

Select the following image to sign in to Azure and open a template. The template creates an Azure AI Search resource.

Button to deploy the Resource Manager template to Azure.

The Azure portal displays a form that you can use to easily provide parameter values. Some parameters are prefilled with the default values from the template. Provide your subscription, resource group, location, and service name. If you want to use Microsoft Foundry in an [AI enrichment](cognitive-search-concept-intro.md) pipeline, such as for analyzing binary image files for text, choose a location that offers both Azure AI Search and Microsoft Foundry. Unless you use a keyless connection, your Azure AI Search service and Microsoft Foundry resource must be in the same region for AI enrichment workloads. After you complete the form, agree to the terms and conditions, and then select the purchase button to complete your deployment.

> 
> Azure portal display of template

## Review deployed resources

When your deployment is complete, you can access your new resource group and new search service in the Azure portal.

## Clean up resources

Other Azure AI Search quickstarts and tutorials build upon this quickstart. If you plan to continue to work with subsequent quickstarts and tutorials, you might want to leave this resource in place. When you no longer need the resources, you can delete the resource group. Deleting the resource group deletes the Azure AI Search service and related resources.

## Related content

In this quickstart, you created an Azure AI Search service by using an ARM template and then validated the deployment. To learn more about Azure AI Search and Azure Resource Manager, see the following articles:

- [What is Azure AI Search?](search-what-is-azure-search.md)
- [Quickstart: Full-text search in the Azure portal](search-get-started-portal.md)
- [Quickstart: Create a demo search app in the Azure portal](search-create-app-portal.md)
- [Quickstart: Create a skillset in the Azure portal](search-get-started-skillset.md)
