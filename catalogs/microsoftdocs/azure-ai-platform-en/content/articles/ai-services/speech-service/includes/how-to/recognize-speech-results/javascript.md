---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 03/31/2022
ms.author: pafarley
ms.custom: devx-track-csharp
---


[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)



In this how-to guide, you learn about how you can use speech recognition results.


## Speech synchronization 

You might want to synchronize transcriptions with an audio track, whether it's done in real-time or with a prerecording. 

The Speech service returns the offset and duration of the recognized speech. 


- **Offset**: The offset into the audio stream being recognized, expressed as duration. Offset is measured in ticks, starting from `0` (zero) tick, associated with the first audio byte processed by the SDK. For example, the offset begins when you start recognition, since that's when the SDK starts processing the audio stream. One tick represents one hundred nanoseconds or one ten-millionth of a second. 
- **Duration**: Duration of the utterance that is being recognized. The duration in ticks doesn't include trailing or leading silence. 


The end of a single utterance is determined by listening for silence at the end. You won't get the final recognition result until an utterance has completed. Recognizing events will provide intermediate results that are subject to change while an audio stream is being processed. Recognized events will provide the final transcribed text once processing of an utterance is completed.

### Recognizing offset and duration

With the `Recognizing` event, you can get the offset and duration of the speech being recognized. Offset and duration per word are not available while recognition is in progress. Each `Recognizing` event comes with a textual estimate of the speech recognized so far.

This code snippet shows how to get the offset and duration from a `Recognizing` event. 

```javascript
speechRecognizer.recognizing = function (s, e) {
    console.log("RECOGNIZING: " + e.result.text);
    console.log("Offset in Ticks: " + e.result.offset);
    console.log("Duration in Ticks: " + e.result.duration);
};
```

### Recognized offset and duration
Once an utterance has been recognized, you can get the offset and duration of the recognized speech. With the `Recognized` event, you can also get the offset and duration per word. To request the offset and duration per word, first you must set the corresponding `SpeechConfig` property as shown here:

```javascript
speechConfig.requestWordLevelTimestamps();
```


### Example offset and duration

The following table shows potential offset and duration in ticks when a speaker says "Welcome to Applied Mathematics course 201." In this example, the offset doesn't change throughout the `Recognizing` and `Recognized` events. However, don't rely on the offset to remain the same between the `Recognizing` and `Recognized` events, since the final result could be different.

| Event | Text | Offset (in ticks) | Duration (in ticks) |
| --- | --- | --- | --- |
| RECOGNIZING | welcome | 17000000 | 5000000 |
| RECOGNIZING | welcome to | 17000000 | 6400000 |
| RECOGNIZING | welcome to applied math | 17000000 | 13600000 |
| RECOGNIZING | welcome to applied mathematics | 17000000 | 17200000 |
| RECOGNIZING | welcome to applied mathematics course | 17000000 | 23700000 |
| RECOGNIZING | welcome to applied mathematics course 2 | 17000000 | 26700000 |
| RECOGNIZING | welcome to applied mathematics course 201 | 17000000 | 33400000 |
| RECOGNIZED | Welcome to applied Mathematics course 201. | 17000000 | 34500000 |

The total duration of the first utterance was 3.45 seconds. It was recognized at 1.7 to 5.15 seconds offset from the start of the audio stream being recognized (00:00:01.700 --> 00:00:05.150).

If the speaker continues then to say "Let's get started," a new offset is calculated from the start of the audio stream being recognized, to the start of the new utterance. The following table shows potential offset and duration for an utterance that started two seconds after the previous utterance ended.

| Event | Text | Offset (in ticks) | Duration (in ticks) |
| --- | --- | --- | --- |
| RECOGNIZING | OK | 71500000 | 3100000 |
| RECOGNIZING | OK now | 71500000 | 10300000 |
| RECOGNIZING | OK now let's | 71500000 | 14700000 |
| RECOGNIZING | OK now let's get started | 71500000 | 18500000 |
| RECOGNIZED | OK, now let's get started. | 71500000 | 20600000 |

The total duration of the second utterance was 2.06 seconds. It was recognized at 7.15 to 9.21 seconds offset from the start of the audio stream being recognized (00:00:07.150 --> 00:00:09.210).
