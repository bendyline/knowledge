---
title: "Create a Microsoft Foundry hub using a Bicep template (classic)"
description: "Use a Microsoft Bicep template to create a new Microsoft Foundry hub. This template also creates resources required by the hub. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.custom: 
  - devx-track-arm-template
  - devx-track-bicep
  - build-2024
  - hub-only
  - dev-focus
ms.topic: how-to
ms.date: 12/23/2025
ai-usage: ai-assisted
ms.reviewer: deeikele
ms.author: sgilley
author: sdgilley
#Customer intent: As a DevOps person, I need to automate or customize the creation of a hub by using templates.
---

# Use an Azure Resource Manager template to create a Microsoft Foundry hub (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>



> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Use a [Microsoft Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview) template to create a hub for [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs). A template makes it easy to create resources as a single, coordinated operation. A Bicep template is a text document that defines the resources needed for a deployment. It might also specify deployment parameters. You use parameters to provide input values when using the template.

You can find the template used in this article at [https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.machinelearningservices/aifoundry-basics](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.machinelearningservices/aifoundry-basics). Both the source `main.bicep` file and the compiled Azure Resource Manager template (`main.json`) file are available. This template creates the following resources:

- An Azure resource group (if one doesn't already exist)
- A Foundry hub
- Azure Storage Account
- Azure Key Vault
- Azure Container Registry
- Azure Application Insights
- Foundry resource (created by the template)

## Prerequisites


An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 


- **RBAC requirements**: You must have the **Owner** or **Contributor** role on your Azure subscription or resource group to deploy a hub and create resources. If you're deploying to an existing resource group, ensure you have at least **Contributor** permissions.
- A copy of the template files from the GitHub repo. To clone the GitHub repo to your local machine, you can use [Git](https://git-scm.com/). Use the following command to clone the quickstart repository to your local machine and navigate to the `aifoundry-basics` directory.

    # [Azure CLI](#tab/cli)

    ```azurecli
    git clone https://github.com/Azure/azure-quickstart-templates
    cd azure-quickstart-templates/quickstarts/microsoft.machinelearningservices/aifoundry-basics
    ```

    # [Azure PowerShell](#tab/powershell)

    ```azurepowershell
    git clone https://github.com/Azure/azure-quickstart-templates
    cd azure-quickstart-templates\quickstarts\microsoft.machinelearningservices\aifoundry-basics
    ```

    ---

- The Bicep command-line tools. To install the Bicep command-line tools, see [Install the Bicep CLI](https://learn.microsoft.com/azure/azure-resource-manager/bicep/install).

## Understanding the template

The Bicep template is made up of the following files:

| File | Description |
| --- | --- |
| [main.bicep](https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.machinelearningservices/aifoundry-basics/main.bicep) | The main Bicep file that defines the parameters and variables. Passes parameters and variables to other modules in the `modules` subdirectory. |
| [ai-hub.bicep](https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.machinelearningservices/aifoundry-basics/modules/ai-hub.bicep) | Defines the hub. |
| [dependent-resources.bicep](https://github.com/Azure/azure-quickstart-templates/blob/master/quickstarts/microsoft.machinelearningservices/aifoundry-basics/modules/dependent-resources.bicep) | Defines the dependent resources for the hub such as Azure Storage Account, Container Registry, Key Vault, and Application Insights. |

> **Important:**
> The example templates might not always use the latest API version for the Azure resources they create. Before using the template, modify it to use the latest API versions. Each Azure service has its own set of API versions. For information on the API for a specific service, check the service information in the [Azure REST API reference](https://learn.microsoft.com/rest/api/azure/).
>
> The hub is based on Azure Machine Learning. For information on the latest API versions for Azure Machine Learning, see the [Azure Machine Learning REST API reference](https://learn.microsoft.com/rest/api/azureml/). To update this API version in your template:
> 1. Open the Bicep file in a text editor
> 2. Find the line with `Microsoft.MachineLearningServices/workspaces@<version>`
> 3. Replace `<version>` with the latest version from the Azure REST API reference (for example, `2024-01-01-preview`)
>
> The following is an example of the entry for a hub using an API version of `2024-01-01-preview`:
>
> ```bicep
> resource aiResource 'Microsoft.MachineLearningServices/workspaces@2024-01-01-preview' = {
> ```

### Azure Resource Manager template

You use the Bicep domain-specific language (DSL) to define the resources. When you deploy the template, the Bicep file compiles into an Azure Resource Manager template. The `main.json` file in the GitHub repository is a compiled Azure Resource Manager version of the template. You generate this file from the `main.bicep` file by using the Bicep command-line tools. For example, deploying the Bicep template generates the `main.json` file. You can also manually create the `main.json` file by using the `bicep build` command without deploying the template.

```azurecli
bicep build main.bicep
```

For more information, see the [Bicep CLI](https://learn.microsoft.com/azure/azure-resource-manager/bicep/bicep-cli) article.

## Configure the template

To run the Bicep template, use the following commands from the `aifoundry-basics` directory:

1. To create a new Azure resource group, use the following command. Replace `exampleRG` with the name of your resource group, and `eastus` with the Azure region to use:

    # [Azure CLI](#tab/cli)

    ```azurecli
    az group create --name exampleRG --location eastus
    ```
    # [Azure PowerShell](#tab/powershell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    ```

    ---

1. To run the template, use the following command. Replace `myai` with the name to use for your resources. This value is used, along with generated prefixes and suffixes, to create a unique name for the resources created by the template.

    > **Tip:**
    > The `aiHubName` must be five or fewer characters. It can't be entirely numeric or contain the following characters: `~ ! @ # $ % ^ & * ( ) = + _ [ ] { } \ | ; : . ' " , < > / ?`.

    # [Azure CLI](#tab/cli)

    ```azurecli
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters aiHubName=myai 
    ```

    # [Azure PowerShell](#tab/powershell)

    ```azurepowershell
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile main.bicep -aiHubName myai
    ```

    ---

    When the command completes successfully, you'll see a message showing the deployment status. The hub and its dependent resources are now created.

## Verify your deployment

After the template deployment completes, verify that your resources were created successfully:

1. In the [Azure portal](https://portal.azure.com), navigate to your resource group.

1. Verify that the following resources appear in the resource list:
   - Your Foundry hub (named with your hub name)
   - Azure Storage Account
   - Azure Key Vault
   - Azure Container Registry
   - Azure Application Insights
   - Azure AI Services resource

1. Select your Foundry hub from the resource list to open it and confirm it's ready to use.

If the deployment fails, check the following:
- Verify your RBAC role has Owner or Contributor permissions
- Ensure the `aiHubName` meets the naming requirements (5 or fewer characters, not all numeric)
- Check that you're using the latest API versions in your template

## Related content

- [Create a Foundry project](create-projects.md)
- [Learn more about Microsoft Foundry](../what-is-foundry.md)
- [Learn more about Foundry hubs](../concepts/ai-resources.md)
- [Bicep CLI documentation](https://learn.microsoft.com/azure/azure-resource-manager/bicep/bicep-cli)
- [Azure Resource Manager deployment reference](https://learn.microsoft.com/azure/azure-resource-manager/templates/)
