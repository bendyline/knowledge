---
title: "Quickstart: Create a Foundry resource using Bicep (classic)"
description: "Learn how to use a Bicep file (template) to create a Microsoft Foundry resource in your Azure subscription. (classic)"
ms.author: sgilley
author: sdgilley
reviewer: deeikele
ms.date: 04/15/2026
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.topic: quickstart
ms.custom:
  - classic-and-new
  - "subject-bicepqs"
  - "build-aifnd"
  - "build-2025"
  - "dev-focus"
ai-usage: ai-assisted
# Customer intent: As a DevOps person, I need to automate or customize the creation of a Foundry resource by using templates.
ROBOTS: NOINDEX, NOFOLLOW
---

# Quickstart: Create a Microsoft Foundry resource using a Bicep file (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/how-to/create-resource-template.md)


In this quickstart, you deploy a [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs) resource and project by using a [Microsoft Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview) template. Bicep helps you create related resources in one coordinated deployment and reuse the same configuration across environments.

If you already configured a Foundry resource in the Azure portal, you can [export that configuration as a Bicep file](#export-an-existing-resource-to-a-bicep-file) instead of authoring a template from scratch.

> **Tip:**
> For production-ready Bicep templates that cover common Foundry deployment scenarios, see the [infrastructure-setup-bicep](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-bicep) folder in the Foundry samples repository. Clone the repository and customize the templates instead of starting from scratch.

## Prerequisites


An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 


- 
Access to a role that allows you to complete role assignments, such as **Owner**. For more information about permissions, see [Role-based access control for Microsoft Foundry](../../foundry/concepts/rbac-foundry.md#permissions-for-each-built-in-role).
- [Install the Bicep CLI](https://learn.microsoft.com/azure/azure-resource-manager/bicep/install).

Get the sample files:

# [Azure CLI](#tab/cli)

```azurecli
git clone https://github.com/microsoft-foundry/foundry-samples
cd foundry-samples/infrastructure/infrastructure-setup-bicep/00-basic
```

# [Azure PowerShell](#tab/powershell)

```azurepowershell
git clone https://github.com/microsoft-foundry/foundry-samples
cd foundry-samples/infrastructure/infrastructure-setup-bicep/00-basic
```

---

## Deploy the Bicep file

Deploy the Bicep file by using either Azure CLI or Azure PowerShell:

# [Azure CLI](#tab/cli)

```azurecli
az group create --name exampleRG --location eastus
az deployment group create --resource-group exampleRG --template-file main.bicep --parameters aiFoundryName=myai aiProjectName=myai-proj 
```

Reference: [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create), [az deployment group create](https://learn.microsoft.com/cli/azure/deployment/group#az-deployment-group-create).

# [Azure PowerShell](#tab/powershell)

```azurepowershell
New-AzResourceGroup -Name exampleRG -Location eastus
New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile main.bicep -aiFoundryName myai -aiProjectName myai-proj
```

Reference: [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup), [New-AzResourceGroupDeployment](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroupdeployment).

---

> **Note:**
> Replace `myai` with the name of your resource. `exampleRG` is the name of the resource group, and `eastus` is the Azure region where resources are deployed.

When the deployment finishes, you see a message indicating the deployment succeeded (output displays: `"provisioningState": "Succeeded"`). This confirms that your Foundry resource and project have been created.



## Export an existing resource to a Bicep file

If you already configured a Foundry resource in the Azure portal, you can export that configuration as a Bicep file. The exported file captures your current resource settings, including network rules, identity configuration, and project associations. Use it as a starting point for repeatable deployments across environments.

1. In the [Azure portal](https://portal.azure.com), go to your Foundry resource.
1. In the left menu, expand **Automation**, and then select **Export template**.

   Screenshot of a Foundry resource left menu with the Automation group expanded and Export template selected.

1. Select the **Bicep** tab to view the generated Bicep code.

   Screenshot of the Foundry Export template page with the Bicep tab selected, showing the Download and Copy buttons above the generated Bicep code.

1. Select **Download** to save the file locally, or **Copy** to copy the code to your clipboard.

> **Note:**
> The export might complete with warnings if some resource types don't support full export. Review the output and fill in any missing properties manually.

### Customize the exported template

The exported Bicep file contains hardcoded values specific to your subscription and resource group. Before you reuse the template, review and update the following:

- Replace hardcoded subscription IDs, resource group names, and resource IDs with [Bicep parameters](https://learn.microsoft.com/azure/azure-resource-manager/bicep/parameters).
- Remove any properties you don't need or that reference resources outside the deployment scope.
- Add or adjust security configurations to match your organization's requirements.

For production-ready Bicep templates with enterprise security configurations already built in, see the [infrastructure-setup-bicep](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-bicep) folder in the Foundry samples repository.


### Related security configurations

When you customize your template, consider adding the following security configurations:

- [Configure network isolation with private endpoints](configure-private-link.md)
- [Set up customer-managed keys for encryption](../concepts/encryption-keys-portal.md)
- [Configure role-based access control for Foundry](../concepts/rbac-foundry.md)
- [Create custom Azure Policy definitions](custom-policy-definition.md)


## Review the Bicep file (optional)

Optionally, review the Bicep template to understand the resource definitions. 

You can find the Bicep file used in this article at [https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-bicep/00-basic](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-bicep/00-basic).

This template creates the following resources:

- [microsoft.cognitiveservices/accounts](https://learn.microsoft.com/azure/templates/microsoft.cognitiveservices/accounts?pivots=deployment-language-bicep)
- [microsoft.cognitiveservices/accounts/projects](https://learn.microsoft.com/azure/templates/microsoft.cognitiveservices/accounts/projects?pivots=deployment-language-bicep)

## Review deployed resources

Use the [Foundry portal](https://ai.azure.com/?cid=learnDocs) to view the created resources. You can also use Azure CLI or Azure PowerShell to list the resources.

# [Azure CLI](#tab/cli)

```azurecli
az resource list --resource-group exampleRG
```

# [Azure PowerShell](#tab/powershell)

```azurepowershell
Get-AzResource -ResourceGroupName exampleRG
```

---

## Clean up resources

If you plan to continue working with subsequent quickstarts and tutorials, you can keep the resources you created in this quickstart. If you want to remove the resources, use the following command.

# [Azure CLI](#tab/cli)

```azurecli
az group delete --name exampleRG
```

Reference: [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete)

# [Azure PowerShell](#tab/powershell)

```azurepowershell
Remove-AzResourceGroup -Name exampleRG
```

Reference: [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup)

---



## Related content

- [Get started with the SDK](../quickstarts/get-started-code.md)
- [Configure network isolation with private endpoints](configure-private-link.md)
- [Set up customer-managed keys for encryption](../concepts/encryption-keys-portal.md)
- [Configure role-based access control for Foundry](../concepts/rbac-foundry.md)
- [Security configurations samples](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples) — See example Bicep template configurations for enterprise security configurations, including network isolation, customer-managed key encryption, advanced identity options, and Agents standard setup.
