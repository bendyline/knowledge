---
title: Personal data
description: Learn how to manage personal data associated with Azure Resource Manager operations.
ms.topic: article
ms.custom: devx-track-arm-template
ms.date: 02/27/2026
---

# Manage personal data associated with Azure Resource Manager

To avoid exposing sensitive information, delete any personal information you provided in deployments, resource groups, or tags. Azure Resource Manager provides operations that let you manage personal data you provided in deployments, resource groups, or tags.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/gdpr-intro-sentence.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/resource-manager-personal-data.md)

## Delete personal data in deployment history

For deployments, Resource Manager retains parameter values and status messages in the deployment history. These values persist until you delete the deployment from the history. To see if you provided personal data in these values, list the deployments. If you find personal data, delete the deployments from the history.

To list **deployments** in the history, use:

* [List By Resource Group](https://learn.microsoft.com/rest/api/resources/deployments/listbyresourcegroup)
* [Get-AzResourceGroupDeployment](https://learn.microsoft.com/powershell/module/az.resources/Get-AzResourceGroupDeployment)
* [az deployment group list](https://learn.microsoft.com/cli/azure/deployment/group#az-deployment-group-list)

To delete **deployments** from the history, use:

* [Delete](https://learn.microsoft.com/rest/api/resources/deployments/delete)
* [Remove-AzResourceGroupDeployment](https://learn.microsoft.com/powershell/module/az.resources/Remove-AzResourceGroupDeployment)
* [az deployment group delete](https://learn.microsoft.com/cli/azure/deployment/group#az-deployment-group-delete)

## Delete personal data in resource group names

The name of the resource group persists until you delete the resource group. To see if you provided personal data in the names, list the resource groups. If you find personal data, [move the resources](move-resource-group-and-subscription.md) to a new resource group, and delete the resource group with personal data in the name.

To list **resource groups**, use:

* [List](https://learn.microsoft.com/rest/api/resources/resourcegroups/list)
* [Get-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/Get-AzResourceGroup)
* [az group list](https://learn.microsoft.com/cli/azure/group#az-group-list)

To delete **resource groups**, use:

* [Delete](https://learn.microsoft.com/rest/api/resources/resourcegroups/delete)
* [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/Remove-AzResourceGroup)
* [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete)

## Delete personal data in tags

Tag names and values persist until you delete or modify the tag. To see if you provided personal data in the tags, list the tags. If you find personal data, delete the tags.

To list **tags**, use:

* [List](https://learn.microsoft.com/rest/api/resources/tags/list)
* [Get-AzTag](https://learn.microsoft.com/powershell/module/az.resources/Get-AzTag)
* [az tag list](https://learn.microsoft.com/cli/azure/tag#az-tag-list)

To delete **tags**, use:

* [Delete](https://learn.microsoft.com/rest/api/resources/tags/delete)
* [Remove-AzTag](https://learn.microsoft.com/powershell/module/az.resources/Remove-AzTag)
* [az tag delete](https://learn.microsoft.com/cli/azure/tag#az-tag-delete)

## Next steps

* For an overview of Azure Resource Manager, see the [What is Resource Manager?](overview.md)
