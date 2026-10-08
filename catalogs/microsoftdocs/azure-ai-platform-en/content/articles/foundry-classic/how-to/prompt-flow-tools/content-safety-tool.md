---
title: "Content Safety tool for flows in Microsoft Foundry portal (classic)"
description: "This article introduces you to the Content Safety tool for flows in Microsoft Foundry portal. (classic)"
ms.service: microsoft-foundry
ms.subservice: prompt-flow
ms.custom:
  - ignite-2023
  - build-2024
  - hub-only
ms.topic: concept-article
ms.date: 01/27/2026
ms.reviewer: none
ms.author: lagayhar
author: lgayhardt
ms.collection: ce-skilling-ai-copilot, ce-skilling-fresh-tier1
---

# Guardrails and controls tool for flows in Microsoft Foundry portal (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




> **Warning:**
> Prompt flow in Microsoft Foundry and Azure Machine Learning will be retired on April 20, 2027. Prompt flow is no longer 
> recommended for new development. Migrate existing Prompt flow applications and deployments to Microsoft Agent Framework before 
> April 20, 2027.
>  
> Prompt flow container images are no longer receiving updates, including security and package updates. This applies to Prompt 
> flow runtime images, including `promptflow-runtime`, `promptflow-runtime-stable`, and `promptflow-python`.
>  
> After April 20, 2027, Prompt flow, including the web authoring experience in Microsoft Foundry and Azure Machine Learning, the 
> VS Code extensions, and related Prompt flow container images, will no longer be supported or available.
 > 
> If your application depends on Prompt flow deployments or runtime images, plan to move those workloads to supported 
> alternatives such as [Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/) before the retirement date. For migration guidance, see the Prompt flow [migration guide](../prompt-flow-migration-overview.md) and migration [code samples](https://github.com/microsoft/promptflow/tree/main/migration-guide/PromptFlow-to-MAF).




The prompt flow Content Safety tool enables you to use Azure AI Content Safety in Microsoft Foundry portal.

Azure AI Content Safety is a content moderation service that helps detect harmful content from different modalities and languages. For more information, see [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/).

## Prerequisites



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](../migrate-project.md).


- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- If you don't have one, [create a hub-based project](../hub-create-projects.md).


To create an Azure Content Safety connection:

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



1. Go to **Project settings** > **Connections**.
1. Select **+ New connection**.
1. Complete all steps in the **Create a new connection** dialog. You can use a Foundry hub or Azure AI Content Safety resource. Use a hub that supports multiple Foundry Tools.

## Build with the Content Safety tool

1. Create or open a flow in [Foundry](https://ai.azure.com/?cid=learnDocs). For more information, see [Create a flow](../flow-develop.md).
1. Select **+ More tools** > **Content Safety (Text)** to add the Content Safety tool to your flow.

    Screenshot that shows the Content Safety tool added to a flow in Foundry portal.

1. Select the connection to one of your provisioned resources. For example, select **AzureAIContentSafetyConnection** if you created a connection with that name. For more information, see [Prerequisites](#prerequisites).
1. Enter values for the Content Safety tool input parameters described in the [Inputs table](#inputs).
1. Add more tools to your flow, as needed. Or select **Run** to run the flow.
1. The outputs are described in the [Outputs table](#outputs).

## Inputs

The following input parameters are available.

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| text | string | The text that needs to be moderated. | Yes |
| hate_category | string | The moderation sensitivity for the Hate category. Choose from four options: `disable`, `low_sensitivity`, `medium_sensitivity`, or `high_sensitivity`. The `disable` option means no moderation for the Hate category. The other three options mean different degrees of strictness in filtering out hate content. The default option is `medium_sensitivity`. | Yes |
| sexual_category | string | The moderation sensitivity for the Sexual category. Choose from four options: `disable`, `low_sensitivity`, `medium_sensitivity`, or `high_sensitivity`. The `disable` option means no moderation for the Sexual category. The other three options mean different degrees of strictness in filtering out sexual content. The default option is `medium_sensitivity`. | Yes |
| self_harm_category | string | The moderation sensitivity for the Self-harm category. Choose from four options: `disable`, `low_sensitivity`, `medium_sensitivity`, or `high_sensitivity`. The `disable` option means no moderation for the Self-harm category. The other three options mean different degrees of strictness in filtering out self-harm content. The default option is `medium_sensitivity`. | Yes |
| violence_category | string | The moderation sensitivity for the Violence category. Choose from four options: `disable`, `low_sensitivity`, `medium_sensitivity`, or `high_sensitivity`. The `disable` option means no moderation for the Violence category. The other three options mean different degrees of strictness in filtering out violence content. The default option is `medium_sensitivity`. | Yes |

## Outputs

The following JSON format response is an example returned by the tool:

```json
{
    "action_by_category": {
      "Hate": "Accept",
      "SelfHarm": "Accept",
      "Sexual": "Accept",
      "Violence": "Accept"
    },
    "suggested_action": "Accept"
  }
```

Use the following parameters as inputs for this tool.

| Name | Type | Description |
| --- | --- | --- |
| action_by_category | string | A binary value for each category: `Accept` or `Reject`. This value shows if the text meets the sensitivity level that you set in the request parameters for that category. |
| suggested_action | string | An overall recommendation based on the four categories. If any category has a `Reject` value, `suggested_action` is also `Reject`. |

## Next steps

- [Learn more about how to create a flow](../flow-develop.md)
