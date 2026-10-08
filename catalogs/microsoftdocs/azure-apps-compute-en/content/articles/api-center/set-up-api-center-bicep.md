---
title: Quickstart - Create Your Azure API Center - Bicep
description: Learn how to use Bicep to set up an API center for API discovery, reuse, and governance. 

ms.service: azure-api-center
ms.custom: devx-track-azurepowershell, devx-track-bicep
ms.topic: quickstart
ms.date: 10/17/2025
 
---

# Quickstart: Create your API center - Bicep


Create your [API center](overview.md) to start an inventory of your organization's APIs. Azure API Center enables tracking APIs in a centralized location for discovery, reuse, and governance.

After creating your API center, follow the steps in the tutorials to add custom metadata, APIs, versions, definitions, and other information.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-bicep.md)


## Prerequisites

* If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

* At least a Contributor role assignment or equivalent permissions in the Azure subscription. 

* For Azure CLI:
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-bicep.md)

* For Azure PowerShell: 
    [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-powershell-requirements-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-bicep.md)

## Review the Bicep file

The Bicep file used in this quickstart is from
[Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/azure-api-center-create/).

In this example, the Bicep file creates an API center in the Free plan and registers a sample API in the default workspace. Currently, Azure API Center supports a single, default workspace for all child resources.

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.apicenter/azure-api-center-create/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-bicep.md)

The following Azure resources are defined in the Bicep file:

* [Microsoft.ApiCenter/services](https://learn.microsoft.com/azure/templates/microsoft.apicenter/services)
* [Microsoft.ApiCenter/services/workspaces](https://learn.microsoft.com/azure/templates/microsoft.apicenter/services/workspaces)
* [Microsoft.ApiCenter/services/workspaces/apis](https://learn.microsoft.com/azure/templates/microsoft.apicenter/services/workspaces/apis)

## Deploy the Bicep file

You can use Azure CLI or Azure PowerShell to deploy the Bicep file. For more information about deploying Bicep files, see [Deploy Bicep files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/deploy-cli.md).

1. Copy and save the Bicep file as *main.bicep* to your local computer. If you're using Azure Cloud Shell, upload the file to your home directory.

1. Deploy the Bicep file using either Azure CLI or Azure PowerShell. If necessary, include the path to the *main.bicep* file location.

    # [CLI](#tab/CLI)

    ```azurecli
    # Create a resource group in one of the supported regions for Azure API Center
    
    az group create --name exampleRG --location eastus

    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters apiName="<api-name>" apiType="<api-type>" 
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    # Create a resource group in one of the supported regions for Azure API Center

    New-AzResourceGroup -Name exampleRG -Location eastus

    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -apiName "<api-name>" -apiType "<api-type>"
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
