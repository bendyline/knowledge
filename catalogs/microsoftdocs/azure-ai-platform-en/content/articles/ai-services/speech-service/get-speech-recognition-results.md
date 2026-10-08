---
title: "Get speech recognition results - Speech service"
titleSuffix: Foundry Tools
description: Learn how to get speech recognition results.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 02/25/2026
ms.author: pafarley
ms.devlang: cpp
ms.custom: devx-track-extended-java, devx-track-go, devx-track-js, devx-track-python
zone_pivot_groups: programming-languages-speech-sdk-cli
keywords: speech to text, speech to text software
---

# Get speech recognition results

**Applies to: programming-language-python**



[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)



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

```python
def recognizing_handler(e : speechsdk.SpeechRecognitionEventArgs) :
    if speechsdk.ResultReason.RecognizingSpeech == e.result.reason and len(e.result.text) > 0 :
        print("Recognized: {}".format(e.result.text))
        print("Offset in Ticks: {}".format(e.result.offset))
        print("Duration in Ticks: {}".format(e.result.duration))
```

### Recognized offset and duration
Once an utterance has been recognized, you can get the offset and duration of the recognized speech. With the `Recognized` event, you can also get the offset and duration per word. To request the offset and duration per word, first you must set the corresponding `SpeechConfig` property as shown here:

```python
speech_config.request_word_level_timestamps()
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




**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



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

```csharp
speechRecognizer.Recognizing += (object sender, SpeechRecognitionEventArgs e) =>
    {
        if (e.Result.Reason == ResultReason.RecognizingSpeech)
        {        
            Console.WriteLine(String.Format ("RECOGNIZING: {0}", e.Result.Text));
            Console.WriteLine(String.Format ("Offset in Ticks: {0}", e.Result.OffsetInTicks));
            Console.WriteLine(String.Format ("Duration in Ticks: {0}", e.Result.Duration.Ticks));
        }
    };
```

### Recognized offset and duration
Once an utterance has been recognized, you can get the offset and duration of the recognized speech. With the `Recognized` event, you can also get the offset and duration per word. To request the offset and duration per word, first you must set the corresponding `SpeechConfig` property as shown here:

```csharp
speechConfig.RequestWordLevelTimestamps();
```

This code snippet shows how to get the offset and duration from a `Recognized` event. 

```csharp
speechRecognizer.Recognized += (object sender, SpeechRecognitionEventArgs e) =>
    {
        if (ResultReason.RecognizedSpeech == e.Result.Reason && e.Result.Text.Length > 0)
        {            
            Console.WriteLine($"RECOGNIZED: Text={e.Result.Text}");
            Console.WriteLine(String.Format ("Offset in Ticks: {0}", e.Result.OffsetInTicks));
            Console.WriteLine(String.Format ("Duration in Ticks: {0}", e.Result.Duration.Ticks));
                        
            var detailedResults = e.Result.Best();
            if(detailedResults != null && detailedResults.Any())
            {
                // The first item in detailedResults corresponds to the recognized text.
                // This is not necessarily the item with the highest confidence number.
                var bestResults = detailedResults?.ToList()[0];
                Console.WriteLine(String.Format("\tConfidence: {0}\n\tText: {1}\n\tLexicalForm: {2}\n\tNormalizedForm: {3}\n\tMaskedNormalizedForm: {4}",
                    bestResults.Confidence, bestResults.Text, bestResults.LexicalForm, bestResults.NormalizedForm, bestResults.MaskedNormalizedForm));
                // You must set speechConfig.RequestWordLevelTimestamps() to get word-level timestamps.
                Console.WriteLine($"\tWord-level timing:");
                Console.WriteLine($"\t\tWord | Offset | Duration");
                Console.WriteLine($"\t\t----- | ----- | ----- ");

                foreach (var word in bestResults.Words)
                {
                    Console.WriteLine($"\t\t{word.Word} | {word.Offset} | {word.Duration}");
                }
            }
        }
    };
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




**Applies to: programming-language-javascript**



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




**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



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

```java
speechRecognizer.recognizing.addEventListener((s, e) -> {
    System.out.println("RECOGNIZING: " + e.getResult().getText());
    System.out.println("Offset in Ticks: " + e.getResult().getOffset());
    System.out.println("Duration in Ticks: " + e.getResult().getDuration());
});
```

### Recognized offset and duration
Once an utterance has been recognized, you can get the offset and duration of the recognized speech. With the `Recognized` event, you can also get the offset and duration per word. To request the offset and duration per word, first you must set the corresponding `SpeechConfig` property as shown here:

```java
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




**Applies to: programming-language-cpp**



[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)



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

```cpp
speechRecognizer->Recognizing.Connect([](const SpeechRecognitionEventArgs& e)
    {
        cout << "Recognizing:" << e.Result->Text << std::endl;
        cout << "Offset in Ticks:" << e.Result->Offset() << std::endl;
        cout << "Duration in Ticks:" << e.Result->Duration() << std::endl;
    });
```

### Recognized offset and duration
Once an utterance has been recognized, you can get the offset and duration of the recognized speech. With the `Recognized` event, you can also get the offset and duration per word. To request the offset and duration per word, first you must set the corresponding `SpeechConfig` property as shown here:

```cpp
speechConfig->RequestWordLevelTimestamps();
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




**Applies to: programming-language-go**



[Reference documentation](https://aka.ms/csspeech/goref) | [Package (Go)](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go) | [Additional samples on GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/)



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

```go
func recognizingHandler(event speech.SpeechRecognitionEventArgs) {
    defer event.Close()
    fmt.Println("Recognizing:", event.Result.Text)
    fmt.Println("Offset in Ticks:", event.Result.Offset)
    fmt.Println("Duration in Ticks:", event.Result.Duration)
}
```

### Recognized offset and duration
Once an utterance has been recognized, you can get the offset and duration of the recognized speech. With the `Recognized` event, you can also get the offset and duration per word. To request the offset and duration per word, first you must set the corresponding `SpeechConfig` property as shown here:

```go
speechConfig.RequestWordLevelTimestamps();
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




**Applies to: programming-language-objectivec**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



In this how-to guide, you learn about how you can use speech recognition results.


## Speech synchronization 

You might want to synchronize transcriptions with an audio track, whether it's done in real-time or with a prerecording. 

The Speech service returns the offset and duration of the recognized speech. 


- **Offset**: The offset into the audio stream being recognized, expressed as duration. Offset is measured in ticks, starting from `0` (zero) tick, associated with the first audio byte processed by the SDK. For example, the offset begins when you start recognition, since that's when the SDK starts processing the audio stream. One tick represents one hundred nanoseconds or one ten-millionth of a second. 
- **Duration**: Duration of the utterance that is being recognized. The duration in ticks doesn't include trailing or leading silence. 


The end of a single utterance is determined by listening for silence at the end. You won't get the final recognition result until an utterance has completed. Recognizing events will provide intermediate results that are subject to change while an audio stream is being processed. Recognized events will provide the final transcribed text once processing of an utterance is completed.

### Recognizing offset and duration

With the `Recognizing` event, you can get the offset and duration of the speech being recognized. Offset and duration per word are not available while recognition is in progress. Each `Recognizing` event comes with a textual estimate of the speech recognized so far.

### Recognized offset and duration
Once an utterance has been recognized, you can get the offset and duration of the recognized speech. With the `Recognized` event, you can also get the offset and duration per word. To request the offset and duration per word, first you must set the corresponding `SpeechConfig` property as shown here:

```ObjectiveC
[speechConfig requestWordLevelTimestamps];
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




**Applies to: programming-language-cli**



In this how-to guide, you learn about how you can use speech recognition results.


## Speech synchronization 

You might want to synchronize transcriptions with an audio track, whether it's done in real-time or with a prerecording. 

The Speech service returns the offset and duration of the recognized speech. 


- **Offset**: The offset into the audio stream being recognized, expressed as duration. Offset is measured in ticks, starting from `0` (zero) tick, associated with the first audio byte processed by the SDK. For example, the offset begins when you start recognition, since that's when the SDK starts processing the audio stream. One tick represents one hundred nanoseconds or one ten-millionth of a second. 
- **Duration**: Duration of the utterance that is being recognized. The duration in ticks doesn't include trailing or leading silence. 


The end of a single utterance is determined by listening for silence at the end. You won't get the final recognition result until an utterance has completed. Recognizing events will provide intermediate results that are subject to change while an audio stream is being processed. Recognized events will provide the final transcribed text once processing of an utterance is completed.

### Recognizing offset and duration

You'll want to synchronize captions with the audio track, whether it's done in real-time or with a prerecording. With the `Recognizing` event, you can get the offset and duration of the speech being recognized. Offset and duration per word are not available while recognition is in progress. Each `Recognizing` event comes with a textual estimate of the speech recognized so far.

For example, run the following command to get the offset and duration of the recognized speech:

```console
spx recognize --file caption.this.mp4 --format any --output each file - @output.each.detailed
```

Since the `@output.each.detailed` argument was set, the output includes the following column headers:

```console
audio.input.id  event   event.sessionid result.reason   result.latency  result.text     result.json
```

In the `result.json` column, you can find details that include offset and duration for the `Recognizing` and `Recognized` events:

```json
{
	"Id": "492574cd8555481a92c22f5ff757ef17",
	"RecognitionStatus": "Success",
	"DisplayText": "Welcome to applied Mathematics course 201.",
	"Offset": 1800000,
	"Duration": 30500000
}
```

For more information, see the Speech CLI [datastore configuration](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/recognize-speech-results/~/articles/ai-services/speech-service/spx-data-store-configuration.md) and [output options](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/recognize-speech-results/~/articles/ai-services/speech-service/spx-data-store-configuration.md). 


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




**Applies to: programming-language-swift**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



In this how-to guide, you learn about how you can use speech recognition results.


## Speech synchronization 

You might want to synchronize transcriptions with an audio track, whether it's done in real-time or with a prerecording. 

The Speech service returns the offset and duration of the recognized speech. 


- **Offset**: The offset into the audio stream being recognized, expressed as duration. Offset is measured in ticks, starting from `0` (zero) tick, associated with the first audio byte processed by the SDK. For example, the offset begins when you start recognition, since that's when the SDK starts processing the audio stream. One tick represents one hundred nanoseconds or one ten-millionth of a second. 
- **Duration**: Duration of the utterance that is being recognized. The duration in ticks doesn't include trailing or leading silence. 


The end of a single utterance is determined by listening for silence at the end. You won't get the final recognition result until an utterance has completed. Recognizing events will provide intermediate results that are subject to change while an audio stream is being processed. Recognized events will provide the final transcribed text once processing of an utterance is completed.

### Recognizing offset and duration

With the `Recognizing` event, you can get the offset and duration of the speech being recognized. Offset and duration per word are not available while recognition is in progress. Each `Recognizing` event comes with a textual estimate of the speech recognized so far.

### Recognized offset and duration
Once an utterance has been recognized, you can get the offset and duration of the recognized speech. With the `Recognized` event, you can also get the offset and duration per word. To request the offset and duration per word, first you must set the corresponding `SpeechConfig` property as shown here:

```swift
[speechConfig requestWordLevelTimestamps];
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




## Next steps

* [Try the speech to text quickstart](get-started-speech-to-text.md)
* [Improve recognition accuracy with custom speech](custom-speech-overview.md)
* [Use batch transcription](batch-transcription.md)
