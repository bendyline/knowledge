---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 08/30/2023
ms.author: pafarley
---


In this how-to guide, you learn common design patterns for doing text to speech synthesis.

For more information about the following areas, see [What is text to speech?](../../../text-to-speech.md)

- Getting responses as in-memory streams.
- Customizing output sample rate and bit rate.
- Submitting synthesis requests by using Speech Synthesis Markup Language (SSML).
- Using neural voices.
- Subscribing to events and acting on results.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Download and install


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


## Synthesize speech to a speaker

Now you're ready to run the Speech CLI to synthesize speech from text.

- In a console window, change to the directory that contains the Speech CLI binary file. Then run the following command:

  ```console
  spx synthesize --text "I'm excited to try text to speech"
  ```

The Speech CLI produces natural language in English through the computer speaker.

## Synthesize speech to a file

- Run the following command to change the output from your speaker to a *.wav* file:

  ```console
  spx synthesize --text "I'm excited to try text to speech" --audio output greetings.wav
  ```

The Speech CLI produces natural language in English to the *greetings.wav* audio file.

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](../../../speech-container-howto.md).
