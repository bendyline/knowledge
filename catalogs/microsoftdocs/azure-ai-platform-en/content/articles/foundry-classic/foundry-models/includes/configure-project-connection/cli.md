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
