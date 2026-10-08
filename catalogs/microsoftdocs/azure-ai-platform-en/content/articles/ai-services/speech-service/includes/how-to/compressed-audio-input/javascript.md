---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 03/04/2021
ms.author: pafarley
ms.custom: devx-track-js
---


[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)


The Speech SDK for JavaScript does not support compressed audio.

The default audio streaming format is WAV (16 kHz or 8 kHz, 16-bit, and mono PCM). To input a compressed audio file (such as mp3), you must first convert it to a WAV file in the default input format. To stream compressed audio, you must first decode the audio buffers to the default input format. For more information, see [How to use the audio input stream](../../../how-to-use-audio-input-streams.md).
