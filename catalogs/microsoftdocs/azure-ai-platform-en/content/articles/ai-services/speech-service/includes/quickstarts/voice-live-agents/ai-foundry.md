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

Learn how to use Voice Live with [Microsoft Foundry Agent Service](https://learn.microsoft.com/azure/ai-foundry/agents/overview) and [Azure Speech in Foundry Tools](https://learn.microsoft.com/azure/ai-services/speech-service/overview) in the Microsoft Foundry portal.


You can create and run an application to use Voice Live with agents for real-time voice agents.

- Using agents allows leveraging a built-in prompt and configuration managed within the agent itself, rather than specifying instructions in the session code. 

- Agents encapsulate more complex logic and behaviors, making it easier to manage and update conversational flows without changing the client code. 

- The agent approach streamlines integration. The agent ID is used to connect and all necessary settings are handled internally, reducing the need for manual configuration in the code. 

- This separation also supports better maintainability and scalability for scenarios where multiple conversational experiences or business logic variations are needed.

To use the Voice Live API without Foundry agents, see the [Voice Live API quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-quickstart).

> **Tip:**
> To use Voice Live, you don't need to deploy an **audio** model with your Microsoft Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about models availability, see the [Voice Live overview documentation](../../../voice-live.md).


<!-- #### [Foundry (new) portal](#tab/foundry-new) -->

## Prerequisites

> **Note:**
> This document refers to the [Microsoft Foundry (new)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md#microsoft-foundry-portals) portal.

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [Microsoft Foundry resource](../../../../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](../../../voice-live.md).
- A Foundry agent created in 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. For more information about creating an agent, see the [Create an agent quickstart](https://learn.microsoft.com/azure/ai-foundry/agents/quickstart).

## Try out Voice Live in the playground

To try out the Voice Live demo, follow these steps:

1. Go to the [Voice Live feature page](https://aka.ms/foundry-voice-live) and select **Open in playground**.

1. Select the agent you created previously to go to the **Agent playground**.

1. Switch the **Voice mode** toggle **On**. Your agent now connects to Voice Live.

1. Expand the right pane, which contains the Voice Live settings. Optionally choose a voice, adjust the VAD settings, set the voice temperature and speed, and change other settings to configure voice behavior.
 
1. Select **Start session** to start the voice conversation, and select **End** to end the chat session.

<!-- #### [Foundry (classic) portal](#tab/foundry-classic)

## Prerequisites

> [!NOTE]
> This document refers to the [Microsoft Foundry (classic)](../../../../../ai-foundry/what-is-foundry.md#microsoft-foundry-portals) portal.
>
> 🔄 [Switch to the Microsoft Foundry (new) documentation]() if you're using the new portal.

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [Microsoft Foundry resource](../../../../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](../../../voice-live.md).
- A Microsoft Foundry agent created in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs). For more information about creating an agent, see the [Create an agent quickstart](/azure/ai-foundry/agents/quickstart).

## Try out Voice Live in the playground

To try out the Voice Live demo, follow these steps:

1. [!INCLUDE [classic-sign-in](../../../../../foundry-classic/includes/classic-sign-in.md)] 
1. Select **Playgrounds** from the left pane.
1. In the **Speech playground** tile, select **Try the Speech playground**.
1. Select **Speech capabilities by scenario** > **Voice Live**.

   :::image type="content" source="../../../media/voice-live/foundry-portal/capabilities-by-scenario.png" alt-text="Screenshot of filtering Speech service capabilities by scenario." lightbox="../../../media/voice-live/foundry-portal/capabilities-by-scenario.png":::

1. Select an agent that you configured in the **Agents** playground.

   :::image type="content" source="../../../media/voice-live/foundry-portal/casual-chat-bring-agent-select.png" alt-text="Screenshot of the option to bring an agent for Voice Live in the speech playground." lightbox="../../../media/voice-live/foundry-portal/casual-chat-bring-agent-select.png":::

1. Edit other settings as needed, such as the **Voice**, **Speaking rate**, and **Voice activity detection (VAD)**.

1. Select **Start** to start speaking and select **End** to end the chat session. 

---

-->
