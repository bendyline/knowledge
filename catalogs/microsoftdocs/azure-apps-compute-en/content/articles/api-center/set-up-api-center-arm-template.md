---
title: Quickstart - Create Your Azure API Center - ARM Template
description: Learn how to use an Azure Resource Manager template to set up an API center for API discovery, reuse, and governance. 

ms.service: azure-api-center
ms.custom: devx-track-arm-template, devx-track-azurepowershell
ms.topic: quickstart
ms.date: 10/13/2025
 
---

# Quickstart: Create your API center - ARM template


Create your [API center](overview.md) to start an inventory of your organization's APIs. Azure API Center enables tracking APIs in a centralized location for discovery, reuse, and governance.

After creating your API center, follow the steps in the tutorials to add custom metadata, APIs, versions, definitions, and other information.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-arm-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template opens in the Azure portal.

Screenshot of the Deploy to Azure button to deploy resources with a template.


## Prerequisites

* If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

* At least a Contributor role assignment or equivalent permissions in the Azure subscription. 

* For Azure CLI:
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-arm-template.md)

* For Azure PowerShell:
    [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-powershell-requirements-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-arm-template.md)

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/azure-api-center-create/).

In this example, the template creates an API center in the Free plan and registers a sample API in the default workspace. Currently, API Center supports a single, default workspace for all child resources.

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.apicenter/azure-api-center-create/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-arm-template.md)

The following Azure resources are defined in the template:

* [Microsoft.ApiCenter/services](https://learn.microsoft.com/azure/templates/microsoft.apicenter/services)
* [Microsoft.ApiCenter/services/workspaces](https://learn.microsoft.com/azure/templates/microsoft.apicenter/services/workspaces)
* [Microsoft.ApiCenter/services/workspaces/apis](https://learn.microsoft.com/azure/templates/microsoft.apicenter/services/workspaces/apis)

## Deploy the template

Deploy the template using any standard method for [deploying an ARM template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-cli.md) such as the following examples using Azure CLI and PowerShell.

1. Copy and save the template file as *azuredeploy.json* to your local computer. If you're using Azure Cloud Shell, upload the file to your home directory.

1. Deploy the template using either Azure CLI or Azure PowerShell. If necessary, include the path to the *azuredeploy.json* file location.

    # [CLI](#tab/CLI)

    ```azurecli
    # Create a resource group in one of the supported regions for Azure API Center
    
    az group create --name exampleRG --location eastus

    az deployment group create --resource-group exampleRG --template-file azuredeploy.json --parameters apiName="<api-name>" apiType="<api-type>" 
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    # Create a resource group in one of the supported regions for Azure API Center

    New-AzResourceGroup -Name exampleRG -Location eastus

    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./azuredeploy.json -apiName "<api-name>" -apiType "<api-type>"
    ```

    ---

Replace `<api-name>` and `<api-type>` with the name and type of an API that you want to register in your API center.

When the deployment finishes, you should see a message indicating the deployment succeeded.


## Review deployed resources

Use the Azure portal to check the deployed resources, or use tools such as the Azure CLI or Azure PowerShell to list the deployed resources.

1. In the [Azure portal](https://portal.azure.com), search for and select **API Centers**, and select the API center that you created.
1. Review the properties of your service on the **Overview** page.
1. In the sidebar menu, under **Inventory**, select **Assets** to see the API that you registered in the default workspace.



## Next step

Now you can start adding information to the inventory in your API center. To help you organize your APIs and other information, begin by defining custom metadata in your API center.

> 
> [Define custom metadata](tutorials/add-metadata-properties.md)
