---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 08/30/2023
ms.author: pafarley
ai-usage: ai-assisted
---


[Speech to text REST API reference](../../../rest-speech-to-text.md) | [Speech to text REST API for short audio reference](../../../rest-speech-to-text-short.md) | [Additional samples on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk)



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


## Convert text to speech

At a command prompt, run the following command. Insert these values into the command:

- Your Speech resource key
- Your Speech resource region

You might also want to change the following values:

- The `X-Microsoft-OutputFormat` header value, which controls the audio output format. You can find a list of supported audio output formats in the [text to speech REST API reference](../../../rest-text-to-speech.md#audio-outputs).
- The output voice. To get a list of voices available for your Speech service endpoint, see the [Voice List API](../../../rest-text-to-speech.md#get-a-list-of-voices).
- The output file. In this example, we direct the response from the server into a file named `output.mp3`.

```curl
curl --location --request POST 'https://YourResourceName.cognitiveservices.azure.com/tts/cognitiveservices/v1' \
--header 'Ocp-Apim-Subscription-Key: YOUR_RESOURCE_KEY' \
--header 'Content-Type: application/ssml+xml' \
--header 'X-Microsoft-OutputFormat: audio-16khz-128kbitrate-mono-mp3' \
--header 'User-Agent: curl' \
--data-raw '<speak version='\''1.0'\'' xml:lang='\''en-US'\''>
    <voice name='\''en-US-Ava:DragonHDLatestNeural'\''>
        I am excited to try text to speech
    </voice>
</speak>' > output.mp3
```
