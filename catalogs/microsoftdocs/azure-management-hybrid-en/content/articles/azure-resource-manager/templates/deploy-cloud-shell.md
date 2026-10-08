---
title: Deploy templates with Cloud Shell
description: Use Azure Resource Manager and Azure Cloud Shell to deploy resources to Azure. The resources are defined in an Azure Resource Manager template (ARM template).
ms.topic: how-to
ms.custom: devx-track-arm-template
ms.date: 06/26/2026
---

# Deploy ARM templates from Azure Cloud Shell

You can use [Azure Cloud Shell](../../cloud-shell/overview.md) to deploy an Azure Resource Manager template (ARM template). You can deploy either an ARM template that is stored remotely, or an ARM template that is stored on the local storage account for Cloud Shell.

You can deploy to any scope. This article shows deploying to a resource group.

## Prerequisites


### Required permissions

To deploy a Bicep file or Azure Resource Manager (ARM) template, you need write access on the resources you're deploying and access to all operations on the `Microsoft.Resources/deployments` resource type. For example, to deploy a virtual machine, you need `Microsoft.Compute/virtualMachines/write` and `Microsoft.Resources/deployments/*` permissions.  The what-if operation has the same permission requirements.

Azure CLI version **2.76.0 or later** and Azure PowerShell version **13.4.0 or later** introduce the ValidationLevel switch to determine how thoroughly ARM validates the Bicep template during this process. For more information, see [What-if commands](../bicep/deploy-what-if.md#what-if-commands)

For a list of roles and permissions, see [Azure built-in roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md).


## Deploy remote template

To deploy an external template, provide the URI of the template exactly as you would for any external deployment. The external template could be in a GitHub repository or and an external storage account.

1. Open the Cloud Shell prompt by selecting the cloud shell icon from the [Azure portal](https://portal.azure.com).

   Screenshot of the button to open Cloud Shell.

1. Toggle between Bash and PowerShell by selecting **Switch to Bash** or **Switch to PowerShell**.

   Screenshot of the button to switch between Bash and PowerShell.

1. To deploy the template, use the following commands:

   # [Azure CLI](#tab/azure-cli)

   ```azurecli-interactive
   az group create --name ExampleGroup --location "Central US"
   az deployment group create \
     --name ExampleDeployment \
     --resource-group ExampleGroup \
     --template-uri "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.storage/storage-account-create/azuredeploy.json" \
     --parameters storageAccountType=Standard_GRS
   ```

   # [PowerShell](#tab/azure-powershell)

   ```azurepowershell-interactive
   New-AzResourceGroup -Name ExampleGroup -Location "Central US"
   New-AzResourceGroupDeployment `
     -DeploymentName ExampleDeployment `
     -ResourceGroupName ExampleGroup `
     -TemplateUri https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/quickstarts/microsoft.storage/storage-account-create/azuredeploy.json `
     -storageAccountType Standard_GRS
   ```

   ---

## Deploy local template

To deploy a local template, you must first upload your template to the storage account that is connected to your Cloud Shell session.

1. Sign in to the [Cloud Shell](https://shell.azure.com).

1. Select either **PowerShell** or **Bash**.

   Screenshot of the option to select Bash or PowerShell in Cloud Shell.

1. Select **Upload/Download files**, and then select **Upload**.

   Screenshot of the Cloud Shell interface with the Upload file option highlighted.

1. Select the ARM template you want to upload, and then select **Open**.

1. To deploy the template, use the following commands:

   # [Azure CLI](#tab/azure-cli)

   ```azurecli-interactive
   az group create --name ExampleGroup --location "South Central US"
   az deployment group create \
     --resource-group ExampleGroup \
     --template-file azuredeploy.json \
     --parameters storageAccountType=Standard_GRS
   ```

   # [PowerShell](#tab/azure-powershell)

   ```azurepowershell-interactive
   New-AzResourceGroup -Name ExampleGroup -Location "Central US"
   New-AzResourceGroupDeployment `
     -DeploymentName ExampleDeployment `
     -ResourceGroupName ExampleGroup `
     -TemplateFile azuredeploy.json `
     -storageAccountType Standard_GRS
   ```

   ---

## Next steps

- For more information about deployment commands, see [Deploy resources with ARM templates and Azure CLI](deploy-cli.md) and [Deploy resources with ARM templates and Azure PowerShell](deploy-powershell.md).
- To preview changes before deploying a template, see [ARM template deployment what-if operation](deploy-what-if.md).
