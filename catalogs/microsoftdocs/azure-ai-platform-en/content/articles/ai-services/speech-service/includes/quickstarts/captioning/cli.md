---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 3/10/2025
ms.author: pafarley
---


In this quickstart, you run a console app to create [captions](../../../captioning-concepts.md) with speech to text.

> **Tip:**
> Try out the [Speech Studio](https://aka.ms/speechstudio/captioning) and choose a sample video clip to see real-time or offline processed captioning results.

> **Tip:**
> Try out the [Azure Speech in Foundry Tools Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run captioning samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment


Follow these steps and see the [Speech CLI quickstart](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/~/articles/ai-services/speech-service/spx-basics.md#download-and-install) for other requirements for your platform.

1. Run the following .NET CLI command to install the Speech CLI:

   ```dotnetcli
   dotnet tool install --global Microsoft.CognitiveServices.Speech.CLI
   ```

1. Run the following commands to configure your Speech resource key and region. Replace `SUBSCRIPTION-KEY` with your Speech resource key and replace `REGION` with your Speech resource region.

   # [Terminal](#tab/terminal)

   ```console
   spx config @key --set SUBSCRIPTION-KEY
   spx config @region --set REGION
   ```

   # [PowerShell](#tab/powershell)

   ```powershell
   spx --% config @key --set SUBSCRIPTION-KEY
   spx --% config @region --set REGION
   ```

   ***


You must also install [GStreamer](../../../how-to-use-codec-compressed-audio-input-streams.md) for compressed input audio.

## Create captions from speech

With the [Speech CLI](../../../spx-overview.md), you can output both SRT (SubRip Text) and WebVTT (Web Video Text Tracks) captions from any type of media that contains audio. 

To recognize audio from a file and output both WebVtt (`vtt`) and SRT (`srt`) captions, follow these steps. 

1. Make sure that you have an input file named `caption.this.mp4` in the path.
1. Run the following command to output captions from the video file:
    ```console
    spx recognize --file caption.this.mp4 --format any --output vtt file - --output srt file - --output each file - @output.each.detailed --property SpeechServiceResponse_StablePartialResultThreshold=5 --profanity masked --phrases "Constoso;Jessie;Rehaan"
    ```

    The SRT and WebVTT captions are output to the console as shown here:
    
    ```console
    1
    00:00:00,180 --> 00:00:03,230
    Welcome to applied Mathematics course 201.
    WEBVTT
    
    00:00:00.180 --> 00:00:03.230
    Welcome to applied Mathematics course 201.
    {
      "ResultId": "561a0ea00cc14bb09bd294357df3270f",
      "Duration": "00:00:03.0500000"
    }
    ```

## Usage and arguments

Here are details about the optional arguments from the previous command:

- `--file caption.this.mp4 --format any`: Input audio from file. The default input is the microphone. For compressed audio files such as MP4, install GStreamer and see [How to use compressed input audio](../../../how-to-use-codec-compressed-audio-input-streams.md).
- `--output vtt file -` and `--output srt file -`: Outputs WebVTT and SRT captions to standard output. For more information about SRT and WebVTT caption file formats, see [Caption output format](../../../captioning-concepts.md#caption-output-format). For more information about the `--output` argument, see [Speech CLI output options](../../../spx-output-options.md).
- `@output.each.detailed`: Outputs event results with text, offset, and duration. For more information, see [Get speech recognition results](../../../get-speech-recognition-results.md).
- `--property SpeechServiceResponse_StablePartialResultThreshold=5`: You can request that the Speech service return fewer `Recognizing` events that are more accurate. In this example, the Speech service must affirm recognition of a word at least five times before returning the partial results to you. For more information, see [Get partial results](../../../captioning-concepts.md#get-partial-results) concepts.
- `--profanity masked`: You can specify whether to mask, remove, or show profanity in recognition results. For more information, see [Profanity filter](../../../display-text-format.md#profanity-filter) concepts.
- `--phrases "Constoso;Jessie;Rehaan"`: You can specify a list of phrases to be recognized, such as Contoso, Jessie, and Rehaan. For more information, see [Improve recognition with phrase list](../../../improve-accuracy-phrase-list.md).

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
