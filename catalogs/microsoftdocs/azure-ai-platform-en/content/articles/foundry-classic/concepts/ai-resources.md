---
title: "Hubs and hub-based project overview (classic)"
description: "This article introduces concepts about Microsoft Foundry hubs for your Microsoft Foundry projects. (classic)"
ms.author: sgilley
author: sdgilley
ms.reviewer: deeikele
ms.date: 12/24/2025
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.topic: concept-article
ms.custom:
  - ignite-2023
  - build-2024
  - ai-learning-hub
  - ignite-2024
  - build-aifnd
  - build-2025
  - hub-only
  - dev-focus
ai-usage: ai-assisted
---

# Hub resources overview (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../how-to/migrate-project.md).


Foundry AI Hub is a resource type that you use with the Microsoft Foundry resource type. You only need it for selected use cases. Hub resources provide access to open-source model hosting and fine-tuning capabilities, as well as Azure Machine Learning capabilities, in addition to the capabilities supported by its associated Foundry resource.

> **Tip:**
> Hub resources are available in Foundry portal, Azure Machine Learning studio, and the Azure portal. The feature set and management options vary by tool.

When you create an AI Hub, you automatically provision a Foundry resource. You can use hub resources in [Foundry](https://ai.azure.com/?cid=learnDocs) and [Azure Machine Learning studio](https://ml.azure.com).

Hubs have their own project types that support a differentiated feature set from Foundry projects. See [project types](../what-is-foundry.md#which-type-of-project-do-i-need) for an overview of supported features.

## Create a hub resource

Get started by [creating your first hub in Foundry portal](../how-to/create-azure-ai-resource.md), or use [Azure portal](../how-to/create-secure-ai-hub.md) or [templates](../how-to/create-azure-ai-hub-template.md) for advanced configuration options such as networking.

Hubs group one or more projects together with common settings, including data access and security configurations. Projects act as folders to organize work and give access to developer APIs.

## Create a hub-based project

To start developing, [create a 
hub-based project](../how-to/hub-create-projects.md). You can access hub-based projects in [Foundry portal](https://ai.azure.com/?cid=learnDocs) to build with generative AI tools, and [ML Studio](https://ml.azure.com) to build with tools designed for custom machine learning model training.

## Project concepts

Projects let you create and group reusable components that you can use across tools.

| Asset | Description |
| --- | --- |
| Data | Dataset that you can use to create indexes, fine-tune models, and evaluate models. |
| Flows | An executable instruction set that can implement the AI logic.​​ |
| Evaluations | Evaluations of a model or flow. You can run manual or metrics-based evaluations. |
| Indexes | Vector search indexes generated from your data. |

Projects also have specific settings that apply only to that project:

| Asset | Description |
| --- | --- |
| Project connections | Connections to external resources like data storage providers that only you and other project members can use. They complement shared connections on the hub accessible to all projects. |
| Prompt flow runtime | Prompt flow is a feature that you can use to generate, customize, or run a flow. To use prompt flow, you need to create a runtime on top of a compute instance. |

> **Note:**
> In Foundry portal, you can also manage language and notification settings that apply to all projects that you can access regardless of the hub or project.

## Share configurations across projects using hub

A hub shares configurations for a group of projects. All projects in the hub share the same security configurations or business domain.

Shared configurations that you manage on the hub include:
* **Security** including public network access, customer-managed key encryption, and identity controls. Security settings that you configure on the hub automatically pass down to each project. A managed virtual network is shared between all projects that share the same hub.
* **Connections** let you access objects in Foundry portal that are managed outside of your hub. For example, uploaded data on an Azure storage account, or model deployments on an existing Azure OpenAI or Foundry resource. Optionally use connection to store shared credentials, so developers can implicitly access remote objects during development.
* **Compute and quota allocation** is managed as shared capacity for all projects in Foundry portal that share the same hub. This quota includes compute instance as managed cloud-based workstation for an individual. The same user can use a compute instance across projects.
* **Policy** enforced in Azure on the hub scope applies to all projects managed under it.
* **Dependent Azure resources** are set up once per hub and associated projects. You use these resources to store artifacts you generate while working in Foundry portal such as logs or when uploading data. For more information, see [dependent resources](#storage-and-key-vault-dependent-resources).

## Access Foundry models from hub-based projects

By using hubs, you can manage connections to existing Azure OpenAI or Foundry resources. Use their models and selected customization capabilities in hub-based projects. 

After you create a connection, you can access model deployments through playground experiences. When you use Fine-tuning experiences in a hub-based project, your fine-tuning jobs are implicitly executed on the connected Foundry resource (default project context).

## Storage and Key Vault dependent resources

Foundry AI Hub is an implementation of Azure Machine Learning and requires multiple Azure services as dependencies.



|Resource type|Resource provider and type|Kind|Supported capabilities|
|---|---|---|
|Microsoft Foundry|`Microsoft.CognitiveServices/account`|`AIServices`|Agents, Evaluations, Azure OpenAI, Speech, Vision, Language, and Content Understanding|
|Foundry project|`Microsoft.CognitiveServices/account/project`|`AIServices`| **Subresource to the above** |
|Azure Speech|`Microsoft.CognitiveServices/account`|`Speech`|Speech|
|Azure Language in Foundry Tools|`Microsoft.CognitiveServices/account`|`Language`|Language|
|Azure Vision in Foundry Tools|`Microsoft.CognitiveServices/account`|`Vision`|Vision|
|Azure OpenAI service|`Microsoft.CognitiveServices/account`|`OpenAI`|Azure OpenAI models and their customization|
|Azure AI Hub|`Microsoft.MachineLearningServices/workspace`|`hub`|Connectivity hub and security configuration holder for hub-based projects|
|Azure AI Hub project|`Microsoft.MachineLearningServices/workspace`|`project`|Custom ML model training and model hosting|

If you don't provide the following dependent resources, they're automatically created.


| Dependent Azure resource | Resource provider | Optional | Note |
| --- | --- | :---: | --- |
| Microsoft Foundry | `Microsoft.CognitiveServices/accounts` |  | Provides access to models and other core Foundry APIs. |
| Azure Storage account | `Microsoft.Storage/storageAccounts` |  | Stores artifacts for your projects like flows and evaluations. For data isolation, storage containers are prefixed using the project GUID, and conditionally secured using Azure ABAC for the project identity. |
| Azure Key Vault | `Microsoft.KeyVault/vaults` |  | Stores secrets like connection strings for your resource connections. For data isolation, secrets can't be retrieved across projects via APIs. |
| Azure Container Registry | `Microsoft.ContainerRegistry/registries` | ✔ | Stores docker images created when using custom runtime for prompt flow. For data isolation, docker images are prefixed using the project GUID. |
| Azure Application Insights &<br>Log Analytics Workspace | `Microsoft.Insights/components`<br>`Microsoft.OperationalInsights/workspaces` | ✔ | Used as log storage when you opt in for application-level logging for your deployed prompt flows. |
| Azure AI Search | `Microsoft.Search/searchServices` | ✔ | Provides search capabilities for your projects. |


## Next steps

- [Create a 
hub-based project](../how-to/hub-create-projects.md)
- [Quickstart: Analyze images and video in the chat playground](https://learn.microsoft.com/azure/ai-foundry/openai/gpt-v-quickstart)
- [Learn more about Foundry](../what-is-foundry.md)
- [Learn more about hub projects](../how-to/hub-create-projects.md)
