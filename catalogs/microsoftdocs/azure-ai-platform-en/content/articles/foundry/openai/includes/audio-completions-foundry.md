---
manager: mcleans
author: PatrickFarley
ms.author: pafarley
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.topic: include
ms.date: 1/7/2025
---


Audio-enabled models introduce the audio modality into the existing `/chat/completions` API. The audio model expands the potential for AI applications in text and voice-based interactions and audio analysis. Modalities supported in `gpt-4o-audio-preview` and `gpt-4o-mini-audio-preview` models include: text, audio, and text + audio.

Here's a table of the supported modalities with example use cases:

| Modality input | Modality output | Example use case |
| --- | --- | --- |
| Text | Text + audio | Text to speech, audio book generation |
| Audio | Text + audio | Audio transcription, audio book generation |
| Audio | Text | Audio transcription |
| Text + audio | Text + audio | Audio book generation |
| Text + audio | Text | Audio transcription |

By using audio generation capabilities, you can achieve more dynamic and interactive AI applications. Models that support audio inputs and outputs allow you to generate spoken audio responses to prompts and use audio inputs to prompt the model. 

## Supported models

The following OpenAI models support audio generation:

| Model | Audio generation? | Primary Use |
| --- | --- | --- |
| `gpt-4o-audio-preview` | ✔️ | Chat completions with spoken output |
| `gpt-4o-mini-tts` | ✔️ | Fast, scalable text-to-speech |
| `gpt-4o-mini-audio-preview` | ✔️ | Asynchronous audio generation |
| `gpt-realtime` | ✔️ | Real‑time interactive voice |
| `gpt-realtime-mini` | ✔️ | Low‑latency audio streaming |
| `tts-1` / `tts-1-hd` | ✔️ | General‑purpose speech synthesis |

For information about region availability, see the [models and versions documentation](../../foundry-models/concepts/models-sold-directly-by-azure.md).

> **Note:**
> The [Realtime API](../how-to/realtime-audio-websockets.md#voice-agent-quickstart) uses the same underlying GPT-4o audio model as the completions API, but is optimized for low-latency, real-time audio interactions.

## Input requirements

The following voices are supported for audio out: Alloy, Ash, Ballad, Coral, Echo, Sage, Shimmer, Verse, Marin, and Cedar.

The following audio output formats are supported: wav, mp3, flac, opus, pcm16, and aac.

The maximum audio file size is 20 MB.


## API support

Support for audio completions was first added in API version `2025-01-01-preview`. 


## Deploy a model for audio generation


To deploy the `gpt-4o-mini-audio-preview` model in the Microsoft Foundry portal:
1. Go to the [Foundry portal](https://ai.azure.com/?cid=learnDocs) and create or select your project. 
1. Select **Models + endpoints** from under **My assets** in the left pane.
1. Select **+ Deploy model** > **Deploy base model** to open the deployment window. 
1. Search for and select the `gpt-4o-mini-audio-preview` model and then select **Confirm**.
1. Review the deployment details and select **Deploy**.
1. Follow the wizard to finish deploying the model.

Now that you have a deployment of the `gpt-4o-mini-audio-preview` model, you can interact with it in the Foundry portal **Chat** playground or chat completions API.


## Use GPT-4o audio generation

To chat with your deployed `gpt-4o-mini-audio-preview` model in the **Chat** playground of [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs), follow these steps:

1. Go to the [Foundry portal](https://ai.azure.com/?cid=learnDocs) and select your project that has your deployed `gpt-4o-mini-audio-preview` model.
1. Go to your project in [Foundry](https://ai.azure.com/?cid=learnDocs). 
1. Select **Playgrounds** from the left pane.
1. Select **Audio playground** > **Try the Chat playground**. 

    > **Note:**
    > The **Audio playground** doesn't support the `gpt-4o-mini-audio-preview` model. Use the **Chat playground** as described in this section.

1. Select your deployed `gpt-4o-mini-audio-preview` model from the **Deployment** dropdown. 
1. Start chatting with the model and listen to the audio responses.

    Screenshot of the Chat playground page.

    You can:
    - Record audio prompts.
    - Attach audio files to the chat.
    - Enter text prompts.
