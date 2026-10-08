---
manager: mcleans
author: ssalgadodev
ms.author: ssalgado
ms.reviewer: fasantia
ms.service: microsoft-foundry
ms.subservice: foundry-model-inference
ms.date: 1/21/2025
ms.topic: include
zone_pivot_groups: azure-ai-models-deployment
ms.custom: classic-and-new
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

## Create the resources

To create a project with a Microsoft Foundry (formerly known Azure AI Services) resource, follow these steps:

1. Go to [Foundry portal](https://ai.azure.com/?cid=learnDocs).

2. On the landing page, select **Create project**.

3. Give the project a name, for example "my-project".

4. In this tutorial, we create a brand new project under a new AI hub, hence, select **Create new hub**.

5. Give the hub a name, for example "my-hub" and select **Next**.

6. The wizard updates with details about the resources that are going to be created. Select **Azure resources to be created** to see the details.

    Screenshot showing the details of the project and hub to be created.

7. You can see that the following resources are created:

    | Property | Description |
    | --- | --- |
    | Resource group | The main container for all the resources in Azure. This helps get resources that work together organized. It also helps to have a scope for the costs associated with the entire project. |
    | Location | The region of the resources that you're creating. |
    | Hub | The main container for AI projects in Foundry. Hubs promote collaboration and allow you to store information for your projects. |
    | Foundry | In this tutorial, a new account is created, but Foundry Services can be shared across multiple hubs and projects. Hubs use a connection to the resource to have access to the model deployments available there. To learn how, you can create connections between projects and Foundry to consume Foundry Models you can read [Connect your AI project](../../../../foundry-classic/foundry-models/how-to/configure-project-connection.md). |

8. Select **Create**. The resources creation process starts. 

9. Once completed, your project is ready to be configured.

10. To use Foundry Models, you need to add model deployments.

## Next steps

> 
> [Add and configure models](../../how-to/create-model-deployments.md)
