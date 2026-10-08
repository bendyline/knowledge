---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom:
  - build-2024
  - ignite-2024
ms.topic: include
ms.date: 3/30/2026
ms.author: pafarley
ai-usage: ai-assisted
---

In this quickstart, you try real-time speech to text in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs). 

## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Foundry project. If you need to create a project, see [Create a Microsoft Foundry project](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/create-projects.md).

## Try real-time speech to text

#### [Foundry (new) portal](#tab/new-foundry)

1. Go to the [Speech to text feature page](https://aka.ms/foundry-speech-to-text) and select **Open in playground**.
1. Optionally use the **Parameters** section to change the task, language, profanity policy, and other settings. You can also add special instructions for the LLM.
1. Use the **Upload files** section to select your audio file. Then select **Start**.
1. View the transcription output in the **Transcript** tab. Optionally view the raw API response output in the **JSON** tab.
1. Switch to the **Code** tab to get the sample code for using the speech to text feature in your application.

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

    Screenshot of the project level playgrounds that you can use.

1. Select **Real-time transcription**.
1. Select **Show advanced options** to configure speech to text options such as: 

    - **Language identification**: Used to identify languages spoken in audio when compared against a list of supported languages. For more information about language identification options such as at-start and continuous recognition, see [Language identification](../../../language-identification.md).
    - **Speaker diarization**: Used to identify and separate speakers in audio. Diarization distinguishes between the different speakers who participate in the conversation. The Speech service provides information about which speaker was speaking a particular part of transcribed speech. For more information about speaker diarization, see the [real-time speech to text with speaker diarization](../../../get-started-stt-diarization.md) quickstart.
    - **Custom endpoint**: Use a deployed model from custom speech to improve recognition accuracy. To use Microsoft's baseline model, leave this set to None. For more information about custom speech, see [Custom Speech](../../../custom-speech-overview.md).
    - **Output format**: Choose between simple and detailed output formats. Simple output includes display format and timestamps. Detailed output includes more formats (such as display, lexical, ITN, and masked ITN), timestamps, and N-best lists. 
    - **Phrase list**: Improve transcription accuracy by providing a list of known phrases, such as names of people or specific locations. Use commas or semicolons to separate each value in the phrase list. For more information about phrase lists, see [Phrase lists](../../../improve-accuracy-phrase-list.md).

1. Select an audio file to upload, or record audio in real-time. In this example, we use the `Call1_separated_16k_health_insurance.wav` file that's available in the [Speech SDK repository on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/scenarios/call-center/sampledata/Call1_separated_16k_health_insurance.wav). You can download the file or use your own audio file.

    Screenshot of the option to select an audio file or speak into a microphone.

1. You can view the real-time transcription at the bottom of the page.

    Screenshot of the real-time transcription results in Microsoft Foundry.

1. You can select the **JSON** tab to see the JSON output of the transcription. Properties include `Offset`, `Duration`, `RecognitionStatus`, `Display`, `Lexical`, `ITN`, and more.

    Screenshot of the real-time transcription results in JSON format in Microsoft Foundry.
