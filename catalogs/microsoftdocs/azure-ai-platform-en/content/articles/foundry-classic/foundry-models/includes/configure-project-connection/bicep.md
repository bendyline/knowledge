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


You can use Microsoft Foundry Models in your projects in Foundry to create rich applications and interact/manage the models available. To use the Foundry Models service in your project, you need to create a connection to the Foundry resource (formerly known Azure AI Services).

The following article explains how to create a connection to the Foundry resource (formerly known Azure AI Services) to use Foundry Models.

A diagram with the overall architecture of Azure Marketplace integration with Foundry Models.

## Prerequisites

To complete this article, you need:

* An Azure subscription.

* A Foundry resource (formerly known as Azure AI Services). For more information, see [Create and configure all the resources for Foundry Models](../../../quickstarts/get-started-code.md).


* A Foundry project with an AI Hub.

* Install the [Azure CLI](https://learn.microsoft.com/cli/azure/).

* Identify the following information:

  * Your Azure subscription ID.

  * Your Foundry Tools resource name.
  
  * Your Foundry Tools resource ID.
  
  * The name of the Azure AI Hub where the project is deployed.

  * The resource group where the Foundry Tools resource is deployed.

## Add a connection

1. Use the template `ai-services-connection-template.bicep` to describe connection:

    __ai-services-connection-template.bicep__

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/modules/ai-services-connection-template.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/includes/configure-project-connection/bicep.md)

4. Run the deployment:

    ```azurecli
    RESOURCE_GROUP="<resource-group-name>"
    ACCOUNT_NAME="<azure-ai-model-inference-name>" 
    ENDPOINT_URI="https://<azure-ai-model-inference-name>.services.ai.azure.com"
    RESOURCE_ID="<resource-id>"
    HUB_NAME="<hub-name>"
    
    az deployment group create \
        --resource-group $RESOURCE_GROUP \
        --template-file ai-services-connection-template.bicep \
        --parameters accountName=$ACCOUNT_NAME hubName=$HUB_NAME endpointUri=$ENDPOINT_URI resourceId=$RESOURCE_ID
    ```
