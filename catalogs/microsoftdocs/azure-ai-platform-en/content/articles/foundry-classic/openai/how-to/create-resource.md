---
title: "How-to: Create and deploy an Azure OpenAI in Microsoft Foundry Models resource (classic)"
description: "Learn how to get started with Azure OpenAI and create your first resource and deploy your first model in the Azure CLI or the Azure portal. (classic)"
manager: mcleans
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.custom: devx-track-azurecli, build-2023, build-2023-dataai, devx-track-azurepowershell, innovation-engine
ms.topic: how-to
ms.date: 11/26/2025
zone_pivot_groups: openai-create-resource
author: alvinashcraft
ms.author: aashcraft
recommendations: false
---

# Create and deploy an Azure OpenAI in Microsoft Foundry Models resource (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



[Deploy to Azure](https://go.microsoft.com/fwlink/?linkid=2303211)

This article describes how to get started with Azure OpenAI and provides step-by-step instructions to create a resource and deploy a model. You can create resources in Azure in several different ways:

- The [Azure portal](https://portal.azure.com/?microsoft_azure_marketplace_ItemHideKey=microsoft_openai_tip#create/Microsoft.CognitiveServicesOpenAI)
- The REST APIs, the Azure CLI, PowerShell, or client libraries
- Azure Resource Manager (ARM) templates

In this article, you review examples for creating and deploying resources in the Azure portal, with the Azure CLI, and with PowerShell.

**Applies to: web-portal**



## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Access permissions to [create Azure OpenAI resources and to deploy models](role-based-access-control.md).

## Create a resource

The following steps show how to create an Azure OpenAI resource in the Azure portal. 

### Identify the resource

1. Sign in with your Azure subscription in the Azure portal.

1. Select **Create a resource** and search for the **Azure OpenAI**. When you locate the service, select **Create**.

   Screenshot that shows how to create a new Azure OpenAI in Microsoft Foundry Models resource in the Azure portal.

1. On the **Create Azure OpenAI** page, provide the following information for the fields on the **Basics** tab:

   | Field | Description |
   | --- | --- |
   | **Subscription** | The Azure subscription used in your Azure OpenAI onboarding application. |
   | **Resource group** | The Azure resource group to contain your Azure OpenAI resource. You can create a new group or use a pre-existing group. |
   | **Region** | The location of your instance. Different locations can introduce latency, but they don't affect the runtime availability of your resource. |
   | **Name** | A descriptive name for your Azure OpenAI resource, such as _MyOpenAIResource_. |
   | **Pricing Tier** | The pricing tier for the resource. Currently, only the Standard tier is available for the Azure OpenAI. For more info on pricing visit the [Azure OpenAI pricing page](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/) |

   Screenshot that shows how to configure an Azure OpenAI resource in the Azure portal.

1. Select **Next**.

### Configure network security

The **Network** tab presents three options for the security **Type**:
   
- Option 1: **All networks, including the internet, can access this resource.**
- Option 2: **Selected networks, configure network security for your Foundry Tools resource.**
- Option 3: **Disabled, no networks can access this resource. You could configure private endpoint connections that will be the exclusive way to access this resource.**

Screenshot that shows the network security options for an Azure OpenAI resource in the Azure portal.

Depending on the option you select, you might need to provide additional information.

#### Option 1: Allow all networks

The first option allows all networks, including the internet, to access your resource. This option is the default setting. No extra settings are required for this option.

#### Option 2: Allow specific networks only

The second option lets you identify specific networks that can access your resource. When you select this option, the page updates to include the following required fields:

| Field | Description |
| --- | --- |
| **Virtual network** | Specify the virtual networks that are permitted access to your resource. You can edit the default virtual network name in the Azure portal. |
| **Subnets** | Specify the subnets that are permitted access to your resource. You can edit the default subnet name in the Azure portal. |

Screenshot that shows how to configure network security for an Azure OpenAI resource to allow specific networks only.

The **Firewall** section provides an optional **Address range** field that you can use to configure firewall settings for the resource.

#### Option 3: Disable network access

The third option lets you disable network access to your resource. When you select this option, the page updates to include the **Private endpoint** table.

Screenshot that shows how to disable network security for an Azure OpenAI resource in the Azure portal.

As an option, you can add a private endpoint for access to your resource. Select **Add private endpoint**, and complete the endpoint configuration.

### Confirm the configuration and create the resource

1. Select **Next** and configure any **Tags** for your resource, as desired.

1. Select **Next** to move to the final stage in the process: **Review + submit**.

1. Confirm your configuration settings, and select **Create**.

1. The Azure portal displays a notification when the new resource is available. Select **Go to resource**.

   Screenshot showing the Go to resource button in the Azure portal.

## Deploy a model

Before you can generate text or inference, you need to deploy a model. You can select from one of several available models in Foundry portal.

To deploy a model, follow these steps:

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



1. In **Keep building with Foundry** section select **View all resources**.
1. Find and select your resource.

    > **Important:**
    > At this step you might be offered to upgrade your Azure OpenAI resource to Foundry. See comparison between the two resource types and details on resource upgrade and rollback at [this page](../../how-to/upgrade-azure-openai.md). Select **Cancel** to proceed without resource type upgrade. Alternately select **Next**.
    > 
    > See additional information about Foundry resource in [this article](../../../ai-services/multi-service-resource.md).

1. Select **Deployments** from **Shared resources** section in the left pane. (In case you upgraded to Foundry in the previous step, select **Models + endpoints** from **My assets** section in the left pane.)
1. Select **+ Deploy model** > **Deploy base model** to open the deployment window. 
1. Select the desired model and then select **Confirm**. For a list of available models per region, see [Region availability for Foundry Models sold by Azure](../../../foundry/foundry-models/concepts/models-sold-directly-by-azure-region-availability.md).
1. In the next window configure the following fields:

   | Field | Description |
   | --- | --- |
   | **Deployment name** | Choose a name carefully. The deployment name is used in your code to call the model by using the client libraries and the REST APIs. |
   | **Deployment type** | **Standard**, **Global-Batch**, **Global-Standard**, **Provisioned-Managed**. Learn more about [deployment type options](../../foundry-models/concepts/deployment-types.md). |
   | **Deployment details** (Optional) | You can set optional advanced settings, as needed for your resource. <br> - For the **Content Filter**, assign a content filter to your deployment.<br> - For the **Tokens per Minute Rate Limit**, adjust the Tokens per Minute (TPM) to set the effective rate limit for your deployment. You can modify this value at any time by using the [**Quotas**](quota.md) menu. [**Dynamic Quota**](dynamic-quota.md) allows you to take advantage of more quota when extra capacity is available. |

    > **Important:**
    > When you access the model via the API, you need to refer to the deployment name rather than the underlying model name in API calls, which is one of the [key differences](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/switching-endpoints.yml) between OpenAI and Azure OpenAI. OpenAI only requires the model name. Azure OpenAI always requires deployment name, even when using the model parameter. In our documentation, we often have examples where deployment names are represented as identical to model names to help indicate which model works with a particular API endpoint. Ultimately your deployment names can follow whatever naming convention is best for your use case.

1. Select **Deploy**.
1. Deployment **Details** shows all the information of your new deployment. When the deployment completes, your model **Provisioning** state changes to _Succeeded_.




**Applies to: cli**



## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Access permissions to [create Azure OpenAI resources and to deploy models](role-based-access-control.md).
- The Azure CLI. For more information, see [How to install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

## Sign in to the Azure CLI

[Sign in](https://learn.microsoft.com/cli/azure/authenticate-azure-cli) to the Azure CLI or select **Open Cloudshell** in the following steps.

## Create an Azure resource group

To create an Azure OpenAI resource, you need an Azure resource group. When you create a new resource through the Azure CLI, you can also create a new resource group or instruct Azure to use an existing group. The following example shows how to create a new resource group named _OAIResourceGroup_ with the [az group create](https://learn.microsoft.com/cli/azure/group?view=azure-cli-latest\&preserve-view=true#az-group-create) command. The resource group is created in the East US location. 

```azurecli-interactive
az group create \
--name OAIResourceGroup \
--location eastus
```

## Create a resource

Use the [az cognitiveservices account create](https://learn.microsoft.com/cli/azure/cognitiveservices/account?view=azure-cli-latest\&preserve-view=true#az-cognitiveservices-account-create) command to create an Azure OpenAI resource in the resource group. In the following example, you create a resource named _MyOpenAIResource_ in the _OAIResourceGroup_ resource group. When you try the example, update the code to use your desired values for the resource group and resource name, along with your Azure subscription ID _\<subscriptionID>_.

```azurecli
az cognitiveservices account create \
--name MyOpenAIResource \
--resource-group OAIResourceGroup \
--location eastus \
--kind OpenAI \
--sku s0 \
--subscription <subscriptionID>
--custom-domain MyOpenAIResource
--yes
```

## Retrieve information about the resource

After you create the resource, you can use different commands to find useful information about your Azure OpenAI in Microsoft Foundry Models instance. The following examples demonstrate how to retrieve the REST API endpoint base URL and the access keys for the new resource.

### Get the endpoint URL

Use the [az cognitiveservices account show](https://learn.microsoft.com/cli/azure/cognitiveservices/account?view=azure-cli-latest\&preserve-view=true#az-cognitiveservices-account-show) command to retrieve the REST API endpoint base URL for the resource. In this example, we direct the command output through the [jq](https://jqlang.github.io/jq/) JSON processor to locate the `.properties.endpoint` value.

When you try the example, update the code to use your values for the resource group _\<myResourceGroupName>_ and resource _\<myResourceName>_.

```azurecli
az cognitiveservices account show \
--name <myResourceName> \
--resource-group  <myResourceGroupName> \
| jq -r .properties.endpoint
```

### Get the primary API key

To retrieve the access keys for the resource, use the [az cognitiveservices account keys list](https://learn.microsoft.com/cli/azure/cognitiveservices/account?view=azure-cli-latest\&preserve-view=true#az-cognitiveservices-account-keys-list) command. In this example, we direct the command output through the [jq](https://jqlang.github.io/jq/) JSON processor to locate the `.key1` value.

When you try the example, update the code to use your values for the resource group and resource.

```azurecli
az cognitiveservices account keys list \
--name <myResourceName> \
--resource-group  <myResourceGroupName> \
| jq -r .key1
```

## Deploy a model

To deploy a model, use the [az cognitiveservices account deployment create](https://learn.microsoft.com/cli/azure/cognitiveservices/account/deployment?view=azure-cli-latest\&preserve-view=true#az-cognitiveservices-account-deployment-create) command. In the following example, you deploy an instance of the `gpt-4o` model and give it the name _MyModel_. When you try the example, update the code to use your values for the resource group and resource. You don't need to change the `model-version`, `model-format` or `sku-capacity`, and `sku-name` values.

```azurecli
az cognitiveservices account deployment create \
--name <myResourceName> \
--resource-group  <myResourceGroupName> \
--deployment-name MyModel \
--model-name gpt-4o \
--model-version "2024-11-20"  \
--model-format OpenAI \
--sku-capacity "1" \
--sku-name "Standard"
```

`--sku-name` accepts the following deployment types: `Standard`, `GlobalBatch`, `GlobalStandard`, and `ProvisionedManaged`.  Learn more about [deployment type options](../../foundry-models/concepts/deployment-types.md).

> **Important:**
> When you access the model via the API, you need to refer to the deployment name rather than the underlying model name in API calls, which is one of the [key differences](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/switching-endpoints.yml) between OpenAI and Azure OpenAI. OpenAI only requires the model name. Azure OpenAI always requires deployment name, even when using the model parameter. In our docs, we often have examples where deployment names are represented as identical to model names to help indicate which model works with a particular API endpoint. Ultimately your deployment names can follow whatever naming convention is best for your use case.

## Delete a model from your resource

You can delete any model deployed from your resource with the [az cognitiveservices account deployment delete](https://learn.microsoft.com/cli/azure/cognitiveservices/account/deployment?view=azure-cli-latest\&preserve-view=true#az-cognitiveservices-account-deployment-delete) command. In the following example, you delete a model named _MyModel_. When you try the example, update the code to use your values for the resource group, resource, and deployed model. 

```azurecli
az cognitiveservices account deployment delete \
--name <myResourceName> \
--resource-group  <myResourceGroupName> \
--deployment-name MyModel
```

## Delete a resource

If you want to clean up after these exercises, you can remove your Azure OpenAI resource by deleting the resource through the Azure CLI. You can also delete the resource group. If you choose to delete the resource group, all resources contained in the group are also deleted.

To remove the resource group and its associated resources, use the [az cognitiveservices account delete](https://learn.microsoft.com/cli/azure/cognitiveservices/account/deployment?view=azure-cli-latest\&preserve-view=true#az-cognitiveservices-account-delete) command.

If you're not going to continue to use the resources created in these exercises, run the following command to delete your resource group. Be sure to update the example code to use your values for the resource group and resource.

```azurecli
az cognitiveservices account delete \
--name <myResourceName> \
--resource-group  <myResourceGroupName>
```




**Applies to: ps**



## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure PowerShell. For more information, see [How to install the Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell).
- Access permissions to [create Azure OpenAI resources and to deploy models](role-based-access-control.md).


## Sign in to the Azure PowerShell

[Sign in](https://learn.microsoft.com/powershell/azure/authenticate-azureps) to Azure PowerShell or select **Open Cloudshell** in the following steps.

## Create an Azure resource group

To create an Azure OpenAI resource, you need an Azure resource group. When you create a new resource through Azure PowerShell, you can also create a new resource group or instruct Azure to use an existing group. The following example shows how to create a new resource group named _OAIResourceGroup_ with the [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) command. The resource group is created in the East US location. 

```azurepowershell-interactive
New-AzResourceGroup -Name OAIResourceGroup -Location eastus
```

## Create a resource

Use the [New-AzCognitiveServicesAccount](https://learn.microsoft.com/powershell/module/az.cognitiveservices/new-azcognitiveservicesaccount) command to create an Azure OpenAI resource in the resource group. In the following example, you create a resource named _MyOpenAIResource_ in the _OAIResourceGroup_ resource group. When you try the example, update the code to use your desired values for the resource group and resource name, along with your Azure subscription ID _\<subscriptionID>_.

```azurepowershell-interactive
New-AzCognitiveServicesAccount -ResourceGroupName OAIResourceGroup -Name MyOpenAIResource -Type OpenAI -SkuName S0 -Location eastus
```

## Retrieve information about the resource

After you create the resource, you can use different commands to find useful information about your Azure OpenAI in Microsoft Foundry Models instance. The following examples demonstrate how to retrieve the REST API endpoint base URL and the access keys for the new resource.

### Get the endpoint URL

Use the [Get-AzCognitiveServicesAccount](https://learn.microsoft.com/powershell/module/az.cognitiveservices/get-azcognitiveservicesaccount) command to retrieve the REST API endpoint base URL for the resource. In this example, we direct the command output through the [Select-Object](https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/select-object) cmdlet to locate the `endpoint` value.

When you try the example, update the code to use your values for the resource group `<myResourceGroupName>` and resource `<myResourceName>`.

```azurepowershell-interactive
Get-AzCognitiveServicesAccount -ResourceGroupName OAIResourceGroup -Name MyOpenAIResource |
  Select-Object -Property endpoint
```

### Get the primary API key

To retrieve the access keys for the resource, use the [Get-AzCognitiveServicesAccountKey](https://learn.microsoft.com/powershell/module/az.cognitiveservices/get-azcognitiveservicesaccountkey) command. In this example, we direct the command output through the [Select-Object](https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/select-object) cmdlet to locate the `Key1` value.

When you try the example, update the code to use your values for the resource group and resource.

```azurepowershell-interactive
Get-AzCognitiveServicesAccountKey -Name MyOpenAIResource -ResourceGroupName OAIResourceGroup |
  Select-Object -Property Key1
```

## Deploy a model

To deploy a model, use the [New-AzCognitiveServicesAccountDeployment](https://learn.microsoft.com/powershell/module/az.cognitiveservices/new-azcognitiveservicesaccountdeployment) command. In the following example, you deploy an instance of the `gpt-4o` model and give it the name _MyModel_. When you try the example, update the code to use your values for the resource group and resource. You don't need to change the `model-version`, `model-format` or `sku-capacity`, and `sku-name` values. 

```azurepowershell-interactive
$model = New-Object -TypeName 'Microsoft.Azure.Management.CognitiveServices.Models.DeploymentModel' -Property @{
    Name = 'gpt-4o'
    Version = '2024-11-20'
    Format = 'OpenAI'
}

$properties = New-Object -TypeName 'Microsoft.Azure.Management.CognitiveServices.Models.DeploymentProperties' -Property @{
    Model = $model
}

$sku = New-Object -TypeName "Microsoft.Azure.Management.CognitiveServices.Models.Sku" -Property @{
    Name = 'Standard'
    Capacity = '1'
}

New-AzCognitiveServicesAccountDeployment -ResourceGroupName OAIResourceGroup -AccountName MyOpenAIResource -Name MyModel -Properties $properties -Sku $sku
```

The `Name` property of the `$sku` variable accepts the following deployment types: `Standard`, `GlobalBatch`, `GlobalStandard`, and `ProvisionedManaged`. Learn more about [deployment type options](../../foundry-models/concepts/deployment-types.md).

> **Important:**
> When you access the model via the API, you need to refer to the deployment name rather than the underlying model name in API calls, which is one of the [key differences](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/openai/how-to/switching-endpoints.yml) between OpenAI and Azure OpenAI. OpenAI only requires the model name. Azure OpenAI always requires deployment name, even when using the model parameter. In our docs, we often have examples where deployment names are represented as identical to model names to help indicate which model works with a particular API endpoint. Ultimately your deployment names can follow whatever naming convention is best for your use case.

## Delete a model from your resource

You can delete any model deployed from your resource with the [Remove-AzCognitiveServicesAccountDeployment](https://learn.microsoft.com/powershell/module/az.cognitiveservices/remove-azcognitiveservicesaccountdeployment) command. In the following example, you delete a model named _MyModel_. When you try the example, update the code to use your values for the resource group, resource, and deployed model. 

```azurepowershell-interactive
Remove-AzCognitiveServicesAccountDeployment -ResourceGroupName OAIResourceGroup -AccountName MyOpenAIResource -Name MyModel
```

## Delete a resource

If you want to clean up after these exercises, you can remove your Azure OpenAI resource by deleting the resource through the Azure PowerShell. You can also delete the resource group. If you choose to delete the resource group, all resources contained in the group are also deleted.

To remove the resource group and its associated resources, use the [Remove-AzCognitiveServicesAccount](https://learn.microsoft.com/powershell/module/az.cognitiveservices/remove-azcognitiveservicesaccount) command.

If you're not going to continue to use the resources created in these exercises, run the following command to delete your resource group. Be sure to update the example code to use your values for the resource group and resource.

```azurepowershell-interactive
Remove-AzCognitiveServicesAccount -Name MyOpenAIResource -ResourceGroupName OAIResourceGroup
```




## Next steps

- [Get started with the Azure OpenAI security building block](https://learn.microsoft.com/azure/developer/ai/get-started-securing-your-ai-app?tabs=github-codespaces\&pivots=python)
- Learn more about the [Azure OpenAI models](../../foundry-models/concepts/models-sold-directly-by-azure.md).
- For information on pricing visit the [Azure OpenAI pricing page](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/)
