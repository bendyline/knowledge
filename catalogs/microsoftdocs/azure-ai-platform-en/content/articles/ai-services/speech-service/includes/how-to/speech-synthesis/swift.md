---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 08/30/2023
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



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


### Install the Speech SDK and samples

The [Azure-Samples/cognitive-services-speech-sdk](https://github.com/Azure-Samples/cognitive-services-speech-sdk) repository contains samples written in Swift for iOS and Mac. Select a link to see installation instructions for each sample:

- [Synthesize speech in Swift on macOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/swift/macos/text-to-speech)
- [Synthesize speech in Swift on iOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/swift/ios/text-to-speech)

## Run and use a container

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method. Use a container host URL instead of key and region.

For more information about containers, see [Install and run Speech containers with Docker](../../../speech-container-howto.md).
