---
manager: mcleans
author: santiagxf
ms.author: fasantia 
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.date: 1/21/2025
ms.topic: include
zone_pivot_groups: azure-ai-models-deployment
---



> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


In this article, you learn how to create the resources required to use Microsoft Foundry Models in your projects.

## Understand the resources

Foundry Models is a capability in Foundry Services (formerly known Azure AI Services). You can create model deployments under the resource to consume their predictions. You can also connect the resource to Azure AI Hubs and Projects in Foundry to create intelligent applications if needed. The following picture shows the high level architecture.

A diagram showing the high level architecture of the resources created in the tutorial.

Foundry Services don't require AI projects or AI hubs to operate and you can create them to consume flagship models from your applications. However, additional capabilities are available if you **deploy a Foundry project and hub**, including playground, or agents.

The tutorial helps you create:

> 
> * A Foundry resource.
> * A model deployment for each of the models supported with serverless API deployments.
> * (Optionally) A Foundry project and hub.
> * (Optionally) A connection between the hub and the models in Foundry.

## Prerequisites

To complete this article, you need:

* An Azure subscription.

* Install the [Azure CLI](https://learn.microsoft.com/cli/azure/).

* Identify the following information:

  * Your Azure subscription ID.

## About this tutorial

The example in this article is based on code samples contained in the [Azure-Samples/azureai-model-inference-bicep](https://github.com/Azure-Samples/azureai-model-inference-bicep) repository. To run the commands locally without having to copy or paste file content, use the following commands to clone the repository and go to the folder for your coding language:

```azurecli
git clone https://github.com/Azure-Samples/azureai-model-inference-bicep
```

The files for this example are in:

```azurecli
cd azureai-model-inference-bicep/infra
```


## Permissions required to subscribe to Models from partners and community

[Foundry Models from partners and community](../../concepts/models-from-partners.md) available for deployment (for example, Cohere models) require Azure Marketplace. Model providers define the license terms and set the price for use of their models using Azure Marketplace.

When deploying third-party models, ensure you have the following permissions in your account:

> 
> * On the Azure subscription:
>   * `Microsoft.MarketplaceOrdering/agreements/offers/plans/read`
>   * `Microsoft.MarketplaceOrdering/agreements/offers/plans/sign/action`
>   * `Microsoft.MarketplaceOrdering/offerTypes/publishers/offers/plans/agreements/read`
>   * `Microsoft.Marketplace/offerTypes/publishers/offers/plans/agreements/read`
>   * `Microsoft.SaaS/register/action`
> * On the resource group—to create and use the SaaS resource:
>   * `Microsoft.SaaS/resources/read`
>   * `Microsoft.SaaS/resources/write`

The **Owner** and **Contributor** built-in roles on the Azure subscription include these permissions. If you don't have the required permissions, ask your subscription administrator to assign you the **Contributor** role, or [create a custom role](https://learn.microsoft.com/azure/role-based-access-control/custom-roles) that includes the listed actions.

To verify your permissions, go to the [Azure portal](https://portal.azure.com), open your subscription, select **Access control (IAM)** > **Check access**, and review your assigned roles.

> **Tip:**
> `Microsoft.SaaS/register/action` is a one-time registration of the SaaS resource provider on the subscription. After registration, it doesn't need to be repeated for each deployment.

## Create the resources

Follow these steps:

1. Use the template `modules/ai-services-template.bicep` to describe your Foundry Tools resource:

    __modules/ai-services-template.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/modules/ai-services-template.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/foundry-models/includes/create-resources/bicep.md)

2. Use the template `modules/ai-services-deployment-template.bicep` to describe model deployments:

    __modules/ai-services-deployment-template.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/modules/ai-services-deployment-template.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/foundry-models/includes/create-resources/bicep.md)

3. For convenience, we define the model we want to have available in the service using a JSON file. The file [__infra/models.json__](https://github.com/Azure-Samples/azureai-model-inference-bicep/blob/main/infra/models.json) contains a list of JSON object with keys `name`,`version`, `provider`, and `sku`, which defines the models the deployment will provision. Since the models support serverless API deployments, adding model deployments doesn't incur on extra cost. Modify the file by **removing/adding the model entries you want to have available**. The following example **shows only the first 7 lines** of the JSON file:

    __models.json__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/models.json](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/foundry-models/includes/create-resources/bicep.md)

4. If you plan to use projects (recommended), you need the templates for creating a project, hub, and a connection to the Foundry Tools resource:

    __modules/project-hub-template.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/modules/project-hub-template.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/foundry-models/includes/create-resources/bicep.md)

    __modules/ai-services-connection-template.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/modules/ai-services-connection-template.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/foundry-models/includes/create-resources/bicep.md)

1. Define the main deployment:

    __deploy-with-project.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/deploy-with-project.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/foundry-models/includes/create-resources/bicep.md)

2. Log into Azure:

    ```azurecli
    az login
    ```

3. Ensure you are in the right subscription:

    ```azurecli
    az account set --subscription "<subscription-id>"
    ```

4. Run the deployment:

    ```azurecli
    RESOURCE_GROUP="<resource-group-name>"
    
    az deployment group create \
      --resource-group $RESOURCE_GROUP \
      --template-file deploy-with-project.bicep
    ```

5. If you want to deploy only the Foundry Tools resource and the model deployments, use the following deployment file:

    __deploy.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/deploy.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/foundry-models/includes/create-resources/bicep.md)

6. Run the deployment:

    ```azurecli
    RESOURCE_GROUP="<resource-group-name>"
    
    az deployment group create \
      --resource-group $RESOURCE_GROUP \
      --template-file deploy.bicep
    ```

7. The template outputs the Microsoft Foundry Models endpoint that you can use to consume any of the model deployments you have created.

## Next steps

> 
<!-- BROKEN: > [Use the inference endpoint](../../how-to/inference.md) -->
