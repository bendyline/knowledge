---
title: "Text to speech avatar quickstart - Speech service"
titleSuffix: Foundry Tools
description: Learn how to create an app that converts text to avatar video, and explore supported functions and custom configuration options.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: quickstart
ms.date: 3/30/2026
ms.author: pafarley
ai-usage: ai-assisted
---

# Quickstart: Text to speech avatar

In this quickstart, you learn how to use text to speech avatar to generate synthetic avatar videos from text input. You can try the feature in the Foundry portal playground and explore both standard avatar video generation and interactive real-time avatars.

## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Foundry project. If you need to create a project, see [Create a Microsoft Foundry project](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-projects.md).
- For the current list of regions that support text to speech avatar, see the [Speech service regions table](../regions.md?tabs=ttsavatar).

## Try text to speech avatar video generation

Try text to speech avatar in the Foundry portal by following these steps.

#### [Foundry (new) portal](#tab/new-foundry)

1. Go to the [Text to Speech Avatar feature page](https://aka.ms/foundry-text-to-speech-avatar) and select **Open in playground**.
1. Choose a standard avatar from the Avatar list, and select background and voice.
1. Enter your sample text in the text box.
1. Select **Play audio** to hear the synthetic voice read your text without generating avatar video.
1. Select **Generate** to view the synthetic avatar video.

## Other Foundry (new) features


The following Speech features are available in the Foundry (new) portal:
- [Speech MCP server](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/azure-ai-speech)
- [Speech to text quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-speech-to-text?context=%2Fazure%2Fai-foundry%2Fcontext%2Fcontext\&pivots=ai-foundry)
- [Text to speech quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/get-started-text-to-speech?context=%2Fazure%2Fai-foundry%2Fcontext%2Fcontext\&pivots=ai-foundry)
- [Text to speech avatar quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/text-to-speech-avatar/batch-synthesis-avatar?context=%2Fazure%2Fai-foundry%2Fcontext%2Fcontext\&pivots=ai-foundry)
- [Voice live quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-quickstart?context=%2Fazure%2Fai-foundry%2Fcontext%2Fcontext\&pivots=ai-foundry-portal)

#### [Foundry (classic) portal](#tab/classic-foundry)

1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



1. Select **Playgrounds** from the left pane and then select a playground to use. In this example, select **Try the Speech playground**.
1. Select **Text to speech avatar**.
1. Select an avatar from the avatar list, and select background, language, and voice.
1. Enter your sample text in the text box.
1. Select **Play audio** to hear the synthetic voice read your text without generating avatar video.
1. Select **Generate video** to view the synthetic avatar video.

---

## Try interactive text to speech avatar

Try real-time interactive avatar using Voice Live in the Foundry portal.

1. Open the [Voice Live quickstart](../voice-live-quickstart.md).
1. In Voice Live, after configuring the parameters, turn on the avatar toggle button.
1. Select an avatar from the avatar list.
1. Apply changes and select **Start** to start chatting with the avatar.
