---
title: include file
description: include file
author: PatrickFarley
ms.author: pafarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 7/31/2025
ms.custom: references_regions
ai-usage: ai-assisted
---

Learn how to use Voice Live with [Microsoft Foundry Agent Service](https://learn.microsoft.com/azure/ai-foundry/agents/overview) and [Azure Speech in Foundry Tools](https://learn.microsoft.com/azure/ai-services/speech-service/overview) in the Microsoft Foundry portal.


Create and run applications to use Voice Live with agents for real-time voice conversations.

Agents provide several advantages:

- Use centralized configuration in the agent itself instead of session code.
- Handle complex logic and conversational behaviors for easier updates.
- Connect automatically by using your agent ID, with all settings managed internally.
- Support multiple conversational experiences without changing client code.

To use Voice Live without agents, see the [Voice Live API quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-quickstart).


## Prerequisites
<!--
#### [Foundry (new) portal](#tab/foundry-new)

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [Microsoft Foundry resource](../../../../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](../../../voice-live.md).
- A Foundry agent created in [!INCLUDE [foundry-link](../../../../../foundry/includes/foundry-link.md)]. For more information about creating an agent, see the [Create an agent quickstart](/azure/ai-foundry/agents/quickstart).


#### [Foundry (classic) portal](#tab/foundry-classic)
-->
- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [Microsoft Foundry resource](../../../../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](../../../voice-live.md).
- A Microsoft Foundry agent created in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs). For more information about creating an agent, see the [Create an agent quickstart](https://learn.microsoft.com/azure/ai-foundry/agents/quickstart).
<!--
---
-->

> **Tip:**
> To use Voice Live, you don't need to deploy an audio model with your Microsoft Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about models availability, see the [Voice Live overview documentation](../../../voice-live.md).

## Try out Voice Live in the playground

To try out the Voice Live demo, follow these steps:

<!--
#### [Foundry (new) portal](#tab/foundry-new)

1. [!INCLUDE [foundry-sign-in](../../../../../foundry/includes/foundry-sign-in.md)]

1. Select **Build** in the upper right menu, and select **Agents** from the left pane. 

1. Select the agent you created previously to go to the **Agent playground**.

1. Switch the **Enable Voice Live for this agent** toggle **On**. Now your agent is connected Voice Live.

1. Expand the right pane, which contains the Voice Live settings. Optionally choose a voice, adjust the VAD settings, set the voice temperature and speed, and other settings to configure voice behavior. The **Proactive engagement** toggle allows the agent to speak first in the conversation.
 
1. Select **Start** to start speaking and select **End** to end the chat session.

#### [Foundry (classic) portal](#tab/foundry-classic)
-->
1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.


 
1. Select **Playgrounds** from the left pane.
1. In the **Speech playground** tile, select **Try the Speech playground**.
1. Select **Speech capabilities by scenario** > **Voice Live**.

   Screenshot of filtering Speech service capabilities by scenario.

1. Select an agent that you configured in the **Agents** playground.

   Screenshot of the option to bring an agent for Voice Live in the speech playground.

1. Edit other settings as needed, such as the **Voice**, **Speaking rate**, and **Voice activity detection (VAD)**. The **Proactive engagement** toggle allows the agent to speak first in the conversation.

1. Select **Start** to start speaking and select **End** to end the chat session.

<!--
---
-->
