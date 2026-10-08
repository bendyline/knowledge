---
title: Azure Resource Manager templates
titleSuffix: Azure Virtual Network Manager
description: This article has links to Azure Resource Manager template examples so you can quickly deploy Azure Virtual Network Manager in various scenarios.
services: virtual-network-manager
author: mbender-ms
ms.service: azure-virtual-network-manager
ms.custom: devx-track-arm-template
ms.topic: sample
ms.date: 07/29/2026
ms.author: mbender
---

# Azure Resource Manager templates for Azure Virtual Network Manager

The following table includes links to Azure Resource Manager template samples for Azure Virtual Network Manager. You can deploy templates using the Azure [portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-portal.md?toc=%2fazure%2fvirtual-network%2ftoc.json), Azure [CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-cli.md?toc=%2fazure%2fvirtual-network%2ftoc.json), or Azure [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-powershell.md?toc=%2fazure%2fvirtual-network%2ftoc.json). 

To learn how to author your own templates, see [Create your first template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/quickstart-create-templates-use-the-portal.md?toc=%2fazure%2fvirtual-network%2ftoc.json) and [Understand the structure and syntax of Azure Resource Manager templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/syntax.md?toc=%2fazure%2fvirtual-network%2ftoc.json).

For the JSON syntax and properties to use in templates, see [Microsoft.Network resource types](https://learn.microsoft.com/azure/templates/microsoft.network/allversions).

> **Important:**
> In cases where a template is deploying connectivity or security configurations, the template requires a custom deployment script to deploy the configuration. The script is located at the end of the ARM template, and it uses the `Microsoft.Resources/deploymentScripts` resource type. For more information on deployment scripts, review [Use deployment scripts in ARM templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deployment-script-template.md).

## Samples

| Example | Connectivity topology | Network group membership | Deployment scope | Description |
| --- | --- | --- | --- | --- |
| [Hub-spoke network topology in Azure](https://learn.microsoft.com/samples/azure-samples/azure-hub-spoke/hub-spoke-deployment-with-connected-groups/) | Hub-and-spoke, using connected groups | Static | Resource group | Creates a hub-and-spoke network pattern with customer-managed hub infrastructure components. Also deploys sample security admin rules, an Azure Firewall, and an Azure Bastion host. |
| [Virtual Network Manager connectivity configuration](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/virtual-network-manager-connectivity/) | Mesh, hub-and-spoke, or mesh with hub-and-spoke; you choose at deployment time | Static or dynamic; you choose at deployment time | Subscription | Creates a network manager instance, network groups, virtual networks, and a connectivity configuration. Dynamic membership also deploys an Azure Policy definition and assignment. |
