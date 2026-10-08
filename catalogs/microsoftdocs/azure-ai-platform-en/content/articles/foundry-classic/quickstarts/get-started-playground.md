---
title: "Get Answers in Chat Playground - Microsoft Foundry Quickstart (classic)"
description: "Get answers using the chat playground in Microsoft Foundry portal. Learn how to deploy models, ask questions, and get AI responses quickly with this step-by-step tutorial. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-sdk
ms.custom:
  - build-2024
  - ignite-2024
  - dev-focus
ms.topic: quickstart
ms.date: 12/19/2025
ms.reviewer: zuramir
ms.author: sgilley
author: sdgilley
ai-usage: ai-assisted
# customer intent: As a developer, I want use the chat playground in Microsoft Foundry portal so I can work with generative AI.
---

# Quickstart: Get answers in the chat playground (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



Learn how to use the chat playground in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs) to explore AI model capabilities interactively. This quickstart focuses on the web-based UI experience; to build applications programmatically, see [Build a custom chat app using the SDK](get-started-code.md).

Deploy (or reuse) a chat model and send prompts to receive AI-generated responses.

In this quickstart, you learn how to:
- Configure a system message to guide model behavior.
- Send a user question and receive a response.
- Interpret model responses and recognize limitations.
- Add safety system messages to ensure responsible AI use.

For this quickstart, you can use either a 
hub-based project or a 
Foundry project. For more information about the differences between these two project types, see [Project types](../what-is-foundry.md#types-of-projects).

## Prerequisites

* 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

* The following Azure RBAC roles are required. To verify your role, see [Manage access control](../how-to/create-azure-ai-resource.md#manage-access-control).
    * **Owner** on the subscription to create a project and assign roles.
    * **Foundry User** on the project to deploy models (assigned automatically when you create the project as Owner of the subscription).

      
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


## Deploy a model


In the portal, you can explore a rich catalog of cutting-edge models from many different providers. For this tutorial, search and then select the **gpt-4o** model.

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



1. If you're in a project, select **Microsoft Foundry** in the upper-left breadcrumb to leave the project. You'll create a new one in a moment.
1. From the landing page or **[Model catalog](https://ai.azure.com/explore/models)**, select **gpt-4o** (or **gpt-4o-mini**).

    Screenshot shows how to start with a model in Foundry portal.

1. Select **Use this model**. When prompted, enter a new project name and select **Create**.
1. Review the deployment name and select **Create**.
1. Then select **Connect and deploy** after selecting a deployment type.
1. Select **Open in playground** from the deployment page after it's deployed.
1. You land in the Chat playground with the model pre-deployed and ready to use.

If you're building an agent, you can instead start with **Create an agent**. The steps are similar, but in a different order.  Once the project is created, you arrive at the Agent playground instead of the Chat playground.



## Use the chat playground

Use the [Foundry](https://ai.azure.com/?cid=learnDocs) playground to interact with deployed chat models and test prompts in real time.

To get answers from your deployed model in the chat playground:

1. In the **System message** text box, provide a prompt to guide the assistant. For example, for a customer support scenario, use: "You're a helpful customer support agent. Answer questions about product features, pricing, and troubleshooting. If you don't know the answer, offer to escalate to a specialist." You can tailor the prompt for your specific use case.
1. Optionally, add a safety system message by selecting the **Add section** button, and then **Safety system messages**. Choose from the prebuilt messages, and then edit them to your needs.

1. Select **Apply changes** to save your changes. When prompted to see if you want to update the system message, select **Continue**. 
1. In the chat session pane, enter the following question: "How much do the TrailWalker hiking shoes cost?"
1. Select the right arrow icon to send.

    Screenshot of the first chat question without grounding data.

1. The assistant either replies that it doesn't know the answer or provides a generic response, such as noting price variability. This is expected because the model doesn't have access to current product data.

**Understanding the response:** The model generated text based on its training data and system message, but without grounding data (like a product catalog), it can't provide accurate domain-specific answers. This limitation is normal and expected in this scenario.

Next, add your data so the model can answer domain-specific questions. Try the enterprise chat web app tutorial.

### Troubleshooting

| Issue | Action |
| --- | --- |
| No deployed models listed | Deploy a model from the model catalog first. |
| Repeated generic answers | Refine system message or add domain data. |
| Safety message overrides tone | Adjust or remove conflicting safety sections. |
| Slow first response | Allow for cold start; subsequent prompts are faster. |

## Next step

> 
> [Build a custom chat app using the SDK](get-started-code.md)

## Related content

- [Deploy an enterprise chat web app](../tutorials/deploy-chat-web-app.md).
- [Add evaluations to measure response quality](../how-to/evaluate-generative-ai-app.md).
- [Fine-tune a model for improved performance](../how-to/fine-tune-serverless.md).
