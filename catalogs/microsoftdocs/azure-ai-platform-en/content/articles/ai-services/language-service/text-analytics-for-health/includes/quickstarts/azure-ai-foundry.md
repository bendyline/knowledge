---
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: include
ms.date: 06/02/2026
ms.author: lajanuar
ms.custom: doc-kit-assisted
---
<!-- markdownlint-disable MD041 -->
## Prerequisites

> **Tip:**
>
> * If you already have an Azure Language in Foundry Tools or multi-service resource—whether used on its own or through Language Studio—you can continue to use those existing Language resources within the Microsoft Foundry portal.
> * For more information, see [Connect services in the Microsoft Foundry portal](../../../../connect-services-foundry-portal.md).
> * Consider using a Foundry resource for the best experience. You can also follow these instructions with a Language resource.

* **Azure subscription**. If you don't have one, you can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* **Requisite permissions**. Make sure the person establishing the account and project is assigned as the **Foundry Account Owner** role at the subscription level. Alternatively, having either the **Contributor** or **Cognitive Services Contributor** role at the subscription scope also meets this requirement. For more information, see [Role based access control (RBAC)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/openai/how-to/role-based-access-control.md#cognitive-services-contributor).
* **Foundry resource**. Create a [Foundry resource](../../../../multi-service-resource.md). Alternatively, you can use a [Language resource](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#create/Microsoft.CognitiveServicesTextAnalytics).
* **A Foundry project**. For more information, see [Create a Foundry project](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-projects.md).

## Role-based access control (RBAC) requirements

Assign the correct roles to your user principal and project managed identity to access the Text Analytics for Health playground. Microsoft recommends using Microsoft Entra ID authentication, which enforces role-based restrictions. Key-based authentication grants full access without role checks and should be avoided in production environments.

> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged.

* Assign the minimum required roles to both your user principal and project managed identity so they can access Foundry features.

* Verify current assignments using [Check access for a user to a single Azure resource](https://learn.microsoft.com/azure/role-based-access-control/check-access).

### [New Foundry](#tab/new-foundry)

> **Note:**
> This content refers to the [new Foundry](https://ai.azure.com/) portal, which supports only [Foundry projects](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md) and provides streamlined access to models, agents, and tools. To confirm that you're using new Foundry, make sure the version toggle in the portal banner is in the **on** position. 

You can use [new Foundry playground](https://ai.azure.com/) to:

> 
>
> * Extract health entities from clinical text
> * Review detected entities, categories, and confidence scores
> * Return structured output in FHIR format

## Navigate to the new Foundry playground

The active project appears in the upper-left corner. To create a new project:

1. Open the project drop-down menu.
1. Enter a project name or select an existing one.
1. Select **Create project**.

   Screenshot of the new Foundry homepage.

There are two ways to access the Text Analytics for Health interface:

1. Select the **Discover** tab from the upper right navigation bar to go to the **Models** page.
   * In the search bar under models, enter **Azure** and press enter.
   * Select **Text Analytics for Health** from the search results.
   * Select the **Open in Playground** button.

1. Select the **Build** tab from the upper right navigation bar.
   * From the left navigation bar, select **Models**.
   * Select the **AI services** tab.
   * Select **Text Analytics for Health** to go to the playground.

## Extract health information

The **Text Analytics for Health** model identifies and extracts health-related entities and relationships from clinical and biomedical text. The playground provides configuration options to customize your preferences and detailed output to review detected entities and their confidence scores.

1. On the **Playground** tab, select **Azure Language—Text Analytics for Health** from the drop-down menu.

1. Select the sample text, use the paperclip icon to upload your text, or enter your own clinical text.

1. In the **Configure** side panel, you can set the following options:

    | Option | Description |
    | --- | --- |
    | **API version** | Select the API version that you prefer to use. |
    | **Model version** | Select the model version that you prefer to use. |
    | **Language** | Select the language in which your source text is written. |
    | **Return output in FHIR structure** | Returns the output in the Fast Healthcare Interoperability Resources (FHIR) structure. |

1. After you make your selections, choose the **Detect** button. Detected entities are highlighted in the text and you can review the accompanying details in formatted text or as a JSON response.

    | Field | Description |
    | --- | --- |
    | **Entity** | The detected entity. |
    | **Category** | The type of entity that was detected. |
    | **Confidence** | The model's level of certainty regarding whether it correctly identified an entity type. |

Verify that the detected entities match the health information in your input text. You can use the **Edit** button to modify the **Configure** parameters and rerun detection as needed.

### [Foundry (classic)](#tab/foundry-classic)

> **Note:**
> This content refers to the [Foundry (classic)](https://ai.azure.com/) portal, which supports hub-based projects and other resource types. To confirm that you're using Foundry (classic), make sure the version toggle in the portal banner is in the **off** position. 

You can use [Foundry (classic)](https://ai.azure.com/) to:

> 
>
> * Extract health entities from clinical text
> * Review detected entities, categories, and confidence scores
> * Return structured output in FHIR format

## Navigate to the Foundry (classic) playground

1. In the left pane, select **Playgrounds**.
1. Select the **Try Azure Language Playground** button.

Screenshot showing the Playgrounds navigation and the Try Azure Language Playground button in Foundry (classic).

## Extract health information in the Foundry (classic) playground

The **Language Playground** consists of four sections:

| Section | Purpose |
| --- | --- |
| **Top banner** | Select the input language and choose a Language capability. |
| **Left pane** | Set **Configuration** options such as API version, model version, and output format. |
| **Center pane** | Enter text for processing and review highlighted results. |
| **Right pane** | View **Details** for each detected entity. |

Select **Extract health information** from the top banner tiles to get started.

In **Configuration** you can select from the following options:

| Option | Description |
| --- | --- |
| Select API version | Select which version of the API to use. |
| Select model version | Select which version of the model to use. |
| Select text language | Select the language of your input text. |
| Return output in FHIR structure | Returns the output in the Fast Healthcare Interoperability Resources (FHIR) structure. |

After the operation completes, the type of entity is displayed beneath each entity in the center pane.

The **Details** section contains the following fields for each entity:

| Field | Description |
| --- | --- |
| Entity | The detected entity. |
| Category | The type of entity that was detected. |
| Confidence | The model's level of certainty that the entity type is correct. |

A screenshot of an example of extract health information in Foundry portal.

Verify that each health entity appears highlighted with the correct category label. If no entities appear, check that the input text contains recognizable health terminology and that the correct API version is selected.

## Open in Visual Studio Code

After validating your scenario in the playground, select **Open in VS Code** to carry your current configuration directly into a development environment—no manual setup required.

1. Configure your scenario in the playground:
   - Select your API version and model version.
   - Enter and test your sample input.
   - Adjust options such as entity types and FHIR output format.
1. Select **Open in VS Code**.
1. Visual Studio Code opens with a preconfigured code sample that reflects your playground configuration, including your API version, model, and health detection settings.

> **Tip:**
> Use the playground to compare outputs across API versions—for example, preview versus GA—before exporting your configuration to code.

---
