---
title: Include file
description: Include file
author: sdgilley
ms.reviewer: sgilley
ms.author: sgilley
ms.service: microsoft-foundry
ms.topic: include
ms.date: 11/05/2025
ms.custom: include, update-code6
---

Interacting with a model is the basic building block of AI applications.  Send an input and receive a response from the model:

# [Python](#tab/python)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/python/quickstart/responses/quickstart-responses.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-chat.md)

 # [C#](#tab/csharp)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/csharp/quickstart/responses/quickstart-responses.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-chat.md)

# [TypeScript](#tab/typescript)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/typescript/quickstart/responses/src/quickstart-responses.ts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-chat.md)

# [Java](#tab/java)

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/java/quickstart/responses/src/main/java/com/azure/ai/foundry/samples/CreateResponse.java](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-chat.md)

# [REST API](#tab/rest)

Replace `YOUR-FOUNDRY-RESOURCE-NAME` with your values:

[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples/REST/quickstart/quickstart-responses.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/includes/quickstart-v2-chat.md)

# [Foundry portal](#tab/portal)

1. After the model deploys, you're automatically moved from **Home** to the **Build** section. Your new model is selected and ready for you to try out.

    > **Tip:**
    > If you skipped deployment, select **Test in playground** from the home page. Select the instant access model you want to use, such as `gpt-5-mini`. (During preview, these instant access models are available only for projects in **West US3**.)

1. Start chatting with your model, for example, "Write me a poem about flowers."

---

After running the code, you see a model-generated response in the console (for example, a short poem or answer to your prompt). This confirms your project endpoint, authentication, and model deployment are working correctly.


> **Tip:**
> Code uses **Azure AI Projects 2.x** and is incompatible with Azure AI Projects 1.x. [See the Foundry (classic) documentation](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/index.yml)  for the Azure AI Projects 1.x version.
