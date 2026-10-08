---
title: "Configure a connection to use Microsoft Foundry Models in your AI project (classic)"
description: "Learn how to configure a connection to use Microsoft Foundry Models in your project. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.topic: how-to
ms.date: 03/31/2026
ms.custom: ignite-2024, github-universe-2024
author: ssalgadodev
ms.author: ssalgado
recommendations: false
zone_pivot_groups: azure-ai-models-deployment
ms.reviewer: fasantia
reviewer: santiagxf
---

# Configure a connection to use Microsoft Foundry Models in your AI project (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



**Applies to: ai-foundry-portal**



You can use Microsoft Foundry Models in your projects in Foundry to create rich applications and interact/manage the models available. To use the Foundry Models service in your project, you need to create a connection to the Foundry resource (formerly known Azure AI Services).

The following article explains how to create a connection to the Foundry resource (formerly known Azure AI Services) to use Foundry Models.

A diagram with the overall architecture of Azure Marketplace integration with Foundry Models.

## Prerequisites

To complete this article, you need:

* An Azure subscription.

* A Foundry resource (formerly known as Azure AI Services). For more information, see [Create and configure all the resources for Foundry Models](../../quickstarts/get-started-code.md).


* An AI project resource.

* The **Deploy models to Azure AI model inference service** feature is turned on.

   An animation showing how to turn on the Deploy models to Azure AI model inference service feature in Microsoft Foundry portal.

## Add a connection

You can create a connection to a Foundry Tools resource using the following steps:

1. Go to [Foundry portal](https://ai.azure.com/?cid=learnDocs).

2. In the lower left corner of the screen, select **Management center**.

3. In the section **Connected resources** select **New connection**.

4. Select **Foundry Tools**.

5. In the browser, look for an existing Foundry Tools resource in your subscription.

6. Select **Add connection**.

7. The new connection is added to your Hub.

8. Return to the project's landing page to continue and now select the new created connection. Refresh the page if it doesn't show up immediately. 

   Screenshot of the landing page for the project, highlighting the location of the connected resource and the associated inference endpoint.

## See model deployments in the connected resource

You can see the model deployments available in the connected resource by following these steps:

1. Go to [Foundry portal](https://ai.azure.com/?cid=learnDocs).

2. On the left pane, select **Models + endpoints**.

3. The page displays the model deployments available to your, grouped by connection name. Locate the connection you have just created, which should be of type **Foundry Tools**.

   Screenshot showing the list of models available under a given connection.

4. Select any model deployment you want to inspect.

5. The details page shows information about the specific deployment. If you want to test the model, you can use the option **Open in playground**.

6. The Foundry playground is displayed, where you can interact with the given model.



**Applies to: programming-language-cli**



You can use Microsoft Foundry Models in your projects in Foundry to create rich applications and interact/manage the models available. To use the Foundry Models service in your project, you need to create a connection to the Foundry resource (formerly known Azure AI Services).

The following article explains how to create a connection to the Foundry resource (formerly known Azure AI Services) to use Foundry Models.

A diagram with the overall architecture of Azure Marketplace integration with Foundry Models.

## Prerequisites

To complete this article, you need:

* An Azure subscription.

* A Foundry resource (formerly known as Azure AI Services). For more information, see [Create and configure all the resources for Foundry Models](../../quickstarts/get-started-code.md).


* Install the [Azure CLI](https://learn.microsoft.com/cli/azure/) and the `ml` extension for Microsoft Foundry:

    ```azurecli
    az extension add -n ml
    ```

* Identify the following information:

  * Your Azure subscription ID.

  * Your Foundry Tools resource name.

  * The resource group where the Foundry Tools resource is deployed.
    
    
### Add a connection

To add a model, you first need to identify the model that you want to deploy. You can query the available models as follows:

1. Log in into your Azure subscription:

    ```azurecli
    az login
    ```

2. Configure the CLI to point to the project:

    ```azurecli
    az account set --subscription <subscription>
    az configure --defaults workspace=<project-name> group=<resource-group> location=<location>
    ```

3. Create a connection definition:

    __connection.yml__

    ```yml
    name: <connection-name>
    type: aiservices
    endpoint: https://<ai-services-resourcename>.services.ai.azure.com
    api_key: <resource-api-key>
    ```
4. Create the connection:

    ```azurecli
    az ml connection create -f connection.yml
    ```
5. At this point, the connection is available for consumption.


**Applies to: programming-language-bicep**



You can use Microsoft Foundry Models in your projects in Foundry to create rich applications and interact/manage the models available. To use the Foundry Models service in your project, you need to create a connection to the Foundry resource (formerly known Azure AI Services).

The following article explains how to create a connection to the Foundry resource (formerly known Azure AI Services) to use Foundry Models.

A diagram with the overall architecture of Azure Marketplace integration with Foundry Models.

## Prerequisites

To complete this article, you need:

* An Azure subscription.

* A Foundry resource (formerly known as Azure AI Services). For more information, see [Create and configure all the resources for Foundry Models](../../quickstarts/get-started-code.md).


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

    [Code reference unavailable in this source snapshot: ~/azureai-model-inference-bicep/infra/modules/ai-services-connection-template.bicep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/foundry-models/how-to/configure-project-connection.md)

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



## Next steps

* [Develop applications using Microsoft Foundry Models](../supported-languages.md)
