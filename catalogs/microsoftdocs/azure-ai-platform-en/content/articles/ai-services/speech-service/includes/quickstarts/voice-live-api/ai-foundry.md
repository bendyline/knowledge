---
title: include file
description: include file
author: PatrickFarley
ms.author: pafarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 3/30/2026
ms.custom: references_regions
ai-usage: ai-assisted
---

In this article, you learn how to use Voice Live with generative AI and Azure Speech in Foundry Tools in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


You create and run an application to use Voice Live directly with generative AI models for real-time voice agents.

- Using models directly allows specifying custom instructions (prompts) for each session, offering more flexibility for dynamic or experimental use cases.

- Models may be preferable when you want fine-grained control over session parameters or need to frequently adjust the prompt or configuration without updating an agent in the portal.

- The code for model-based sessions is simpler in some respects, as it does not require managing agent IDs or agent-specific setup.

- Direct model use is suitable for scenarios where agent-level abstraction or built-in logic is unnecessary.

To instead use the Voice Live API with agents, see the [Voice Live API agents quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-agents-quickstart).


## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Foundry project. If you need to create a project, see [Create a Microsoft Foundry project](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-projects.md). For more information about region availability, see the [Voice Live overview documentation](../../../voice-live.md).

> **Tip:**
> To use Voice Live, you don't need to deploy an audio model with your Microsoft Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about models availability, see the [Voice Live overview documentation](../../../voice-live.md).

## Try out Voice Live in the Speech playground

#### [Foundry (new) portal](#tab/foundry-new)


To try out the Voice Live demo, follow these steps:

1. Go to the [Voice Live feature page](https://aka.ms/foundry-voice-live) and select **Open in playground**.
1. Select a scenario and a voice using the dropdown menus. Optionally configure other parameters of the voice agent's behavior. The **Proactive engagement** toggle, for example, allows the agent to speak first in the conversation.
1. When you're ready, select **Start** to start chatting with the voice agent using your device's microphone and speakers.
1. Select **End** to end the chat session.

## Other Foundry (new) features



The following Speech features are available in the Foundry (new) portal:
- [Speech MCP server](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/azure-ai-speech)
- [Speech to text quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-to-text?context=%2Fazure%2Fai-foundry%2Fcontext%2Fcontext\&pivots=ai-foundry)
- [Text to speech quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-text-to-speech?context=%2Fazure%2Fai-foundry%2Fcontext%2Fcontext\&pivots=ai-foundry)
- [Text to speech avatar quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/text-to-speech-avatar/batch-synthesis-avatar?context=%2Fazure%2Fai-foundry%2Fcontext%2Fcontext\&pivots=ai-foundry)
- [Voice live quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-quickstart?context=%2Fazure%2Fai-foundry%2Fcontext%2Fcontext\&pivots=ai-foundry-portal)

#### [Foundry (classic) portal](#tab/foundry-classic)

To try out the Voice Live demo, follow these steps:

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



1. Select **Playgrounds** from the left pane.
1. In the **Speech playground** tile, select **Try the Speech playground**.
1. Select **Speech capabilities by scenario** > **Voice Live**.

   Screenshot of filtering Speech service capabilities by scenario.

1. Select a sample scenario, such as **Casual chat**.

   Screenshot of selecting the casual chat example scenario in the Speech playground.

1. Select **Start** to start chatting with the chat agent.

1. Select **End** to end the chat session.

1. Select a new generative AI model from the drop-down list via **Configuration** > **GenAI** > **Generative AI model**. 

   > **Note:**
   > You can also select an agent that you configured in the **Agents** playground. For more information, see the [Voice Live with Foundry agents quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-agents-quickstart).

   Screenshot of the casual chat example scenario in the Speech playground.

1. Edit other settings as needed, such as the **Response instructions**, **Voice**, and **Speaking rate**. The **Proactive engagement** allows the agent to speak first in the conversation.

1. Select **Start** to start speaking again and select **End** to end the chat session.


---
